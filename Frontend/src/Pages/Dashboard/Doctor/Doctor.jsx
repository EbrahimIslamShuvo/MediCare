import React, {
    useEffect,
    useState,
} from "react";

import {
    CalendarDays,
    Clock3,
    Users,
    FileText,
    FlaskConical,
    Activity,
    CheckCircle2,
    XCircle,
} from "lucide-react";

const Doctor = () => {

    // =====================================
    // USER
    // =====================================

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "user"
            ) || "{}"
        );

    // =====================================
    // STATES
    // =====================================

    const [appointments, setAppointments] =
        useState([]);

    const [prescriptions, setPrescriptions] =
        useState([]);

    const [labReports, setLabReports] =
        useState([]);

    const [doctor, setDoctor] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    // =====================================
    // FETCH DATA
    // =====================================

    useEffect(() => {

        fetchDoctorDashboard();

    }, []);

    const fetchDoctorDashboard =
        async () => {

            try {

                // DOCTOR

                const doctorRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/doctors"
                    );

                const doctorData =
                    await doctorRes.json();

                const myDoctor =
                    doctorData?.data?.find(
                        (item) =>
                            String(
                                item?.user?._id
                            ) ===
                            String(
                                currentUser?._id
                            )
                    );

                setDoctor(
                    myDoctor
                );

                // APPOINTMENTS

                const appointmentRes =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/appointments/doctor/${currentUser?._id}`
                    );

                const appointmentData =
                    await appointmentRes.json();

                if (
                    appointmentData.success
                ) {

                    setAppointments(
                        appointmentData.data
                    );
                }

                // PRESCRIPTIONS

                const prescriptionRes =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/prescriptions/doctor/${currentUser?._id}`
                    );

                const prescriptionData =
                    await prescriptionRes.json();

                if (
                    prescriptionData.success
                ) {

                    setPrescriptions(
                        prescriptionData.data
                    );
                }

                // LAB REPORTS

                const labRes =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/lab-tests/doctor/${currentUser?._id}`
                    );

                const labData =
                    await labRes.json();

                if (
                    labData.success
                ) {

                    setLabReports(
                        labData.data
                    );
                }

            } catch (error) {

                console.log(
                    error
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    // =====================================
    // STATS
    // =====================================

    const totalAppointments =
        appointments.length;

    const completedAppointments =
        appointments.filter(
            (item) =>
                item?.status ===
                "Completed"
        ).length;


    const totalPatients =
        [
            ...new Set(
                appointments.map(
                    (item) =>
                        item?.patient?._id
                )
            ),
        ].length;

    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <div className="h-screen flex items-center justify-center text-3xl font-black text-blue-600">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f9ff] p-6">

            <div className="max-w-7xl mx-auto">

                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="mb-10">

                    <p className="uppercase tracking-[6px] text-blue-600 font-black mb-3">
                        Doctor Dashboard
                    </p>

                    <h1 className="text-5xl font-black text-slate-800 leading-tight">
                        Welcome Back,
                        <br />
                        Dr. {
                            doctor?.user?.name
                        }
                    </h1>
                </div>

                {/* ================================= */}
                {/* STATS */}
                {/* ================================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">

                    <StatCard
                        icon={
                            <CalendarDays size={32} />
                        }
                        title="Appointments"
                        value={
                            totalAppointments
                        }
                        bg="bg-blue-600"
                    />

                    <StatCard
                        icon={
                            <Users size={32} />
                        }
                        title="Patients"
                        value={
                            totalPatients
                        }
                        bg="bg-green-600"
                    />

                    <StatCard
                        icon={
                            <CheckCircle2 size={32} />
                        }
                        title="Completed"
                        value={
                            completedAppointments
                        }
                        bg="bg-purple-600"
                    />

                </div>

                {/* ================================= */}
                {/* PROFILE */}
                {/* ================================= */}

                <div className="bg-white rounded-[35px] border border-blue-100 p-8 shadow-sm mb-10">

                    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">

                        {/* IMAGE */}

                        <div className="w-72 h-72 rounded-[35px] overflow-hidden bg-blue-100">

                            {doctor?.image ? (

                                <img
                                    src={`http://127.0.0.1:3000${doctor?.image}`}
                                    alt="doctor"
                                    className="w-full h-full object-cover"
                                />

                            ) : (

                                <div className="w-full h-full flex items-center justify-center text-blue-600 text-7xl font-black">
                                    {
                                        doctor?.user?.name?.[0]
                                    }
                                </div>
                            )}
                        </div>

                        {/* INFO */}

                        <div className="flex-1">

                            <h2 className="text-4xl font-black text-slate-800 mb-3">
                                Dr. {
                                    doctor?.user?.name
                                }
                            </h2>

                            <p className="text-blue-600 font-bold text-xl mb-6">
                                {
                                    doctor?.specialization
                                }
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <InfoBox
                                    title="Department"
                                    value={
                                        doctor?.department
                                    }
                                />

                                <InfoBox
                                    title="Experience"
                                    value={`${doctor?.experience} Years`}
                                />

                                <InfoBox
                                    title="Consultation Fee"
                                    value={`৳ ${doctor?.consultationFee}`}
                                />

                                <InfoBox
                                    title="Status"
                                    value={
                                        doctor?.status
                                    }
                                />

                                <InfoBox
                                    title="Available Time"
                                    value={`${doctor?.startTime} - ${doctor?.endTime}`}
                                />

                                <InfoBox
                                    title="Available Days"
                                    value={
                                        doctor?.availableDays?.join(
                                            ", "
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// =====================================
// STAT CARD
// =====================================

const StatCard = ({
    icon,
    title,
    value,
    bg,
}) => {

    return (
        <div className={`${bg} rounded-[35px] p-8 text-white shadow-lg`}>

            <div className="flex items-center justify-between mb-8">

                <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center">
                    {icon}
                </div>

                <Activity />
            </div>

            <h2 className="text-5xl font-black mb-3">
                {value}
            </h2>

            <p className="text-lg font-semibold text-white/90">
                {title}
            </p>
        </div>
    );
};

// =====================================
// INFO BOX
// =====================================

const InfoBox = ({
    title,
    value,
}) => {

    return (
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5">

            <p className="text-slate-500 font-semibold mb-2">
                {title}
            </p>

            <h3 className="text-xl font-black text-slate-800">
                {value || "N/A"}
            </h3>
        </div>
    );
};

export default Doctor;