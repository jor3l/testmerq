import { Event, Money } from "../models/index";
export default async (req, res) => {
  const money = [...req.body];
  const MONEY = (await Money.findAll({ raw: true })).map((m) => ({
    ...m,
    value: parseInt(m.value),
  }));

  if (
    !Array.isArray(money) ||
    money.filter((m) => !m.value || (!m.amount && m.amount !== 0)).length > 0
  ) {
    return res.status(500).send("BAD_INPUT");
  }

  money.forEach(async (m) => {
    let money_id = MONEY.find((_m) => _m.value === m.value)?.id;

    money_id &&
      (await Event.create({
        money_id,
        type: "SET",
        amount: m.amount,
      }));
  });

  res.sendStatus(200);
};
