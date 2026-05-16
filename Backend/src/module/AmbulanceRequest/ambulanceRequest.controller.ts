import type {
  Request,
  Response,
} from "express";

import { AmbulanceRequestServices } from "./ambulanceRequest.service";

// ======================================
// CREATE REQUEST
// ======================================

const createRequest =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AmbulanceRequestServices.createRequest(
          req.body
        );

      res.status(201).json({
        success: true,

        message:
          "Ambulance request created successfully",

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

// ======================================
// GET ALL REQUESTS
// ======================================

const getAllRequests =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AmbulanceRequestServices.getAllRequests();

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

// ======================================
// ASSIGN AMBULANCE
// ======================================

const assignAmbulance =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AmbulanceRequestServices.assignAmbulance(
          req.params.id as string,

          req.body.ambulanceId
        );

      res.status(200).json({
        success: true,

        message:
          "Ambulance assigned successfully",

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

// ======================================
// COMPLETE REQUEST
// ======================================

const completeRequest =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AmbulanceRequestServices.completeRequest(
          req.params.id as string
        );

      res.status(200).json({
        success: true,

        message:
          "Request completed successfully",

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

  // ======================================
// GET PATIENT REQUESTS
// ======================================

const getPatientRequests =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await AmbulanceRequestServices.getPatientRequests(
          req.params.userId as string
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

export const AmbulanceRequestControllers =
  {
    createRequest,

    getAllRequests,

    assignAmbulance,

    completeRequest,

    getPatientRequests,
  };