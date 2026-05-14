import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    Mail,
    Phone,
    MapPin,
    UserRound,
} from "lucide-react";

const MyPatient = () => {
    // =====================================
    // USER
    // =====================================

    const user = JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    // =====================================
    // STATES
    // =====================================

    const [patients, setPatients] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    // =====================================
    // FETCH PATIENTS
    // =====================================

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients =
        async () => {
            try {
                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/appointments/doctor/${user._id}`
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {
                    // UNIQUE PATIENTS

                    const uniquePatients =
                        [];

                    result.data.forEach(
                        (
                            item
                        ) => {
                            const exists =
                                uniquePatients.find(
                                    (
                                        patient
                                    ) =>
                                        patient._id ===
                                        item
                                            ?.patient
                                            ?._id
                                );

                            if (
                                !exists
                            ) {
                                uniquePatients.push(
                                    item.patient
                                );
                            }
                        }
                    );

                    setPatients(
                        uniquePatients
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
    // FILTERED PATIENTS
    // =====================================

    const filteredPatients =
        useMemo(() => {
            return patients.filter(
                (
                    patient
                ) =>
                    patient?.user?.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||
                    patient?.user?.email
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||
                    patient?.phone
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );
        }, [
            patients,
            search,
        ]);

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

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
                <div>
                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                        My
                        Patients
                    </h2>

                    <p className="text-slate-500 text-lg">
                        View all
                        your
                        patients
                    </p>
                </div>

                {/* SEARCH */}

                <div className="relative w-full lg:w-[420px]">
                    <Search
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                        size={22}
                    />

                    <input
                        type="text"
                        placeholder="Search patient..."
                        value={
                            search
                        }
                        onChange={(
                            e
                        ) =>
                            setSearch(
                                e.target
                                    .value
                            )
                        }
                        className="w-full h-14 bg-white border border-blue-100 rounded-2xl pl-14 pr-5 outline-none focus:border-blue-500 text-slate-700 font-semibold"
                    />
                </div>
            </div>

            {/* ================================= */}
            {/* EMPTY */}
            {/* ================================= */}

            {filteredPatients.length ===
            0 ? (
                <div className="bg-white border border-blue-100 rounded-[40px] p-16 text-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-black mx-auto mb-6">
                        P
                    </div>

                    <h3 className="text-3xl font-black text-slate-800 mb-3">
                        No Patient
                        Found
                    </h3>

                    <p className="text-slate-500 text-lg">
                        No patient
                        available
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
                                        Patient
                                    </th>

                                    <th className="px-6 py-5 text-left text-lg font-bold">
                                        Email
                                    </th>

                                    <th className="px-6 py-5 text-left text-lg font-bold">
                                        Phone
                                    </th>

                                    <th className="px-6 py-5 text-left text-lg font-bold">
                                        Gender
                                    </th>

                                    <th className="px-6 py-5 text-left text-lg font-bold">
                                        Address
                                    </th>

                                    <th className="px-6 py-5 text-left text-lg font-bold">
                                        Emergency
                                    </th>
                                </tr>
                            </thead>

                            {/* ================================= */}
                            {/* BODY */}
                            {/* ================================= */}

                            <tbody>
                                {filteredPatients.map(
                                    (
                                        patient,
                                        index
                                    ) => (
                                        <tr
                                            key={
                                                patient._id
                                            }
                                            className={`border-b border-blue-50 hover:bg-blue-50 transition ${
                                                index %
                                                    2 ===
                                                0
                                                    ? "bg-white"
                                                    : "bg-blue-50/40"
                                            }`}
                                        >
                                            {/* PATIENT */}

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-black uppercase">
                                                        {
                                                            patient
                                                                ?.user
                                                                ?.name?.[0]
                                                        }
                                                    </div>

                                                    <div>
                                                        <h4 className="font-black text-slate-800 text-lg">
                                                            {
                                                                patient
                                                                    ?.user
                                                                    ?.name
                                                            }
                                                        </h4>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* EMAIL */}

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                                                    <Mail
                                                        size={
                                                            18
                                                        }
                                                        className="text-blue-600"
                                                    />

                                                    {
                                                        patient
                                                            ?.user
                                                            ?.email
                                                    }
                                                </div>
                                            </td>

                                            {/* PHONE */}

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                                                    <Phone
                                                        size={
                                                            18
                                                        }
                                                        className="text-blue-600"
                                                    />

                                                    {
                                                        patient?.phone ||
                                                        "N/A"
                                                    }
                                                </div>
                                            </td>

                                            {/* GENDER */}

                                            <td className="px-6 py-5 font-semibold text-slate-700">
                                                {
                                                    patient?.gender ||
                                                    "N/A"
                                                }
                                            </td>

                                            {/* ADDRESS */}

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                                                    <MapPin
                                                        size={
                                                            18
                                                        }
                                                        className="text-blue-600"
                                                    />

                                                    {
                                                        patient?.address ||
                                                        "N/A"
                                                    }
                                                </div>
                                            </td>

                                            {/* EMERGENCY */}

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3 text-slate-700 font-semibold">
                                                    <UserRound
                                                        size={
                                                            18
                                                        }
                                                        className="text-blue-600"
                                                    />

                                                    {patient?.emergencyContact ||
                                                        "N/A"}
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

export default MyPatient;