import { SessionOptions } from "express-session";

export const sessionOptions: SessionOptions = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
};
