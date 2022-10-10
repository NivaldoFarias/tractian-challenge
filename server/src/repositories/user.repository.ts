import { CreateUser } from "../types/user";
import { User } from "../mongo/models";
import AppLog from "../events/AppLog";

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
