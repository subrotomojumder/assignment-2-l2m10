import { User } from "../user.model";
import { IOrder, IUser } from "./user.interface";

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
    const result = await User.findOneAndUpdate({ userId: id }, updateData, {
      new: true,
      runValidators: true,
    }).select("-orders");
    return result;
  } else {
    throw new Error("User not found!");
  }
};
const deleteUserInDb = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.deleteOne({ userId: id });
    return result;
  } else {
    throw new Error("User not found!");
  }
};

const userOrderAddInDb = async (id: number, orderData: IOrder) => {
  if (await User.isUserExists(id)) {
    const result = await User.updateOne(
      { userId: id },
      { $addToSet: { orders: orderData } },
      {
        runValidators: true,
      }
    );
    return result;
  } else {
    throw new Error("User not found!");
  }
};

const getOrdersByUserIdInDb = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = User.findOne({ userId: id }, { orders: 1 });
    return result;
  } else {
    throw new Error("User not found!");
  }
};
const getSumUserOrdersIdInDb = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = User.aggregate([
        {$match: {userId: id}},
    ])
    console.log(result);
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
  deleteUserInDb,
  userOrderAddInDb,
  getOrdersByUserIdInDb,
  getSumUserOrdersIdInDb,
};
