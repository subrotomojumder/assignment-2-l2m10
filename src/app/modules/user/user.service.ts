import { UserModel } from "../user.model";
import { IUser } from "./user.interface";

const createUserInDb = async (userData: IUser): Promise<IUser> => {
  const result = await UserModel.create(userData);
  return result;
};
const getAllUserInDb = async () => {
  const result = await UserModel.find(
    {},
    {
        _id: 0,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    }
  );
  return result;
};

export const UserServices = {
  createUserInDb,
  getAllUserInDb,
};
