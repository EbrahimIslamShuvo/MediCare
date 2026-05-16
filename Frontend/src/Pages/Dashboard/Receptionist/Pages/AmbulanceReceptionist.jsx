import React, {
    useEffect,
    useState,
} from "react";

import {
    Ambulance,
    MapPin,
    Phone,
    AlertTriangle,
    CheckCircle,
} from "lucide-react";

const AmbulanceReceptionist =
    () => {
        // =====================================
        // STATES
        // =====================================

        const [
            loading,
            setLoading,
        ] = useState(false);

        const [
            requests,
            setRequests,
        ] = useState([]);

        const [
            ambulances,
            setAmbulances,
        ] = useState([]);

        const [
            formData,
            setFormData,
        ] = useState({
            pickupLocation:
                "",

            destination:
                "",

            emergencyType:
                "",

            phone: "",
        });

        // =====================================
        // FETCH DATA
        // =====================================

        useEffect(() => {
            fetchRequests();

            fetchAmbulances();
        }, []);

        const fetchRequests =
            async () => {
                try {
                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/ambulance-requests"
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

        const fetchAmbulances =
            async () => {
                try {
                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/ambulances"
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        const available =
                            result.data.filter(
                                (
                                    item
                                ) =>
                                    item.status ===
                                    "Available"
                            );

                        setAmbulances(
                            available
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
        // HANDLE CHANGE
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
        // CREATE REQUEST
        // =====================================

        const handleSubmit =
            async (
                e
            ) => {
                e.preventDefault();

                try {
                    setLoading(
                        true
                    );

                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/ambulance-requests",
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
                                        requestedBy:
                                            "Receptionist",

                                        pickupLocation:
                                            formData.pickupLocation,

                                        destination:
                                            formData.destination,

                                        emergencyType:
                                            formData.emergencyType,

                                        phone:
                                            formData.phone,
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
                            "Request created successfully"
                        );

                        setFormData(
                            {
                                pickupLocation:
                                    "",

                                destination:
                                    "",

                                emergencyType:
                                    "",

                                phone: "",
                            }
                        );

                        fetchRequests();
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
        // ASSIGN
        // =====================================

        const assignAmbulance =
            async (
                requestId,
                ambulanceId
            ) => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/ambulance-requests/assign/${requestId}`,
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
                                        ambulanceId,
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
                            "Ambulance assigned successfully"
                        );

                        fetchRequests();

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
        // COMPLETE
        // =====================================

        const completeRequest =
            async (
                id
            ) => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/ambulance-requests/complete/${id}`,
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
                        fetchRequests();

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
        // STATUS STYLE
        // =====================================

        const getStatusStyle =
            (status) => {
                switch (
                    status
                ) {
                    case "Assigned":
                        return "bg-blue-100 text-blue-600";

                    case "Completed":
                        return "bg-green-100 text-green-600";

                    default:
                        return "bg-yellow-100 text-yellow-600";
                }
            };

        return (
            <div className="min-h-screen bg-blue-50 p-6">
                {/* FORM */}

                <div className="bg-white rounded-[35px] border border-blue-100 p-8 mb-10">
                    <h2 className="text-3xl font-black text-slate-800 mb-6">
                        Create
                        Ambulance
                        Request
                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        {/* PICKUP */}

                        <input
                            type="text"
                            name="pickupLocation"
                            placeholder="Pickup Location"
                            value={
                                formData.pickupLocation
                            }
                            onChange={
                                handleChange
                            }
                            required
                            className="h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                        />

                        {/* DESTINATION */}

                        <input
                            type="text"
                            name="destination"
                            placeholder="Destination"
                            value={
                                formData.destination
                            }
                            onChange={
                                handleChange
                            }
                            required
                            className="h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                        />

                        {/* EMERGENCY */}

                        <select
                            name="emergencyType"
                            value={
                                formData.emergencyType
                            }
                            onChange={
                                handleChange
                            }
                            required
                            className="h-14 px-5 rounded-2xl border border-blue-100 outline-none bg-white"
                        >
                            <option value="">
                                Select
                                Emergency
                            </option>

                            <option>
                                Accident
                            </option>

                            <option>
                                Heart Attack
                            </option>

                            <option>
                                Stroke
                            </option>

                            <option>
                                Pregnancy
                            </option>

                            <option>
                                Breathing
                                Problem
                            </option>

                            <option>
                                ICU
                                Transfer
                            </option>

                            <option>
                                General
                                Emergency
                            </option>
                        </select>

                        {/* PHONE */}

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={
                                formData.phone
                            }
                            onChange={
                                handleChange
                            }
                            required
                            className="h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                        />

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={
                                loading
                            }
                            className="md:col-span-2 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black"
                        >
                            {loading
                                ? "Creating..."
                                : "Create Request"}
                        </button>
                    </form>
                </div>

                {/* REQUEST TABLE */}

                <div className="bg-white rounded-[35px] border border-blue-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* HEAD */}

                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-5 py-4 text-left">
                                        Pickup
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Destination
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Emergency
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Phone
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Ambulance
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            {/* BODY */}

                            <tbody>
                                {requests.map(
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
                                            {/* PICKUP */}

                                            <td className="px-5 py-5 font-semibold text-slate-700">
                                                {
                                                    item.pickupLocation
                                                }
                                            </td>

                                            {/* DESTINATION */}

                                            <td className="px-5 py-5 font-semibold text-slate-700">
                                                {
                                                    item.destination
                                                }
                                            </td>

                                            {/* EMERGENCY */}

                                            <td className="px-5 py-5">
                                                <span className="bg-red-100 text-red-600 px-4 py-2 rounded-2xl text-sm font-bold">
                                                    {
                                                        item.emergencyType
                                                    }
                                                </span>
                                            </td>

                                            {/* PHONE */}

                                            <td className="px-5 py-5 font-semibold text-slate-700">
                                                {
                                                    item.phone
                                                }
                                            </td>

                                            {/* STATUS */}

                                            <td className="px-5 py-5">
                                                <span
                                                    className={`px-4 py-2 rounded-2xl text-sm font-bold ${getStatusStyle(
                                                        item.status
                                                    )}`}
                                                >
                                                    {
                                                        item.status
                                                    }
                                                </span>
                                            </td>

                                            {/* AMBULANCE */}

                                            <td className="px-5 py-5">
                                                {item.ambulance ? (
                                                    <div>
                                                        <h4 className="font-black text-slate-800">
                                                            {
                                                                item
                                                                    ?.ambulance
                                                                    ?.vehicleNumber
                                                            }
                                                        </h4>

                                                        <p className="text-sm text-slate-500">
                                                            {
                                                                item
                                                                    ?.ambulance
                                                                    ?.driverName
                                                            }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <select
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            assignAmbulance(
                                                                item._id,
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        defaultValue=""
                                                        className="h-12 px-4 rounded-xl border border-blue-100 outline-none bg-white"
                                                    >
                                                        <option value="">
                                                            Assign
                                                        </option>

                                                        {ambulances.map(
                                                            (
                                                                ambulance
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        ambulance._id
                                                                    }
                                                                    value={
                                                                        ambulance._id
                                                                    }
                                                                >
                                                                    {
                                                                        ambulance.vehicleNumber
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                )}
                                            </td>

                                            {/* ACTION */}

                                            <td className="px-5 py-5">
                                                {item.status ===
                                                    "Assigned" && (
                                                    <button
                                                        onClick={() =>
                                                            completeRequest(
                                                                item._id
                                                            )
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                                                    >
                                                        <CheckCircle
                                                            size={
                                                                18
                                                            }
                                                        />

                                                        Complete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

export default AmbulanceReceptionist;