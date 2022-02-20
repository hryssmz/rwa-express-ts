// utils/prisma.ts
import { PrismaClient } from "@prisma/client";

import { NODE_ENV } from "./env";

const url = NODE_ENV === "test" ? "file:./test.db" : "file:./dev.db";
console.log(`Using ${NODE_ENV} DB: ${url}`);

const prisma = new PrismaClient({
  datasources: { db: { url } },
});

export default prisma;
