import validateBillsAndCoins from "./validate-bills-and-coins";

describe("Validate bills and coins", () => {
  it("returns true for valid bills and coins", () => {
    expect(validateBillsAndCoins([{ value: 100000 }, { value: 50 }])).toBe(
      true
    );
  });

  it("returns false for valid bills and coins", () => {
    expect(validateBillsAndCoins([{ value: 45000 }, { value: 100 }])).toBe(
      false
    );
  });
});
