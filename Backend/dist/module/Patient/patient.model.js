"use strict";
// ======================================
// patient.model.ts
// ======================================
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        enum: [
            "Male",
            "Female",
            "Other",
        ],
        default: "Male",
    },
    bloodGroup: {
        type: String,
        enum: [
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-",
        ],
        default: "A+",
    },
    age: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        default: "",
    },
    emergencyContact: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});
const Patient = (0, mongoose_1.model)("Patient", patientSchema);
exports.default = Patient;
