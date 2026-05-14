// ======================================
// labTest.controller.ts
// ======================================

import type {
  Request,
  Response,
} from "express";

import { LabTestServices } from "./labTest.service";

// ======================================
// CREATE BOOKING
// ======================================

const createLabTestBooking =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LabTestServices.createLabTestBooking(
          req.body
        );

      res.status(201).json({
        success: true,

        url: result.url,
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
// SUCCESS PAYMENT
// ======================================

const successPayment =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const tran_id =
        req.body.tran_id;

      await LabTestServices.successPayment(
        tran_id
      );

      res.redirect(
        "http://localhost:5173/dashboard/patient/lab-reports"
      );
    } catch (
      error
    ) {
      console.log(
        error
      );
    }
  };

// ======================================
// FAIL PAYMENT
// ======================================

const failPayment =
  async (
    req: Request,
    res: Response
  ) => {
    res.redirect(
      "http://localhost:5173/payment-failed"
    );
  };

// ======================================
// GET PATIENT LAB TESTS
// ======================================

const getPatientLabTests =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LabTestServices.getPatientLabTests(
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

// ======================================
// GET ALL LAB TESTS
// ======================================

const getAllLabTests =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LabTestServices.getAllLabTests();

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
// UPDATE STATUS
// ======================================

const updateLabTestStatus =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LabTestServices.updateLabTestStatus(
          req.params.id as string,

          req.body.status
        );

      res.status(200).json({
        success: true,

        message:
          "Status updated successfully",

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
// COMPLETE TEST
// ======================================

const completeLabTest =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const file =
        req.file;

      if (!file) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Please upload report PDF",
          });
      }

      const report = `/uploads/reports/${file.filename}`;

      const result =
        await LabTestServices.completeLabTest(
          req.params.id as string,

          report
        );

      res.status(200).json({
        success: true,

        message:
          "Lab report uploaded successfully",

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
// DOCTOR REPORTS
// ======================================

const getDoctorLabReports =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const result =
        await LabTestServices.getDoctorLabReports(
          req.params
            .doctorId as string
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

export const LabTestControllers =
  {
    createLabTestBooking,

    successPayment,

    failPayment,

    getPatientLabTests,

    getAllLabTests,

    updateLabTestStatus,

    completeLabTest,

    getDoctorLabReports,
  };