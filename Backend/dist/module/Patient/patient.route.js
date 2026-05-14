"use strict";
// ======================================
// patient.route.ts
// ======================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRoutes = void 0;
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("./patient.controller");
const router = express_1.default.Router();
// CREATE PATIENT
router.post("/create-patient", patient_controller_1.PatientControllers.createPatient);
// GET ALL PATIENTS
router.get("/", patient_controller_1.PatientControllers.getAllPatients);
// GET SINGLE PATIENT
router.get("/:id", patient_controller_1.PatientControllers.getSinglePatient);
// UPDATE PATIENT
router.patch("/:id", patient_controller_1.PatientControllers.updatePatient);
exports.PatientRoutes = router;
