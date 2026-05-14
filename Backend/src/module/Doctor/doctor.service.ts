// ======================================
// doctor.service.ts
// ======================================

import Doctor from "./doctor.model";

import User from "../User/user.model";

// CREATE DOCTOR

const createDoctor = async (
  payload: any
) => {
  return await Doctor.create(
    payload
  );
};

// GET ALL DOCTORS

const getAllDoctors =
  async () => {
    return await Doctor.find().populate(
      "user"
    );
  };

// GET SINGLE DOCTOR

const getSingleDoctor =
  async (id: string) => {
    return await Doctor.findById(
      id
    ).populate("user");
  };

// UPDATE DOCTOR

const updateDoctor = async (
  id: string,
  payload: any
) => {
  // FIND DOCTOR

  const doctor =
    await Doctor.findById(id);

  if (!doctor) {
    throw new Error(
      "Doctor not found"
    );
  }

  // USER UPDATE

  await User.findByIdAndUpdate(
    doctor.user,
    {
      name: payload.name,

      email:
        payload.email,
    }
  );

  // QUALIFICATION

  let qualification =
    [];

  if (
    payload.qualification
  ) {
    qualification =
      JSON.parse(
        payload.qualification
      );
  }

  // AVAILABLE DAYS

  let availableDays =
    [];

  if (
    payload.availableDays
  ) {
    availableDays =
      JSON.parse(
        payload.availableDays
      );
  }

  // UPDATE

  const result =
    await Doctor.findByIdAndUpdate(
      id,
      {
        image:
          payload.image,

        phone:
          payload.phone,

        gender:
          payload.gender,

        specialization:
          payload.specialization,

        department:
          payload.department,

        experience:
          payload.experience,

        consultationFee:
          payload.consultationFee,

        qualification,

        bio: payload.bio,

        availableDays,

        startTime:
          payload.startTime,

        endTime:
          payload.endTime,

        status:
          payload.status,
      },

      {
        new: true,
      }
    ).populate("user");

  return result;
};

export const DoctorServices =
  {
    createDoctor,

    getAllDoctors,

    getSingleDoctor,

    updateDoctor,
  };