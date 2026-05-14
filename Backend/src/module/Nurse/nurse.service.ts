// ======================================
// nurse.service.ts
// ======================================

import Nurse from "./nurse.model";

import User from "../User/user.model";

import type { INurse } from "./nurse.interface";

// CREATE NURSE

const createNurse = async (
  payload: Partial<INurse>
) => {
  const result =
    await Nurse.create(
      payload
    );

  return result;
};

// GET ALL NURSES

const getAllNurses =
  async () => {
    const result =
      await Nurse.find().populate(
        "user"
      );

    return result;
  };

// GET SINGLE NURSE

const getSingleNurse =
  async (id: string) => {
    const result =
      await Nurse.findById(
        id
      ).populate("user");

    return result;
  };

// UPDATE NURSE

const updateNurse = async (
  id: string,
  payload: any
) => {
  // USER DATA

  const userData = {
    name: payload.name,

    email: payload.email,
  };

  // NURSE DATA

  const nurseData = {
    phone: payload.phone,

    gender: payload.gender,

    department:
      payload.department,

    shift: payload.shift,

    experience:
      payload.experience,

    qualification:
      payload.qualification,

    address:
      payload.address,

    emergencyContact:
      payload.emergencyContact,

    status:
      payload.status,
  };

  // FIND NURSE

  const nurse =
    await Nurse.findById(id);

  if (!nurse) {
    throw new Error(
      "Nurse not found"
    );
  }

  // UPDATE USER

  await User.findByIdAndUpdate(
    nurse.user,
    userData,
    {
      new: true,
    }
  );

  // UPDATE NURSE

  const result =
    await Nurse.findByIdAndUpdate(
      id,
      nurseData,
      {
        new: true,
      }
    ).populate("user");

  return result;
};

export const NurseServices =
  {
    createNurse,

    getAllNurses,

    getSingleNurse,

    updateNurse,
  };