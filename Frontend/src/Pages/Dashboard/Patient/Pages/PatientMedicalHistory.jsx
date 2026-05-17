import React, {
    useEffect,
    useState,
} from "react";

import {
    Search,
    CalendarDays,
    BedDouble,
    BadgeDollarSign,
    Pill,
    FlaskConical,
    FileBadge,
    User,
    Stethoscope,
} from "lucide-react";

const PatientMedicalHistory =
    () => {

        // =========================
        // USER
        // =========================

        const currentUser =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

        // =========================
        // STATES
        // =========================

        const [
            history,
            setHistory,
        ] = useState(
            []
        );

        const [
            loading,
            setLoading,
        ] = useState(
            true
        );

        const [
            selectedHistory,
            setSelectedHistory,
        ] = useState(
            null
        );

        const [
            search,
            setSearch,
        ] = useState(
            ""
        );

        // =========================
        // FETCH HISTORY
        // =========================

        useEffect(
            () => {

                fetchHistory();

            },
            []
        );

        const fetchHistory =
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

                        const myHistory =
                            result.data.filter(
                                (
                                    item
                                ) =>
                                    item
                                        ?.patient
                                        ?.user
                                        ?._id ===
                                    currentUser
                                        ?._id
                            );

                        setHistory(
                            myHistory
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
        // FILTER
        // =========================

        const filteredHistory =
            history.filter(
                (
                    item
                ) =>
                    item?.doctor
                        ?.user
                        ?.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
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
                            Patient Panel
                        </p>

                        <h1 className="text-5xl font-black text-slate-800">
                            Medical History
                        </h1>
                    </div>

                    {/* SEARCH */}

                    <div className="relative w-full md:w-[350px] mb-8">

                        <Search
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                            size={20}
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
                                    e.target
                                        .value
                                )
                            }
                            className="w-full h-14 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none bg-white"
                        />
                    </div>

                    {/* TABLE */}

                    <div className="bg-white rounded-[35px] border border-blue-100 shadow-sm overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1400px]">

                                <thead>

                                    <tr className="bg-blue-50">

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
                                            Total Bill
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Admit Date
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Details
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        filteredHistory
                                            ?.length > 0 ? (

                                            filteredHistory.map(
                                                (
                                                    item
                                                ) => (

                                                    <tr
                                                        key={
                                                            item?._id
                                                        }
                                                        className="border-b border-blue-50 hover:bg-blue-50 transition"
                                                    >

                                                        {/* DOCTOR */}

                                                        <td className="px-6 py-6">

                                                            <div className="flex items-center gap-4">

                                                                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                                                                    <Stethoscope
                                                                        className="text-blue-600"
                                                                        size={20}
                                                                    />
                                                                </div>

                                                                <div>

                                                                    <h2 className="font-black text-slate-800 text-lg">

                                                                        Dr.
                                                                        {" "}

                                                                        {
                                                                            item
                                                                                ?.doctor
                                                                                ?.user
                                                                                ?.name
                                                                        }
                                                                    </h2>

                                                                    <p className="text-slate-500 font-medium">

                                                                        {
                                                                            item
                                                                                ?.doctor
                                                                                ?.user
                                                                                ?.email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* ROOM */}

                                                        <td className="px-6 py-6">

                                                            <div className="flex items-center gap-2 font-bold text-blue-600">

                                                                <BedDouble
                                                                    size={18}
                                                                />

                                                                {
                                                                    item
                                                                        ?.room
                                                                        ?.roomNumber ||
                                                                    "N/A"
                                                                }
                                                            </div>
                                                        </td>

                                                        {/* TYPE */}

                                                        <td className="px-6 py-6">

                                                            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-2xl text-sm font-bold">

                                                                {
                                                                    item?.admitType
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* BILL */}

                                                        <td className="px-6 py-6">

                                                            <div className="flex items-center gap-2 text-green-600 font-black text-lg">

                                                                <BadgeDollarSign
                                                                    size={20}
                                                                />

                                                                ৳
                                                                {
                                                                    item?.totalBill
                                                                }
                                                            </div>
                                                        </td>

                                                        {/* DATE */}

                                                        <td className="px-6 py-6">

                                                            <div className="flex items-center gap-2 text-slate-700 font-semibold">

                                                                <CalendarDays
                                                                    size={18}
                                                                />

                                                                {
                                                                    item?.createdAt
                                                                        ? new Date(
                                                                              item?.createdAt
                                                                          ).toLocaleDateString()
                                                                        : "N/A"
                                                                }
                                                            </div>
                                                        </td>

                                                        {/* STATUS */}

                                                        <td className="px-6 py-6">

                                                            <span
                                                                className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                                                                    item?.status ===
                                                                    "Released"
                                                                        ? "bg-red-100 text-red-700"
                                                                        : item?.status ===
                                                                          "Admitted"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                            >

                                                                {
                                                                    item?.status
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* VIEW */}

                                                        <td className="px-6 py-6">

                                                            <button
                                                                onClick={() =>
                                                                    setSelectedHistory(
                                                                        item
                                                                    )
                                                                }
                                                                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
                                                            >
                                                                View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="7"
                                                    className="text-center py-16"
                                                >

                                                    <h2 className="text-2xl font-black text-slate-400">
                                                        No Medical History Found
                                                    </h2>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* DETAILS MODAL */}

                {
                    selectedHistory && (

                        <div className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center p-5">

                            <div className="bg-white w-full max-w-5xl rounded-[35px] p-8 max-h-[90vh] overflow-y-auto">

                                {/* HEADER */}

                                <div className="flex items-center justify-between mb-8">

                                    <div>

                                        <h2 className="text-4xl font-black text-slate-800">
                                            Medical Details
                                        </h2>

                                        <p className="text-slate-500 font-semibold mt-2">
                                            Complete Prescription & Reports
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setSelectedHistory(
                                                null
                                            )
                                        }
                                        className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 text-2xl font-black"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* PRESCRIPTION */}

                                <div className="bg-blue-50 rounded-[30px] p-8 border border-blue-100 mb-8">

                                    <div className="flex items-center gap-3 mb-6">

                                        <Pill className="text-blue-600" />

                                        <h2 className="text-3xl font-black text-slate-800">
                                            Prescription
                                        </h2>
                                    </div>

                                    {
                                        selectedHistory
                                            ?.medicines
                                            ?.length > 0 ? (

                                            <div className="overflow-x-auto">

                                                <table className="w-full">

                                                    <thead>

                                                        <tr className="bg-white">

                                                            <th className="text-left p-4">
                                                                Medicine
                                                            </th>

                                                            <th className="text-left p-4">
                                                                Duration
                                                            </th>

                                                            <th className="text-left p-4">
                                                                Time
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {
                                                            selectedHistory
                                                                ?.medicines
                                                                ?.map(
                                                                    (
                                                                        medicine,
                                                                        index
                                                                    ) => (

                                                                        <tr
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="border-b border-blue-100"
                                                                        >

                                                                            <td className="p-4 font-black text-slate-800">

                                                                                {
                                                                                    medicine.medicine
                                                                                }
                                                                            </td>

                                                                            <td className="p-4 font-semibold text-slate-700">

                                                                                {
                                                                                    medicine.duration
                                                                                }
                                                                            </td>

                                                                            <td className="p-4">

                                                                                <div className="flex flex-wrap gap-2">

                                                                                    {
                                                                                        medicine.times.map(
                                                                                            (
                                                                                                time,
                                                                                                i
                                                                                            ) => (

                                                                                                <span
                                                                                                    key={
                                                                                                        i
                                                                                                    }
                                                                                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl text-sm font-bold"
                                                                                                >

                                                                                                    {
                                                                                                        time
                                                                                                    }
                                                                                                </span>
                                                                                            )
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        ) : (

                                            <p className="text-slate-500 font-semibold">
                                                No Prescription Found
                                            </p>
                                        )
                                    }
                                </div>

                                {/* REPORTS */}

                                <div className="bg-green-50 rounded-[30px] p-8 border border-green-100">

                                    <div className="flex items-center gap-3 mb-6">

                                        <FlaskConical className="text-green-600" />

                                        <h2 className="text-3xl font-black text-slate-800">
                                            Lab Reports
                                        </h2>
                                    </div>

                                    {
                                        selectedHistory
                                            ?.testRequests
                                            ?.length > 0 ? (

                                            <div className="space-y-5">

                                                {
                                                    selectedHistory
                                                        ?.testRequests
                                                        ?.map(
                                                            (
                                                                test,
                                                                index
                                                            ) => (

                                                                <div
                                                                    key={
                                                                        index
                                                                    }
                                                                    className="bg-white rounded-3xl p-6 border border-green-100"
                                                                >

                                                                    <div className="flex items-center justify-between flex-wrap gap-5">

                                                                        <div>

                                                                            <h2 className="text-2xl font-black text-slate-800 mb-2">

                                                                                {
                                                                                    test.testName
                                                                                }
                                                                            </h2>

                                                                            <p className="text-slate-600 font-semibold">
                                                                                Status:
                                                                                {" "}

                                                                                <span className="text-green-600 font-black">

                                                                                    {
                                                                                        test.status
                                                                                    }
                                                                                </span>
                                                                            </p>

                                                                            {
                                                                                test.report && (

                                                                                    <p className="mt-3 text-slate-700 font-medium">
                                                                                        {
                                                                                            test.report
                                                                                        }
                                                                                    </p>
                                                                                )
                                                                            }
                                                                        </div>

                                                                        {
                                                                            test.reportPdf && (

                                                                                <a
                                                                                    href={`http://127.0.0.1:3000${test.reportPdf}`}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center gap-2 transition"
                                                                                >

                                                                                    <FileBadge
                                                                                        size={20}
                                                                                    />

                                                                                    View PDF
                                                                                </a>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                }
                                            </div>

                                        ) : (

                                            <p className="text-slate-500 font-semibold">
                                                No Reports Found
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    };

export default PatientMedicalHistory;