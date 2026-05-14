// ======================================
// receptionist.service.ts
// ======================================

import Receptionist from "./receptionist.model";

import User from "../User/user.model";

import type { IReceptionist } from "./receptionist.interface";

// CREATE RECEPTIONIST

const createReceptionist =
  async (
    payload: Partial<IReceptionist>
  ) => {
    const result =
      await Receptionist.create(
        payload
      );

    return result;
  };

// GET ALL RECEPTIONISTS

const getAllReceptionists =
  async () => {
    const result =
      await Receptionist.find().populate(
        "user"
      );

    return result;
  };

// GET SINGLE RECEPTIONIST

const getSingleReceptionist =
  async (id: string) => {
    const result =
      await Receptionist.findById(
        id
      ).populate("user");

    return result;
  };

// UPDATE RECEPTIONIST

const updateReceptionist =
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

    // RECEPTIONIST DATA

    const receptionistData =
      {
        phone:
          payload.phone,

        gender:
          payload.gender,

        department:
          payload.department,

        shift:
          payload.shift,

        experience:
          payload.experience,

        address:
          payload.address,

        emergencyContact:
          payload.emergencyContact,

        status:
          payload.status,
      };

    // FIND RECEPTIONIST

    const receptionist =
      await Receptionist.findById(
        id
      );

    if (!receptionist) {
      throw new Error(
        "Receptionist not found"
      );
    }

    // UPDATE USER

    await User.findByIdAndUpdate(
      receptionist.user,
      userData,
      {
        new: true,
      }
    );

    // UPDATE RECEPTIONIST

    const result =
      await Receptionist.findByIdAndUpdate(
        id,
        receptionistData,
        {
          new: true,
        }
      ).populate("user");

    return result;
  };

export const ReceptionistServices =
  {
    createReceptionist,

    getAllReceptionists,

    getSingleReceptionist,

    updateReceptionist,
  };