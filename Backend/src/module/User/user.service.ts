// ======================================
// user.service.ts
// ======================================

import type { IUser } from "./user.interface";

import User from "./user.model";

// FIND USER BY EMAIL

const findUserByEmail = async (
  email: string
) => {
  return await User.findOne({
    email,
  });
};

// CREATE USER

const createUser = async (
  payload: IUser
) => {
  return await User.create(
    payload
  );
};

// GET ALL USERS

const getAllUsers = async () => {
  return await User.find();
};

// GET SINGLE USER

const getSingleUser = async (
  id: string
) => {
  return await User.findById(
    id
  );
};

// UPDATE USER

const updateUser = async (
  id: string,
  payload: Partial<IUser>
) => {
  return await User.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    }
  );
};

export const UserServices = {
  findUserByEmail,

  createUser,

  getAllUsers,

  getSingleUser,

  updateUser,
};