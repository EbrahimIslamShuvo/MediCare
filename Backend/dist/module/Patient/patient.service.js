"use strict";
// ======================================
// patient.service.ts
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientServices = void 0;
const patient_model_1 = __importDefault(require("./patient.model"));
const user_model_1 = __importDefault(require("../User/user.model"));
// CREATE PATIENT
const createPatient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield patient_model_1.default.create(payload);
    return result;
});
// GET ALL PATIENTS
const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield patient_model_1.default.find().populate("user");
    return result;
});
// GET SINGLE PATIENT
const getSinglePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield patient_model_1.default.findById(id).populate("user");
    return result;
});
// UPDATE PATIENT
const updatePatient = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // USER DATA
    const userData = {
        name: payload.name,
        email: payload.email,
    };
    // PATIENT DATA
    const patientData = {
        phone: payload.phone,
        gender: payload.gender,
        bloodGroup: payload.bloodGroup,
        age: payload.age,
        address: payload.address,
        emergencyContact: payload.emergencyContact,
    };
    // FIND PATIENT
    const patient = yield patient_model_1.default.findById(id);
    if (!patient) {
        throw new Error("Patient not found");
    }
    // UPDATE USER
    yield user_model_1.default.findByIdAndUpdate(patient.user, userData, {
        new: true,
    });
    // UPDATE PATIENT
    const result = yield patient_model_1.default.findByIdAndUpdate(id, patientData, {
        new: true,
    }).populate("user");
    return result;
});
exports.PatientServices = {
    createPatient,
    getAllPatients,
    getSinglePatient,
    updatePatient,
};
