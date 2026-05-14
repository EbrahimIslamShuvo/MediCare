// ======================================
// auth.service.ts
// ======================================

import bcrypt from "bcrypt";

import crypto from "crypto";

import nodemailer from "nodemailer";

import type { IUser } from "../User/user.interface";

import { UserServices } from "../User/user.service";

import User from "../User/user.model";

import Patient from "../Patient/patient.model";

import Admin from "../Admin/admin.model";

import Doctor from "../Doctor/doctor.model";

import Nurse from "../Nurse/nurse.model";

import Laboratorist from "../Laboratorist/laboratorist.model";

import Receptionist from "../Receptionist/receptionist.model";

// ======================================
// MAIL TRANSPORTER
// ======================================

const transporter =
  nodemailer.createTransport(
    {
      service: "gmail",

      auth: {
        user:
          process.env.EMAIL_USER,

        pass:
          process.env.EMAIL_PASS,
      },
    }
  );

// ======================================
// GENERATE RANDOM PASSWORD
// ======================================

const generatePassword =
  () => {
    return crypto
      .randomBytes(4)
      .toString("hex");
  };

// ======================================
// SEND ACCOUNT MAIL
// ======================================

const sendAccountMail =
  async (
    email: string,
    name: string,
    password: string,
    role: string
  ) => {
    await transporter.sendMail(
      {
        from:
          process.env.EMAIL_USER,

        to: email,

        subject:
          "MediCare Account",

        html: `
        <div style="font-family:sans-serif;padding:20px">

          <h2>MediCare Staff Account</h2>

          <p>Hello ${name},</p>

          <p>Your account has been created successfully.</p>

          <div style="background:#eff6ff;padding:16px;border-radius:10px">

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Password:</strong>
              ${password}
            </p>

            <p>
              <strong>Role:</strong>
              ${role}
            </p>

          </div>

          <p>
            Please login and change your password.
          </p>

        </div>
        `,
      }
    );
  };

// ======================================
// REGISTER USER
// ======================================

const registerUser = async (
  payload: IUser
) => {
  const {
    name,
    email,
    role,
    password,
  } = payload;

  // ======================================
  // ALLOWED ROLES
  // ======================================

  const allowedRoles = [
    "Doctor",

    "Nurse",

    "Receptionist",

    "Laboratorist",

    "Patient",

    "Admin",
  ];

  if (
    !allowedRoles.includes(
      role
    )
  ) {
    throw new Error(
      "Invalid role"
    );
  }

  // ======================================
  // CHECK EXISTING USER
  // ======================================

  const existingUser =
    await UserServices.findUserByEmail(
      email
    );

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  // ======================================
  // PASSWORD
  // ======================================

  let finalPassword =
    password;

  // STAFF হলে AUTO PASSWORD

  if (
    role !== "Patient"
  ) {
    finalPassword =
      generatePassword();
  }

  // ======================================
  // HASH PASSWORD
  // ======================================

  const hashedPassword =
    await bcrypt.hash(
      finalPassword,
      10
    );

  // ======================================
  // CREATE USER
  // ======================================

  const user =
    await UserServices.createUser({
      name,

      email,

      password:
        hashedPassword,

      role,
    });

  // ======================================
  // CREATE ROLE PROFILE
  // ======================================

  if (user.role === "Patient") {
    await Patient.create({
      user: user._id,
    });
  }

  if (user.role === "Admin") {
    await Admin.create({
      user: user._id,
    });
  }

  if (user.role === "Doctor") {
    await Doctor.create({
      user: user._id,
    });
  }

  if (user.role === "Nurse") {
    await Nurse.create({
      user: user._id,
    });
  }

  if (
    user.role ===
    "Laboratorist"
  ) {
    await Laboratorist.create({
      user: user._id,
    });
  }

  if (
    user.role ===
    "Receptionist"
  ) {
    await Receptionist.create({
      user: user._id,
    });
  }

  // ======================================
  // SEND MAIL ONLY STAFF
  // ======================================

  if (
    role !== "Patient"
  ) {
    await sendAccountMail(
      email,
      name,
      finalPassword,
      role
    );
  }

  return user;
};

// ======================================
// LOGIN USER
// ======================================

const loginUser = async (
  email: string,
  password: string
) => {
  // FIND USER

  const user =
    await User.findOne({
      email,
    }).select("+password");

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  // CHECK PASSWORD

  const isMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatched) {
    throw new Error(
      "Wrong password"
    );
  }

  return user;
};

export const AuthServices = {
  registerUser,

  loginUser,
};