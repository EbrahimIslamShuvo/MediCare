import React, {
    useEffect,
    useState,
} from "react";

import {
    BedDouble,
    Plus,
    Building2,
    Search,
    Users,
    Trash2,
    Pencil,
    CheckCircle2,
} from "lucide-react";

const BedWords = () => {

    // =====================================
    // STATES
    // =====================================

    const [
        rooms,
        setRooms,
    ] = useState([]);

    const [
        admits,
        setAdmits,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    // ROOM FORM

    const [
        roomNumber,
        setRoomNumber,
    ] = useState("");

    const [
        roomType,
        setRoomType,
    ] = useState("");

    const [
        floor,
        setFloor,
    ] = useState("");

    const [
        price,
        setPrice,
    ] = useState("");

    // SEARCH

    const [
        roomSearch,
        setRoomSearch,
    ] = useState("");

    const [
        admitSearch,
        setAdmitSearch,
    ] = useState("");

    // EDIT

    const [
        editId,
        setEditId,
    ] = useState(null);

    // =====================================
    // FETCH
    // =====================================

    useEffect(() => {

        fetchRooms();

        fetchAdmits();

    }, []);

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

            } finally {

                setLoading(
                    false
                );
            }
        };

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
            }
        };

    // =====================================
    // CREATE ROOM
    // =====================================

    const handleCreateRoom =
        async (
            e
        ) => {

            e.preventDefault();

            try {

                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/rooms",
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
                                    roomNumber,

                                    roomType,

                                    floor,

                                    price,

                                    status:
                                        "Available",
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
                        "Room Added Successfully"
                    );

                    resetForm();

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
    // UPDATE ROOM
    // =====================================

    const handleUpdateRoom =
        async (
            e
        ) => {

            e.preventDefault();

            try {

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/rooms/${editId}`,
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
                                    roomNumber,

                                    roomType,

                                    floor,

                                    price,
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
                        "Room Updated Successfully"
                    );

                    resetForm();

                    setEditId(
                        null
                    );

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
    // DELETE ROOM
    // =====================================

    const handleDeleteRoom =
        async (
            id
        ) => {

            const confirmDelete =
                confirm(
                    "Delete this room?"
                );

            if (
                !confirmDelete
            ) {
                return;
            }

            try {

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/rooms/${id}`,
                        {
                            method:
                                "DELETE",
                        }
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

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
    // EDIT ROOM
    // =====================================

    const handleEditRoom =
        (
            room
        ) => {

            setEditId(
                room?._id
            );

            setRoomNumber(
                room?.roomNumber
            );

            setRoomType(
                room?.roomType
            );

            setFloor(
                room?.floor
            );

            setPrice(
                room?.price
            );
        };

    // =====================================
    // ADMIT PATIENT
    // =====================================

    const handleAdmitPatient =
        async (
            admitId,
            roomId
        ) => {

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
                        "Patient Admitted Successfully"
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
    // RESET
    // =====================================

    const resetForm =
        () => {

            setRoomNumber(
                ""
            );

            setRoomType(
                ""
            );

            setFloor(
                ""
            );

            setPrice(
                ""
            );
        };

    // =====================================
    // FILTER
    // =====================================

    const filteredRooms =
        rooms.filter(
            (room) =>
                room?.roomNumber
                    ?.toLowerCase()
                    .includes(
                        roomSearch.toLowerCase()
                    )
        );

    const filteredAdmits =
        admits.filter(
            (item) =>
                item?.patient?.user?.name
                    ?.toLowerCase()
                    .includes(
                        admitSearch.toLowerCase()
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
                        Admin Room Panel
                    </p>

                    <h1 className="text-5xl font-black text-slate-800">
                        Bed & Room Management
                    </h1>
                </div>

                {/* GRID */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">

                    {/* FORM */}

                    <div className="bg-white rounded-[35px] p-8 shadow-sm border border-blue-100">

                        <div className="flex items-center gap-3 mb-8">

                            <Plus className="text-blue-600" />

                            <h2 className="text-3xl font-black text-slate-800">
                                {
                                    editId
                                        ? "Update Room"
                                        : "Add Room"
                                }
                            </h2>
                        </div>

                        <form
                            onSubmit={
                                editId
                                    ? handleUpdateRoom
                                    : handleCreateRoom
                            }
                            className="space-y-6"
                        >

                            {/* ROOM NUMBER */}

                            <input
                                type="text"
                                placeholder="Room Number"
                                value={
                                    roomNumber
                                }
                                onChange={(
                                    e
                                ) =>
                                    setRoomNumber(
                                        e.target
                                            .value
                                    )
                                }
                                className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                            />

                            {/* ROOM TYPE */}

                            <select
                                value={
                                    roomType
                                }
                                onChange={(
                                    e
                                ) =>
                                    setRoomType(
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

                            {/* FLOOR */}

                            <input
                                type="text"
                                placeholder="Floor"
                                value={
                                    floor
                                }
                                onChange={(
                                    e
                                ) =>
                                    setFloor(
                                        e.target
                                            .value
                                    )
                                }
                                className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                            />

                            {/* PRICE */}

                            <input
                                type="number"
                                placeholder="Price"
                                value={
                                    price
                                }
                                onChange={(
                                    e
                                ) =>
                                    setPrice(
                                        e.target
                                            .value
                                    )
                                }
                                className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                            />

                            {/* BUTTON */}

                            <button
                                type="submit"
                                className="w-full h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-black transition"
                            >
                                {
                                    editId
                                        ? "Update Room"
                                        : "Add Room"
                                }
                            </button>
                        </form>
                    </div>

                    {/* ROOM LIST */}

                    <div className="xl:col-span-2 bg-white rounded-[35px] p-8 shadow-sm border border-blue-100">

                        <div className="flex items-center justify-between gap-5 mb-8 flex-wrap">

                            <div className="flex items-center gap-3">

                                <BedDouble className="text-blue-600" />

                                <h2 className="text-3xl font-black text-slate-800">
                                    Room List
                                </h2>
                            </div>

                            {/* SEARCH */}

                            <div className="relative w-full md:w-[320px]">

                                <Search
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={20}
                                />

                                <input
                                    type="text"
                                    placeholder="Search room..."
                                    value={
                                        roomSearch
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setRoomSearch(
                                            e.target
                                                .value
                                        )
                                    }
                                    className="w-full h-14 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1000px]">

                                <thead>

                                    <tr className="border-b border-blue-100">

                                        <th className="text-left py-5 px-4">
                                            Room
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Type
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Floor
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Price
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Status
                                        </th>

                                        <th className="text-left py-5 px-4">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        filteredRooms.map(
                                            (
                                                room
                                            ) => (

                                                <tr
                                                    key={
                                                        room?._id
                                                    }
                                                    className="border-b border-blue-50"
                                                >

                                                    <td className="py-5 px-4 font-black text-slate-800">
                                                        {
                                                            room?.roomNumber
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4">
                                                        {
                                                            room?.roomType
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4">
                                                        {
                                                            room?.floor
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4 font-bold text-blue-600">
                                                        ৳
                                                        {
                                                            room?.price
                                                        }
                                                    </td>

                                                    <td className="py-5 px-4">

                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                                                                room?.status ===
                                                                "Available"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                        >
                                                            {
                                                                room?.status
                                                            }
                                                        </span>
                                                    </td>

                                                    <td className="py-5 px-4">

                                                        <div className="flex items-center gap-3">

                                                            <button
                                                                onClick={() =>
                                                                    handleEditRoom(
                                                                        room
                                                                    )
                                                                }
                                                                className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"
                                                            >
                                                                <Pencil size={18} />
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteRoom(
                                                                        room?._id
                                                                    )
                                                                }
                                                                className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
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

                {/* ADMIT LIST */}

                <div className="bg-white rounded-[35px] p-8 shadow-sm border border-blue-100">

                    <div className="flex items-center justify-between gap-5 mb-8 flex-wrap">

                        <div className="flex items-center gap-3">

                            <Users className="text-blue-600" />

                            <h2 className="text-3xl font-black text-slate-800">
                                Patient Admit Requests
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
                                placeholder="Search patient..."
                                value={
                                    admitSearch
                                }
                                onChange={(
                                    e
                                ) =>
                                    setAdmitSearch(
                                        e.target
                                            .value
                                    )
                                }
                                className="w-full h-14 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-hidden">

                        <table className="w-full min-w-[1300px]">

                            <thead>

                                <tr className="border-b border-blue-100">

                                    <th className="text-left py-5 px-4">
                                        Patient
                                    </th>

                                    <th className="text-left py-5 px-4">
                                        Doctor
                                    </th>

                                    <th className="text-left py-5 px-4">
                                        Admit Type
                                    </th>

                                    <th className="text-left py-5 px-4">
                                        Room
                                    </th>

                                    <th className="text-left py-5 px-4">
                                        Status
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
                                                className="border-b border-blue-50"
                                            >

                                                <td className="py-5 px-4 font-black text-slate-800">
                                                    {
                                                        item
                                                            ?.patient
                                                            ?.user
                                                            ?.name
                                                    }
                                                </td>

                                                <td className="py-5 px-4">
                                                    Dr.
                                                    {" "}
                                                    {
                                                        item
                                                            ?.doctor
                                                            ?.user
                                                            ?.name
                                                    }
                                                </td>

                                                <td className="py-5 px-4">

                                                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl text-sm font-bold">
                                                        {
                                                            item?.admitType
                                                        }
                                                    </span>
                                                </td>

                                                <td className="py-5 px-4">

                                                    {
                                                        item?.room
                                                            ?.roomNumber ||
                                                        "Not Assigned"
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

export default BedWords;