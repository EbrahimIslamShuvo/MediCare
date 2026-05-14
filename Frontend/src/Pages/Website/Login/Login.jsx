import React, {
    useState,
    useEffect,
} from "react";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import {
    Mail,
    Lock,
    Activity,
    Loader2,
    Eye,
    EyeOff,
} from "lucide-react";

import { motion } from "framer-motion";

const Login = () => {
    const [email, setEmail] =
        useState("");

    const [
        password,
        setPassword,
    ] = useState("");

    const [error, setError] =
        useState("");

    const [
        isLoading,
        setIsLoading,
    ] = useState(false);

    const [
        pwdReadOnly,
        setPwdReadOnly,
    ] = useState(true);

    const [showPwd, setShowPwd] =
        useState(false);

    const navigate =
        useNavigate();

    // =====================================
    // CLEAR AUTOFILL
    // =====================================

    useEffect(() => {
        const t = setTimeout(() => {
            setPassword("");
            setEmail("");
        }, 50);

        return () => clearTimeout(t);
    }, []);

    // =====================================
    // HANDLE LOGIN
    // =====================================

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        setError("");

        try {
            setIsLoading(true);

            const response = await fetch(
                "http://127.0.0.1:3000/api/v1/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const result =
                await response.json();

            console.log(result);
            // LOGIN FAILED

            if (!result.success) {
                return setError(
                    result.message
                );
            }

            // SAVE TOKEN

            localStorage.setItem(
                "token",
                result.token
            );

            // SAVE USER

            localStorage.setItem(
                "user",
                JSON.stringify(
                    result.data
                )
            );

            // ROLE BASED REDIRECT

            const role =
                result.data.role;

            if (role === "Admin") {
                navigate(
                    "/dashboard/admin"
                );
            }

            else if (
                role === "Doctor"
            ) {
                navigate(
                    "/dashboard/doctor"
                );
            }

            else if (
                role === "Patient"
            ) {
                navigate(
                    "/dashboard/patient"
                );
            }

            else if (
                role === "Nurse"
            ) {
                navigate(
                    "/dashboard/nurse"
                );
            }

            else if (
                role ===
                "Receptionist"
            ) {
                navigate(
                    "/dashboard/receptionist"
                );
            }

            else if (
                role ===
                "Laboratorist"
            ) {
                navigate(
                    "/dashboard/laboratorist"
                );
            }

            else {
                navigate("/");
            }
        } catch (err) {
            console.log(err);

            setError(
                err.message
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 pt-32 relative overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
            style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}
        >
            {/* BACKGROUND */}

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>

                <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-indigo-500 blur-3xl"></div>
            </div>

            {/* CARD */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                    ease: "easeOut",
                }}
                className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden p-8 border border-white relative z-10"
            >
                {/* HEADER */}

                <div className="text-center mb-8">
                    <motion.div
                        whileHover={{
                            rotate: 180,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="mx-auto w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 text-white"
                    >
                        <Activity
                            size={32}
                            strokeWidth={2.5}
                        />
                    </motion.div>

                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                        MediCare Portal
                    </h2>

                    <p className="mt-3 text-sm text-slate-500 font-medium">
                        Sign in to your
                        account
                    </p>
                </div>

                {/* ERROR */}

                {error && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                    >
                        <p className="text-sm font-semibold text-red-700">
                            {error}
                        </p>
                    </motion.div>
                )}

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    autoComplete="off"
                >
                    {/* HONEYPOT */}

                    <input
                        type="text"
                        name="fakeuser"
                        style={{
                            display: "none",
                        }}
                    />

                    <input
                        type="password"
                        name="fakepass"
                        style={{
                            display: "none",
                        }}
                    />

                    {/* EMAIL */}

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
                            Email Address
                        </label>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>

                            <input
                                type="email"
                                autoComplete="off"
                                className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 hover:bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium text-slate-800"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
                            Password
                        </label>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>

                            <input
                                type={
                                    showPwd
                                        ? "text"
                                        : "password"
                                }
                                autoComplete="new-password"
                                readOnly={
                                    pwdReadOnly
                                }
                                onFocus={() =>
                                    setPwdReadOnly(
                                        false
                                    )
                                }
                                className="block w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 hover:bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium text-slate-800"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                required
                                minLength="6"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPwd(
                                        !showPwd
                                    )
                                }
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-blue-500 transition-colors"
                            >
                                {showPwd ? (
                                    <EyeOff
                                        size={18}
                                    />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Secure Sign In"
                        )}
                    </button>
                </form>

                {/* FOOTER */}

                <div className="mt-8 border-t border-slate-100 pt-6">
                    <Link
                        to="/register"
                        className="w-full flex justify-center items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        New user?

                        <span className="text-blue-600">
                            Register here
                        </span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;