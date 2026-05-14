import {
  Request,
  Response,
} from "express";

import { AuthServices } from "./auth.service";

import generateToken from "../../utils/generateToken";

// ======================================
// REGISTER
// ======================================

const register = async (
  req: Request,
  res: Response
) => {
  try {
    const user =
      await AuthServices.registerUser(
        req.body
      );

    res.status(201).json({
      success: true,

      message:
        "Registration successful",

      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error.message,
    });
  }
};

// ======================================
// LOGIN
// ======================================

const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } =
      req.body;

    // LOGIN USER

    const user =
      await AuthServices.loginUser(
        email,
        password
      );

    // GENERATE TOKEN

    const token =
      generateToken({
        _id:
          user._id.toString(),

        email: user.email,

        role: user.role,
      });

    // RESPONSE

    res.status(200).json({
      success: true,

      message:
        "Login successful",

      token,

      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error.message,
    });
  }
};

export const AuthControllers = {
  register,
  login,
};