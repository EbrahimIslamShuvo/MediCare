// ======================================
// laboratorist.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { LaboratoristServices } from "./laboratorist.service";

// CREATE LABORATORIST

const createLaboratorist =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LaboratoristServices.createLaboratorist(
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Laboratorist created successfully",

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

// GET ALL LABORATORISTS

const getAllLaboratorists =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LaboratoristServices.getAllLaboratorists();

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

// GET SINGLE LABORATORIST

const getSingleLaboratorist =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const result =
        await LaboratoristServices.getSingleLaboratorist(
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

// UPDATE LABORATORIST

const updateLaboratorist =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const result =
        await LaboratoristServices.updateLaboratorist(
          id as string,
          req.body
        );

      res.status(200).json({
        success: true,

        message:
          "Laboratorist updated successfully",

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

export const LaboratoristControllers =
  {
    createLaboratorist,

    getAllLaboratorists,

    getSingleLaboratorist,

    updateLaboratorist,
  };