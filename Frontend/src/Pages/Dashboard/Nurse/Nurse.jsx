import React, {
    useEffect,
    useState,
} from "react";

import {
    Users,
    BedDouble,
    CheckCircle2,
    Activity,
} from "lucide-react";

const Nurse =
    () => {

        // =========================
        // STATES
        // =========================

        const [
            patients,
            setPatients,
        ] = useState(
            []
        );

        const [
            loading,
            setLoading,
        ] = useState(
            true
        );

        // =========================
        // FETCH DATA
        // =========================

        useEffect(
            () => {

                fetchPatients();

            },
            []
        );

        const fetchPatients =
            async () => {

                try {

                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/admit-requests"
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

        // =========================
        // FILTERS
        // =========================

        const admittedPatients =
            patients.filter(
                (
                    item
                ) =>
                    item.status ===
                    "Admitted"
            );

        const releasedPatients =
            patients.filter(
                (
                    item
                ) =>
                    item.status ===
                    "Released"
            );

        const pendingPatients =
            patients.filter(
                (
                    item
                ) =>
                    item.status ===
                    "Pending"
            );

        // =========================
        // LOADING
        // =========================

        if (
            loading
        ) {

            return (
                <div className="h-screen flex items-center justify-center text-3xl font-black text-blue-600">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-[#f4f9ff] p-6">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}

                    <div className="mb-10">

                        <p className="uppercase tracking-[6px] text-blue-600 font-black mb-3">
                            Nurse Dashboard
                        </p>

                        <h1 className="text-5xl font-black text-slate-800">
                            Overview
                        </h1>
                    </div>

                    {/* CARDS */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                        {/* TOTAL */}

                        <div className="bg-white rounded-[30px] p-7 border border-blue-100 shadow-sm">

                            <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center mb-6">

                                <Users className="text-blue-600" size={28} />
                            </div>

                            <p className="text-slate-500 font-bold mb-2">
                                Total Patients
                            </p>

                            <h2 className="text-5xl font-black text-slate-800">

                                {
                                    patients.length
                                }
                            </h2>
                        </div>

                        {/* ADMITTED */}

                        <div className="bg-white rounded-[30px] p-7 border border-green-100 shadow-sm">

                            <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center mb-6">

                                <BedDouble className="text-green-600" size={28} />
                            </div>

                            <p className="text-slate-500 font-bold mb-2">
                                Admitted Patients
                            </p>

                            <h2 className="text-5xl font-black text-green-600">

                                {
                                    admittedPatients.length
                                }
                            </h2>
                        </div>

                        {/* RELEASED */}

                        <div className="bg-white rounded-[30px] p-7 border border-red-100 shadow-sm">

                            <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center mb-6">

                                <CheckCircle2 className="text-red-600" size={28} />
                            </div>

                            <p className="text-slate-500 font-bold mb-2">
                                Released Patients
                            </p>

                            <h2 className="text-5xl font-black text-red-600">

                                {
                                    releasedPatients.length
                                }
                            </h2>
                        </div>

                        {/* PENDING */}

                        <div className="bg-white rounded-[30px] p-7 border border-yellow-100 shadow-sm">

                            <div className="w-16 h-16 rounded-3xl bg-yellow-100 flex items-center justify-center mb-6">

                                <Activity className="text-yellow-600" size={28} />
                            </div>

                            <p className="text-slate-500 font-bold mb-2">
                                Pending Patients
                            </p>

                            <h2 className="text-5xl font-black text-yellow-600">

                                {
                                    pendingPatients.length
                                }
                            </h2>
                        </div>
                    </div>

                    {/* ADMITTED PATIENTS */}

                    <div className="bg-white rounded-[35px] border border-blue-100 shadow-sm overflow-hidden mb-10">

                        <div className="px-8 py-6 border-b border-blue-100">

                            <h2 className="text-3xl font-black text-slate-800">
                                Admitted Patients
                            </h2>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1000px]">

                                <thead>

                                    <tr className="bg-blue-50">

                                        <th className="text-left px-6 py-5">
                                            Patient
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Doctor
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Room
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Admit Type
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        admittedPatients
                                            ?.length > 0 ? (

                                            admittedPatients.map(
                                                (
                                                    item
                                                ) => (

                                                    <tr
                                                        key={
                                                            item?._id
                                                        }
                                                        className="border-b border-blue-50 hover:bg-blue-50 transition"
                                                    >

                                                        {/* PATIENT */}

                                                        <td className="px-6 py-6">

                                                            <div>

                                                                <h2 className="font-black text-slate-800 text-lg">

                                                                    {
                                                                        item
                                                                            ?.patient
                                                                            ?.user
                                                                            ?.name
                                                                    }
                                                                </h2>

                                                                <p className="text-slate-500 font-medium">

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

                                                        <td className="px-6 py-6 font-bold text-slate-700">

                                                            Dr.
                                                            {" "}

                                                            {
                                                                item
                                                                    ?.doctor
                                                                    ?.user
                                                                    ?.name
                                                            }
                                                        </td>

                                                        {/* ROOM */}

                                                        <td className="px-6 py-6 font-bold text-blue-600">

                                                            {
                                                                item
                                                                    ?.room
                                                                    ?.roomNumber ||
                                                                "N/A"
                                                            }
                                                        </td>

                                                        {/* TYPE */}

                                                        <td className="px-6 py-6">

                                                            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-2xl text-sm font-bold">

                                                                {
                                                                    item?.admitType
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* STATUS */}

                                                        <td className="px-6 py-6">

                                                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl text-sm font-bold">

                                                                Admitted
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="text-center py-16"
                                                >

                                                    <h2 className="text-2xl font-black text-slate-400">
                                                        No Admitted Patients
                                                    </h2>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RELEASED PATIENTS */}

                    <div className="bg-white rounded-[35px] border border-red-100 shadow-sm overflow-hidden">

                        <div className="px-8 py-6 border-b border-red-100">

                            <h2 className="text-3xl font-black text-slate-800">
                                Recently Released Patients
                            </h2>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1000px]">

                                <thead>

                                    <tr className="bg-red-50">

                                        <th className="text-left px-6 py-5">
                                            Patient
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Doctor
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Room
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Bill
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        releasedPatients
                                            ?.slice(
                                                0,
                                                5
                                            )
                                            ?.map(
                                                (
                                                    item
                                                ) => (

                                                    <tr
                                                        key={
                                                            item?._id
                                                        }
                                                        className="border-b border-red-50 hover:bg-red-50 transition"
                                                    >

                                                        {/* PATIENT */}

                                                        <td className="px-6 py-6">

                                                            <div>

                                                                <h2 className="font-black text-slate-800 text-lg">

                                                                    {
                                                                        item
                                                                            ?.patient
                                                                            ?.user
                                                                            ?.name
                                                                    }
                                                                </h2>

                                                                <p className="text-slate-500 font-medium">

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

                                                        <td className="px-6 py-6 font-bold text-slate-700">

                                                            Dr.
                                                            {" "}

                                                            {
                                                                item
                                                                    ?.doctor
                                                                    ?.user
                                                                    ?.name
                                                            }
                                                        </td>

                                                        {/* ROOM */}

                                                        <td className="px-6 py-6 font-bold text-blue-600">

                                                            {
                                                                item
                                                                    ?.room
                                                                    ?.roomNumber ||
                                                                "N/A"
                                                            }
                                                        </td>

                                                        {/* BILL */}

                                                        <td className="px-6 py-6 font-black text-green-600">

                                                            ৳
                                                            {
                                                                item?.totalBill
                                                            }
                                                        </td>

                                                        {/* STATUS */}

                                                        <td className="px-6 py-6">

                                                            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-2xl text-sm font-bold">

                                                                Released
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

export default Nurse;