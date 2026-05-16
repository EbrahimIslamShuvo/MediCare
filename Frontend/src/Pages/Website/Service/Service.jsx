import React from "react";

import {
    Stethoscope,
    Ambulance,
    FlaskConical,
    HeartPulse,
    Brain,
    Baby,
    Eye,
    ShieldCheck,
} from "lucide-react";

const services = [
    {
        icon: <Stethoscope size={38} />,
        title: "Doctor Consultation",
        description:
            "Meet experienced doctors for regular checkups and personalized treatment.",
    },

    {
        icon: <FlaskConical size={38} />,
        title: "Laboratory Test",
        description:
            "Advanced diagnostic tests with accurate reports and modern facilities.",
    },

    {
        icon: <Ambulance size={38} />,
        title: "Emergency Ambulance",
        description:
            "24/7 emergency ambulance support with quick response service.",
    },

    {
        icon: <HeartPulse size={38} />,
        title: "Heart Care",
        description:
            "Complete heart treatment and monitoring by expert cardiologists.",
    },

    {
        icon: <Brain size={38} />,
        title: "Neurology",
        description:
            "Specialized neurological care using modern medical technology.",
    },

    {
        icon: <Baby size={38} />,
        title: "Child Care",
        description:
            "Healthcare and treatment services specially designed for children.",
    },
];

const Service = () => {
    return (
        <div className="bg-[#f7fbff] min-h-screen overflow-hidden">
            {/* HERO */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT */}

                    <div>
                        <p className="text-blue-600 font-black uppercase tracking-[6px] mb-5">
                            Healthcare Services
                        </p>

                        <h1 className="text-5xl lg:text-7xl font-black text-slate-800 leading-tight mb-8">
                            Care That
                            <br />
                            Feels Human
                        </h1>

                        <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl">
                            We focus on providing comfortable, modern, and
                            reliable healthcare services for every patient.
                            From doctor consultation to emergency support, your
                            health is always our priority.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl font-black transition duration-300 shadow-lg shadow-blue-200">
                                Book Appointment
                            </button>

                            <button className="border border-blue-200 bg-white hover:bg-blue-50 text-slate-700 px-8 py-4 rounded-3xl font-black transition duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* RIGHT */}

                    <div className="relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

                        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-cyan-200 rounded-full blur-3xl opacity-40"></div>

                        <div className="relative bg-white border border-blue-100 rounded-[45px] p-5 shadow-xl shadow-blue-100">
                            <img
                                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop"
                                alt="Hospital"
                                className="w-full h-[550px] object-cover rounded-[35px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* SERVICES */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 pb-24">
                <div className="text-center mb-16">
                    <p className="text-blue-600 font-black uppercase tracking-[6px] mb-4">
                        What We Offer
                    </p>

                    <h2 className="text-5xl font-black text-slate-800 mb-5">
                        Medical Services
                    </h2>

                    <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
                        Our hospital provides trusted healthcare solutions with
                        experienced doctors, advanced equipment, and patient
                        centered care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white border border-blue-100 rounded-[40px] p-8 hover:-translate-y-3 transition duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-100"
                        >
                            {/* ICON */}

                            <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-7 group-hover:bg-blue-600 group-hover:text-white transition duration-500">
                                {service.icon}
                            </div>

                            {/* TITLE */}

                            <h3 className="text-3xl font-black text-slate-800 mb-5 leading-tight">
                                {service.title}
                            </h3>

                            {/* DESC */}

                            <p className="text-slate-500 leading-relaxed text-lg mb-8">
                                {service.description}
                            </p>

                            {/* BUTTON */}

                            <button className="text-blue-600 font-black text-lg hover:translate-x-2 transition duration-300">
                                Learn More →
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* WHY US */}

            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* IMAGE */}

                        <div className="relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-blue-200 blur-3xl opacity-30 rounded-full"></div>

                            <div className="relative bg-[#f7fbff] border border-blue-100 rounded-[45px] p-5 shadow-xl shadow-blue-100">
                                <img
                                    src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=1200&auto=format&fit=crop"
                                    alt="Doctor"
                                    className="w-full h-[550px] object-cover rounded-[35px]"
                                />
                            </div>
                        </div>

                        {/* CONTENT */}

                        <div>
                            <p className="text-blue-600 font-black uppercase tracking-[6px] mb-5">
                                Why Choose Us
                            </p>

                            <h2 className="text-5xl font-black text-slate-800 leading-tight mb-8">
                                Better Treatment
                                <br />
                                Better Experience
                            </h2>

                            <p className="text-slate-500 text-lg leading-relaxed mb-10">
                                We combine modern healthcare technology with
                                compassionate patient care to create a safe,
                                comfortable, and trusted hospital experience.
                            </p>

                            <div className="space-y-5">
                                <Feature
                                    icon={<ShieldCheck />}
                                    title="Patient First Care"
                                />

                                <Feature
                                    icon={<Eye />}
                                    title="Modern Medical Equipment"
                                />

                                <Feature
                                    icon={<HeartPulse />}
                                    title="24/7 Emergency Support"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// FEATURE

const Feature = ({
    icon,
    title,
}) => {
    return (
        <div className="flex items-center gap-5 bg-[#f7fbff] border border-blue-100 rounded-3xl p-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                {icon}
            </div>

            <h3 className="text-xl font-black text-slate-800">
                {title}
            </h3>
        </div>
    );
};

export default Service;