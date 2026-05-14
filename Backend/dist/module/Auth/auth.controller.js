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
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
// ======================================
// REGISTER
// ======================================
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield auth_service_1.AuthServices.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "Registration successful",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
// ======================================
// LOGIN
// ======================================
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // LOGIN USER
        const user = yield auth_service_1.AuthServices.loginUser(email, password);
        // GENERATE TOKEN
        const token = (0, generateToken_1.default)({
            _id: user._id.toString(),
            email: user.email,
            role: user.role,
        });
        // RESPONSE
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.AuthControllers = {
    register,
    login,
};
