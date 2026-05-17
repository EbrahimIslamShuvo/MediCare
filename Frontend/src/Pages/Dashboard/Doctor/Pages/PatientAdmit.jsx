import React, {
    useEffect,
    useState,
} from "react";

import {
    BedDouble,
    User,
    CalendarDays,
    FileText,
    Send,
    Search,
    Activity,
} from "lucide-react";

const PatientAdmit = () => {

    // =====================================
    // USER
    // =====================================

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            ) || "{}"
        );

    // =====================================
    // STATES
    // =====================================

    const [
        appointments,
        setAppointments,
    ] = useState([]);

    const [
        requests,
        setRequests,
    ] = useState([]);

    const [
        selectedPatient,
        setSelectedPatient,
    ] = useState(null);

    const [
        reason,
        setReason,
    ] = useState("");

    const [
        admitType,
        setAdmitType,
    ] = useState("");

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        requestSearch,
        setRequestSearch,
    ] = useState("");

    const [
        loading,
        setLoading,
    ] = useState(true);

    // =====================================
    // FETCH
    // =====================================

    useEffect(() => {

        fetchAppointments();

        fetchRequests();

    }, []);

    // =====================================
    // FETCH APPOINTMENTS
    // =====================================

    const fetchAppointments =
        async () => {

            try {

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/appointments/doctor/${user?._id}`
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    const visited =
                        result.data.filter(
                            (
                                item
                            ) =>
                                item?.status ===
                                "Visited"
                        );

                    const uniquePatients =
                        visited.filter(
                            (
                                item,
                                index,
                                self
                            ) =>
                                index ===
                                self.findIndex(
                                    (
                                        patient
                                    ) =>
                                        patient
                                            ?.patient
                                            ?._id ===
                                        item
                                            ?.patient
                                            ?._id
                                )
                        );

                    setAppointments(
                        uniquePatients
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
    // FETCH REQUESTS
    // =====================================

    const fetchRequests =
        async () => {

            try {

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/admit-requests/doctor/${user?._id}`
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    setRequests(
                        result.data
                    );
                }

            } catch (
                error
            ) {

                console.log(
                    error
                );
            }
        };

    // =====================================
    // FILTER APPOINTMENTS
    // =====================================

    const filteredAppointments =
        appointments.filter(
            (item) =>
                item?.patient?.user?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    // =====================================
    // FILTER REQUESTS
    // =====================================

    const filteredRequests =
        requests.filter(
            (item) =>
                item?.patient?.user?.name
                    ?.toLowerCase()
                    .includes(
                        requestSearch.toLowerCase()
                    )
        );

    // =====================================
    // SEND REQUEST
    // =====================================

    const handleAdmitRequest =
        async () => {

            if (
                !selectedPatient
            ) {

                return alert(
                    "Select patient first"
                );
            }

            if (
                !reason ||
                !admitType
            ) {

                return alert(
                    "Fill all fields"
                );
            }

            try {

                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/admit-requests",
                        {
                            method:
                                "POST",

                            headers:
                            {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify(
                                {
                                    patient:
                                        selectedPatient?.patient?._id,

                                    doctor:
                                        selectedPatient?.doctor,

                                    appointment:
                                        selectedPatient?._id,

                                    admitType,

                                    reason,

                                    status:
                                        "Pending",
                                }
                            ),
                        }
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    alert(
                        "Admission Request Sent Successfully"
                    );

                    setSelectedPatient(
                        null
                    );

                    setReason(
                        ""
                    );

                    setAdmitType(
                        ""
                    );

                    fetchRequests();
                }

            } catch (
                error
            ) {

                console.log(
                    error
                );
            }
        };

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
                        Doctor Admission Panel
                    </p>

                    <h1 className="text-5xl font-black text-slate-800">
                        Patient Admit Request
                    </h1>
                </div>

                {/* ================================= */}
                {/* SEARCH */}
                {/* ================================= */}

                <div className="bg-white rounded-[30px] p-5 shadow-sm border border-blue-100 mb-8">

                    <div className="relative">

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
                            className="w-full h-14 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                        />
                    </div>
                </div>

                {/* ================================= */}
                {/* MAIN GRID */}
                {/* ================================= */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

                    {/* ================================= */}
                    {/* PATIENT LIST */}
                    {/* ================================= */}

                    <div className="bg-white rounded-[35px] p-8 shadow-sm border border-blue-100">

                        <div className="flex items-center gap-3 mb-8">

                            <User className="text-blue-600" />

                            <h2 className="text-3xl font-black text-slate-800">
                                Visited Patients
                            </h2>
                        </div>

                        <div className="space-y-5 max-h-[700px] overflow-y-auto">

                            {
                                filteredAppointments.map(
                                    (
                                        item
                                    ) => (

                                        <div
                                            key={
                                                item?._id
                                            }
                                            onClick={() =>
                                                setSelectedPatient(
                                                    item
                                                )
                                            }
                                            className={`border rounded-[30px] p-6 cursor-pointer transition ${
                                                selectedPatient?._id ===
                                                item?._id
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-blue-100 hover:border-blue-300"
                                            }`}
                                        >

                                            <div className="flex items-center justify-between mb-4">

                                                <h2 className="text-2xl font-black text-slate-800">
                                                    {
                                                        item
                                                            ?.patient
                                                            ?.user
                                                            ?.name
                                                    }
                                                </h2>

                                                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-2xl text-sm font-bold">
                                                    {
                                                        item?.status
                                                    }
                                                </span>
                                            </div>

                                            <div className="space-y-3">

                                                <div className="flex items-center gap-3 text-slate-600">

                                                    <CalendarDays size={18} />

                                                    <span className="font-semibold">
                                                        {
                                                            item?.appointmentDate
                                                        }
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 text-slate-600">

                                                    <FileText size={18} />

                                                    <span className="font-semibold">
                                                        Serial:
                                                        {" "}
                                                        {
                                                            item?.serialNumber
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>

                    {/* ================================= */}
                    {/* FORM */}
                    {/* ================================= */}

                    <div className="bg-white rounded-[35px] p-8 shadow-sm border border-blue-100">

                        <div className="flex items-center gap-3 mb-8">

                            <BedDouble className="text-blue-600" />

                            <h2 className="text-3xl font-black text-slate-800">
                                Admission Form
                            </h2>
                        </div>

                        {
                            selectedPatient ? (

                                <div>

                                    <div className="bg-blue-50 rounded-[30px] p-6 mb-8 border border-blue-100">

                                        <h2 className="text-3xl font-black text-slate-800 mb-3">
                                            {
                                                selectedPatient
                                                    ?.patient
                                                    ?.user
                                                    ?.name
                                            }
                                        </h2>

                                        <p className="text-slate-600 font-semibold">
                                            Appointment Date:
                                            {" "}
                                            {
                                                selectedPatient?.appointmentDate
                                            }
                                        </p>
                                    </div>

                                    {/* TYPE */}

                                    <div className="mb-6">

                                        <label className="block mb-3 text-lg font-bold text-slate-700">
                                            Admit Type
                                        </label>

                                        <select
                                            value={
                                                admitType
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setAdmitType(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                        >

                                            <option value="">
                                                Select Type
                                            </option>

                                            <option value="General">
                                                General
                                            </option>

                                            <option value="ICU">
                                                ICU
                                            </option>

                                            <option value="Emergency">
                                                Emergency
                                            </option>

                                            <option value="Cabin">
                                                Cabin
                                            </option>

                                            <option value="VIP">
                                                VIP
                                            </option>
                                        </select>
                                    </div>

                                    {/* REASON */}

                                    <div className="mb-8">

                                        <label className="block mb-3 text-lg font-bold text-slate-700">
                                            Admission Reason
                                        </label>

                                        <textarea
                                            rows="6"
                                            value={
                                                reason
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setReason(
                                                    e.target
                                                        .value
                                                )
                                            }
                                            className="w-full rounded-3xl border border-blue-100 p-5 outline-none resize-none"
                                            placeholder="Write admission reason..."
                                        />
                                    </div>

                                    {/* BUTTON */}

                                    <button
                                        onClick={
                                            handleAdmitRequest
                                        }
                                        className="w-full h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-black flex items-center justify-center gap-3 transition"
                                    >

                                        <Send size={22} />

                                        Send Admission Request
                                    </button>
                                </div>

                            ) : (

                                <div className="h-[500px] flex items-center justify-center text-center">

                                    <div>

                                        <BedDouble
                                            size={80}
                                            className="mx-auto text-blue-200 mb-6"
                                        />

                                        <h2 className="text-3xl font-black text-slate-700 mb-3">
                                            Select Patient
                                        </h2>

                                        <p className="text-slate-500 text-lg">
                                            Choose patient to send admission request.
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* ================================= */}
                {/* REQUEST TABLE */}
                {/* ================================= */}

                <div className="bg-white rounded-[35px] p-8 shadow-sm border border-blue-100">

                    <div className="flex items-center justify-between gap-5 mb-8 flex-wrap">

                        <div className="flex items-center gap-3">

                            <Activity className="text-blue-600" />

                            <h2 className="text-3xl font-black text-slate-800">
                                My Admission Requests
                            </h2>
                        </div>

                        {/* SEARCH */}

                        <div className="relative w-full md:w-[350px]">

                            <Search
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                size={20}
                            />

                            <input
                                type="text"
                                placeholder="Search request..."
                                value={
                                    requestSearch
                                }
                                onChange={(
                                    e
                                ) =>
                                    setRequestSearch(
                                        e.target
                                            .value
                                    )
                                }
                                className="w-full h-14 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                            />
                        </div>
                    </div>

                    {
                        filteredRequests.length === 0 ? (

                            <div className="text-center py-20 text-slate-500 font-bold">
                                No Admission Request Found
                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[1200px]">

                                    <thead>

                                        <tr className="border-b border-blue-100">

                                            <th className="text-left py-5 px-4 text-slate-500 font-black">
                                                Patient
                                            </th>

                                            <th className="text-left py-5 px-4 text-slate-500 font-black">
                                                Admit Type
                                            </th>

                                            <th className="text-left py-5 px-4 text-slate-500 font-black">
                                                Room
                                            </th>

                                            <th className="text-left py-5 px-4 text-slate-500 font-black">
                                                Admit Date
                                            </th>

                                            <th className="text-left py-5 px-4 text-slate-500 font-black">
                                                Status
                                            </th>

                                            <th className="text-left py-5 px-4 text-slate-500 font-black">
                                                Reason
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            filteredRequests.map(
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

                                                        <td className="py-5 px-4">

                                                            <div className="flex items-center gap-3">

                                                                <div>

                                                                    <h2 className="font-black text-slate-800">
                                                                        {
                                                                            item
                                                                                ?.patient
                                                                                ?.user
                                                                                ?.name
                                                                        }
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* TYPE */}

                                                        <td className="py-5 px-4">

                                                            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl text-sm font-bold">
                                                                {
                                                                    item?.admitType
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* ROOM */}

                                                        <td className="py-5 px-4">

                                                            <span className="font-bold text-slate-700">
                                                                {
                                                                    item?.room
                                                                        ?.roomNumber ||
                                                                    "Not Assigned"
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* DATE */}

                                                        <td className="py-5 px-4">

                                                            <span className="font-semibold text-slate-600">
                                                                {
                                                                    item?.admitDate ||
                                                                    "Waiting"
                                                                }
                                                            </span>
                                                        </td>


                                                        {/* STATUS */}

                                                        <td className="py-5 px-4">

                                                            <span
                                                                className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                                                                    item?.status ===
                                                                    "Pending"
                                                                        ? "bg-yellow-100 text-yellow-700"
                                                                        : item?.status ===
                                                                          "Admitted"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-red-100 text-red-700"
                                                                }`}
                                                            >
                                                                {
                                                                    item?.status
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* REASON */}

                                                        <td className="py-5 px-4">

                                                            <p className="text-slate-600 font-semibold max-w-[300px]">
                                                                {
                                                                    item?.reason
                                                                }
                                                            </p>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PatientAdmit;