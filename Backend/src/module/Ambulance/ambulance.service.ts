import Ambulance from "./ambulance.model";

// ======================================
// CREATE AMBULANCE
// ======================================

const createAmbulance =
  async (
    payload: any
  ) => {
    return await Ambulance.create(
      payload
    );
  };

// ======================================
// GET ALL AMBULANCES
// ======================================

const getAllAmbulances =
  async () => {
    return await Ambulance.find().sort(
      {
        createdAt: -1,
      }
    );
  };

// ======================================
// UPDATE AMBULANCE
// ======================================

const updateAmbulance =
  async (
    id: string,

    payload: any
  ) => {
    return await Ambulance.findByIdAndUpdate(
      id,

      payload,

      {
        new: true,
      }
    );
  };

// ======================================
// DELETE AMBULANCE
// ======================================

const deleteAmbulance =
  async (
    id: string
  ) => {
    return await Ambulance.findByIdAndDelete(
      id
    );
  };

export const AmbulanceServices =
  {
    createAmbulance,

    getAllAmbulances,

    updateAmbulance,

    deleteAmbulance,
  };