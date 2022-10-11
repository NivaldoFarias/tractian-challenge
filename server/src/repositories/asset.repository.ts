import type {
  CreateRequestBody,
  PushAssetType,
  FieldsToUpdate,
  Update,
  DeleteOne,
} from "../types/asset";

import { time } from "../utils/constants.util";
import { Asset } from "../mongo/models";
import AppLog from "../events/AppLog";
import {
  NonNullCompanyDocument,
  NonNullUnitDocument,
} from "../types/collections";

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
  const { asset_id, unit, body, company } = data;
  const fieldsToUpdate: FieldsToUpdate = {};

  __sanitizeObject();

  const [nestedAsset, subnestedAsset] = [
    __findAssetUnit(unit, asset_id),
    __findAssetCompany(company, unit._id?.toString(), asset_id),
  ];
  if (!nestedAsset || !subnestedAsset) return false;

  nestedAsset.set({ ...fieldsToUpdate, last_update: time.CURRENT_TIME });
  subnestedAsset.set({ ...fieldsToUpdate, last_update: time.CURRENT_TIME });

  const [result, nested, subnested] = await Promise.all([
    Asset.findByIdAndUpdate(asset_id, {
      ...fieldsToUpdate,
      last_update: time.CURRENT_TIME,
    }).exec(),
    await unit.save(),
    await company.save(),
  ]);

  if (!result || !nested || !subnested) return false;

  AppLog({ type: "Repository", text: "Update Asset" });
  return result;

  function __sanitizeObject() {
    for (const [key, value] of Object.entries(body)) {
      if (!value) continue;
      fieldsToUpdate[key] = value;
    }
  }
}

export async function deleteOne(data: DeleteOne) {
  const { id: asset_id, unit, company } = data;

  const [nestedAsset, subnestedAsset] = [
    __findAssetUnit(unit, asset_id),
    __findAssetCompany(company, unit._id?.toString(), asset_id),
  ];
  if (!nestedAsset || !subnestedAsset) return false;

  nestedAsset.remove();
  subnestedAsset.remove();

  const [result, nested, subnested] = await Promise.all([
    Asset.findByIdAndDelete(asset_id).exec(),
    unit.save(),
    company.save(),
  ]);

  if (!result || !nested || !subnested) return false;

  AppLog({ type: "Repository", text: "Update Asset" });
  return result;
}

function __findAssetUnit(unit: NonNullUnitDocument, id: string) {
  return unit.assets.find((asset) => asset._id?.toString() === id);
}

function __findAssetCompany(
  company: NonNullCompanyDocument,
  unit_id: string,
  id: string,
) {
  return company.units.find((unit) => {
    return (
      unit._id?.toString() === unit_id &&
      unit.assets.find((asset) => asset._id?.toString() === id)
    );
  });
}
