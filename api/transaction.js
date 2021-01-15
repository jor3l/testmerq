import { Event, Money } from "../models/index";
import validateBillsAndCoins from "./functions/validate-bills-and-coins";
import validateAmountEqualsMoney from "./functions/validate-amount-equals-money";
import getAvailableMoney from "./functions/get-available-money";
import getMoneyBack from "./functions/get-money-back";

export default async (req, res) => {
  const { amount, total, money } = req.body || {};
  const MONEY = (await Money.findAll({ raw: true })).map((m) => ({
    ...m,
    value: parseInt(m.value),
  }));

  const MONEY_AVAILABLE = getAvailableMoney(MONEY);

  if (
    !amount ||
    !total ||
    !money ||
    typeof amount !== "number" ||
    typeof total !== "number" ||
    !Array.isArray(money) ||
    money.filter((m) => !m.value || !m.amount).length > 0
  ) {
    return res.status(500).send("BAD_INPUT");
  }

  // amount: money given to the cashier
  // total: money owed / to pay
  // money: set of bills or coins that sum up to the amount
  //        format: { value: 1000, amount: 1 }
  //            value: unit of the bill or coin
  //            amount: quantity of this denomination

  if (!validateBillsAndCoins(money)) {
    return res.status(500).send("WRONG_BILLS_OR_COINS");
  }

  if (!validateAmountEqualsMoney(amount, money)) {
    return res.status(500).send("AMOUNT_DOES_NOT_MATCH");
  }

  const moneyToGiveBack = amount - total;

  if (moneyToGiveBack > 0 && moneyToGiveBack > MONEY_AVAILABLE) {
    return res.status(500).send("NOT_ENOUGH_CHANGE");
  }

  const moneyBack = getMoneyBack(moneyToGiveBack, MONEY);
  if (moneyToGiveBack > 0 && moneyBack.length === 0) {
    return res.status(500).send("UNABLE_TO_GIVE_CHANGE");
  }

  // Events for money going in
  money.forEach(async (m) => {
    let money_id = MONEY.find((_m) => _m.value === m.value)?.id;

    money_id &&
      (await Event.create({
        money_id,
        type: "ADD",
        amount: m.amount,
      }));
  });

  // Events for money going out
  moneyBack.forEach(async (m) => {
    await Event.create({
      money_id: m.id,
      type: "REMOVE",
      amount: m.amount,
    });
  });

  res.json(moneyBack.map(({ value, amount }) => ({ value, amount })));
};
