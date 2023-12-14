import { Request, Response } from "express";
import { UserServices } from "./user.service";
import AppError from "../../utils/AppError";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createUserInDb(req.body);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error:
        error instanceof AppError ? { code: error.statusCode, description: error.message } : error,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserInDb();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error:  error instanceof AppError ? { code: error.statusCode, description: error.message } : error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserInDb(Number(userId));
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error:  error instanceof AppError ? { code: error.statusCode, description: error.message } : error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { body, params } = req;
    const result = await UserServices.updateUserInDb(
      Number(params.userId),
      body
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error:  error instanceof AppError ? { code: error.statusCode, description: error.message } : error,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserInDb(Number(userId));
    res.status(200).json({
      success: true,
      message: "User successfully deleted!",
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error:  error instanceof AppError ? { code: error.statusCode, description: error.message } : error,
    });
  }
};
const orderAddOfUser = async (req: Request, res: Response) => {
  try {
    const { body, params } = req;
    await UserServices.userOrderAddInDb(Number(params.userId), body);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error:  error instanceof AppError ? { code: error.statusCode, description: error.message } : error,
    });
  }
};
const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getOrdersByUserIdInDb(Number(userId));
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error:  error instanceof AppError ? { code: error.statusCode, description: error.message } : error,
    });
  }
};
const getSumOfUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSumUserOrdersIdInDb(Number(userId));
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong!",
      error:  error instanceof AppError ? { code: error.statusCode, description: error.message } : error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  orderAddOfUser,
  getOrdersByUserId,
  getSumOfUserOrders,
};
