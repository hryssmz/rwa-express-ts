// apis/authApi.ts
import { Response, Request } from "express";
import passport from "passport";

import prisma from "../utils/prisma";
import { localStrategy } from "../utils/password";

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

export const loginApi = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
});

export const homeApi = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    // HTTP 302: not authorized
    return res.redirect("/login");
  }
  const { id, username } = req.user;
  // HTTP 200: return content
  return res.json({ id, username });
};

export const logoutApi = (req: Request, res: Response) => {
  // HTTP 200: logged out
  req.logout();
  return res.redirect("/login");
};
