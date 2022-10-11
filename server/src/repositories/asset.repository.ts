import type {
  CreateRequestBody,
  PushAssetType,
  FieldsToUpdate,
  Update,
} from "../types/asset";

import { time } from "../utils/constants.util";
import { Asset } from "../mongo/models";
import AppLog from "../events/AppLog";

export async function create(data: CreateRequestBody) {
  const result = await new Asset(data).save({
    validateBeforeSave: false,
  });

  AppLog({ type: "Repository", text: "Asset instance inserted" });
  return result;
}

export async function pushAsset(assetName: string, asset: PushAssetType) {
  AppLog({ type: "Repository", text: "Push asset into Asset" });

  return await Asset.updateOne(
    { name: assetName },
    { $push: { assets: asset }, last_update: time.CURRENT_TIME },
  ).exec();
}

export async function updateOne(data: Update) {
  const { id, body } = data;

  const fieldsToUpdate: FieldsToUpdate = {};

  __sanitizeObject();

  AppLog({ type: "Repository", text: "Update Asset" });
  return await Asset.findByIdAndUpdate(id, {
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
  AppLog({ type: "Repository", text: "Delete Asset instance" });
  return await Asset.findByIdAndDelete(id).exec();
}
