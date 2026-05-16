import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Calendar,
    Search,
    UserRound,
} from "lucide-react";

const AppointmentReceptionist =
    () => {
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

        const [
            search,
            setSearch,
        ] = useState("");

        const [
            filter,
            setFilter,
        ] = useState("All");

        // =====================================
        // FETCH
        // =====================================

        useEffect(() => {
            fetchAppointments();
        }, []);

        const fetchAppointments =
            async () => {
                try {
                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/appointments/staff/all"
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

        // =====================================
        // FILTERED
        // =====================================

        const filteredAppointments =
            useMemo(() => {
                const today =
                    new Date();

                return appointments.filter(
                    (
                        item
                    ) => {
                        // SEARCH

                        const patientName =
                            item?.patient?.user?.name?.toLowerCase() ||
                            "";

                        const doctorName =
                            item?.doctor?.user?.name?.toLowerCase() ||
                            "";

                        const email =
                            item?.patient?.user?.email?.toLowerCase() ||
                            "";

                        const matchSearch =
                            patientName.includes(
                                search.toLowerCase()
                            ) ||
                            doctorName.includes(
                                search.toLowerCase()
                            ) ||
                            email.includes(
                                search.toLowerCase()
                            );

                        // DATE FILTER

                        if (
                            filter ===
                            "Today"
                        ) {
                            const appointmentDate =
                                new Date(
                                    item.appointmentDate
                                );

                            return (
                                matchSearch &&
                                appointmentDate.toDateString() ===
                                    today.toDateString()
                            );
                        }

                        if (
                            filter ===
                            "This Month"
                        ) {
                            const appointmentDate =
                                new Date(
                                    item.appointmentDate
                                );

                            return (
                                matchSearch &&
                                appointmentDate.getMonth() ===
                                    today.getMonth() &&
                                appointmentDate.getFullYear() ===
                                    today.getFullYear()
                            );
                        }

                        return matchSearch;
                    }
                );
            }, [
                appointments,
                search,
                filter,
            ]);

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
        // STATUS STYLE
        // =====================================

        const getStatusStyle =
            (status) => {
                switch (
                    status
                ) {
                    case "Completed":
                        return "bg-green-100 text-green-600";

                    case "Cancelled":
                        return "bg-red-100 text-red-600";

                    default:
                        return "bg-blue-100 text-blue-600";
                }
            };

        // =====================================
        // LOADING
        // =====================================

        if (loading) {
            return (
                <div className="min-h-screen flex justify-center items-center text-3xl font-black text-blue-600">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-blue-50 p-6">
                {/* HEADER */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 mb-2">
                            Appointments
                        </h2>

                        <p className="text-slate-500 text-lg">
                            Manage all
                            appointments
                        </p>
                    </div>

                    {/* FILTERS */}

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* SEARCH */}

                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                size={
                                    20
                                }
                            />

                            <input
                                type="text"
                                placeholder="Search patient or doctor..."
                                value={
                                    search
                                }
                                onChange={(
                                    e
                                ) =>
                                    setSearch(
                                        e
                                            .target
                                            .value
                                    )
                                }
                                className="w-full md:w-[320px] h-14 pl-12 pr-5 rounded-2xl border border-blue-100 outline-none bg-white"
                            />
                        </div>

                        {/* FILTER */}

                        <select
                            value={
                                filter
                            }
                            onChange={(
                                e
                            ) =>
                                setFilter(
                                    e
                                        .target
                                        .value
                                )
                            }
                            className="h-14 px-5 rounded-2xl border border-blue-100 outline-none bg-white"
                        >
                            <option>
                                All
                            </option>

                            <option>
                                Today
                            </option>

                            <option>
                                This Month
                            </option>
                        </select>
                    </div>
                </div>

                {/* EMPTY */}

                {filteredAppointments.length ===
                    0 && (
                        <div className="bg-white rounded-[35px] border border-blue-100 p-20 text-center">
                            <div className="w-24 h-24 rounded-[30px] bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <Calendar className="text-blue-600" size={45} />
                            </div>

                            <h2 className="text-3xl font-black text-slate-800 mb-3">
                                No
                                Appointments
                            </h2>

                            <p className="text-slate-500">
                                Appointments
                                will
                                appear
                                here
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {filteredAppointments.length >
                    0 && (
                        <div className="bg-white rounded-[35px] border border-blue-100 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    {/* HEAD */}

                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-5 py-4 text-left">
                                                Patient
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Doctor
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Date
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Time
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Fee
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Payment
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}

                                    <tbody>
                                        {filteredAppointments.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <tr
                                                    key={
                                                        item._id
                                                    }
                                                    className={`border-b border-blue-50 ${
                                                        index %
                                                            2 ===
                                                        0
                                                            ? "bg-white"
                                                            : "bg-blue-50/40"
                                                    }`}
                                                >
                                                    {/* PATIENT */}

                                                    <td className="px-5 py-5">
                                                        <div>
                                                            <h4 className="font-black text-slate-800">
                                                                {
                                                                    item
                                                                        ?.patient
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            </h4>

                                                            <p className="text-slate-500 text-sm">
                                                                {
                                                                    item
                                                                        ?.patient
                                                                        ?.user
                                                                        ?.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>

                                                    {/* DOCTOR */}

                                                    <td className="px-5 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                                                                <UserRound
                                                                    size={
                                                                        20
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <h4 className="font-black text-slate-800">
                                                                    Dr.{" "}
                                                                    {
                                                                        item
                                                                            ?.doctor
                                                                            ?.user
                                                                            ?.name
                                                                    }
                                                                </h4>

                                                                <p className="text-blue-600 text-sm font-semibold">
                                                                    {
                                                                        item
                                                                            ?.doctor
                                                                            ?.specialization
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* DATE */}

                                                    <td className="px-5 py-5 font-semibold text-slate-700">
                                                        {
                                                            item.appointmentDate
                                                        }
                                                    </td>

                                                    {/* TIME */}

                                                    <td className="px-5 py-5 font-semibold text-slate-700">
                                                        {
                                                            item.appointmentTime
                                                        }
                                                    </td>

                                                    {/* FEE */}

                                                    <td className="px-5 py-5 font-black text-slate-800">
                                                        ৳{" "}
                                                        {
                                                            item
                                                                ?.doctor
                                                                ?.consultationFee
                                                        }
                                                    </td>

                                                    {/* PAYMENT */}

                                                    <td className="px-5 py-5">
                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${getPaymentStyle(
                                                                item.paymentStatus
                                                            )}`}
                                                        >
                                                            {
                                                                item.paymentStatus
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="px-5 py-5">
                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${getStatusStyle(
                                                                item.status
                                                            )}`}
                                                        >
                                                            {
                                                                item.status
                                                            }
                                                        </span>
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

export default AppointmentReceptionist;