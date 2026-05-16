import React, {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    Stethoscope,
    Search,
    CalendarDays,
    Clock3,
    Building2,
} from "lucide-react";

const Doctor = () => {
    // =====================================
    // STATES
    // =====================================

    const [doctors, setDoctors] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [department, setDepartment] =
        useState("");

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
    // FILTER
    // =====================================

    const filteredDoctors =
        doctors.filter(
            (doctor) => {
                const matchSearch =
                    doctor?.user?.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||
                    doctor?.specialization
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );

                const matchDepartment =
                    department
                        ? doctor?.department ===
                          department
                        : true;

                return (
                    matchSearch &&
                    matchDepartment
                );
            }
        );

    // =====================================
    // UNIQUE DEPARTMENTS
    // =====================================

    const departments =
        [
            ...new Set(
                doctors.map(
                    (
                        item
                    ) =>
                        item.department
                )
            ),
        ];

    return (
        <div className="min-h-screen bg-[#f5f9ff]">

            {/* ================================= */}
            {/* HERO */}
            {/* ================================= */}

            <div className="relative h-[420px] overflow-hidden">

                <img
                    src="https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?q=80&w=2070&auto=format&fit=crop"
                    alt="doctor"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                    <p className="uppercase tracking-[6px] text-blue-300 font-black mb-5">
                        Our Specialists
                    </p>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight max-w-5xl">
                        Meet Our
                        Experienced
                        Doctors
                    </h1>

                    <p className="text-slate-200 text-lg mt-6 max-w-2xl leading-relaxed">
                        Book appointments
                        with expert doctors
                        from different
                        medical departments.
                    </p>
                </div>
            </div>

            {/* ================================= */}
            {/* FILTER */}
            {/* ================================= */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 -mt-16 relative z-20">

                <div className="bg-white rounded-[35px] shadow-2xl p-6 border border-blue-100">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* SEARCH */}

                        <div className="relative">

                            <Search
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                size={20}
                            />

                            <input
                                type="text"
                                placeholder="Search doctor or specialization..."
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
                                className="w-full h-14 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* DEPARTMENT */}

                        <select
                            value={
                                department
                            }
                            onChange={(
                                e
                            ) =>
                                setDepartment(
                                    e
                                        .target
                                        .value
                                )
                            }
                            className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none focus:border-blue-500"
                        >
                            <option value="">
                                All Departments
                            </option>

                            {departments.map(
                                (
                                    dept,
                                    index
                                ) => (
                                    <option
                                        key={
                                            index
                                        }
                                        value={
                                            dept
                                        }
                                    >
                                        {
                                            dept
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>
            </div>

            {/* ================================= */}
            {/* DOCTOR LIST */}
            {/* ================================= */}

            <div className="max-w-7xl mx-auto px-6 lg:px-0 py-24">

                {/* TITLE */}

                <div className="text-center mb-16">

                    <p className="uppercase tracking-[6px] text-blue-600 font-black mb-4">
                        Specialists
                    </p>

                    <h2 className="text-5xl font-black text-slate-800">
                        Our Medical Team
                    </h2>
                </div>

                {/* LOADING */}

                {loading ? (
                    <div className="text-center text-3xl font-black text-blue-600 py-24">
                        Loading...
                    </div>
                ) : filteredDoctors.length ===
                  0 ? (
                    <div className="text-center text-2xl font-bold text-slate-500 py-24">
                        No Doctor Found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                        {filteredDoctors.map(
                            (
                                doctor
                            ) => (
                                <div
                                    key={
                                        doctor._id
                                    }
                                    className="bg-white rounded-[35px] overflow-hidden border border-blue-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-500"
                                >

                                    {/* IMAGE */}

                                    <div className="h-[350px] overflow-hidden relative">

                                        {doctor?.image ? (
                                            <img
                                                src={`http://127.0.0.1:3000${doctor.image}`}
                                                alt={
                                                    doctor
                                                        ?.user
                                                        ?.name
                                                }
                                                className="w-full h-full object-cover hover:scale-110 transition duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-7xl font-black">
                                                {
                                                    doctor
                                                        ?.user
                                                        ?.name?.[0]
                                                }
                                            </div>
                                        )}

                                        {/* STATUS */}

                                        <div className="absolute top-5 right-5">

                                            <span className={`px-4 py-2 rounded-full text-sm font-black shadow-lg ${
                                                doctor?.status ===
                                                "Available"
                                                    ? "bg-green-500 text-white"
                                                    : doctor?.status ===
                                                      "On Leave"
                                                    ? "bg-orange-500 text-white"
                                                    : "bg-red-500 text-white"
                                            }`}>
                                                {
                                                    doctor?.status
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    {/* CONTENT */}

                                    <div className="p-8">

                                        {/* NAME */}

                                        <h2 className="text-3xl font-black text-slate-800 mb-2">
                                            Dr.{" "}
                                            {
                                                doctor
                                                    ?.user
                                                    ?.name
                                            }
                                        </h2>

                                        {/* SPECIALIZATION */}

                                        <div className="flex items-center gap-2 text-blue-600 font-semibold mb-5">

                                            <Stethoscope
                                                size={
                                                    18
                                                }
                                            />

                                            <span>
                                                {
                                                    doctor?.specialization
                                                }
                                            </span>
                                        </div>

                                        {/* INFO */}

                                        <div className="space-y-4 mb-7">

                                            <div className="flex items-center gap-3 text-slate-600">

                                                <Building2
                                                    size={
                                                        18
                                                    }
                                                />

                                                <span className="font-medium">
                                                    {
                                                        doctor?.department
                                                    }
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 text-slate-600">

                                                <CalendarDays
                                                    size={
                                                        18
                                                    }
                                                />

                                                <span className="font-medium">
                                                    {doctor?.availableDays?.join(
                                                        ", "
                                                    )}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 text-slate-600">

                                                <Clock3
                                                    size={
                                                        18
                                                    }
                                                />

                                                <span className="font-medium">
                                                    {
                                                        doctor?.startTime
                                                    }{" "}
                                                    -
                                                    {" "}
                                                    {
                                                        doctor?.endTime
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        {/* BUTTON */}

                                        <Link
                                            to={`/doctor/${doctor?._id}`}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-2xl flex items-center justify-center font-black transition duration-300"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Doctor;