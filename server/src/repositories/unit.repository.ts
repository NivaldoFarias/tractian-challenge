import type {
  CreateRequestBody,
  FieldsToUpdate,
  Update,
  DeleteOne,
  PushAsset,
} from "../types/unit";

import { time } from "../utils/constants.util";
import { Unit } from "../mongo/models";
import AppLog from "../events/AppLog";
import { NonNullCompanyDocument } from "../types/collections";

export async function create(data: CreateRequestBody) {
  const result = await new Unit(data).save({
    validateBeforeSave: false,
  });

  AppLog({ type: "Repository", text: "Unit instance inserted" });
  return result;
}

export async function pushAsset({ id, asset, company }: PushAsset) {
  AppLog({ type: "Repository", text: "Push asset into Unit" });

  const unit = __findUnit(company, id);
  if (!unit) return false;

  unit.assets.push(asset);

  const [single, nested] = await Promise.all([
    Unit.findByIdAndUpdate(id, {
      $push: { assets: asset },
      last_update: time.CURRENT_TIME,
    }).exec(),
    company.save(),
  ]);

  if (!single || !nested) return false;

  return true;
}

export async function updateOne(data: Update) {
  const { id, body, company } = data;
  const fieldsToUpdate: FieldsToUpdate = {};

  __sanitizeObject();

  AppLog({ type: "Repository", text: "Update Unit" });
  const unit = __findUnit(company, id);
  if (!unit) return false;

  unit.set({ ...fieldsToUpdate, last_update: time.CURRENT_TIME });

  const [single, nested] = await Promise.all([
    Unit.findByIdAndUpdate(id, {
      ...fieldsToUpdate,
      last_update: time.CURRENT_TIME,
    }).exec(),
    company.save(),
  ]);

  if (!single || !nested) return false;

  return true;

  function __sanitizeObject() {
    for (const [key, value] of Object.entries(body)) {
      if (!value) continue;
      fieldsToUpdate[key] = value;
    }
  }
}

export async function deleteOne(data: DeleteOne) {
  const { id, company } = data;

  const unit = __findUnit(company, id);
  if (!unit) return false;

  unit.remove();

  const [single, nested] = await Promise.all([
    Unit.findByIdAndDelete(id).exec(),
    company.save(),
  ]);

  if (!single || !nested) return false;

  AppLog({ type: "Repository", text: "Delete Unit instance" });
  return true;
}

function __findUnit(company: NonNullCompanyDocument, id: string) {
  return company.units.find((unit) => unit._id?.toString() === id);
}
