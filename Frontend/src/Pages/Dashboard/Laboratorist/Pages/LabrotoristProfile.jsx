import React, {
    useEffect,
    useState,
} from "react";

import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    FlaskConical,
} from "lucide-react";

const LabrotoristProfile =
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
            profile,
            setProfile,
        ] = useState(null);

        const [
            loading,
            setLoading,
        ] = useState(true);

        const [
            showEditModal,
            setShowEditModal,
        ] = useState(false);

        const [
            formData,
            setFormData,
        ] = useState({
            phone: "",

            address: "",
        });

        // =====================================
        // FETCH PROFILE
        // =====================================

        useEffect(() => {
            fetchProfile();
        }, []);

        const fetchProfile =
            async () => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/laboratories/${user._id}`
                        );

                    const result =
                        await response.json();

                    // PROFILE EXISTS

                    if (
                        result.success &&
                        result.data
                    ) {
                        setProfile(
                            result.data
                        );

                        setFormData(
                            {
                                phone:
                                    result
                                        .data
                                        ?.phone ||
                                    "",

                                address:
                                    result
                                        .data
                                        ?.address ||
                                    "",
                            }
                        );
                    }

                    // CREATE EMPTY PROFILE

                    else {
                        await createProfile();
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
        // CREATE PROFILE
        // =====================================

        const createProfile =
            async () => {
                try {
                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/laboratories",
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
                                        user:
                                            user._id,
                                    }
                                ),
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setProfile(
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
        // UPDATE PROFILE
        // =====================================

        const updateProfile =
            async () => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/laboratories/${user._id}`,
                            {
                                method:
                                    "PATCH",

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
                        alert(
                            "Profile updated successfully"
                        );

                        setProfile(
                            result.data
                        );

                        setShowEditModal(
                            false
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
        // LOADING
        // =====================================

        if (loading) {
            return (
                <div className="min-h-screen flex justify-center items-center text-2xl font-black text-blue-600">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-blue-50 p-4">
                {/* HEADER */}

                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 mb-1">
                            Laboratory
                            Profile
                        </h2>

                        <p className="text-slate-500">
                            Staff profile
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setShowEditModal(
                                true
                            )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-2xl font-bold"
                    >
                        Edit
                    </button>
                </div>

                {/* PROFILE CARD */}

                <div className="bg-white rounded-[30px] border border-blue-100 shadow-sm overflow-hidden">
                    {/* TOP */}

                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-24 flex items-center px-6">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-blue-600 text-2xl font-black uppercase shadow-md">
                            {
                                user?.name?.[0]
                            }
                        </div>

                        <div className="ml-4 text-white">
                            <h2 className="text-2xl font-black">
                                {
                                    user?.name
                                }
                            </h2>

                            <div className="flex items-center gap-2 mt-1">
                                <FlaskConical
                                    size={
                                        16
                                    }
                                />

                                <p className="font-semibold text-sm">
                                    Laboratory
                                    Specialist
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT */}

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* EMAIL */}

                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail
                                        size={
                                            18
                                        }
                                        className="text-blue-600"
                                    />

                                    <h3 className="font-black text-slate-800">
                                        Email
                                    </h3>
                                </div>

                                <p className="text-slate-600 text-sm font-medium break-all">
                                    {
                                        user?.email
                                    }
                                </p>
                            </div>

                            {/* PHONE */}

                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Phone
                                        size={
                                            18
                                        }
                                        className="text-blue-600"
                                    />

                                    <h3 className="font-black text-slate-800">
                                        Phone
                                    </h3>
                                </div>

                                <p className="text-slate-600 text-sm font-medium">
                                    {profile?.phone ||
                                        "Not Added"}
                                </p>
                            </div>

                            {/* ADDRESS */}

                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin
                                        size={
                                            18
                                        }
                                        className="text-blue-600"
                                    />

                                    <h3 className="font-black text-slate-800">
                                        Address
                                    </h3>
                                </div>

                                <p className="text-slate-600 text-sm font-medium">
                                    {profile?.address ||
                                        "Not Added"}
                                </p>
                            </div>

                            {/* JOINED DATE */}

                            <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar
                                        size={
                                            18
                                        }
                                        className="text-cyan-600"
                                    />

                                    <h3 className="font-black text-slate-800">
                                        Joined
                                    </h3>
                                </div>

                                <p className="text-slate-600 text-sm font-medium">
                                    {profile?.createdAt
                                        ? new Date(
                                            profile.createdAt
                                        ).toLocaleDateString()
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EDIT MODAL */}

                {showEditModal && (
                    <div className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center p-5">
                        <div className="w-full max-w-lg bg-white rounded-[30px] p-6">
                            {/* HEADER */}

                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-slate-800">
                                    Edit
                                    Profile
                                </h2>

                                <button
                                    onClick={() =>
                                        setShowEditModal(
                                            false
                                        )
                                    }
                                    className="w-10 h-10 rounded-xl bg-red-100 text-red-600 text-xl font-black"
                                >
                                    ×
                                </button>
                            </div>

                            {/* FORM */}

                            <div className="space-y-5">
                                {/* PHONE */}

                                <input
                                    type="text"
                                    placeholder="Phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setFormData(
                                            {
                                                ...formData,

                                                phone:
                                                    e
                                                        .target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none"
                                />

                                {/* ADDRESS */}

                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={
                                        formData.address
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setFormData(
                                            {
                                                ...formData,

                                                address:
                                                    e
                                                        .target
                                                        .value,
                                            }
                                        )
                                    }
                                    className="w-full h-14 rounded-2xl border border-slate-200 px-5 outline-none"
                                />

                                {/* BUTTON */}

                                <button
                                    onClick={
                                        updateProfile
                                    }
                                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black"
                                >
                                    Save
                                    Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

export default LabrotoristProfile;