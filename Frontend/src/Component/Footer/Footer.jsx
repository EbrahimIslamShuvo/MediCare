import React from "react";

import {
    Link,
} from "react-router-dom";

import {
    Activity,
    Phone,
    Mail,
    MapPin,
    Globe,
    MessageCircle,
    Camera,
    Share2,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* ================================= */}
                    {/* BRAND */}
                    {/* ================================= */}

                    <div className="flex flex-col gap-4">
                        <Link
                            to="/"
                            className="flex items-center gap-3 group mb-2"
                        >
                            <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-500/30">
                                <Activity
                                    size={
                                        24
                                    }
                                    strokeWidth={
                                        2.5
                                    }
                                />
                            </div>

                            <span className="text-2xl font-black text-white">
                                MediCare
                            </span>
                        </Link>

                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                            Providing modern
                            healthcare
                            solutions with
                            specialist
                            doctors,
                            emergency
                            ambulance
                            services, and
                            advanced medical
                            support for every
                            patient.
                        </p>

                        {/* SOCIAL */}

                        <div className="flex gap-4 mt-2">
                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300"
                            >
                                <Globe
                                    size={
                                        18
                                    }
                                />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300"
                            >
                                <MessageCircle
                                    size={
                                        18
                                    }
                                />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300"
                            >
                                <Camera
                                    size={
                                        18
                                    }
                                />
                            </a>

                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300"
                            >
                                <Share2
                                    size={
                                        18
                                    }
                                />
                            </a>
                        </div>
                    </div>

                    {/* ================================= */}
                    {/* QUICK LINKS */}
                    {/* ================================= */}

                    <div>
                        <h3 className="text-white font-black text-xl mb-6">
                            Quick Links
                        </h3>

                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link
                                    to="/"
                                    className="text-slate-400 hover:text-blue-400 transition text-sm"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/services"
                                    className="text-slate-400 hover:text-blue-400 transition text-sm"
                                >
                                    Services
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                    className="text-slate-400 hover:text-blue-400 transition text-sm"
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact"
                                    className="text-slate-400 hover:text-blue-400 transition text-sm"
                                >
                                    Contact
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/login"
                                    className="text-slate-400 hover:text-blue-400 transition text-sm"
                                >
                                    Patient Portal
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ================================= */}
                    {/* CONTACT */}
                    {/* ================================= */}

                    <div>
                        <h3 className="text-white font-black text-xl mb-6">
                            Contact Info
                        </h3>

                        <ul className="flex flex-col gap-5">
                            <li className="flex items-start gap-3">
                                <MapPin
                                    className="text-blue-500 shrink-0 mt-1"
                                    size={
                                        18
                                    }
                                />

                                <span className="text-sm text-slate-400 leading-relaxed">
                                    123
                                    Healthcare
                                    Avenue,
                                    <br />
                                    Dhaka,
                                    Bangladesh
                                </span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Phone
                                    className="text-blue-500 shrink-0"
                                    size={
                                        18
                                    }
                                />

                                <span className="text-sm text-slate-400">
                                    +880
                                    1700-000000
                                </span>
                            </li>

                            <li className="flex items-center gap-3">
                                <Mail
                                    className="text-blue-500 shrink-0"
                                    size={
                                        18
                                    }
                                />

                                <span className="text-sm text-slate-400">
                                    support@medicare.com
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* ================================= */}
                    {/* NEWSLETTER */}
                    {/* ================================= */}

                    <div>
                        <h3 className="text-white font-black text-xl mb-6">
                            Newsletter
                        </h3>

                        <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                            Subscribe to get
                            medical news,
                            healthcare tips,
                            and hospital
                            updates.
                        </p>

                        <form className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition text-white"
                            />

                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-black w-full py-3 rounded-xl transition duration-300 shadow-lg shadow-blue-500/20">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* ================================= */}
                {/* BOTTOM */}
                {/* ================================= */}

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">
                    <p className="text-sm text-slate-500 text-center md:text-left">
                        ©{" "}
                        {new Date().getFullYear()}{" "}
                        MediCare Hospital.
                        All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                        <a
                            href="#"
                            className="hover:text-blue-400 transition"
                        >
                            Privacy Policy
                        </a>

                        <a
                            href="#"
                            className="hover:text-blue-400 transition"
                        >
                            Terms of Service
                        </a>

                        <a
                            href="#"
                            className="hover:text-blue-400 transition"
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;