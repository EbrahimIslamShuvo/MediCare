// ======================================
// admitRequest.controller.ts
// ======================================

import type {
    Request,
    Response,
} from "express";

import {
    AdmitRequestServices,
} from "./admitRequest.service";

// CREATE

const createAdmitRequest =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await AdmitRequestServices.createAdmitRequest(
                    req.body
                );

            res.status(201).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// GET ALL

const getAllAdmitRequests =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await AdmitRequestServices.getAllAdmitRequests();

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ADMIT PATIENT

const admitPatient =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await AdmitRequestServices.admitPatient(
                    req.params.id as string,
                    req.body.room
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ADD DOCTOR VISIT

const addDoctorVisit =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await AdmitRequestServices.addDoctorVisit(
                    req.params.id as string,
                    req.body
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ADD MEDICINE

const addMedicine =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await AdmitRequestServices.addMedicine(
                    req.params.id as string,
                    req.body.medicines
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// ADD TEST REQUEST

const addTestRequest =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await AdmitRequestServices.addTestRequest(
                    req.params.id as string,
                    req.body.tests
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// UPDATE LAB TEST

const updateLabTestStatus =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            if (
                req.file
            ) {

                req.body.reportPdf =
                    `/uploads/reports/${req.file.filename}`;
            }

            const result =
                await AdmitRequestServices.updateLabTestStatus(
                    req.params.id as string,
                    Number(
                        req.params.index
                    ),
                    req.body
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            console.log(
                error
            );

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// RELEASE PREVIEW

const releasePatient =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await AdmitRequestServices.releasePatient(
                    req.params.id as string
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

// CONFIRM BILL

const confirmBill =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const result =
                await AdmitRequestServices.confirmBill(
                    req.params.id as string
                );

            res.status(200).json({
                success: true,
                data: result,
            });

        } catch (
            error: any
        ) {

            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

export const AdmitRequestControllers =
{
    createAdmitRequest,

    getAllAdmitRequests,

    admitPatient,

    addDoctorVisit,

    addMedicine,

    addTestRequest,

    updateLabTestStatus,

    releasePatient,

    confirmBill,
};