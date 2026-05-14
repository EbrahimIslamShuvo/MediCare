"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("../User/user.service");
const user_model_1 = __importDefault(require("../User/user.model"));
const patient_model_1 = __importDefault(require("../Patient/patient.model"));
// ======================================
// REGISTER
// ======================================
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, } = payload;
    // CHECK EXISTING USER
    const existingUser = yield user_service_1.UserServices.findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }
    // HASH PASSWORD
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // CREATE USER
    const user = yield user_service_1.UserServices.createUser({
        name,
        email,
        password: hashedPassword,
        role,
    });
    // ======================================
    // AUTO CREATE PATIENT PROFILE
    // ======================================
    if (user.role === "Patient") {
        yield patient_model_1.default.create({
            user: user._id,
        });
    }
    return user;
});
// ======================================
// LOGIN
// ======================================
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // FIND USER
    const user = yield user_model_1.default.findOne({
        email,
    }).select("+password");
    if (!user) {
        throw new Error("User not found");
    }
    // CHECK PASSWORD
    const isMatched = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatched) {
        throw new Error("Wrong password");
    }
    return user;
});
exports.AuthServices = {
    registerUser,
    loginUser,
};
