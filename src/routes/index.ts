// routes/index.ts
import { Router } from "express";
import { loginApi, logoutApi, signupApi, homeApi } from "../apis/authApi";
import { indexApi } from "../apis/indexApi";

const router = Router();

router.get("/", indexApi);

router.post("/login", loginApi);
router.post("/logout", logoutApi);
router.post("/signup", signupApi);
router.get("/home", homeApi);

export default router;
