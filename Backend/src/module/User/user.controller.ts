// ======================================
// user.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { UserServices } from "./user.service";

// GET ALL USERS

const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await UserServices.getAllUsers();

    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

// GET SINGLE USER

const getSingleUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await UserServices.getSingleUser(
        id as string
      );

    res.status(200).json({
      success: true,

      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

// UPDATE USER

const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await UserServices.updateUser(
        id as string,
        req.body
      );

    res.status(200).json({
      success: true,

      message:
        "User updated successfully",

      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

export const UserControllers = {
  getAllUsers,

  getSingleUser,

  updateUser,
};