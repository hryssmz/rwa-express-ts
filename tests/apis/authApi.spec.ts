// apis/authApi.spec.ts
import express from "express";
import session, { SessionOptions } from "express-session";
import passport from "passport";
import request from "supertest";

import prisma from "../../src/utils/prisma";
import { createUser } from "../../src/utils/password";
import {
  loginApi,
  logoutApi,
  signupApi,
  homeApi,
} from "../../src/apis/authApi";

const app = express();

beforeAll(async () => {
  const sessionOptions: SessionOptions = {
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  };

  app.use(express.json());
  app.use(session(sessionOptions));
  app.use(passport.authenticate("session"));

  app.post("/login", loginApi);
  app.post("/logout", logoutApi);
  app.post("/signup", signupApi);
  app.get("/home", homeApi);

  await createUser("john", "secret");
});

afterAll(async () => {
  await prisma.user.deleteMany();
});

describe("loginApi", () => {
  test("HTTP 401: Bad credential", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "badPass" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Incorrect username or password.");
  });

  test("HTTP 200: Authenticated", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "john", password: "secret" });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("john");
  });
});

describe("logoutApi", () => {
  test("HTTP 200: logged out", async () => {
    const agent = request.agent(app);
    await agent.post("/login").send({ username: "john", password: "secret" });
    const res = await agent.post("/logout");

    expect(res.status).toBe(200);
    expect((await agent.get("/home")).status).toBe(302);
  });
});

describe("signupApi", () => {
  test("HTTP 200: user already exists", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ username: "john", password: "passwd" });

    expect(res.status).toBe(200);
    expect(res.body.username).toBe("john");
  });

  test("HTTP 201: user created", async () => {
    const res = await request(app)
      .post("/signup")
      .send({ username: "alice", password: "secret" });

    expect(res.status).toBe(201);
    expect(res.body.username).toBe("alice");
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
    expect(res.body.username).toBe("john");
  });
});
