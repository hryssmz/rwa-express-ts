// models/auth.spec.ts
import { connect, connection } from "mongoose";
import { encrypt, testMongoURL } from "../../src/utils";
import Auth from "../../src/models/auth";

describe("valid Auth documents", () => {
  test("auth with full valid paths", () => {
    const auth = new Auth({ username: "john", password: encrypt("secret") });

    expect(auth.validateSync()).toBeUndefined();
  });
});

describe("invalid Auth documents", () => {
  test("auth without required paths", () => {
    const auth = new Auth();
    const errors = auth.validateSync()?.errors ?? {};

    expect(Object.keys(errors).length).toBe(2);
    expect(errors.username.message).toBe("Path `username` is required.");
    expect(errors.password.message).toBe("Path `password` is required.");
  });

  test("auth with short username and password", () => {
    const auth = new Auth({
      username: "aaa",
      password: Array(128).join("b"),
    });
    const errors = auth.validateSync()?.errors ?? {};

    expect(Object.keys(errors).length).toBe(2);
    expect(errors.username.message).toBe(
      "Path `username` (`" +
        auth.username +
        "`) is shorter than the minimum allowed length (4)."
    );
    expect(errors.password.message).toBe(
      "Path `password` (`" +
        auth.password +
        "`) is shorter than the minimum allowed length (128)."
    );
  });

  test("auth with long username and password", () => {
    const auth = new Auth({
      username: "aaaaaaaaa",
      password: Array(130).join("b"),
    });
    const errors = auth.validateSync()?.errors ?? {};

    expect(Object.keys(errors).length).toBe(2);
    expect(errors.username.message).toBe(
      "Path `username` (`" +
        auth.username +
        "`) is longer than the maximum allowed length (8)."
    );
    expect(errors.password.message).toBe(
      "Path `password` (`" +
        auth.password +
        "`) is longer than the maximum allowed length (128)."
    );
  });
});

describe("test DB interactions", () => {
  beforeAll(async () => {
    await connect(testMongoURL);
  });

  beforeEach(async () => {
    await Auth.deleteMany();
  });

  afterAll(async () => {
    await Auth.deleteMany();
    await connection.close();
  });

  test("can read and write DB", async () => {
    const auth = await Auth.create({
      username: "john",
      password: encrypt("secret"),
    });
    const auths = await Auth.find();

    expect(auths.length).toBe(1);
    expect(auths[0]._id).toStrictEqual(auth._id);
    expect(auths[0].username).toBe(auth.username);
    expect(auths[0].password).toBe(auth.password);
  });

  test("does not save to DB if validation failed", async () => {
    await Auth.create().catch(error => error);
    const auths = await Auth.find();

    expect(auths.length).toBe(0);
  });
});
