import type { CreateData, Update, PushIntoArray } from "../types/company";

import { Company } from "../mongo/models";
import AppLog from "../events/AppLog";
import { time } from "../utils/constants.util";

export async function create(data: CreateData) {
  const { name, apiKey } = data;
  await new Company({ name, "x-api-key": apiKey }).save({
    validateBeforeSave: false,
  });

  return AppLog({ type: "Repository", text: "Company instance inserted" });
}

export async function pushIntoArray({ id, data, array }: PushIntoArray) {
  const model = array === "users" ? "User" : "Unit";
  AppLog({
    type: "Repository",
    text: `Push ${model} into Company`,
  });

  const result = await Company.findByIdAndUpdate(id, {
    $push: { [array]: data },
    last_update: time.CURRENT_TIME,
  }).exec();
  return result;
}

export async function updateOne(data: Update) {
  const { id, name } = data;

  AppLog({ type: "Repository", text: "Update Company name" });
  const result = await Company.findByIdAndUpdate(id, {
    name,
    last_update: time.CURRENT_TIME,
  }).exec();
  return result;
}

export async function deleteOne(id: string) {
  AppLog({ type: "Repository", text: "Delete Company instance" });
  return await Company.findByIdAndDelete(id).exec();
}
