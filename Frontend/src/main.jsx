import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// =====================================
// LAYOUTS
// =====================================

import Root from "./Layout/Root";

import DashboardLayout from "./Layout/DashboardLayout";

// =====================================
// WEBSITE PAGES
// =====================================

import Home from "./Pages/Website/Home/Home";

import Contact from "./Pages/Website/Contact/Contact";

import Register from "./Pages/Website/Register/Register";

// =====================================
// PROTECTED ROUTES
// =====================================

import AdminRoute from "./Routes/AdminRoute";

import DoctorRoute from "./Routes/DoctorRoute";

import PatientRoute from "./Routes/PatientRoute";

import NurseRoute from "./Routes/NurseRoute";

import ReceptionistRoute from "./Routes/ReceptionistRoute";

import LaboratoristRoute from "./Routes/LaboratoristRoute";
import Admin from "./Pages/Dashboard/Admin/Admin";
import Doctor from "./Pages/Dashboard/Doctor/Doctor";
import Patient from "./Pages/Dashboard/Patient/Patient";
import Nurse from "./Pages/Dashboard/Nurse/Nurse";
import Receptionist from "./Pages/Dashboard/Receptionist/Receptionist";
import Laboratorist from "./Pages/Dashboard/Laboratorist/Laboratorist";
import Login from "./Pages/Website/Login/Login";
import StaffList from "./Pages/Dashboard/Admin/Pages/StaffList";
import Patients from "./Pages/Dashboard/Admin/Pages/Patients";
import Appointments from "./Pages/Dashboard/Admin/Pages/Appointments";
import BedWords from "./Pages/Dashboard/Admin/Pages/BedWords";
import Laboratory from "./Pages/Dashboard/Admin/Pages/Laboratory";
import Billing from "./Pages/Dashboard/Admin/Pages/Billing";
import Ambulancee from "./Pages/Dashboard/Admin/Pages/Ambulancee";
import Inventory from "./Pages/Dashboard/Admin/Pages/Inventory";
import Reports from "./Pages/Dashboard/Admin/Pages/Reports";
import Profile from "./Pages/Dashboard/Admin/Pages/Profile";
import Doctors from "./Pages/Dashboard/Patient/Pages/Doctors";
import AppointmentsPatients from "./Pages/Dashboard/Patient/Pages/AppointmentsPatients";
import MedicalReports from "./Pages/Dashboard/Patient/Pages/MedicalReports";
import LabReports from "./Pages/Dashboard/Patient/Pages/LabReports";
import Prescrption from "./Pages/Dashboard/Patient/Pages/Prescrption";
import BillPayment from "./Pages/Dashboard/Patient/Pages/BillPayment";
import AmbulanceRequest from "./Pages/Dashboard/Patient/Pages/AmbulanceRequest";
import ProfilePatient from "./Pages/Dashboard/Patient/Pages/ProfilePatient";
import MyPatient from "./Pages/Dashboard/Doctor/Pages/MyPatient";
import MyAppointment from "./Pages/Dashboard/Doctor/Pages/MyAppointment";
import MyPrescription from "./Pages/Dashboard/Doctor/Pages/MyPrescription";
import MyLabReport from "./Pages/Dashboard/Doctor/Pages/MyLabReport";
import MySchedule from "./Pages/Dashboard/Doctor/Pages/MySchedule";
import DoctorProfile from "./Pages/Dashboard/Doctor/Pages/DoctorProfile";
import About from "./Pages/Website/About/About";
import AllDoctor from "./Pages/Website/Doctor/AllDoctor";
import DoctorSingle from "./Pages/Website/Doctor/DoctorSingle";
import LabrotoristProfile from "./Pages/Dashboard/Laboratorist/Pages/LabrotoristProfile";
import ReportHistory from "./Pages/Dashboard/Laboratorist/Pages/ReportHistory";
import TestRequestion from "./Pages/Dashboard/Laboratorist/Pages/TestRequestion";
 
// =====================================
// ROUTER
// =====================================

