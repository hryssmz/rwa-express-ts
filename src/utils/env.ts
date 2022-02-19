import dotenv from "dotenv";

dotenv.config();

// NODE_ENV
export const NODE_ENV = process.env.NODE_ENV || "development";

// HOST
export const HOST = process.env.HOST || "0.0.0.0";

// PORT
export const PORT = Number(process.env.PORT || "3000");

// SECRET
export const SECRET = process.env.SECRET || "keyboard cat";
