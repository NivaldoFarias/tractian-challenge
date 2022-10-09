import { Request, Response } from "express";

import AppLog from "./events/AppLog";
import app from "./app";
import "./config/setup";
import connectToDatabase from "./config/database";

const PORT = process.env.PORT || 5000;

app.get("/", async (_req: Request, res: Response) => res.send("Online"));
app.listen(PORT, async () => {
  await connectToDatabase();
  AppLog({ type: "Server", text: `Running on port ${PORT}` });
});
