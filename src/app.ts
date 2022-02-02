// app.ts
import express from "express";
import indexRouter from "./routes/index";

const app = express();

// Setup request body parser.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup routers.
app.use(indexRouter);

export default app;
