import type {
  CreateRequestBody,
  PushAssetType,
  FieldsToUpdate,
  Update,
} from "../types/unit";

import { time } from "../utils/constants.util";
import { Unit } from "../mongo/models";
import AppLog from "../events/AppLog";

export async function create(data: CreateRequestBody) {
  const result = await new Unit(data).save({
    validateBeforeSave: false,
  });

  AppLog({ type: "Repository", text: "Unit instance inserted" });
  return result;
}

export async function pushAsset(unitName: string, asset: PushAssetType) {
  AppLog({ type: "Repository", text: "Push asset into Unit" });

  return await Unit.updateOne(
    { name: unitName },
    { $push: { assets: asset }, last_update: time.CURRENT_TIME },
  ).exec();
}

export async function updateOne(data: Update) {
  const { id, body } = data;

  const fieldsToUpdate: FieldsToUpdate = {};

  __sanitizeObject();

  AppLog({ type: "Repository", text: "Update Unit" });
  return await Unit.findByIdAndUpdate(id, {
    ...fieldsToUpdate,
    last_update: time.CURRENT_TIME,
  }).exec();

  function __sanitizeObject() {
    for (const [key, value] of Object.entries(body)) {
      if (!value) continue;
      fieldsToUpdate[key] = value;
    }
  }
}

export async function deleteOne(id: string) {
  AppLog({ type: "Repository", text: "Delete Unit instance" });
  return await Unit.findByIdAndDelete(id).exec();
}
