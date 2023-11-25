import { UserModel } from "../user.model";
import { IUser } from "./user.interface";

const createUserInDb = async (userData: IUser) => {
  const result = await UserModel.create(userData);
  return result;
};

export const UserServices = {
  createUserInDb,
};
