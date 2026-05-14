// ======================================
// laboratorist.service.ts
// ======================================

import Laboratorist from "./laboratorist.model";

import User from "../User/user.model";

import type { ILaboratorist } from "./laboratorist.interface";

// CREATE LABORATORIST

const createLaboratorist =
  async (
    payload: Partial<ILaboratorist>
  ) => {
    const result =
      await Laboratorist.create(
        payload
      );

    return result;
  };

// GET ALL LABORATORISTS

const getAllLaboratorists =
  async () => {
    const result =
      await Laboratorist.find().populate(
        "user"
      );

    return result;
  };

// GET SINGLE LABORATORIST

const getSingleLaboratorist =
  async (id: string) => {
    const result =
      await Laboratorist.findById(
        id
      ).populate("user");

    return result;
  };

// UPDATE LABORATORIST

const updateLaboratorist =
  async (
    id: string,
    payload: any
  ) => {
    // USER DATA

    const userData = {
      name: payload.name,

      email:
        payload.email,
    };

    // LAB DATA

    const laboratoristData =
      {
        phone:
          payload.phone,

        gender:
          payload.gender,

        department:
          payload.department,

        specialization:
          payload.specialization,

        experience:
          payload.experience,

        qualification:
          payload.qualification,

        shift:
          payload.shift,

        address:
          payload.address,

        emergencyContact:
          payload.emergencyContact,

        status:
          payload.status,
      };

    // FIND LABORATORIST

    const laboratorist =
      await Laboratorist.findById(
        id
      );

    if (!laboratorist) {
      throw new Error(
        "Laboratorist not found"
      );
    }

    // UPDATE USER

    await User.findByIdAndUpdate(
      laboratorist.user,
      userData,
      {
        new: true,
      }
    );

    // UPDATE LABORATORIST

    const result =
      await Laboratorist.findByIdAndUpdate(
        id,
        laboratoristData,
        {
          new: true,
        }
      ).populate("user");

    return result;
  };

export const LaboratoristServices =
  {
    createLaboratorist,

    getAllLaboratorists,

    getSingleLaboratorist,

    updateLaboratorist,
  };