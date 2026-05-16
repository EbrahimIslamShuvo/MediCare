import Ambulance from "../Ambulance/ambulance.model";

import Patient from "../Patient/patient.model";

import AmbulanceRequest from "./ambulanceRequest.model";

// ======================================
// CREATE REQUEST
// ======================================

const createRequest =
  async (
    payload: any
  ) => {
    let patientId =
      null;

    // PATIENT

    if (
      payload.userId
    ) {
      const patient =
        await Patient.findOne(
          {
            user:
              payload.userId,
          }
        );

      if (!patient) {
        throw new Error(
          "Patient not found"
        );
      }

      patientId =
        patient._id;
    }

    // CREATE

    return await AmbulanceRequest.create(
      {
        patient:
          patientId,

        requestedBy:
          payload.requestedBy,

        pickupLocation:
          payload.pickupLocation,

        destination:
          payload.destination,

        emergencyType:
          payload.emergencyType,

        phone:
          payload.phone,
      }
    );
  };

// ======================================
// GET ALL REQUESTS
// ======================================

const getAllRequests =
  async () => {
    return await AmbulanceRequest.find()
      .populate({
        path:
          "patient",

        populate: {
          path: "user",
        },
      })

      .populate(
        "ambulance"
      )

      .sort({
        createdAt: -1,
      });
  };

// ======================================
// ASSIGN AMBULANCE
// ======================================

const assignAmbulance =
  async (
    requestId: string,

    ambulanceId: string
  ) => {
    // CHECK AMBULANCE

    const ambulance =
      await Ambulance.findById(
        ambulanceId
      );

    if (!ambulance) {
      throw new Error(
        "Ambulance not found"
      );
    }

    // CHECK STATUS

    if (
      ambulance.status !==
      "Available"
    ) {
      throw new Error(
        "Ambulance not available"
      );
    }

    // UPDATE REQUEST

    const request =
      await AmbulanceRequest.findByIdAndUpdate(
        requestId,

        {
          ambulance:
            ambulanceId,

          status:
            "Assigned",
        },

        {
          new: true,
        }
      );

    // UPDATE AMBULANCE

    ambulance.status =
      "Busy";

    await ambulance.save();

    return request;
  };

// ======================================
// COMPLETE REQUEST
// ======================================

const completeRequest =
  async (
    requestId: string
  ) => {
    const request =
      await AmbulanceRequest.findById(
        requestId
      );

    if (!request) {
      throw new Error(
        "Request not found"
      );
    }

    // COMPLETE REQUEST

    request.status =
      "Completed";

    await request.save();

    // AVAILABLE AGAIN

    if (
      request.ambulance
    ) {
      await Ambulance.findByIdAndUpdate(
        request.ambulance,

        {
          status:
            "Available",
        }
      );
    }

    return request;
  };

   // ======================================
 // GET PATIENT REQUESTS
 // ======================================

const getPatientRequests =
  async (
    userId: string
  ) => {
    // PATIENT

    const patient =
      await Patient.findOne(
        {
          user: userId,
        }
      );

    if (!patient) {
      throw new Error(
        "Patient not found"
      );
    }

    return await AmbulanceRequest.find(
      {
        patient:
          patient._id,
      }
    )
      .populate(
        "ambulance"
      )
      .sort({
        createdAt: -1,
      });
  };

export const AmbulanceRequestServices =
  {
    createRequest,

    getAllRequests,

    assignAmbulance,

    completeRequest,

    getPatientRequests,
  };