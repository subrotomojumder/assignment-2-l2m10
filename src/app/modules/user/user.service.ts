import { User } from "../user.model";
import { IUser } from "./user.interface";

const createUserInDb = async (userData: IUser): Promise<IUser> => {
  const result = await User.create(userData);
  return result;
};
const getAllUserInDb = async () => {
  const result = await User.find(
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
const getSingleUserInDb = async (id: number): Promise<IUser | null> => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id }, { orders: 0 });
    return result;
  } else {
    throw new Error("User not found!");
  }
};
const updateUserInDb = async (
  id: number,
  updateData: IUser
): Promise<IUser | null> => {
  if (await User.isUserExists(id)) {
    const result = await User.findOneAndUpdate({ userId: id }, updateData);
    return result;
  } else {
    throw new Error("User not found!");
  }
};
export const UserServices = {
  createUserInDb,
  getAllUserInDb,
  getSingleUserInDb,
  updateUserInDb,
};
