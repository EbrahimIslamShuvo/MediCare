import express from "express";

import cors from "cors";
import { AuthRoutes } from "./module/Auth/auth.route";
import { PatientRoutes } from "./module/Patient/patient.route";
import { AdminRoutes } from "./module/Admin/admin.route";
import { DoctorRoutes } from "./module/Doctor/doctor.route";
import { NurseRoutes } from "./module/Nurse/nurse.route";
import { LaboratoristRoutes } from "./module/Laboratorist/laboratorist.route";
import { ReceptionistRoutes } from "./module/Receptionist/receptionist.route";
import { UserRoutes } from "./module/User/user.route";
import path from "path";
import { AppointmentRoutes } from "./module/Appointment/appointment.route";
import { PaymentRoutes } from "./module/Payment/payment.route";
import { PrescriptionRoutes } from "./module/Prescription/prescription.route";
import { LabTestRoutes } from "./module/LabTest/labTest.route";
import { LaboratoryRoutes } from "./module/Labtatory/laboratory.route";


const app = express();

// MIDDLEWARE

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ROUTES

app.use(
  "/api/v1/auth",
  AuthRoutes
);

app.use(
  "/api/v1/patients",
  PatientRoutes
);


app.use(
  "/api/v1/admins",
  AdminRoutes
);


app.use(
  "/api/v1/doctors",
  DoctorRoutes
);


app.use(
  "/api/v1/nurses",
  NurseRoutes
);

app.use(
  "/api/v1/laboratorists",
  LaboratoristRoutes
);

app.use(
  "/api/v1/receptionists",
  ReceptionistRoutes
);

app.use(
  "/api/v1/users",
  UserRoutes
);

app.use(
  "/uploads",
  express.static(
    path.resolve(
      "src/uploads"
    )
  )
);

app.use(
  "/api/v1/appointments",
  AppointmentRoutes
);

app.use(
  "/api/v1/payment",
  PaymentRoutes
);

app.use(
  "/api/v1/prescriptions",
  PrescriptionRoutes
);

app.use(
  "/api/v1/lab-tests",
  LabTestRoutes
);

app.use(
  "/api/v1/laboratories",
  LaboratoryRoutes
);

// TEST

app.get("/", (req, res) => {
  res.send("Server Running...");
});

export default app;