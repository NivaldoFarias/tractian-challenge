import type { APIModelsKeys, QueryParameters } from "../types/collections";
import type { SortOrder } from "mongoose";

import { User, Unit, Asset, Session, Company } from "./../mongo/models";
import AppError from "../config/error";
import AppLog from "../events/AppLog";

interface FindByField {
  field: string;
  value: string;
  model: APIModelsKeys;
}

interface FindById {
  id: string;
  model: APIModelsKeys;
}

interface SearchAll {
  queries: QueryParameters;
  model: APIModelsKeys;
}

export async function findByField({ field, value, model }: FindByField) {
  const searchKey =
    field === "name" || field === "username" ? new RegExp(value, "i") : value;

  AppLog({ type: "Repository", text: `Search ${model} by ${field}` });
  switch (model) {
    case "User":
      return await User.findOne({ [field]: searchKey }).exec();
    case "Unit":
      return await Unit.findOne({ [field]: searchKey }).exec();
    case "Asset":
      return await Asset.findOne({ [field]: searchKey }).exec();
    case "Session":
      return await Session.findOne({ [field]: searchKey }).exec();
    case "Company":
      return await Company.findOne({ [field]: searchKey }).exec();
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "The provided model does not exist",
      });
  }
}

export async function findById({ id, model }: FindById) {
  AppLog({ type: "Repository", text: `Search ${model} by ObjectId` });

  switch (model) {
    case "User":
      return await User.findById(id).exec();
    case "Unit":
      return await Unit.findById(id).exec();
    case "Asset":
      return await Asset.findById(id).exec();
    case "Session":
      return await Session.findById(id).exec();
    case "Company":
      return await Company.findById(id).exec();
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "An unexpected error occurred while searching for the model",
      });
  }
}

export async function searchAll({ queries, model }: SearchAll) {
  const { limit, sort_by, sort } = queries;

  const parsed = {
    limit: Number(limit) || 10,
    sort_by: sort_by ?? "created_at",
    sort: (sort?.toString() ?? "desc") as SortOrder,
  };

  AppLog({ type: "Repository", text: `Search all ${model}` });
  switch (model) {
    case "User":
      return await User.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec();
    case "Unit":
      return await Unit.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec();
    case "Asset":
      return await Asset.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec();
    case "Session":
      return await Session.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec();
    case "Company":
      return await Company.find()
        .limit(parsed.limit)
        .sort({ [parsed.sort_by]: parsed.sort })
        .exec();
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "An unexpected error occurred while searching for the model",
      });
  }
}

export async function deleteOne({ id, model }: FindById) {
  AppLog({ type: "Repository", text: `Delete ${model} by ObjectId` });

  switch (model) {
    case "User":
      return await User.findByIdAndDelete(id).exec();
    case "Unit":
      return await Unit.findByIdAndDelete(id).exec();
    case "Asset":
      return await Asset.findByIdAndDelete(id).exec();
    case "Session":
      return await Session.findByIdAndDelete(id).exec();
    case "Company":
      return await Company.findByIdAndDelete(id).exec();
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "An unexpected error occurred while searching for the model",
      });
  }
}
