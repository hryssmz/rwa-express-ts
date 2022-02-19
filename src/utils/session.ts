import { SessionOptions } from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { SECRET } from "./env";
import prisma from "./prisma";

export const sessionOptions: SessionOptions = {
  cookie: {
    maxAge: 60 * 1000, // ms
  },
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};
