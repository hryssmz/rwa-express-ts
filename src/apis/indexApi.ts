// apis/indexApi.ts
import { Request, Response } from "express";

export function indexApi(req: Request, res: Response) {
  return res.json("Hello");
}
