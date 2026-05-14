import Appointment from "../Appointment/appointment.model";

import Prescription from "./prescription.model";

// ======================================
// CREATE PRESCRIPTION
// ======================================

const createPrescription =
  async (
    payload: any
  ) => {
    const appointment =
      await Appointment.findById(
        payload.appointmentId
      );

    if (!appointment) {
      throw new Error(
        "Appointment not found"
      );
    }

    const existing =
      await Prescription.findOne(
        {
          appointment:
            payload.appointmentId,
        }
      );

    if (existing) {
      throw new Error(
        "Prescription already exists"
      );
    }

    const result =
      await Prescription.create(
        {
          appointment:
            appointment._id,

          doctor:
            appointment.doctor,

          patient:
            appointment.patient,

          medicines:
            payload.medicines,

          tests:
            payload.tests,
        }
      );

    return result;
  };

// ======================================
// UPDATE PRESCRIPTION
// ======================================

const updatePrescription =
  async (
    appointmentId: string,

    payload: any
  ) => {
    const prescription =
      await Prescription.findOne(
        {
          appointment:
            appointmentId,
        }
      );

    if (!prescription) {
      throw new Error(
        "Prescription not found"
      );
    }

    prescription.medicines =
      payload.medicines;

    prescription.tests =
      payload.tests;

    await prescription.save();

    return prescription;
  };

// ======================================
// GET PRESCRIPTION
// ======================================

const getPrescriptionByAppointment =
  async (
    appointmentId: string
  ) => {
    return await Prescription.findOne(
      {
        appointment:
          appointmentId,
      }
    );
  };

  // ======================================
// GET DOCTOR PRESCRIPTIONS
// ======================================

import Doctor from "../Doctor/doctor.model";

const getDoctorPrescriptions =
  async (
    userId: string
  ) => {
    // FIND DOCTOR

    const doctor =
      await Doctor.findOne({
        user: userId,
      });

    if (!doctor) {
      throw new Error(
        "Doctor not found"
      );
    }

    // FIND PRESCRIPTIONS

    return await Prescription.find(
      {
        doctor:
          doctor._id,
      }
    )
      .populate({
        path: "patient",

        populate: {
          path: "user",
        },
      })
      .sort({
        createdAt: -1,
      });
  };

  // ======================================
// GET PATIENT PRESCRIPTIONS
// ======================================

import Patient from "../Patient/patient.model";

const getPatientPrescriptions =
  async (
    userId: string
  ) => {
    // FIND PATIENT

    const patient =
      await Patient.findOne({
        user: userId,
      });

    if (!patient) {
      throw new Error(
        "Patient not found"
      );
    }

    // FIND PRESCRIPTIONS

    return await Prescription.find(
      {
        patient:
          patient._id,
      }
    )
      .populate({
        path: "doctor",

        populate: {
          path: "user",
        },
      })
      .populate({
        path: "patient",

        populate: {
          path: "user",
        },
      })
      .sort({
        createdAt: -1,
      });
  };

export const PrescriptionServices =
  {
    createPrescription,

    updatePrescription,

    getPrescriptionByAppointment,

    getDoctorPrescriptions,

    getPatientPrescriptions,
  };