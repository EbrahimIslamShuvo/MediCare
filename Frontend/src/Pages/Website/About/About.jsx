import React from "react";

import {
    HeartPulse,
    Stethoscope,
    Ambulance,
    ShieldCheck,
    Users,
    FlaskConical,
    Eye,
} from "lucide-react";

const About = () => {
    return (
        <div className="bg-[#f7fbff] min-h-screen overflow-hidden">
            {/* HERO */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT */}

                    <div>
                        <p className="text-blue-600 font-black uppercase tracking-[6px] mb-5">
                            About Our Hospital
                        </p>

                        <h1 className="text-5xl lg:text-7xl font-black text-slate-800 leading-tight mb-8">
                            Healthcare
                            <br />
                            With Humanity
                        </h1>

                        <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl">
                            We believe
                            healthcare should
                            feel personal,
                            supportive, and
                            comfortable. Our
                            experienced
                            medical team and
                            modern hospital
                            facilities ensure
                            the best treatment
                            experience for
                            every patient.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl font-black transition duration-300 shadow-lg shadow-blue-200">
                                Book
                                Appointment
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
                                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop"
                                alt="Hospital"
                                className="w-full h-[550px] object-cover rounded-[35px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    <StatCard
                        icon={
                            <Users
                                size={
                                    36
                                }
                            />
                        }
                        value="20K+"
                        title="Happy Patients"
                    />

                    <StatCard
                        icon={
                            <Stethoscope
                                size={
                                    36
                                }
                            />
                        }
                        value="80+"
                        title="Specialist Doctors"
                    />

                    <StatCard
                        icon={
                            <FlaskConical
                                size={
                                    36
                                }
                            />
                        }
                        value="50+"
                        title="Medical Services"
                    />

                    <StatCard
                        icon={
                            <Ambulance
                                size={
                                    36
                                }
                            />
                        }
                        value="24/7"
                        title="Emergency Support"
                    />
                </div>
            </div>

            {/* STORY */}

            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* IMAGE */}

                        <div className="relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-blue-200 blur-3xl opacity-30 rounded-full"></div>

                            <div className="relative bg-[#f7fbff] border border-blue-100 rounded-[45px] p-5 shadow-xl shadow-blue-100">
                                <img
                                    src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=1200&auto=format&fit=crop"
                                    alt="Doctors"
                                    className="w-full h-[550px] object-cover rounded-[35px]"
                                />
                            </div>
                        </div>

                        {/* CONTENT */}

                        <div>
                            <p className="text-blue-600 font-black uppercase tracking-[6px] mb-5">
                                Our Story
                            </p>

                            <h2 className="text-5xl font-black text-slate-800 leading-tight mb-8">
                                Trusted Care
                                <br />
                                For Every
                                Patient
                            </h2>

                            <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                Since the
                                beginning, our
                                mission has
                                been to provide
                                modern medical
                                services while
                                making patients
                                feel safe,
                                respected, and
                                supported. We
                                continuously
                                improve our
                                healthcare
                                system to
                                deliver the
                                best treatment
                                experience.
                            </p>

                            <div className="space-y-5">
                                <Feature
                                    icon={
                                        <HeartPulse />
                                    }
                                    title="Patient Focused Treatment"
                                />

                                <Feature
                                    icon={
                                        <ShieldCheck />
                                    }
                                    title="Safe & Secure Healthcare"
                                />

                                <Feature
                                    icon={
                                        <Ambulance />
                                    }
                                    title="24/7 Emergency Response"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VALUES */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 py-24">
                <div className="text-center mb-16">
                    <p className="text-blue-600 font-black uppercase tracking-[6px] mb-4">
                        Our Values
                    </p>

                    <h2 className="text-5xl font-black text-slate-800 mb-5">
                        What Makes Us
                        Different
                    </h2>

                    <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
                        We focus on
                        combining modern
                        medical technology
                        with compassion and
                        care to ensure every
                        patient feels
                        valued.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <ValueCard
                        icon={
                            <HeartPulse
                                size={
                                    38
                                }
                            />
                        }
                        title="Compassion"
                        description="We treat every patient with kindness, empathy, and respect."
                    />

                    <ValueCard
                        icon={
                            <ShieldCheck
                                size={
                                    38
                                }
                            />
                        }
                        title="Innovation"
                        description="Using advanced healthcare technologies for better treatment."
                    />

                    <ValueCard
                        icon={
                            <Eye
                                size={
                                    38
                                }
                            />
                        }
                        title="Trust"
                        description="Building strong patient relationships through honest care."
                    />
                </div>
            </div>
        </div>
    );
};

// STAT CARD

const StatCard = ({
    icon,
    value,
    title,
}) => {
    return (
        <div className="bg-white border border-blue-100 rounded-[40px] p-8 shadow-sm hover:-translate-y-2 transition duration-500 hover:shadow-2xl hover:shadow-blue-100">
            <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                {icon}
            </div>

            <h2 className="text-5xl font-black text-slate-800 mb-3">
                {value}
            </h2>

            <p className="text-slate-500 text-lg font-semibold">
                {title}
            </p>
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

// VALUE CARD

const ValueCard = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="bg-white border border-blue-100 rounded-[40px] p-8 shadow-sm hover:-translate-y-2 transition duration-500 hover:shadow-2xl hover:shadow-blue-100">
            {/* ICON */}

            <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                {icon}
            </div>

            {/* TITLE */}

            <h3 className="text-3xl font-black text-slate-800 mb-5">
                {title}
            </h3>

            {/* DESCRIPTION */}

            <p className="text-slate-500 text-lg leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default About;