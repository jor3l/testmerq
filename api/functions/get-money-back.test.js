import getMoneyBack from "./get-money-back";

describe("Get available money", () => {
  it("calculates the money available", () => {
    expect(
      getMoneyBack(65000, [
        { id: 2, value: 50000, amount: 1 },
        { id: 4, value: 5000, amount: 1 },
        { id: 1, value: 100000, amount: 1 },
        { id: 3, value: 10000, amount: 3 },
      ])
    ).toStrictEqual([
      { id: 2, value: 50000, amount: 1 },
      { id: 3, value: 10000, amount: 1 },
      { id: 4, value: 5000, amount: 1 },
    ]);

    expect(
      getMoneyBack(125000, [
        { id: 2, value: 50000, amount: 1 },
        { id: 4, value: 5000, amount: 1 },
        { id: 1, value: 100000, amount: 1 },
        { id: 3, value: 10000, amount: 3 },
      ])
    ).toStrictEqual([
      { id: 1, value: 100000, amount: 1 },
      { id: 3, value: 10000, amount: 1 },
      { id: 3, value: 10000, amount: 1 },
      { id: 4, value: 5000, amount: 1 },
    ]);
  });
});
