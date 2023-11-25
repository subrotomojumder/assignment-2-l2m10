import { Schema, model } from "mongoose";
import { IAddress, IFullName, IOrder, IUser } from "./user/user.interface";

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

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: [true, "userId is required!"],
    unique: true,
  },
  username: {
    type: String,
    required: true,
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
    required: true,
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

export const UserModel = model<IUser>("User", userSchema);
