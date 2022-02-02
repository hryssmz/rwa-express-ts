// apis/indexApi.ts
import { Request, Response } from "express";

export function indexApi(req: Request, res: Response) {
  // HTTP 200: return Hello
  return res.json("Hello");
}
