import React, {
    useEffect,
    useState,
} from "react";

import {
    Search,
    Users,
    CheckCircle2,
    LogOut,
} from "lucide-react";

const BedWordReceptionist =
    () => {

        // =====================================
        // STATES
        // =====================================

        const [
            admits,
            setAdmits,
        ] = useState([]);

        const [
            rooms,
            setRooms,
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
            showBillModal,
            setShowBillModal,
        ] = useState(false);

        const [
            selectedBill,
            setSelectedBill,
        ] = useState(null);

        // =====================================
        // FETCH DATA
        // =====================================

        useEffect(() => {

            fetchAdmits();

            fetchRooms();

        }, []);

        // =====================================
        // FETCH ADMITS
        // =====================================

        const fetchAdmits =
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

                        setAdmits(
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
        // FETCH ROOMS
        // =====================================

        const fetchRooms =
            async () => {

                try {

                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/rooms"
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {

                        setRooms(
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
        // ASSIGN ROOM
        // =====================================

        const handleAssignRoom =
            async (
                admitId,
                roomId
            ) => {

                if (
                    !roomId
                ) {

                    return;
                }

                try {

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/admit-requests/admit/${admitId}`,
                            {
                                method:
                                    "PATCH",

                                headers:
                                {
                                    "Content-Type":
                                        "application/json",
                                },

                                body: JSON.stringify(
                                    {
                                        room:
                                            roomId,
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
                            "Room Assigned Successfully"
                        );

                        fetchAdmits();

                        fetchRooms();
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
        // RELEASE PATIENT
        // =====================================

        const handleReleasePatient =
            async (
                admitId
            ) => {

                try {

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/admit-requests/release/${admitId}`,
                            {
                                method:
                                    "PATCH",
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {

                        setSelectedBill(
                            result.data
                        );

                        setShowBillModal(
                            true
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
        // CONFIRM BILL
        // =====================================

        const handleConfirmBill =
            async () => {

                try {

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/admit-requests/confirm-bill/${selectedBill?.admit?._id}`,
                            {
                                method:
                                    "PATCH",
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {

                        alert(
                            "Patient Released Successfully"
                        );

                        setShowBillModal(
                            false
                        );

                        fetchAdmits();

                        fetchRooms();
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
        // FILTERS
        // =====================================

        const activeAdmits =
            admits.filter(
                (
                    item
                ) =>
                    item?.status !==
                    "Released"
            );

        const releasedPatients =
            admits.filter(
                (
                    item
                ) =>
                    item?.status ===
                    "Released"
            );

        const filteredAdmits =
            activeAdmits.filter(
                (item) =>
                    item?.patient?.user?.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );

        const filteredReleasedPatients =
            releasedPatients.filter(
                (item) =>
                    item?.patient?.user?.name
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );

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

                    {/* HEADER */}

                    <div className="mb-10">

                        <p className="uppercase tracking-[6px] text-blue-600 font-black mb-3">
                            Receptionist Panel
                        </p>

                        <h1 className="text-5xl font-black text-slate-800">
                            Bed Word Management
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
                            className="w-full h-14 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                        />
                    </div>

                    {/* ACTIVE TABLE */}

                    <div className="bg-white rounded-[35px] p-8 shadow-sm border border-blue-100">

                        <div className="flex items-center gap-3 mb-8">

                            <Users className="text-blue-600" />

                            <h2 className="text-3xl font-black text-slate-800">
                                Admit Requests
                            </h2>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1500px]">

                                <thead>

                                    <tr className="border-b border-blue-100">

                                        <th className="text-left py-5 px-4">
                                            Patient
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Doctor
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Room
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Room Price
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Admit Type
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Total Bill
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Status
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Assign Room
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Release
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        filteredAdmits.map(
                                            (
                                                item
                                            ) => (

                                                <tr
                                                    key={
                                                        item?._id
                                                    }
                                                    className="border-b border-blue-50 hover:bg-blue-50 transition"
                                                >

                                                    <td className="py-5 px-4 font-black text-slate-800">
                                                        {
                                                            item
                                                                ?.patient
                                                                ?.user
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4 font-semibold text-slate-700">
                                                        Dr.
                                                        {" "}
                                                        {
                                                            item
                                                                ?.doctor
                                                                ?.user
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4 font-bold text-blue-600">

                                                        {
                                                            item?.room
                                                                ?.roomNumber ||
                                                            "Not Assigned"
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4 font-bold text-green-600">

                                                        {
                                                            item?.room
                                                                ?.price
                                                                ? `৳${item?.room?.price}`
                                                                : "N/A"
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4">

                                                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-2xl text-sm font-bold">

                                                            {
                                                                item?.admitType
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="py-5 px-4 font-black text-green-600">

                                                        ৳
                                                        {
                                                            item?.totalBill ||
                                                            0
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4">

                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                                                                item?.status ===
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

                                                    {/* ASSIGN ROOM */}

                                                    <td className="py-5 px-4">

                                                        {
                                                            item?.status ===
                                                            "Pending" ? (

                                                                <select
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleAssignRoom(
                                                                            item?._id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="h-12 px-4 rounded-2xl border border-blue-100 outline-none"
                                                                >

                                                                    <option value="">
                                                                        Select Room
                                                                    </option>

                                                                    {
                                                                        rooms
                                                                            .filter(
                                                                                (
                                                                                    room
                                                                                ) =>
                                                                                    room?.status ===
                                                                                    "Available"
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    room
                                                                                ) => (

                                                                                    <option
                                                                                        key={
                                                                                            room?._id
                                                                                        }
                                                                                        value={
                                                                                            room?._id
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            room?.roomNumber
                                                                                        }
                                                                                        {" "}
                                                                                        -
                                                                                        {" "}
                                                                                        ৳
                                                                                        {
                                                                                            room?.price
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            )
                                                                    }
                                                                </select>

                                                            ) : (

                                                                <div className="flex items-center gap-2 text-green-600 font-bold">

                                                                    <CheckCircle2
                                                                        size={
                                                                            18
                                                                        }
                                                                    />

                                                                    Assigned
                                                                </div>
                                                            )
                                                        }
                                                    </td>

                                                    {/* RELEASE */}

                                                    <td className="py-5 px-4">

                                                        {
                                                            item?.status ===
                                                            "Admitted" ? (

                                                                <button
                                                                    onClick={() =>
                                                                        handleReleasePatient(
                                                                            item?._id
                                                                        )
                                                                    }
                                                                    className="h-12 px-5 rounded-2xl bg-red-100 hover:bg-red-200 text-red-600 font-black flex items-center gap-2 transition"
                                                                >

                                                                    <LogOut
                                                                        size={
                                                                            18
                                                                        }
                                                                    />

                                                                    Release
                                                                </button>

                                                            ) : (

                                                                <span className="text-slate-400 font-bold">
                                                                    Not Available
                                                                </span>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RELEASED TABLE */}

                    <div className="bg-white rounded-[35px] p-8 shadow-sm border border-blue-100 mt-10">

                        <div className="flex items-center gap-3 mb-8">

                            <Users className="text-red-600" />

                            <h2 className="text-3xl font-black text-slate-800">
                                Released Patients
                            </h2>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1200px]">

                                <thead>

                                    <tr className="border-b border-red-100">

                                        <th className="text-left py-5 px-4">
                                            Patient
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Doctor
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Room
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Total Bill
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Released Date
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        filteredReleasedPatients.map(
                                            (
                                                item
                                            ) => (

                                                <tr
                                                    key={
                                                        item?._id
                                                    }
                                                    className="border-b border-red-50 hover:bg-red-50 transition"
                                                >

                                                    <td className="py-5 px-4 font-black text-slate-800">

                                                        {
                                                            item
                                                                ?.patient
                                                                ?.user
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4 font-semibold text-slate-700">

                                                        Dr.
                                                        {" "}

                                                        {
                                                            item
                                                                ?.doctor
                                                                ?.user
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4 font-bold text-blue-600">

                                                        {
                                                            item?.room
                                                                ?.roomNumber ||
                                                            "N/A"
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4 font-black text-green-600">

                                                        ৳
                                                        {
                                                            item?.totalBill
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4 font-semibold text-slate-600">

                                                        {
                                                            item?.releasedAt
                                                                ? new Date(
                                                                      item?.releasedAt
                                                                  ).toLocaleDateString()
                                                                : "N/A"
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4">

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

                {/* BILL MODAL */}

                {
                    showBillModal &&
                    selectedBill && (

                        <div className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center p-5">

                            <div className="w-full max-w-4xl bg-white rounded-[35px] p-8 max-h-[90vh] overflow-y-auto">

                                <div className="flex items-center justify-between mb-8">

                                    <div>

                                        <h2 className="text-4xl font-black text-slate-800">
                                            Final Patient Bill
                                        </h2>

                                        <p className="text-slate-500 mt-2">
                                            Auto Generated Billing Summary
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            setShowBillModal(
                                                false
                                            )
                                        }
                                        className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 text-2xl font-black"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* PATIENT */}

                                <div className="bg-blue-50 rounded-3xl p-6 mb-8 border border-blue-100">

                                    <div className="grid grid-cols-2 gap-5">

                                        <div>

                                            <h2 className="text-3xl font-black text-slate-800 mb-3">

                                                {
                                                    selectedBill
                                                        ?.admit
                                                        ?.patient
                                                        ?.user
                                                        ?.name
                                                }
                                            </h2>

                                            <div className="space-y-2">

                                                <p className="font-semibold text-slate-600">

                                                    Room:
                                                    {" "}

                                                    <span className="text-blue-600 font-black">

                                                        {
                                                            selectedBill
                                                                ?.admit
                                                                ?.room
                                                                ?.roomNumber
                                                        }
                                                    </span>
                                                </p>

                                                <p className="font-semibold text-slate-600">

                                                    Admit Type:
                                                    {" "}

                                                    <span className="text-purple-600 font-black">

                                                        {
                                                            selectedBill
                                                                ?.admit
                                                                ?.admitType
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div className="bg-white rounded-2xl p-4">

                                                <p className="text-slate-500 font-bold">
                                                    Stay Days
                                                </p>

                                                <h2 className="text-3xl font-black text-blue-600">

                                                    {
                                                        selectedBill?.stayDays
                                                    }
                                                </h2>
                                            </div>

                                            <div className="bg-white rounded-2xl p-4">

                                                <p className="text-slate-500 font-bold">
                                                    Total Bill
                                                </p>

                                                <h2 className="text-3xl font-black text-green-600">

                                                    ৳
                                                    {
                                                        selectedBill?.totalBill
                                                    }
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* BILL TABLE */}

                                <div className="overflow-x-auto">

                                    <table className="w-full">

                                        <thead>

                                            <tr className="bg-blue-50">

                                                <th className="text-left p-4">
                                                    Bill Item
                                                </th>

                                                <th className="text-left p-4">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {
                                                selectedBill
                                                    ?.admit
                                                    ?.bills
                                                    ?.map(
                                                        (
                                                            bill,
                                                            index
                                                        ) => (

                                                            <tr
                                                                key={
                                                                    index
                                                                }
                                                                className="border-b border-blue-50"
                                                            >

                                                                <td className="p-4 font-bold text-slate-700">

                                                                    {
                                                                        bill.title
                                                                    }
                                                                </td>

                                                                <td className="p-4 font-black text-blue-600">

                                                                    ৳
                                                                    {
                                                                        bill.amount
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                {/* ACTIONS */}

                                <div className="grid grid-cols-2 gap-5 mt-8">

                                    <button
                                        onClick={
                                            handleConfirmBill
                                        }
                                        className="h-16 rounded-3xl bg-green-600 hover:bg-green-700 text-white text-xl font-black"
                                    >
                                        Confirm Bill
                                    </button>

                                    <button
                                        onClick={() =>
                                            window.print()
                                        }
                                        className="h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-black"
                                    >
                                        Print Bill
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    };

export default BedWordReceptionist;