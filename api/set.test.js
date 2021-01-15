import request from "supertest";
import app from "../app";

describe("Set", () => {
  beforeEach(async () => {
    // give each run enough time to update the events
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  test("Sets a value for some bills", async () => {
    let res = await request(app)
      .post("/api/set")
      .send([
        {
          value: 20000,
          amount: 100,
        },
        {
          value: 10000,
          amount: 1000,
        },
        {
          value: 5000,
          amount: 50000,
        },
      ]);

    expect(res.status).toEqual(200);

    // hooks wait
    await new Promise((resolve) => setTimeout(resolve, 100));

    res = await request(app).get("/api/state");

    expect(res.body.find((m) => m.value === 20000).amount).toEqual(100);
    expect(res.body.find((m) => m.value === 10000).amount).toEqual(1000);
    expect(res.body.find((m) => m.value === 5000).amount).toEqual(50000);

    // revert for other tests:
    res = await request(app)
      .post("/api/set")
      .send([
        {
          value: 20000,
          amount: 0,
        },
        {
          value: 10000,
          amount: 0,
        },
        {
          value: 5000,
          amount: 0,
        },
      ]);
  });
});
