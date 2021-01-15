import request from "supertest";
import app from "../app";

describe("Timemachine", () => {
  beforeEach(async () => {
    // give each run enough time to update the events
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  test("Returns correct state for a passed date", async () => {
    let date = new Date();
    let res = await request(app).get("/api/state");
    const before = res.body.find((m) => m.value === 20000).amount;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    res = await request(app)
      .post("/api/set")
      .send([
        {
          value: 20000,
          amount: 123,
        },
      ]);

    expect(res.status).toEqual(200);

    // hooks wait
    await new Promise((resolve) => setTimeout(resolve, 100));

    res = await request(app).get("/api/timemachine").query({ date });
    expect(res.body.find((m) => m.value === 20000).amount).toEqual(before);

    // revert for other tests:
    res = await request(app)
      .post("/api/set")
      .send([
        {
          value: 20000,
          amount: before,
        },
      ]);
  });

  test("Fails if date is missing", async () => {
    let res = await request(app).get("/api/timemachine");
    expect(res.text).toBe("DATE_MISSING");
  });
});
