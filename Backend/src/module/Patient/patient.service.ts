// ======================================
// patient.service.ts
// ======================================


import Patient from "./patient.model";

import User from "../User/user.model";
import { IPatient } from "./patient.interface";

// CREATE PATIENT

const createPatient = async (
  payload: Partial<IPatient>
) => {
  const result =
    await Patient.create(
      payload
    );

  return result;
};

// GET ALL PATIENTS

const getAllPatients =
  async () => {
    const result =
      await Patient.find().populate(
        "user"
      );

    return result;
  };

// GET SINGLE PATIENT

const getSinglePatient =
  async (id: string) => {
    const result =
      await Patient.findById(
        id
      ).populate("user");

    return result;
  };

// UPDATE PATIENT

const updatePatient = async (
  id: string,
  payload: any
) => {
  // USER DATA

  const userData = {
    name: payload.name,

    email: payload.email,
  };

  // PATIENT DATA

  const patientData = {
    phone: payload.phone,

    gender: payload.gender,

    bloodGroup:
      payload.bloodGroup,

    age: payload.age,

    address:
      payload.address,

    emergencyContact:
      payload.emergencyContact,
  };

  // FIND PATIENT

  const patient =
    await Patient.findById(id);

  if (!patient) {
    throw new Error(
      "Patient not found"
    );
  }

  // UPDATE USER

  await User.findByIdAndUpdate(
    patient.user,
    userData,
    {
      new: true,
    }
  );

  // UPDATE PATIENT

  const result =
    await Patient.findByIdAndUpdate(
      id,
      patientData,
      {
        new: true,
      }
    ).populate("user");

  return result;
};

export const PatientServices =
  {
    createPatient,

    getAllPatients,

    getSinglePatient,

    updatePatient,
  };