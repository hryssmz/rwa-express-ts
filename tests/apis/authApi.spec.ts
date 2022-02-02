// apis/authApi.spec.ts
import express from "express";
import { connect, connection } from "mongoose";
import session from "express-session";
import passport from "passport";
import request from "supertest";
import { testMongoURL, encrypt } from "../../src/utils";
import Auth from "../../src/models/auth";
import { loginApi, homeApi, logoutApi } from "../../src/apis/authApi";

const app = express();

beforeAll(async () => {
  app.use(express.json());
  app.use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.post("/login", loginApi);
  app.get("/home", homeApi);
  app.post("/logout", logoutApi);
  await connect(testMongoURL);
  await Auth.create({ username: "john", password: encrypt("secret") });
});

afterAll(async () => {
  await Auth.deleteMany();
  await connection.close();
});

describe("loginApi", () => {
  test("HTTP 302: failureRedirect: /login", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "badPass" });

    expect(res.status).toBe(302);
    expect(res.text).toBe("Found. Redirecting to /login");
  });

  test("HTTP 302: successRedirect: /home", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "john", password: "secret" });

    expect(res.status).toBe(302);
    expect(res.text).toBe("Found. Redirecting to /home");
  });
});

describe("homeApi", () => {
  test("HTTP 302: not authorized", async () => {
    const res = await request(app).get("/home");

    expect(res.status).toBe(302);
    expect(res.text).toBe("Found. Redirecting to /login");
  });

  test("HTTP 200: return content", async () => {
    const agent = request.agent(app);
    await agent.post("/login").send({ username: "john", password: "secret" });
    const res = await agent.get("/home");

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ username: "john" });
  });
});

describe("logoutApi", () => {
  test("HTTP 200: logged out", async () => {
    const agent = request.agent(app);
    await agent.post("/login").send({ username: "john", password: "secret" });

    expect((await agent.get("/home")).status).toBe(200);

    const res = await agent.post("/logout");

    expect(res.status).toBe(302);
    expect(res.text).toBe("Found. Redirecting to /login");
    expect((await agent.get("/home")).status).toBe(302);
  });
});
