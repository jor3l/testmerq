export default (money) => {
  return money.reduce((total, m) => total + m.value * m.amount, 0);
};
