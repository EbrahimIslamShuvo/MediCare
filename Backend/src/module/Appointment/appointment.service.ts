// ======================================
// appointment.service.ts
// ======================================

import Appointment from "./appointment.model";

import Doctor from "../Doctor/doctor.model";

import Patient from "../Patient/patient.model";

import Prescription from "../Prescription/prescription.model";

// ======================================
// CREATE APPOINTMENT
// ======================================

const createAppointment =
  async (
    userId: string,
    payload: any
  ) => {
    const {
      doctorId,
      appointmentDate,
    } = payload;

    // PATIENT

    const patient =
      await Patient.findOne({
        user: userId,
      });

    if (!patient) {
      throw new Error(
        "Patient not found"
      );
    }

    // DOCTOR

    const doctor =
      await Doctor.findById(
        doctorId
      );

    if (!doctor) {
      throw new Error(
        "Doctor not found"
      );
    }

    // EXISTING

    const existingAppointments =
      await Appointment.find(
        {
          doctor:
            doctorId,

          appointmentDate,

          status: {
            $ne:
              "Cancelled",
          },
        }
      );

    // SLOT

    const start =
      Number(
        doctor.startTime?.split(
          ":"
        )[0]
      );

    const end =
      Number(
        doctor.endTime?.split(
          ":"
        )[0]
      );

    const totalMinutes =
      (end - start) *
      60;

    const totalSlots =
      Math.floor(
        totalMinutes / 20
      );

    // FULL

    if (
      existingAppointments.length >=
      totalSlots
    ) {
      throw new Error(
        "No slot available"
      );
    }

    // SERIAL

    const serialNumber =
      existingAppointments.length +
      1;

    // TIME

    const appointmentTime = `${start}:${
      serialNumber *
      20
    }`;

    // CREATE

    const result =
      await Appointment.create(
        {
          patient:
            patient._id,

          doctor:
            doctorId,

          appointmentDate,

          serialNumber,

          appointmentTime,

          paymentStatus:
            "Pending",

          status:
            "Pending",

          expiresAt:
            new Date(
              Date.now() +
                10 *
                  60 *
                  1000
            ),
        }
      );

    return result;
  };

// ======================================
// GET ALL
// ======================================

const getAllAppointments =
  async () => {
    return await Appointment.find()
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

// ======================================
// PATIENT APPOINTMENTS
// ======================================

const getMyAppointments =
  async (
    userId: string
  ) => {
    const patient =
      await Patient.findOne({
        user: userId,
      });

    if (!patient) {
      throw new Error(
        "Patient not found"
      );
    }

    return await Appointment.find(
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
      .sort({
        createdAt: -1,
      });
  };

// ======================================
// DOCTOR APPOINTMENTS
// ======================================

const getDoctorAppointments =
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

    // FIND APPOINTMENTS

    const appointments =
      await Appointment.find(
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

    // CHECK PRESCRIPTION

    const updatedAppointments =
      await Promise.all(
        appointments.map(
          async (
            appointment: any
          ) => {
            const prescription =
              await Prescription.findOne(
                {
                  appointment:
                    appointment._id,
                }
              );

            return {
              ...appointment.toObject(),

              hasPrescription:
                !!prescription,
            };
          }
        )
      );

    return updatedAppointments;
  };

// ======================================
// STAFF ALL APPOINTMENTS
// ======================================

const getAllAppointmentsForStaff =
  async () => {
    return await Appointment.find()
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

// ======================================
// CONFIRM PAYMENT
// ======================================

const confirmPayment =
  async (
    id: string
  ) => {
    return await Appointment.findByIdAndUpdate(
      id,
      {
        paymentStatus:
          "Paid",

        status:
          "Confirmed",
      },
      {
        new: true,
      }
    );
  };

export const AppointmentServices =
  {
    createAppointment,

    getAllAppointments,

    getMyAppointments,

    getDoctorAppointments,

    getAllAppointmentsForStaff,

    confirmPayment,
  };