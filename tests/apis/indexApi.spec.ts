// apis/indexApi.spec.ts
import express from "express";
import request from "supertest";
import { indexApi } from "../../src/apis/indexApi";

const app = express();

beforeAll(() => {
  app.get("/", indexApi);
});

describe("indexApi", () => {
  test("HTTP 200: return Hello", async () => {
    const res = await request(app).get("/");

    expect(res.body).toBe("Hello");
  });
});
