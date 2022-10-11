import type {
  CreateUser,
  DeleteOne,
  FieldsToUpdate,
  UpdateOneData,
} from "../types/user";

import { User } from "../mongo/models";
import AppLog from "../events/AppLog";
import { time } from "../utils/constants.util";
import { NonNullCompanyDocument } from "../types/collections";

export async function create(data: Omit<CreateUser, "company">) {
  const { full_name, username, password } = data;

  const result = await new User({
    full_name,
    username,
    password,
  }).save({
    validateBeforeSave: false,
  });

  AppLog({ type: "Repository", text: "User instance inserted" });
  return result;
}

export async function updateOne(data: UpdateOneData) {
  const { id, body, company } = data;
  const fieldsToUpdate: FieldsToUpdate = {};

  __sanitizeObject();

  AppLog({ type: "Repository", text: "Update User" });
  const user = __findUser(company, id);
  if (!user) return false;

  user.set({ ...fieldsToUpdate, last_update: time.CURRENT_TIME });

  const [single, nested] = await Promise.all([
    User.findByIdAndUpdate(id, {
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

  const user = __findUser(company, id);
  if (!user) return false;

  user.remove();

  const [single, nested] = await Promise.all([
    User.findByIdAndDelete(id).exec(),
    company.save(),
  ]);

  if (!single || !nested) return false;

  AppLog({ type: "Repository", text: "Delete User instance" });
  return true;
}

function __findUser(company: NonNullCompanyDocument, id: string) {
  return company.users.find((user) => user._id?.toString() === id);
}
