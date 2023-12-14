import AppError from "../../utils/AppError";
import passwordEncryptingFunc from "../../utils/passwordEncryptingFunc";
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
    throw new AppError(400, "User not found!");
  }
};
const updateUserInDb = async (
  id: number,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  if (!(await User.isUserExists(id))) {
    throw new AppError(400, "User not found!");
  }
  if (updateData.password) {
    updateData.password = await passwordEncryptingFunc(updateData.password);
  }
  const result = await User.findOneAndUpdate({ userId: id }, updateData, {
    new: true,
    runValidators: true,
  }).select("-orders");
  return result;
};
const deleteUserInDb = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.deleteOne({ userId: id });
    return result;
  } else {
    throw new AppError(400, "User not found!");
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
    throw new AppError(400, "User not found!");
  }
};

const getOrdersByUserIdInDb = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = User.findOne({ userId: id }, { orders: 1 });
    return result;
  } else {
    throw new AppError(400, "User not found!");
  }
};
const getSumUserOrdersIdInDb = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = User.aggregate([
      { $match: { userId: id } },
      { $unwind: { path: "$orders", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: 1,
        },
      },
    ]);
    return result;
  } else {
    throw new AppError(400, "User not found!");
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
