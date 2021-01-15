import ValidateAmountEqualsMoney from "./validate-amount-equals-money";

describe("Validate amount received", () => {
  it("returns true if the money matches the amount", () => {
    expect(
      ValidateAmountEqualsMoney(100050, [
        { value: 100000, amount: 1 },
        { value: 50, amount: 1 },
      ])
    ).toBe(true);

    expect(
      ValidateAmountEqualsMoney(300000, [
        { value: 100000, amount: 2 },
        { value: 50000, amount: 2 },
      ])
    ).toBe(true);
  });

  it("returns false when the money does not match the amount", () => {
    expect(
      ValidateAmountEqualsMoney(100050, [{ value: 100000, amount: 2 }])
    ).toBe(false);
  });
});
