import React, {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    Activity,
} from "lucide-react";

import { motion } from "framer-motion";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
        });

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    // =========================
    // HANDLE INPUT CHANGE
    // =========================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    // =========================
    // HANDLE SUBMIT
    // =========================

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const {
            name,
            email,
            password,
        } = formData;

        // VALIDATION

        if (!name.trim()) {
            return setError(
                "Name is required"
            );
        }

        if (password.length < 6) {
            return setError(
                "Password must be at least 6 characters"
            );
        }

        try {
            setLoading(true);

            // API CALL

            const response = await fetch(
                "http://localhost:3000/api/v1/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        role: "Patient",
                    }),
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                setError(result.message);
            } else {
                setSuccess(
                    result.message
                );

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                });

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (err) {
            console.log(err);

            setError(
                err.message || "Server Error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-10 bg-cover bg-center"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(15,23,42,0.7), rgba(15,23,42,0.8)), url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=2000&q=80')",
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
            >
                {/* HEADER */}

                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                        <Activity size={30} />
                    </div>

                    <h2 className="mt-5 text-3xl font-bold text-slate-800">
                        Registration
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                        Create your patient account
                    </p>
                </div>

                {/* ERROR */}

                {error && (
                    <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {/* SUCCESS */}

                {success && (
                    <div className="mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm">
                        {success}
                    </div>
                )}

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    autoComplete="off"
                >
                    {/* Fake fields for autofill off */}

                    <input
                        type="text"
                        name="fakeuser"
                        style={{
                            display: "none",
                        }}
                    />

                    <input
                        type="password"
                        name="fakepassword"
                        style={{
                            display: "none",
                        }}
                    />

                    {/* NAME */}

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                            Full Name
                        </label>

                        <div className="relative">
                            <User className="absolute top-3.5 left-3 text-slate-400 w-5 h-5" />

                            <input
                                type="text"
                                name="name"
                                autoComplete="off"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={
                                    handleChange
                                }
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* EMAIL */}

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                            Email
                        </label>

                        <div className="relative">
                            <Mail className="absolute top-3.5 left-3 text-slate-400 w-5 h-5" />

                            <input
                                type="email"
                                name="email"
                                autoComplete="off"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={
                                    handleChange
                                }
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-slate-700">
                            Password
                        </label>

                        <div className="relative">
                            <Lock className="absolute top-3.5 left-3 text-slate-400 w-5 h-5" />

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                autoComplete="new-password"
                                placeholder="Enter password"
                                value={
                                    formData.password
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute top-3 right-3 text-slate-500"
                            >
                                {showPassword ? (
                                    <EyeOff />
                                ) : (
                                    <Eye />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-5 h-5" />
                                Processing...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>

                {/* LOGIN */}

                <div className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?

                    <Link
                        to="/login"
                        className="ml-2 text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;