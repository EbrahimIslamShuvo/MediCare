import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    User,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

const PatientsRecptionist =
    () => {
        // =====================================
        // STATES
        // =====================================

        const [
            patients,
            setPatients,
        ] = useState([]);

        const [
            loading,
            setLoading,
        ] = useState(true);

        const [
            search,
            setSearch,
        ] = useState("");

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
                            "http://127.0.0.1:3000/api/v1/patients"
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setPatients(
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
        // FILTERED PATIENTS
        // =====================================

        const filteredPatients =
            useMemo(() => {
                return patients.filter(
                    (
                        item
                    ) => {
                        const patientName =
                            item?.user?.name?.toLowerCase() ||
                            "";

                        const patientEmail =
                            item?.user?.email?.toLowerCase() ||
                            "";

                        const phone =
                            item?.phone?.toLowerCase() ||
                            "";

                        return (
                            patientName.includes(
                                search.toLowerCase()
                            ) ||
                            patientEmail.includes(
                                search.toLowerCase()
                            ) ||
                            phone.includes(
                                search.toLowerCase()
                            )
                        );
                    }
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
                            Patients
                        </h2>

                        <p className="text-slate-500 text-lg">
                            View all
                            registered
                            patients
                        </p>
                    </div>

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
                            placeholder="Search patient..."
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
                </div>

                {/* EMPTY */}

                {filteredPatients.length ===
                    0 && (
                        <div className="bg-white rounded-[35px] border border-blue-100 p-20 text-center">
                            <div className="w-24 h-24 rounded-[30px] bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <User
                                    className="text-blue-600"
                                    size={
                                        45
                                    }
                                />
                            </div>

                            <h2 className="text-3xl font-black text-slate-800 mb-3">
                                No Patients
                                Found
                            </h2>

                            <p className="text-slate-500">
                                Patients
                                will appear
                                here
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {filteredPatients.length >
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
                                                Phone
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Gender
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Blood
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Address
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Joined
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}

                                    <tbody>
                                        {filteredPatients.map(
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
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                                                                <User
                                                                    size={
                                                                        24
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <h4 className="font-black text-slate-800">
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

                                                    {/* PHONE */}

                                                    <td className="px-5 py-5">
                                                        <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                                            <Phone
                                                                size={
                                                                    16
                                                                }
                                                            />

                                                            {
                                                                item.phone ||
                                                                "N/A"
                                                            }
                                                        </div>
                                                    </td>

                                                    {/* GENDER */}

                                                    <td className="px-5 py-5">
                                                        <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-2xl text-sm font-bold">
                                                            {
                                                                item.gender ||
                                                                "N/A"
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* BLOOD */}

                                                    <td className="px-5 py-5">
                                                        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-2xl text-sm font-bold">
                                                            {
                                                                item.bloodGroup ||
                                                                "N/A"
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* ADDRESS */}

                                                    <td className="px-5 py-5">
                                                        <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                                            <MapPin
                                                                size={
                                                                    16
                                                                }
                                                            />

                                                            {
                                                                item.address ||
                                                                "N/A"
                                                            }
                                                        </div>
                                                    </td>

                                                    {/* JOINED */}

                                                    <td className="px-5 py-5 font-semibold text-slate-700">
                                                        {new Date(
                                                            item.createdAt
                                                        ).toLocaleDateString()}
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

export default PatientsRecptionist;