import type { CreateUser, FieldsToUpdate, UpdateOneData } from "../types/user";

import { User } from "../mongo/models";
import AppLog from "../events/AppLog";
import { time } from "../utils/constants.util";

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
  const { id, body } = data;

  const fieldsToUpdate: FieldsToUpdate = {};

  __sanitizeObject();

  AppLog({ type: "Repository", text: "Update User instance" });
  return await User.findByIdAndUpdate(id, {
    ...fieldsToUpdate,
    last_update: time.CURRENT_TIME,
  });

  function __sanitizeObject() {
    for (const [key, value] of Object.entries(body)) {
      if (!value) continue;
      fieldsToUpdate[key] = value;
    }
  }
}

export async function deleteOne(id: string) {
  AppLog({ type: "Repository", text: "Delete User instance" });
  return await User.findByIdAndDelete(id).exec();
}
