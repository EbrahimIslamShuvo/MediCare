import React, {
    useEffect,
    useState,
} from "react";

import {
    Ambulance,
    MapPin,
    Phone,
    AlertTriangle,
} from "lucide-react";

const AmbulanceRequest =
    () => {
        // =====================================
        // USER
        // =====================================

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

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
        // FETCH REQUESTS
        // =====================================

        useEffect(() => {
            fetchRequests();
        }, []);

        const fetchRequests =
            async () => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/ambulance-requests/patient/${user._id}`
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
        // SUBMIT
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
                                        userId:
                                            user._id,

                                        requestedBy:
                                            "Patient",

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
                            "Ambulance request submitted successfully"
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
                    } else {
                        alert(
                            result.message
                        );
                    }
                } catch (
                    error
                ) {
                    console.log(
                        error
                    );

                    alert(
                        "Something went wrong"
                    );
                } finally {
                    setLoading(
                        false
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

                    case "Cancelled":
                        return "bg-red-100 text-red-600";

                    default:
                        return "bg-yellow-100 text-yellow-600";
                }
            };

        return (
            <div className="min-h-screen bg-blue-50 p-6">
                {/* FORM */}

                <div className="max-w-3xl mx-auto bg-white rounded-[40px] border border-blue-100 shadow-sm p-8 mb-10">
                    {/* HEADER */}

                    <div className="text-center mb-10">
                        <div className="w-24 h-24 rounded-[30px] bg-red-100 flex items-center justify-center mx-auto mb-5">
                            <Ambulance
                                size={
                                    45
                                }
                                className="text-red-600"
                            />
                        </div>

                        <h2 className="text-4xl font-black text-slate-800 mb-3">
                            Ambulance
                            Request
                        </h2>

                        <p className="text-slate-500 text-lg">
                            Request an
                            emergency
                            ambulance
                        </p>
                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="space-y-6"
                    >
                        {/* PICKUP */}

                        <div>
                            <label className="text-slate-700 font-black mb-3 block">
                                Pickup
                                Location
                            </label>

                            <div className="relative">
                                <MapPin
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={
                                        22
                                    }
                                />

                                <input
                                    type="text"
                                    name="pickupLocation"
                                    placeholder="Enter pickup location"
                                    value={
                                        formData.pickupLocation
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full h-16 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                                />
                            </div>
                        </div>

                        {/* DESTINATION */}

                        <div>
                            <label className="text-slate-700 font-black mb-3 block">
                                Destination
                            </label>

                            <div className="relative">
                                <MapPin
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={
                                        22
                                    }
                                />

                                <input
                                    type="text"
                                    name="destination"
                                    placeholder="Enter destination"
                                    value={
                                        formData.destination
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full h-16 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                                />
                            </div>
                        </div>

                        {/* EMERGENCY */}

                        <div>
                            <label className="text-slate-700 font-black mb-3 block">
                                Emergency
                                Type
                            </label>

                            <div className="relative">
                                <AlertTriangle
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={
                                        22
                                    }
                                />

                                <select
                                    name="emergencyType"
                                    value={
                                        formData.emergencyType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full h-16 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none bg-white"
                                >
                                    <option value="">
                                        Select
                                        Emergency
                                        Type
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
                            </div>
                        </div>

                        {/* PHONE */}

                        <div>
                            <label className="text-slate-700 font-black mb-3 block">
                                Phone
                                Number
                            </label>

                            <div className="relative">
                                <Phone
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={
                                        22
                                    }
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="w-full h-16 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                                />
                            </div>
                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={
                                loading
                            }
                            className="w-full h-16 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-lg font-black"
                        >
                            {loading
                                ? "Submitting..."
                                : "Request Ambulance"}
                        </button>
                    </form>
                </div>

                {/* REQUESTS */}

                <div className="max-w-6xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-3xl font-black text-slate-800 mb-2">
                            My Requests
                        </h2>

                        <p className="text-slate-500">
                            Previous
                            ambulance
                            requests
                        </p>
                    </div>

                    {/* EMPTY */}

                    {requests.length ===
                        0 && (
                            <div className="bg-white rounded-[35px] border border-blue-100 p-16 text-center">
                                <h2 className="text-3xl font-black text-slate-800 mb-3">
                                    No
                                    Requests
                                    Found
                                </h2>

                                <p className="text-slate-500">
                                    Your
                                    ambulance
                                    requests
                                    will
                                    appear
                                    here
                                </p>
                            </div>
                        )}

                    {/* TABLE */}

                    {requests.length >
                        0 && (
                            <div className="bg-white rounded-[35px] border border-blue-100 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        {/* HEAD */}

                                        <thead className="bg-blue-600 text-white">
                                            <tr>
                                                <th className="px-6 py-5 text-left">
                                                    Pickup
                                                </th>

                                                <th className="px-6 py-5 text-left">
                                                    Destination
                                                </th>

                                                <th className="px-6 py-5 text-left">
                                                    Emergency
                                                </th>

                                                <th className="px-6 py-5 text-left">
                                                    Status
                                                </th>

                                                <th className="px-6 py-5 text-left">
                                                    Ambulance
                                                </th>

                                                <th className="px-6 py-5 text-left">
                                                    Date
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

                                                        <td className="px-6 py-5 font-semibold text-slate-700">
                                                            {
                                                                item.pickupLocation
                                                            }
                                                        </td>

                                                        {/* DESTINATION */}

                                                        <td className="px-6 py-5 font-semibold text-slate-700">
                                                            {
                                                                item.destination
                                                            }
                                                        </td>

                                                        {/* EMERGENCY */}

                                                        <td className="px-6 py-5">
                                                            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-2xl text-sm font-bold">
                                                                {
                                                                    item.emergencyType
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* STATUS */}

                                                        <td className="px-6 py-5">
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

                                                        <td className="px-6 py-5">
                                                            {item.ambulance ? (
                                                                <div className="space-y-1">
                                                                    {/* VEHICLE */}

                                                                    <h4 className="font-black text-slate-800">
                                                                        {
                                                                            item
                                                                                ?.ambulance
                                                                                ?.vehicleNumber
                                                                        }
                                                                    </h4>

                                                                    {/* DRIVER */}

                                                                    <p className="text-slate-600 text-sm font-semibold">
                                                                        Driver:
                                                                        {" "}
                                                                        {
                                                                            item
                                                                                ?.ambulance
                                                                                ?.driverName
                                                                        }
                                                                    </p>

                                                                    {/* PHONE */}

                                                                    <p className="text-blue-600 text-sm font-bold">
                                                                        {
                                                                            item
                                                                                ?.ambulance
                                                                                ?.driverPhone
                                                                        }
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <span className="text-slate-400 font-semibold">
                                                                    Not
                                                                    Assigned
                                                                </span>
                                                            )}
                                                        </td>

                                                        {/* DATE */}

                                                        <td className="px-6 py-5 font-semibold text-slate-700">
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
            </div>
        );
    };

export default AmbulanceRequest;