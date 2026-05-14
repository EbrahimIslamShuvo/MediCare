"use strict";
// ======================================
// patient.controller.ts
// ======================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientControllers = void 0;
const patient_service_1 = require("./patient.service");
// CREATE PATIENT
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield patient_service_1.PatientServices.createPatient(req.body);
        res.status(201).json({
            success: true,
            message: "Patient created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
// GET ALL PATIENTS
const getAllPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield patient_service_1.PatientServices.getAllPatients();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
// GET SINGLE PATIENT
const getSinglePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield patient_service_1.PatientServices.getSinglePatient(id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
// UPDATE PATIENT
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield patient_service_1.PatientServices.updatePatient(id, req.body);
        res.status(200).json({
            success: true,
            message: "Patient updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.PatientControllers = {
    createPatient,
    getAllPatients,
    getSinglePatient,
    updatePatient,
};
