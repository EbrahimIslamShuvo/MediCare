// ======================================
// admin.service.ts
// ======================================

import Admin from "./admin.model";

import User from "../User/user.model";

import type { IAdmin } from "./admin.interface";

// CREATE ADMIN

const createAdmin = async (
  payload: Partial<IAdmin>
) => {
  const result =
    await Admin.create(
      payload
    );

  return result;
};

// GET ALL ADMINS

const getAllAdmins =
  async () => {
    const result =
      await Admin.find().populate(
        "user"
      );

    return result;
  };

// GET SINGLE ADMIN

const getSingleAdmin =
  async (id: string) => {
    const result =
      await Admin.findById(
        id
      ).populate("user");

    return result;
  };

// UPDATE ADMIN

const updateAdmin = async (
  id: string,
  payload: any
) => {
  // USER DATA

  const userData = {
    name: payload.name,

    email: payload.email,
  };

  // ADMIN DATA

  const adminData = {
    phone: payload.phone,

    address:
      payload.address,

    designation:
      payload.designation,
  };

  // FIND ADMIN

  const admin =
    await Admin.findById(id);

  if (!admin) {
    throw new Error(
      "Admin not found"
    );
  }

  // UPDATE USER

  await User.findByIdAndUpdate(
    admin.user,
    userData,
    {
      new: true,
    }
  );

  // UPDATE ADMIN

  const result =
    await Admin.findByIdAndUpdate(
      id,
      adminData,
      {
        new: true,
      }
    ).populate("user");

  return result;
};

export const AdminServices =
  {
    createAdmin,

    getAllAdmins,

    getSingleAdmin,

    updateAdmin,
  };