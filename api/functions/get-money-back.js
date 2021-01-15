// toma un arreglo de billetes y genera un arreglo de cambio a entregar (max amount 1 por billete)
export default (amount, money) => {
  let back = [];
  money = [...money].sort((a, b) => (a.value < b.value ? 0 : -1));

  while (amount > 0) {
    money.length === 0 && (amount = 0);

    let check = money[0];
    if (check && check.value <= amount && check.amount > 0) {
      money[0].amount -= 1;
      back.push({ ...check, amount: 1 });
      amount -= check.value;
    } else {
      money.shift();
    }
  }

  return back.sort((a, b) => (a.value < b.value ? 0 : -1));
};
