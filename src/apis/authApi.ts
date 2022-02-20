// apis/authApi.ts
import { Response, Request, NextFunction } from "express";
import passport from "passport";

import prisma from "../utils/prisma";
import { localStrategy, createUser } from "../utils/password";

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  /* c8 ignore next 3 */
  if (user === null) {
    return done(null, false);
  }
  return done(null, { id, username: user.username });
});

export const loginApi = (req: Request, res: Response, next: NextFunction) => {
  const callback = passport.authenticate("local", (err, user, info) => {
    if (!user) {
      // HTTP 401: Bad credential
      return res.status(401).json(info);
    }
    req.login(user, () => {
      // HTTP 200: Authenticated
      return res.json(user);
    });
  });
  return callback(req, res, next);
};

export const logoutApi = (req: Request, res: Response) => {
  // HTTP 200: logged out
  req.logout();
  return res.json();
};

export const signupApi = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (user !== null) {
    // HTTP 400: user already exists
    return res.status(400).json({ message: "User already exists." });
  }
  // HTTP 201: user created
  const { id } = await createUser(username, password);
  return res.status(201).json({ id, username });
};

export const homeApi = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    // HTTP 302: not authorized
    return res.redirect("/login");
  }
  const { id, username } = req.user;
  // HTTP 200: return content
  return res.json({ id, username });
};
