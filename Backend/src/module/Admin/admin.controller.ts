// ======================================
// admin.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { AdminServices } from "./admin.service";

// CREATE ADMIN

const createAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await AdminServices.createAdmin(
        req.body
      );

    res.status(201).json({
      success: true,

      message:
        "Admin created successfully",

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error.message,
    });
  }
};

// GET ALL ADMINS

const getAllAdmins =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AdminServices.getAllAdmins();

      res.status(200).json({
        success: true,

        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// GET SINGLE ADMIN

const getSingleAdmin =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const result =
        await AdminServices.getSingleAdmin(
          id as string
        );

      res.status(200).json({
        success: true,

        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,

        message:
          error.message,
      });
    }
  };

// UPDATE ADMIN

const updateAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await AdminServices.updateAdmin(
        id as string,
        req.body
      );

    res.status(200).json({
      success: true,

      message:
        "Admin updated successfully",

      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message:
        error.message,
    });
  }
};

export const AdminControllers =
  {
    createAdmin,

    getAllAdmins,

    getSingleAdmin,

    updateAdmin,
  };