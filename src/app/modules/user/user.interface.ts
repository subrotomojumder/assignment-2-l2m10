import { Model } from "mongoose";

export interface IFullName {
  firstName: string;
  lastName: string;
}
export interface IAddress {
  street: string;
  city: string;
  country: string;
}
export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}
export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: IAddress;
  orders: Array<IOrder>;
}

export interface UserModel extends Model<IUser> {
  isUserExists(id: number ): Promise<IUser | null>;
}
