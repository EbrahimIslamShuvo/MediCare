import { Types } from "mongoose";

export interface IAdmin {
  user: Types.ObjectId;

  phone?: string;

  address?: string;

  designation?: string;
}