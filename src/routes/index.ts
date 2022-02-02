// routes/index.ts
import { Router } from "express";
import { indexApi } from "../apis/indexApi";

const router = Router();

router.get("/", indexApi);

export default router;
