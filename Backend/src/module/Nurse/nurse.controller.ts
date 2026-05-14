// ======================================
// nurse.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { NurseServices } from "./nurse.service";

// CREATE NURSE

const createNurse = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await NurseServices.createNurse(
        req.body
      );

    res.status(201).json({
      success: true,

      message:
        "Nurse created successfully",

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

// GET ALL NURSES

const getAllNurses =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await NurseServices.getAllNurses();

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

// GET SINGLE NURSE

const getSingleNurse =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const result =
        await NurseServices.getSingleNurse(
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

// UPDATE NURSE

const updateNurse = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const result =
      await NurseServices.updateNurse(
        id as string,
        req.body
      );

    res.status(200).json({
      success: true,

      message:
        "Nurse updated successfully",

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

export const NurseControllers =
  {
    createNurse,

    getAllNurses,

    getSingleNurse,

    updateNurse,
  };