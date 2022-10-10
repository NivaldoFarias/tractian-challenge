import type { CreateUser, UpdateOne } from "../types/user";

import { User } from "../mongo/models";
import AppLog from "../events/AppLog";
import { time } from "../utils/constants.util";

type UpdateOneData = Required<Omit<UpdateOne, "company">> & {
  id: string;
};

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
  const { id, full_name, username } = data;

  AppLog({ type: "Repository", text: "Update User instance" });
  return await User.updateOne(
    { _id: id },
    { full_name, username, last_update: time.CURRENT_TIME },
  );
}

export async function deleteOne(id: string) {
  AppLog({ type: "Repository", text: "Delete User instance" });
  return await User.findByIdAndDelete(id).exec();
}
