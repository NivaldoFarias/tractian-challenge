import type { APIModelsKeys } from "../types/collection";

import * as Model from "./../mongo/models";
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

export async function findByField({ field, value, model }: FindByField) {
  const searchKey =
    field === "name" || field === "username" ? new RegExp(value, "i") : value;

  AppLog({ type: "Repository", text: `Search ${model} by ${field}` });
  switch (model) {
    case "User":
      return await Model.User.findOne({ [field]: searchKey }).exec();
    case "Unit":
      return await Model.Unit.findOne({ [field]: searchKey }).exec();
    case "Asset":
      return await Model.Asset.findOne({ [field]: searchKey }).exec();
    case "Session":
      return await Model.Session.findOne({ [field]: searchKey }).exec();
    case "Company":
      return await Model.Company.findOne({ [field]: searchKey }).exec();
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
      return await Model.User.findById(id).exec();
    case "Unit":
      return await Model.Unit.findById(id).exec();
    case "Asset":
      return await Model.Asset.findById(id).exec();
    case "Session":
      return await Model.Session.findById(id).exec();
    case "Company":
      return await Model.Company.findById(id).exec();
    default:
      throw new AppError({
        statusCode: 500,
        message: "Internal Server Error",
        detail: "An unexpected error occurred while searching for the model",
      });
  }
}
