import getAvailableMoney from "./get-available-money";

describe("Get available money", () => {
  it("calculates the money available", () => {
    expect(
      getAvailableMoney([
        { value: 100000, amount: 1 },
        { value: 50, amount: 1 },
      ])
    ).toBe(100050);

    expect(
      getAvailableMoney([
        { value: 100000, amount: 2 },
        { value: 50000, amount: 2 },
      ])
    ).toBe(300000);
  });
});
