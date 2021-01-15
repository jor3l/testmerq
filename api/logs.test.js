import request from "supertest";
import app from "../app";

describe("Logs", () => {
  it("Should return all the logs", async () => {
    const res = await request(app).get("/api/logs");
    expect(res.body.count > 0).toBe(true);
  });
});
