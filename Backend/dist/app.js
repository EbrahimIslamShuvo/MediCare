"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = require("./module/Auth/auth.route");
const patient_route_1 = require("./module/Patient/patient.route");
const app = (0, express_1.default)();
// MIDDLEWARE
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ROUTES
app.use("/api/v1/auth", auth_route_1.AuthRoutes);
app.use("/api/v1/patients", patient_route_1.PatientRoutes);
// TEST
app.get("/", (req, res) => {
    res.send("Server Running...");
});
exports.default = app;
