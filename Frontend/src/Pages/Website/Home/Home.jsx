import React, {
    useEffect,
    useState,
} from "react";

import {
    Ambulance,
    ArrowRight,
    Calendar,
    FlaskConical,
    HeartPulse,
    ShieldCheck,
    Stethoscope,
    Users,
} from "lucide-react";

const Home = () => {
    // =====================================
    // STATES
    // =====================================

    const [doctors, setDoctors] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // =====================================
    // FETCH DOCTORS
    // =====================================

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors =
        async () => {
            try {
                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/doctors"
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {
                    setDoctors(
                        result.data.slice(
                            0,
                            4
                        )
                    );
                }
            } catch (
            error
            ) {
                console.log(
                    error
                );
            } finally {
                setLoading(
                    false
                );
            }
        };

    return (
        <div className="bg-[#f7fbff] overflow-hidden">
            {/* ===================================== */}
            {/* HERO */}
            {/* ===================================== */}

            <div
                className="relative min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2000&auto=format&fit=crop')",
                }}
            >
                {/* OVERLAY */}

                <div className="absolute inset-0 bg-black/60"></div>

                {/* CONTENT */}

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-0 min-h-screen flex items-center">
                    <div className="max-w-3xl">
                        <p className="uppercase tracking-[8px] text-blue-200 font-black mb-6">
                            Modern Healthcare
                        </p>

                        <h1 className="text-5xl lg:text-8xl font-black text-white leading-tight mb-8">
                            Caring For
                            <br />
                            Your Health
                        </h1>

                        <p className="text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl">
                            Trusted healthcare
                            services with
                            specialist doctors,
                            emergency ambulance
                            support, advanced
                            laboratory testing,
                            and patient-focused
                            treatment.
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl font-black transition duration-300 flex items-center gap-3 shadow-2xl shadow-blue-500/30">
                                Book Appointment

                                <ArrowRight
                                    size={
                                        20
                                    }
                                />
                            </button>

                            <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-3xl font-black transition duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================================== */}
            {/* QUICK SERVICES */}
            {/* ===================================== */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 -mt-28 relative z-20 pb-28">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ===================================== */}
                    {/* APPOINTMENT */}
                    {/* ===================================== */}

                    <div className="group relative overflow-hidden rounded-[45px] bg-gradient-to-br from-blue-600 to-cyan-500 p-[1px] shadow-2xl shadow-blue-500/20 hover:-translate-y-3 transition duration-500">
                        <div className="relative h-full rounded-[45px] bg-white p-8 overflow-hidden">
                            <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-blue-100 opacity-70"></div>

                            <div className="relative z-10 w-24 h-24 rounded-[30px] bg-blue-600 text-white flex items-center justify-center mb-8 shadow-lg shadow-blue-300">
                                <Calendar
                                    size={
                                        42
                                    }
                                />
                            </div>

                            <div className="relative z-10">
                                <p className="uppercase tracking-[4px] text-blue-600 font-black mb-3">
                                    Healthcare
                                </p>

                                <h3 className="text-4xl font-black text-slate-800 leading-tight mb-5">
                                    Book
                                    <br />
                                    Appointment
                                </h3>

                                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                    Schedule your
                                    visit with
                                    specialist
                                    doctors and
                                    receive trusted
                                    healthcare
                                    support anytime.
                                </p>

                                <div className="space-y-4 mb-10">
                                    <FeatureItem text="Specialist Doctors" />

                                    <FeatureItem text="Online Booking" />

                                    <FeatureItem text="Instant Confirmation" />
                                </div>

                                <button className="group-hover:bg-blue-700 bg-blue-600 text-white px-7 py-4 rounded-3xl font-black flex items-center gap-3 transition duration-300 shadow-lg shadow-blue-200">
                                    Book Now

                                    <ArrowRight
                                        size={
                                            20
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ===================================== */}
                    {/* AMBULANCE */}
                    {/* ===================================== */}

                    <div className="group relative overflow-hidden rounded-[45px] bg-gradient-to-br from-red-500 to-orange-500 p-[1px] shadow-2xl shadow-red-500/20 hover:-translate-y-3 transition duration-500">
                        <div className="relative h-full rounded-[45px] bg-white p-8 overflow-hidden">
                            <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-red-100 opacity-70"></div>

                            <div className="relative z-10 w-24 h-24 rounded-[30px] bg-red-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-red-200">
                                <Ambulance
                                    size={
                                        42
                                    }
                                />
                            </div>

                            <div className="relative z-10">
                                <p className="uppercase tracking-[4px] text-red-500 font-black mb-3">
                                    Emergency
                                </p>

                                <h3 className="text-4xl font-black text-slate-800 leading-tight mb-5">
                                    Request
                                    <br />
                                    Ambulance
                                </h3>

                                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                    Fast emergency
                                    ambulance
                                    response with
                                    trained medical
                                    support
                                    available 24/7.
                                </p>

                                <div className="space-y-4 mb-10">
                                    <FeatureItem text="24/7 Emergency" />

                                    <FeatureItem text="Quick Response" />

                                    <FeatureItem text="Trained Staff" />
                                </div>

                                <button className="group-hover:bg-red-600 bg-red-500 text-white px-7 py-4 rounded-3xl font-black flex items-center gap-3 transition duration-300 shadow-lg shadow-red-200">
                                    Request Now

                                    <ArrowRight
                                        size={
                                            20
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ===================================== */}
                    {/* LAB TEST */}
                    {/* ===================================== */}

                    <div className="group relative overflow-hidden rounded-[45px] bg-gradient-to-br from-emerald-500 to-teal-500 p-[1px] shadow-2xl shadow-emerald-500/20 hover:-translate-y-3 transition duration-500">
                        <div className="relative h-full rounded-[45px] bg-white p-8 overflow-hidden">
                            <div className="absolute -top-20 left-10 w-56 h-56 rounded-full bg-emerald-100 opacity-70"></div>

                            <div className="relative z-10 w-24 h-24 rounded-[30px] bg-emerald-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-emerald-200">
                                <FlaskConical
                                    size={
                                        42
                                    }
                                />
                            </div>

                            <div className="relative z-10">
                                <p className="uppercase tracking-[4px] text-emerald-600 font-black mb-3">
                                    Diagnostics
                                </p>

                                <h3 className="text-4xl font-black text-slate-800 leading-tight mb-5">
                                    Laboratory
                                    <br />
                                    Testing
                                </h3>

                                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                    Advanced
                                    diagnostic
                                    tests with
                                    accurate
                                    reports and
                                    modern medical
                                    technology.
                                </p>

                                <div className="space-y-4 mb-10">
                                    <FeatureItem text="Accurate Reports" />

                                    <FeatureItem text="Modern Equipment" />

                                    <FeatureItem text="Fast Results" />
                                </div>

                                <button className="group-hover:bg-emerald-600 bg-emerald-500 text-white px-7 py-4 rounded-3xl font-black flex items-center gap-3 transition duration-300 shadow-lg shadow-emerald-200">
                                    Book Test

                                    <ArrowRight
                                        size={
                                            20
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================================== */}
            {/* OUR SERVICES */}
            {/* ===================================== */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 pb-24">
                <div className="text-center mb-16">
                    <p className="text-blue-600 uppercase tracking-[6px] font-black mb-4">
                        Our Services
                    </p>

                    <h2 className="text-5xl font-black text-slate-800 mb-6">
                        Healthcare Solutions
                    </h2>

                    <p className="text-slate-500 text-lg max-w-3xl mx-auto">
                        We provide modern
                        healthcare services
                        designed for patient
                        comfort and better
                        treatment experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    <ServiceCard
                        icon={
                            <Stethoscope
                                size={
                                    36
                                }
                            />
                        }
                        title="Doctor Consultation"
                    />

                    <ServiceCard
                        icon={
                            <HeartPulse
                                size={
                                    36
                                }
                            />
                        }
                        title="Heart Care"
                    />

                    <ServiceCard
                        icon={
                            <ShieldCheck
                                size={
                                    36
                                }
                            />
                        }
                        title="Patient Safety"
                    />

                    <ServiceCard
                        icon={
                            <FlaskConical
                                size={
                                    36
                                }
                            />
                        }
                        title="Medical Testing"
                    />
                </div>
            </div>

            {/* ===================================== */}
            {/* DOCTORS */}
            {/* ===================================== */}

            <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-0">
                    <div className="text-center mb-16">
                        <p className="text-blue-600 uppercase tracking-[6px] font-black mb-4">
                            Our Doctors
                        </p>

                        <h2 className="text-5xl font-black text-slate-800 mb-6">
                            Meet Specialists
                        </h2>
                    </div>

                    {loading ? (
                        <div className="text-center text-2xl font-black text-blue-600">
                            Loading...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                            {doctors.map(
                                (
                                    doctor
                                ) => (
                                    <DoctorCard
                                        key={
                                            doctor._id
                                        }
                                        doctor={
                                            doctor
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ===================================== */}
            {/* VALUES */}
            {/* ===================================== */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 py-24">
                <div className="text-center mb-16">
                    <p className="text-blue-600 uppercase tracking-[6px] font-black mb-4">
                        Our Values
                    </p>

                    <h2 className="text-5xl font-black text-slate-800 mb-6">
                        Why Patients Trust
                        Us
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ValueCard
                        icon={
                            <HeartPulse
                                size={
                                    38
                                }
                            />
                        }
                        title="Compassion"
                        description="Every patient is treated with kindness and respect."
                    />

                    <ValueCard
                        icon={
                            <ShieldCheck
                                size={
                                    38
                                }
                            />
                        }
                        title="Safety"
                        description="Modern and secure healthcare for every patient."
                    />

                    <ValueCard
                        icon={
                            <Users
                                size={
                                    38
                                }
                            />
                        }
                        title="Trust"
                        description="Building trusted relationships through quality care."
                    />
                </div>
            </div>
        </div>
    );
};

// =====================================
// FEATURE ITEM
// =====================================

const FeatureItem = ({
    text,
}) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>

            <p className="text-slate-600 font-semibold">
                {text}
            </p>
        </div>
    );
};

// =====================================
// SERVICE CARD
// =====================================

const ServiceCard = ({
    icon,
    title,
}) => {
    return (
        <div className="bg-white border border-blue-100 rounded-[35px] p-8 text-center shadow-sm hover:-translate-y-2 transition duration-500 hover:shadow-xl hover:shadow-blue-100">
            <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6">
                {icon}
            </div>

            <h3 className="text-2xl font-black text-slate-800">
                {title}
            </h3>
        </div>
    );
};

// =====================================
// DOCTOR CARD
// =====================================

const DoctorCard = ({
    doctor,
}) => {
    return (
        <div className="bg-[#f7fbff] border border-blue-100 rounded-[40px] overflow-hidden shadow-sm hover:-translate-y-2 transition duration-500 hover:shadow-xl hover:shadow-blue-100">
            <img
                src={`http://127.0.0.1:3000${doctor?.image}`}
                alt={
                    doctor?.user?.name
                }
                className="w-full h-[350px] object-cover"
            />

            <div className="p-6 text-center">
                <h3 className="text-2xl font-black text-slate-800 mb-2">
                    Dr.{" "}
                    {
                        doctor
                            ?.user
                            ?.name
                    }
                </h3>

                <p className="text-blue-600 font-semibold text-lg mb-2">
                    {
                        doctor?.specialization
                    }
                </p>

                <p className="text-slate-500">
                    ৳{" "}
                    {
                        doctor?.consultationFee
                    }{" "}
                    Consultation
                </p>
            </div>
        </div>
    );
};

// =====================================
// VALUE CARD
// =====================================

const ValueCard = ({
    icon,
    title,
    description,
}) => {
    return (
        <div className="bg-white border border-blue-100 rounded-[40px] p-8 shadow-sm hover:-translate-y-2 transition duration-500 hover:shadow-xl hover:shadow-blue-100">
            <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                {icon}
            </div>

            <h3 className="text-3xl font-black text-slate-800 mb-4">
                {title}
            </h3>

            <p className="text-slate-500 text-lg leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default Home;