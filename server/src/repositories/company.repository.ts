import type {
  CreateData,
  PushUserType,
  QueryParameters,
  Update,
} from "../types/Company";
import type { SortOrder } from "mongoose";

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

export async function searchAll(queries: QueryParameters) {
  const { limit, sort_by, sort } = queries;

  const parsed = {
    limit: Number(limit) || 50,
    sort_by: sort_by ?? "created_at",
    sort: (sort?.toString() ?? "desc") as SortOrder,
  };

  AppLog({ type: "Repository", text: "Search all Companies" });
  return await Company.find()
    .limit(parsed.limit)
    .sort({ [parsed.sort_by]: parsed.sort })
    .exec();
}

export async function pushUser(companyName: string, user: PushUserType) {
  AppLog({ type: "Repository", text: "Push user into Company" });

  const result = await Company.updateOne(
    { name: companyName },
    { $push: { users: user }, last_update: time.CURRENT_TIME },
  ).exec();
  return result;
}

export async function searchById(id: string) {
  AppLog({ type: "Repository", text: "Search Company by ObjectId" });
  return await Company.findById(id).exec();
}

export async function updateOne(data: Update) {
  const { id, name } = data;

  AppLog({ type: "Repository", text: "Update Company name" });
  const result = await Company.updateOne(
    { _id: id },
    { name, last_update: time.CURRENT_TIME },
  ).exec();
  return result;
}

export async function deleteOne(id: string) {
  AppLog({ type: "Repository", text: "Delete Company by ObjectId" });
  const result = await Company.findByIdAndDelete(id).exec();
  return result;
}
