import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    UserRound,
    Stethoscope,
    Phone,
    Mail,
} from "lucide-react";

const DoctorsReceptionist =
    () => {
        // =====================================
        // STATES
        // =====================================

        const [
            doctors,
            setDoctors,
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
            statusFilter,
            setStatusFilter,
        ] = useState("All");

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
        // FILTERED DOCTORS
        // =====================================

        const filteredDoctors =
            useMemo(() => {
                return doctors.filter(
                    (
                        item
                    ) => {
                        const doctorName =
                            item?.user?.name?.toLowerCase() ||
                            "";

                        const doctorEmail =
                            item?.user?.email?.toLowerCase() ||
                            "";

                        const specialization =
                            item?.specialization?.toLowerCase() ||
                            "";

                        const matchSearch =
                            doctorName.includes(
                                search.toLowerCase()
                            ) ||
                            doctorEmail.includes(
                                search.toLowerCase()
                            ) ||
                            specialization.includes(
                                search.toLowerCase()
                            );

                        const matchStatus =
                            statusFilter ===
                                "All" ||
                            item.status ===
                                statusFilter;

                        return (
                            matchSearch &&
                            matchStatus
                        );
                    }
                );
            }, [
                doctors,
                search,
                statusFilter,
            ]);

        // =====================================
        // STATUS STYLE
        // =====================================

        const getStatusStyle =
            (status) => {
                switch (
                    status
                ) {
                    case "Active":
                        return "bg-green-100 text-green-600";

                    case "On Leave":
                        return "bg-yellow-100 text-yellow-600";

                    case "Inactive":
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
                            Doctors
                        </h2>

                        <p className="text-slate-500 text-lg">
                            View all
                            doctors and
                            their status
                        </p>
                    </div>

                    {/* FILTER */}

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
                                placeholder="Search doctor..."
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
                                className="w-full md:w-[300px] h-14 pl-12 pr-5 rounded-2xl border border-blue-100 outline-none bg-white"
                            />
                        </div>

                        {/* STATUS */}

                        <select
                            value={
                                statusFilter
                            }
                            onChange={(
                                e
                            ) =>
                                setStatusFilter(
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
                                Active
                            </option>

                            <option>
                                On Leave
                            </option>

                            <option>
                                Inactive
                            </option>
                        </select>
                    </div>
                </div>

                {/* EMPTY */}

                {filteredDoctors.length ===
                    0 && (
                        <div className="bg-white rounded-[35px] border border-blue-100 p-20 text-center">
                            <div className="w-24 h-24 rounded-[30px] bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <Stethoscope
                                    className="text-blue-600"
                                    size={
                                        45
                                    }
                                />
                            </div>

                            <h2 className="text-3xl font-black text-slate-800 mb-3">
                                No Doctors
                                Found
                            </h2>

                            <p className="text-slate-500">
                                Doctors will
                                appear here
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {filteredDoctors.length >
                    0 && (
                        <div className="bg-white rounded-[35px] border border-blue-100 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    {/* HEAD */}

                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-5 py-4 text-left">
                                                Doctor
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Specialization
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Phone
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Experience
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Fee
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Available
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}

                                    <tbody>
                                        {filteredDoctors.map(
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
                                                    {/* DOCTOR */}

                                                    <td className="px-5 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                                                                <UserRound
                                                                    size={
                                                                        24
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <h4 className="font-black text-slate-800">
                                                                    Dr.{" "}
                                                                    {
                                                                        item
                                                                            ?.user
                                                                            ?.name
                                                                    }
                                                                </h4>

                                                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                                    <Mail
                                                                        size={
                                                                            14
                                                                        }
                                                                    />

                                                                    {
                                                                        item
                                                                            ?.user
                                                                            ?.email
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* SPECIALIZATION */}

                                                    <td className="px-5 py-5">
                                                        <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-2xl text-sm font-bold">
                                                            {
                                                                item.specialization
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* PHONE */}

                                                    <td className="px-5 py-5">
                                                        <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                                            <Phone
                                                                size={
                                                                    16
                                                                }
                                                            />

                                                            {
                                                                item.phone
                                                            }
                                                        </div>
                                                    </td>

                                                    {/* EXPERIENCE */}

                                                    <td className="px-5 py-5 font-semibold text-slate-700">
                                                        {
                                                            item.experience
                                                        }{" "}
                                                        Years
                                                    </td>

                                                    {/* FEE */}

                                                    <td className="px-5 py-5 font-black text-slate-800">
                                                        ৳{" "}
                                                        {
                                                            item.consultationFee
                                                        }
                                                    </td>

                                                    {/* AVAILABLE */}

                                                    <td className="px-5 py-5">
                                                        <div className="space-y-2">
                                                            {/* DAYS */}

                                                            <div className="flex flex-wrap gap-2">
                                                                {item.availableDays?.map(
                                                                    (
                                                                        day,
                                                                        index
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-xl text-xs font-bold"
                                                                        >
                                                                            {
                                                                                day
                                                                            }
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>

                                                            {/* TIME */}

                                                            <div className="text-sm font-semibold text-slate-600">
                                                                Availble : {
                                                                    item.startTime
                                                                }
                                                                {" "}
                                                                -
                                                                {" "}
                                                                {
                                                                    item.endTime
                                                                }
                                                            </div>
                                                        </div>
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

export default DoctorsReceptionist;