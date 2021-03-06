// app.ts
import path from "path";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import session, { SessionOptions } from "express-session";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import { NODE_ENV, SECRET } from "./utils/env";
import prisma from "./utils/prisma";
import indexRouter from "./routes/index";

const app = express();
const sessionOptions: SessionOptions = {
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

// Setup template engine.
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "pug");

// Setup cors.
app.use(cors({ origin: NODE_ENV === "development" }));

// Setup request body parser.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup static assets.
app.use(express.static(path.join(__dirname, "..", "public")));

// Setup express session middleware.
app.use(session(sessionOptions));
app.use(passport.authenticate("session"));

// Setup logger.
app.use(logger("dev"));

// Setup routers.
app.use(indexRouter);

// Setup Not Found handler.
app.use((req, res, next) => {
  return next(createError(404));
});

// Setup error handler.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // render the error page
  res.status(err.status || 500);
  return res.render("error", {
    message: err.message,
    error: NODE_ENV === "development" ? err : {},
  });
});

export default app;
