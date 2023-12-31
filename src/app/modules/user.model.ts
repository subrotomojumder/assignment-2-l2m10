import { Schema, model } from "mongoose";
import {
  IAddress,
  IFullName,
  IOrder,
  IUser,
  UserModel,
} from "./user/user.interface";
import config from "../config";
import bcrypt from "bcrypt";

const fullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    required: [true, "first name is required!"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last name is required!"],
    trim: true,
  },
});

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: [true, "city is required!"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "country is required!"],
    trim: true,
  },
});

const orderSchema = new Schema<IOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    required: [true, "userId is required!"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "username is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: fullNameSchema,
    required: [true, "name field is required!"],
  },
  age: {
    type: Number,
    required: [true, "age is required!"],
  },
  email: {
    type: String,
    required: [true, "email is required!"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: addressSchema,
    required: [true, "address is required!"],
  },
  orders: {
    type: [orderSchema],
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
// Exclude password field from response data
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
// static methods for user not existing warning
userSchema.statics.isUserExists = async function (id: number) {
  const existUser = User.findOne({ userId: id });
  return existUser;
};

export const User = model<IUser, UserModel>("User", userSchema);
