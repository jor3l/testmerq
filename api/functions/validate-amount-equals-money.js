import getAvailableMoney from "./get-available-money";
export default (amount, money) => {
  return amount === getAvailableMoney(money);
};
