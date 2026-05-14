// ======================================
// laboratory.service.ts
// ======================================

import Laboratory from "./laboratory.model";

// ======================================
// CREATE PROFILE
// ======================================

const createLaboratoryProfile =
  async (
    payload: any
  ) => {
    const existing =
      await Laboratory.findOne(
        {
          user:
            payload.user,
        }
      );

    if (existing) {
      throw new Error(
        "Profile already exists"
      );
    }

    return await Laboratory.create(
      payload
    );
  };

// ======================================
// GET PROFILE
// ======================================

const getLaboratoryProfile =
  async (
    userId: string
  ) => {
    return await Laboratory.findOne(
      {
        user: userId,
      }
    ).populate("user");
  };

// ======================================
// UPDATE PROFILE
// ======================================

const updateLaboratoryProfile =
  async (
    userId: string,

    payload: any
  ) => {
    return await Laboratory.findOneAndUpdate(
      {
        user: userId,
      },

      payload,

      {
        new: true,
      }
    ).populate("user");
  };

export const LaboratoryServices =
  {
    createLaboratoryProfile,

    getLaboratoryProfile,

    updateLaboratoryProfile,
  };