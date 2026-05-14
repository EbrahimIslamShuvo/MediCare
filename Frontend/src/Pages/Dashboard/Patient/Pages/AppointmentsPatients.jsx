import React, {
    useEffect,
    useState,
} from "react";

import {
    CalendarDays,
    Clock3,
    BadgeDollarSign,
} from "lucide-react";

const AppointmentsPatients =
    () => {
        // =====================================
        // USER
        // =====================================

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

        // =====================================
        // STATES
        // =====================================

        const [
            appointments,
            setAppointments,
        ] = useState([]);

        const [
            loading,
            setLoading,
        ] = useState(true);

        // =====================================
        // FETCH APPOINTMENTS
        // =====================================

        useEffect(() => {
            fetchAppointments();
        }, []);

        const fetchAppointments =
            async () => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/appointments/my/${user._id}`
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setAppointments(
                            result.data
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
        // STATUS STYLE
        // =====================================

        const getStatusStyle =
            (
                status
            ) => {
                switch (
                    status
                ) {
                    case "Confirmed":
                        return "bg-green-100 text-green-600";

                    case "Pending":
                        return "bg-yellow-100 text-yellow-600";

                    case "Cancelled":
                        return "bg-red-100 text-red-600";

                    default:
                        return "bg-slate-100 text-slate-600";
                }
            };

        // =====================================
        // PAYMENT STYLE
        // =====================================

        const getPaymentStyle =
            (
                status
            ) => {
                switch (
                    status
                ) {
                    case "Paid":
                        return "bg-green-100 text-green-600";

                    case "Pending":
                        return "bg-yellow-100 text-yellow-600";

                    case "Failed":
                        return "bg-red-100 text-red-600";

                    default:
                        return "bg-slate-100 text-slate-600";
                }
            };

        // =====================================
        // LOADING
        // =====================================

        if (loading) {
            return (
                <div className="min-h-screen flex justify-center items-center text-2xl font-bold text-blue-600">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-blue-50 p-6">
                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="mb-10">
                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                        My
                        Appointments
                    </h2>

                    <p className="text-slate-500 text-lg">
                        View all
                        your
                        appointments
                    </p>
                </div>

                {/* ================================= */}
                {/* EMPTY */}
                {/* ================================= */}

                {appointments.length ===
                0 ? (
                    <div className="bg-white border border-blue-100 rounded-[40px] p-16 text-center">
                        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6">
                            <CalendarDays
                                size={
                                    40
                                }
                            />
                        </div>

                        <h3 className="text-3xl font-black text-slate-800 mb-3">
                            No
                            Appointment
                            Found
                        </h3>

                        <p className="text-slate-500 text-lg">
                            You
                            haven't
                            booked
                            any
                            appointment
                            yet
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-blue-100 rounded-[40px] shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                {/* ================================= */}
                                {/* HEAD */}
                                {/* ================================= */}

                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Doctor
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Specialization
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Date
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Time
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Serial
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Status
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Payment
                                        </th>
                                    </tr>
                                </thead>

                                {/* ================================= */}
                                {/* BODY */}
                                {/* ================================= */}

                                <tbody>
                                    {appointments.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <tr
                                                key={
                                                    item._id
                                                }
                                                className={`border-b border-blue-50 hover:bg-blue-50 transition ${
                                                    index %
                                                        2 ===
                                                    0
                                                        ? "bg-white"
                                                        : "bg-blue-50/40"
                                                }`}
                                            >
                                                {/* DOCTOR */}

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        {/* IMAGE */}

                                                        {item
                                                            ?.doctor
                                                            ?.image ? (
                                                            <img
                                                                src={`http://127.0.0.1:3000${item.doctor.image}`}
                                                                alt="doctor"
                                                                className="w-14 h-14 rounded-2xl object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-black uppercase">
                                                                {
                                                                    item
                                                                        ?.doctor
                                                                        ?.user
                                                                        ?.name?.[0]
                                                                }
                                                            </div>
                                                        )}

                                                        <div>
                                                            <h4 className="font-black text-slate-800 text-lg">
                                                                Dr.{" "}
                                                                {
                                                                    item
                                                                        ?.doctor
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* SPECIALIZATION */}

                                                <td className="px-6 py-5 font-semibold text-blue-600">
                                                    {
                                                        item
                                                            ?.doctor
                                                            ?.specialization
                                                    }
                                                </td>

                                                {/* DATE */}

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                                        <CalendarDays
                                                            size={
                                                                18
                                                            }
                                                        />

                                                        {
                                                            item?.appointmentDate
                                                        }
                                                    </div>
                                                </td>

                                                {/* TIME */}

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                                        <Clock3
                                                            size={
                                                                18
                                                            }
                                                        />

                                                        {
                                                            item?.appointmentTime
                                                        }
                                                    </div>
                                                </td>

                                                {/* SERIAL */}

                                                <td className="px-6 py-5 font-black text-slate-800">
                                                    #
                                                    {
                                                        item?.serialNumber
                                                    }
                                                </td>

                                                {/* STATUS */}

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`px-4 py-2 rounded-2xl text-sm font-bold ${getStatusStyle(
                                                            item?.status
                                                        )}`}
                                                    >
                                                        {
                                                            item?.status
                                                        }
                                                    </span>
                                                </td>

                                                {/* PAYMENT */}

                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">

                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${getPaymentStyle(
                                                                item?.paymentStatus
                                                            )}`}
                                                        >
                                                            {
                                                                item?.paymentStatus
                                                            }
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        );
    };

export default AppointmentsPatients;