const router =
  createBrowserRouter([
    // =====================================
    // WEBSITE ROUTES
    // =====================================

    {
      path: "/",

      element: <Root />,

      children: [
        {
          path: "/",

          element: <Home />,
        },
        {
          path: "/doctor",

          element: <AllDoctor />,
        },
        {
          path: "/doctor/:id",

          element: <DoctorSingle />,
        },

        {
          path: "/contact",

          element: <Contact />,
        },
        {
          path: "/about",

          element: <About />,
        },

        {
          path: "/register",

          element: <Register />,
        },

        {
          path: "/login",

          element: <Login />,
        },
      ],
    },

    // =====================================
    // DASHBOARD LAYOUT
    // =====================================

    {
      path: "/dashboard",

      element: <DashboardLayout />,

      children: [

        // =====================================
        // ADMIN ROUTES
        // =====================================

        {
          path: "admin",

          element: (
            <AdminRoute>
              <Admin/>
            </AdminRoute>
          ),
        },
        {
          path: "staff",

          element: (
            <AdminRoute>
              <StaffList/>
            </AdminRoute>
          ),
        },
        {
          path: "patients",

          element: (
            <AdminRoute>
              <Patients/>
            </AdminRoute>
          ),
        },
        {
          path: "appointments",

          element: (
            <AdminRoute>
              <Appointments/>
            </AdminRoute>
          ),
        },
        {
          path: "beds",

          element: (
            <AdminRoute>
              <BedWords/>
            </AdminRoute>
          ),
        },
        {
          path: "laboratory",

          element: (
            <AdminRoute>
              <Laboratory/>
            </AdminRoute>
          ),
        },
        {
          path: "billing",

          element: (
            <AdminRoute>
              <Billing/>
            </AdminRoute>
          ),
        },
        {
          path: "ambulance",

          element: (
            <AdminRoute>
              <Ambulancee/>
            </AdminRoute>
          ),
        },
        {
          path: "inventory",

          element: (
            <AdminRoute>
              <Inventory/>
            </AdminRoute>
          ),
        },
        {
          path: "reports",

          element: (
            <AdminRoute>
              <Reports/>
            </AdminRoute>
          ),
        },
        {
          path: "profile",

          element: (
            <AdminRoute>
              <Profile/>
            </AdminRoute>
          ),
        },

        // =====================================
        // DOCTOR ROUTES
        // =====================================

        {
          path: "doctor",

          element: (
            <DoctorRoute>
              <Doctor />
            </DoctorRoute>
          ),
        },
        {
          path: "doctor/my-patients",

          element: (
            <DoctorRoute>
              <MyPatient />
            </DoctorRoute>
          ),
        },
        {
          path: "doctor/my-appointments",

          element: (
            <DoctorRoute>
              <MyAppointment />
            </DoctorRoute>
          ),
        },
        {
          path: "doctor/prescription",

          element: (
            <DoctorRoute>
              <MyPrescription />
            </DoctorRoute>
          ),
        },
        {
          path: "doctor/lab-reports",

          element: (
            <DoctorRoute>
              <MyLabReport />
            </DoctorRoute>
          ),
        },
        {
          path: "doctor/schedule",

          element: (
            <DoctorRoute>
              <MySchedule />
            </DoctorRoute>
          ),
        },
        {
          path: "doctor/profile",

          element: (
            <DoctorRoute>
              <DoctorProfile />
            </DoctorRoute>
          ),
        },

        // =====================================
        // PATIENT ROUTES
        // =====================================

        {
          path: "patient",

          element: (
            <PatientRoute>
              <Patient />
            </PatientRoute>
          ),
        },
        {
          path: "patient/doctors",

          element: (
            <PatientRoute>
              <Doctors />
            </PatientRoute>
          ),
        },
        {
          path: "patient/appointments",

          element: (
            <PatientRoute>
              <AppointmentsPatients />
            </PatientRoute>
          ),
        },
        {
          path: "patient/medical-records",

          element: (
            <PatientRoute>
              <MedicalReports />
            </PatientRoute>
          ),
        },
        {
          path: "patient/lab-reports",

          element: (
            <PatientRoute>
              <LabReports />
            </PatientRoute>
          ),
        },
        {
          path: "patient/prescription",

          element: (
            <PatientRoute>
              <Prescrption />
            </PatientRoute>
          ),
        },
        {
          path: "patient/payment",

          element: (
            <PatientRoute>
              <BillPayment />
            </PatientRoute>
          ),
        },
        {
          path: "patient/ambulance",

          element: (
            <PatientRoute>
              <AmbulanceRequest />
            </PatientRoute>
          ),
        },
        {
          path: "patient/profile",

          element: (
            <PatientRoute>
              <ProfilePatient />
            </PatientRoute>
          ),
        },

        // =====================================
        // NURSE ROUTES
        // =====================================

        {
          path: "nurse",

          element: (
            <NurseRoute>
              <Nurse />
            </NurseRoute>
          ),
        },

        // =====================================
        // RECEPTIONIST ROUTES
        // =====================================

        {
          path:
            "receptionist",

          element: (
            <ReceptionistRoute>
              <Receptionist />
            </ReceptionistRoute>
          ),
        },

        // =====================================
        // LABORATORIST ROUTES
        // =====================================

        {
          path:
            "laboratorist",

          element: (
            <LaboratoristRoute>
              <Laboratorist />
            </LaboratoristRoute>
          ),
        },
        {
          path:
            "laboratorist",

          element: (
            <LaboratoristRoute>
              <Laboratorist />
            </LaboratoristRoute>
          ),
        },
        {
          path:
            "labrotory/profile",

          element: (
            <LaboratoristRoute>
              <LabrotoristProfile />
            </LaboratoristRoute>
          ),
        },
        {
          path:
            "labrotory/report-history",

          element: (
            <LaboratoristRoute>
              <ReportHistory />
            </LaboratoristRoute>
          ),
        },
        {
          path:
            "labrotory/test-request",

          element: (
            <LaboratoristRoute>
              <TestRequestion />
            </LaboratoristRoute>
          ),
        },
      ],
    },
  ]);

// =====================================
// RENDER
// =====================================

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <RouterProvider
      router={router}
    />
  </StrictMode>
);