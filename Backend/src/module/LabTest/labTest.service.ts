// ======================================
// labTest.service.ts
// ======================================

import SSLCommerzPayment from "sslcommerz-lts";

import Patient from "../Patient/patient.model";

import LabTest from "./labTest.model";

import Doctor from "../Doctor/doctor.model";

// ======================================
// CREATE BOOKING
// ======================================

const createLabTestBooking =
  async (
    payload: any
  ) => {
    // PATIENT

    const patient =
      await Patient.findOne({
        user:
          payload.patientId,
      });

    if (!patient) {
      throw new Error(
        "Patient not found"
      );
    }

    // CHECK EXISTING

    const existingBooking =
      await LabTest.findOne(
        {
          prescription:
            payload.prescriptionId,

          paymentStatus:
            "Paid",
        }
      );

    if (
      existingBooking
    ) {
      throw new Error(
        "Lab tests already booked for this prescription"
      );
    }

    // TRANSACTION ID

    const transactionId = `LAB-${Date.now()}`;

    // CREATE

    await LabTest.create(
      {
        patient:
          patient._id,

        prescription:
          payload.prescriptionId,

        tests:
          payload.tests,

        totalAmount:
          payload.totalAmount,

        paymentStatus:
          "Pending",

        status:
          "Pending",

        transactionId,
      }
    );

    // SSL

    const sslcz =
      new SSLCommerzPayment(
        process.env
          .SSL_STORE_ID as string,

        process.env
          .SSL_STORE_PASSWORD as string,

        process.env
          .IS_LIVE ===
          "true"
      );

    // PAYMENT DATA

    const data = {
      total_amount:
        payload.totalAmount,

      currency:
        "BDT",

      tran_id:
        transactionId,

      success_url:
        "http://localhost:3000/api/v1/lab-tests/success",

      fail_url:
        "http://localhost:3000/api/v1/lab-tests/fail",

      cancel_url:
        "http://localhost:3000/api/v1/lab-tests/cancel",

      ipn_url:
        "http://localhost:3000/api/v1/lab-tests/ipn",

      shipping_method:
        "NO",

      product_name:
        "Lab Test",

      product_category:
        "Medical",

      product_profile:
        "general",

      cus_name:
        "Patient",

      cus_email:
        "patient@gmail.com",

      cus_add1:
        "Dhaka",

      cus_city:
        "Dhaka",

      cus_country:
        "Bangladesh",

      cus_phone:
        "01700000000",
    };

    const apiResponse =
      await sslcz.init(
        data
      );

    return {
      success: true,

      url: apiResponse
        .GatewayPageURL,
    };
  };

// ======================================
// SUCCESS PAYMENT
// ======================================

const successPayment =
  async (
    transactionId: string
  ) => {
    return await LabTest.findOneAndUpdate(
      {
        transactionId,
      },
      {
        paymentStatus:
          "Paid",
      },
      {
        new: true,
      }
    );
  };

// ======================================
// GET PATIENT LAB TESTS
// ======================================

const getPatientLabTests =
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

    return await LabTest.find(
      {
        patient:
          patient._id,
      }
    )
      .populate(
        "prescription"
      )
      .sort({
        createdAt: -1,
      });
  };

// ======================================
// GET ALL LAB TESTS
// ======================================

const getAllLabTests =
  async () => {
    return await LabTest.find()
      .populate({
        path: "patient",

        populate: {
          path: "user",
        },
      })
      .populate(
        "prescription"
      )
      .sort({
        createdAt: -1,
      });
  };

// ======================================
// UPDATE STATUS
// ======================================

const updateLabTestStatus =
  async (
    id: string,

    status: string
  ) => {
    return await LabTest.findByIdAndUpdate(
      id,

      {
        status,
      },

      {
        new: true,
      }
    );
  };

// ======================================
// COMPLETE TEST
// ======================================

const completeLabTest =
  async (
    id: string,

    report: string
  ) => {
    return await LabTest.findByIdAndUpdate(
      id,

      {
        status:
          "Completed",

        report,
      },

      {
        new: true,
      }
    );
  };

// ======================================
// DOCTOR COMPLETED REPORTS
// ======================================

const getDoctorLabReports =
  async (
    userId: string
  ) => {
    // FIND DOCTOR

    const doctor =
      await Doctor.findOne(
        {
          user: userId,
        }
      );

    if (!doctor) {
      throw new Error(
        "Doctor not found"
      );
    }

    // FIND REPORTS

    const reports =
      await LabTest.find(
        {
          status:
            "Completed",
        }
      )
        .populate({
          path:
            "patient",

          populate: {
            path: "user",
          },
        })

        .populate({
          path:
            "prescription",

          populate: {
            path: "doctor",
          },
        })

        .sort({
          createdAt: -1,
        });

    // FILTER

    const filtered =
      reports.filter(
        (item: any) =>
          item
            ?.prescription
            ?.doctor?._id?.toString() ===
          doctor._id.toString()
      );

    return filtered;
  };

export const LabTestServices =
  {
    createLabTestBooking,

    successPayment,

    getPatientLabTests,

    getAllLabTests,

    updateLabTestStatus,

    completeLabTest,

    getDoctorLabReports,
  };