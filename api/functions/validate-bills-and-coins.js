import valid from "../../config/validMoney";

export default (money) => {
  return money.filter(({ value }) => valid.indexOf(value) === -1).length === 0;
};
