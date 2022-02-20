// routes/index.ts
import { Router } from "express";
import { loginApi, homeApi, logoutApi } from "../apis/authApi";
import { indexApi } from "../apis/indexApi";

const router = Router();

router.get("/", indexApi);

router.post("/login", loginApi);
router.get("/home", homeApi);
router.post("/logout", logoutApi);

export default router;
