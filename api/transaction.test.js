import request from "supertest";
import app from "../app";

describe("Transaction", () => {
  beforeEach(async () => {
    // give each run enough time to update the events
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  test("Creates a new transaction", async () => {
    let res = await request(app)
      .post("/api/transaction")
      .send({
        amount: 100000,
        total: 100000,
        money: [
          {
            value: 20000,
            amount: 3,
          },
          {
            value: 10000,
            amount: 2,
          },
          {
            value: 5000,
            amount: 4,
          },
        ],
      });

    expect(res.status).toEqual(200);

    // hooks wait
    await new Promise((resolve) => setTimeout(resolve, 100));

    res = await request(app).get("/api/state");

    expect(res.body.find((m) => m.value === 20000).amount).toEqual(3);
    expect(res.body.find((m) => m.value === 10000).amount).toEqual(2);
    expect(res.body.find((m) => m.value === 5000).amount).toEqual(4);
  });

  test("Gives back correct change", async () => {
    let res = await request(app)
      .post("/api/transaction")
      .send({
        amount: 100000,
        total: 65000,
        money: [
          {
            value: 50000,
            amount: 2,
          },
        ],
      });

    expect(res.status).toEqual(200);
    expect(res.body).toStrictEqual([
      {
        value: 20000,
        amount: 1,
      },
      {
        value: 10000,
        amount: 1,
      },
      {
        value: 5000,
        amount: 1,
      },
    ]);

    // hooks wait
    await new Promise((resolve) => setTimeout(resolve, 100));

    res = await request(app).get("/api/state");

    expect(res.body.find((m) => m.value === 50000).amount).toEqual(2);
    expect(res.body.find((m) => m.value === 20000).amount).toEqual(2);
    expect(res.body.find((m) => m.value === 10000).amount).toEqual(1);
    expect(res.body.find((m) => m.value === 5000).amount).toEqual(3);
  });

  test("Fails if wrong data is sent or missing", async () => {
    // 1. wrong amount value
    let res = await request(app)
      .post("/api/transaction")
      .send({
        amount: "abc",
        total: 85000,
        money: [
          {
            value: 50000,
            amount: 2,
          },
        ],
      });

    expect(res.status).toEqual(500);
    expect(res.text).toBe("BAD_INPUT");

    // 2. total is missing
    res = await request(app)
      .post("/api/transaction")
      .send({
        amount: 50000,
        money: [
          {
            value: 50000,
            amount: 2,
          },
        ],
      });

    expect(res.status).toEqual(500);
    expect(res.text).toBe("BAD_INPUT");

    // 3. money is missing the amount attribute
    res = await request(app)
      .post("/api/transaction")
      .send({
        amount: 50000,
        total: 100000,
        money: [
          {
            value: 50000,
          },
        ],
      });

    expect(res.status).toEqual(500);
    expect(res.text).toBe("BAD_INPUT");

    // 4. money is not an array of bills / coins
    res = await request(app).post("/api/transaction").send({
      amount: 5000,
      total: 5000,
      money: 5000,
    });

    expect(res.status).toEqual(500);
    expect(res.text).toBe("BAD_INPUT");
  });
});
