import mongoose from "mongoose";

import AppLog from "./../events/AppLog";
import "./setup";

const connectionString = process.env?.DATABASE_URL ?? "";
const options = {};

export default async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, options);
  } catch (error) {
    AppLog({
      type: "Error",
      text: `Interal error whilte connecting to database | ${error}`,
    });
  }
  AppLog({ type: "Server", text: "Connected to database" });
}
