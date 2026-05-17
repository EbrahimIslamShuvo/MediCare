import React, {
    useEffect,
    useState,
} from "react";

import {
    Search,
    FileText,
    CalendarDays,
    BedDouble,
    User,
    BadgeDollarSign,
    Pill,
    FlaskConical,
    FileBadge,
} from "lucide-react";

const LogAndReports =
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

        const [
            search,
            setSearch,
        ] = useState(
            ""
        );

        const [
            selectedPatient,
            setSelectedPatient,
        ] = useState(
            null
        );

        // =========================
        // FETCH RELEASED PATIENTS
        // =========================

        useEffect(
            () => {

                fetchReleasedPatients();

            },
            []
        );

        const fetchReleasedPatients =
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

                        const released =
                            result.data.filter(
                                (
                                    item
                                ) =>
                                    item.status ===
                                    "Released"
                            );

                        setPatients(
                            released
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

        const filteredPatients =
            patients.filter(
                (
                    item
                ) =>
                    item?.patient
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
                            Hospital Reports
                        </p>

                        <h1 className="text-5xl font-black text-slate-800">
                            Released Patient Logs
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
                                            Patient
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Doctor
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Room
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Total Bill
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Released Date
                                        </th>

                                        <th className="text-left px-6 py-5">
                                            Prescription
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        filteredPatients.map(
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

                                                        <div className="flex items-center gap-4">

                                                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">

                                                                <User
                                                                    className="text-blue-600"
                                                                    size={20}
                                                                />
                                                            </div>

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
                                                                item?.releasedAt
                                                                    ? new Date(
                                                                          item?.releasedAt
                                                                      ).toLocaleDateString()
                                                                    : "N/A"
                                                            }
                                                        </div>
                                                    </td>

                                                    {/* VIEW */}

                                                    <td className="px-6 py-6">

                                                        <button
                                                            onClick={() =>
                                                                setSelectedPatient(
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
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* MODAL */}

                {
                    selectedPatient && (

                        <div className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center p-5">

                            <div className="bg-white w-full max-w-5xl rounded-[35px] p-8 max-h-[90vh] overflow-y-auto">

                                {/* HEADER */}

                                <div className="flex items-center justify-between mb-8">

                                    <div>

                                        <h2 className="text-4xl font-black text-slate-800">

                                            {
                                                selectedPatient
                                                    ?.patient
                                                    ?.user
                                                    ?.name
                                            }
                                        </h2>

                                        <p className="text-slate-500 font-semibold mt-2">
                                            Patient Prescription & Reports
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setSelectedPatient(
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
                                        selectedPatient
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
                                                            selectedPatient
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
                                        selectedPatient
                                            ?.testRequests
                                            ?.length > 0 ? (

                                            <div className="space-y-5">

                                                {
                                                    selectedPatient
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

                                                                        {/* PDF */}

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

export default LogAndReports;