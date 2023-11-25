import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response)  => {
  try {
    const { user } = req.body;
    console.log(user);
    const result = await UserServices.createUserInDb(user);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error:error
    });
  }
};

export const UserControllers = {
    createUser
}