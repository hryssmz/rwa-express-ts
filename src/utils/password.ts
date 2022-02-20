// utils/password.ts
import Hex from "crypto-js/enc-hex";
import WordArray from "crypto-js/lib-typedarrays";
import PBKDF2 from "crypto-js/pbkdf2";
import { Strategy as LocalStrategy } from "passport-local";

import prisma from "./prisma";

export function getHashedPassword(password: string, salt: string) {
  return PBKDF2(password, salt, {
    keySize: 128 / 8, // 128 chars
    iterations: 1000,
  }).toString(Hex);
}

export function generateSalt() {
  return WordArray.random(32 / 2).toString(Hex); // 32 chars
}

export const localStrategy = new LocalStrategy(
  async (username, password, callback) => {
    const message = "Incorrect username or password.";

    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (user === null) {
      return callback(null, false, { message });
    }

    const { id, hashedPassword, salt } = user;
    if (getHashedPassword(password, salt) !== hashedPassword) {
      return callback(null, false, { message });
    }

    return callback(null, { id, username });
  }
);

export const createUser = async (username: string, password: string) => {
  const salt = generateSalt();
  return await prisma.user.create({
    data: { username, hashedPassword: getHashedPassword(password, salt), salt },
  });
};
