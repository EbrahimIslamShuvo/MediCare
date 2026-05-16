import React, {
    useEffect,
    useState,
} from "react";

import {
    Ambulance,
    Plus,
    Trash2,
    Edit,
} from "lucide-react";

const Ambulancee =
    () => {
        // =====================================
        // STATES
        // =====================================

        const [
            ambulances,
            setAmbulances,
        ] = useState([]);

        const [
            loading,
            setLoading,
        ] = useState(true);

        const [
            showModal,
            setShowModal,
        ] = useState(false);

        const [
            editId,
            setEditId,
        ] = useState(null);

        const [
            formData,
            setFormData,
        ] = useState({
            vehicleNumber:
                "",

            driverName:
                "",

            driverPhone:
                "",

            type: "Non-AC",

            status:
                "Available",
        });

        // =====================================
        // FETCH AMBULANCES
        // =====================================

        useEffect(() => {
            fetchAmbulances();
        }, []);

        const fetchAmbulances =
            async () => {
                try {
                    setLoading(
                        true
                    );

                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/ambulances"
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setAmbulances(
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
        // INPUT CHANGE
        // =====================================

        const handleChange =
            (e) => {
                setFormData({
                    ...formData,

                    [e.target.name]:
                        e.target
                            .value,
                });
            };

        // =====================================
        // SUBMIT
        // =====================================

        const handleSubmit =
            async (
                e
            ) => {
                e.preventDefault();

                try {
                    const url =
                        editId
                            ? `http://127.0.0.1:3000/api/v1/ambulances/${editId}`
                            : "http://127.0.0.1:3000/api/v1/ambulances";

                    const method =
                        editId
                            ? "PATCH"
                            : "POST";

                    const response =
                        await fetch(
                            url,
                            {
                                method,

                                headers:
                                    {
                                        "Content-Type":
                                            "application/json",
                                    },

                                body: JSON.stringify(
                                    formData
                                ),
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        fetchAmbulances();

                        setShowModal(
                            false
                        );

                        setEditId(
                            null
                        );

                        setFormData(
                            {
                                vehicleNumber:
                                    "",

                                driverName:
                                    "",

                                driverPhone:
                                    "",

                                type: "Non-AC",

                                status:
                                    "Available",
                            }
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
        // DELETE
        // =====================================

        const handleDelete =
            async (
                id
            ) => {
                const confirmDelete =
                    window.confirm(
                        "Delete ambulance?"
                    );

                if (
                    !confirmDelete
                )
                    return;

                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/ambulances/${id}`,
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
                        fetchAmbulances();
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
        // EDIT
        // =====================================

        const handleEdit =
            (
                item
            ) => {
                setEditId(
                    item._id
                );

                setFormData({
                    vehicleNumber:
                        item.vehicleNumber,

                    driverName:
                        item.driverName,

                    driverPhone:
                        item.driverPhone,

                    type: item.type,

                    status:
                        item.status,
                });

                setShowModal(
                    true
                );
            };

        // =====================================
        // STATUS STYLE
        // =====================================

        const getStatusStyle =
            (status) => {
                switch (
                    status
                ) {
                    case "Available":
                        return "bg-green-100 text-green-600";

                    case "Busy":
                        return "bg-red-100 text-red-600";

                    default:
                        return "bg-yellow-100 text-yellow-600";
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

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 mb-2">
                            Ambulances
                        </h2>

                        <p className="text-slate-500 text-lg">
                            Manage
                            hospital
                            ambulances
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setShowModal(
                                true
                            )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-14 rounded-2xl font-bold flex items-center gap-2"
                    >
                        <Plus
                            size={
                                20
                            }
                        />

                        Add
                    </button>
                </div>

                {/* EMPTY */}

                {ambulances.length ===
                    0 && (
                        <div className="bg-white border border-blue-100 rounded-[40px] p-20 text-center">
                            <h2 className="text-3xl font-black text-slate-700 mb-3">
                                No
                                Ambulance
                                Found
                            </h2>

                            <p className="text-slate-500 text-lg">
                                Add new
                                ambulance
                            </p>
                        </div>
                    )}

                {/* GRID */}

                {ambulances.length >
                    0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {ambulances.map(
                                (
                                    item
                                ) => (
                                    <div
                                        key={
                                            item._id
                                        }
                                        className="bg-white rounded-[35px] border border-blue-100 p-6 shadow-sm"
                                    >
                                        {/* TOP */}

                                        <div className="flex items-center justify-between mb-5">
                                            <div className="w-16 h-16 rounded-3xl bg-blue-100 flex items-center justify-center">
                                                <Ambulance className="text-blue-600" />
                                            </div>

                                            <span
                                                className={`px-4 py-2 rounded-2xl text-sm font-bold ${getStatusStyle(
                                                    item.status
                                                )}`}
                                            >
                                                {
                                                    item.status
                                                }
                                            </span>
                                        </div>

                                        {/* INFO */}

                                        <h3 className="text-2xl font-black text-slate-800 mb-2">
                                            {
                                                item.vehicleNumber
                                            }
                                        </h3>

                                        <p className="text-slate-600 font-semibold mb-1">
                                            Driver:
                                            {" "}
                                            {
                                                item.driverName
                                            }
                                        </p>

                                        <p className="text-slate-600 font-semibold mb-1">
                                            Phone:
                                            {" "}
                                            {
                                                item.driverPhone
                                            }
                                        </p>

                                        <p className="text-blue-600 font-bold mb-5">
                                            {
                                                item.type
                                            }
                                        </p>

                                        {/* ACTION */}

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        item
                                                    )
                                                }
                                                className="flex-1 h-12 rounded-2xl bg-blue-100 text-blue-600 font-bold flex items-center justify-center gap-2"
                                            >
                                                <Edit
                                                    size={
                                                        18
                                                    }
                                                />

                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        item._id
                                                    )
                                                }
                                                className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center"
                                            >
                                                <Trash2
                                                    size={
                                                        18
                                                    }
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}

                {/* MODAL */}

                {showModal && (
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
                        <div className="bg-white w-full max-w-xl rounded-[35px] p-8">
                            <h2 className="text-3xl font-black text-slate-800 mb-6">
                                {editId
                                    ? "Edit Ambulance"
                                    : "Add Ambulance"}
                            </h2>

                            <form
                                onSubmit={
                                    handleSubmit
                                }
                                className="space-y-5"
                            >
                                {/* VEHICLE */}

                                <input
                                    type="text"
                                    name="vehicleNumber"
                                    placeholder="Vehicle Number"
                                    value={
                                        formData.vehicleNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                />

                                {/* DRIVER */}

                                <input
                                    type="text"
                                    name="driverName"
                                    placeholder="Driver Name"
                                    value={
                                        formData.driverName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                />

                                {/* PHONE */}

                                <input
                                    type="text"
                                    name="driverPhone"
                                    placeholder="Driver Phone"
                                    value={
                                        formData.driverPhone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                />

                                {/* TYPE */}

                                <select
                                    name="type"
                                    value={
                                        formData.type
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                >
                                    <option>
                                        Non-AC
                                    </option>

                                    <option>
                                        AC
                                    </option>

                                    <option>
                                        ICU
                                    </option>
                                </select>

                                {/* STATUS */}

                                <select
                                    name="status"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                >
                                    <option>
                                        Available
                                    </option>

                                    <option>
                                        Busy
                                    </option>

                                    <option>
                                        Maintenance
                                    </option>
                                </select>

                                {/* BUTTON */}

                                <div className="flex gap-4 pt-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowModal(
                                                false
                                            )
                                        }
                                        className="flex-1 h-14 rounded-2xl bg-slate-100 text-slate-700 font-bold"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                                    >
                                        {editId
                                            ? "Update"
                                            : "Add"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    };

export default Ambulancee;