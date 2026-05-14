import React, {
    useEffect,
    useState,
} from "react";

import {
    Mail,
    Phone,
    MapPin,
    HeartPulse,
    User,
    Pencil,
    Save,
    X,
} from "lucide-react";

const ProfilePatient = () => {
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
    // STATE
    // =========================

    const [patient, setPatient] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [editing, setEditing] =
        useState(false);

    const [updating, setUpdating] =
        useState(false);

    const [success, setSuccess] =
        useState("");

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            phone: "",
            gender: "",
            bloodGroup: "",
            age: "",
            address: "",
            emergencyContact: "",
        });

    // =========================
    // FETCH PATIENT
    // =========================

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient =
        async () => {
            try {
                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/patients"
                    );

                const result =
                    await response.json();

                if (result.success) {
                    const matchedPatient =
                        result.data.find(
                            (item) =>
                                item.user?._id ===
                                currentUser?._id
                        );

                    if (
                        matchedPatient
                    ) {
                        setPatient(
                            matchedPatient
                        );

                        setFormData({
                            name:
                                matchedPatient
                                    ?.user
                                    ?.name || "",

                            email:
                                matchedPatient
                                    ?.user
                                    ?.email || "",

                            phone:
                                matchedPatient?.phone ||
                                "",

                            gender:
                                matchedPatient?.gender ||
                                "",

                            bloodGroup:
                                matchedPatient?.bloodGroup ||
                                "",

                            age:
                                matchedPatient?.age ||
                                "",

                            address:
                                matchedPatient?.address ||
                                "",

                            emergencyContact:
                                matchedPatient?.emergencyContact ||
                                "",
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (e) => {
        setFormData({
            ...formData,

            [e.target.name]:
                e.target.value,
        });
    };

    // =========================
    // UPDATE PROFILE
    // =========================

    const handleUpdate =
        async () => {
            try {
                if (!patient?._id) {
                    alert(
                        "Patient ID not found"
                    );

                    return;
                }

                setUpdating(true);

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/patients/${patient._id}`,
                        {
                            method: "PATCH",

                            headers: {
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

                console.log(result);

                if (result.success) {
                    setSuccess(
                        "Profile updated successfully"
                    );

                    localStorage.setItem(
                        "user",

                        JSON.stringify({
                            ...currentUser,

                            name:
                                formData.name,

                            email:
                                formData.email,
                        })
                    );

                    setEditing(false);

                    fetchPatient();

                    setTimeout(() => {
                        setSuccess("");
                    }, 3000);
                } else {
                    alert(
                        result.message
                    );
                }
            } catch (err) {
                console.log(err);

                alert(
                    "Update failed"
                );
            } finally {
                setUpdating(false);
            }
        };

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <h2 className="text-xl font-semibold text-slate-600">
                    Loading...
                </h2>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* SUCCESS */}

            {success && (
                <div className="mb-5 bg-green-100 text-green-700 px-4 py-3 rounded-2xl">
                    {success}
                </div>
            )}

            {/* PROFILE CARD */}

            <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                {/* TOP */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-40 relative">
                    {/* EDIT BUTTON */}

                    <div className="absolute top-6 right-6 flex items-center gap-3">
                        {editing ? (
                            <>
                                <button
                                    onClick={
                                        handleUpdate
                                    }
                                    disabled={
                                        updating
                                    }
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-600 font-semibold hover:bg-slate-100 transition"
                                >
                                    <Save size={18} />

                                    {updating
                                        ? "Saving..."
                                        : "Save"}
                                </button>

                                <button
                                    onClick={() =>
                                        setEditing(
                                            false
                                        )
                                    }
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() =>
                                    setEditing(
                                        true
                                    )
                                }
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-600 font-semibold hover:bg-slate-100 transition"
                            >
                                <Pencil size={18} />
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {/* AVATAR */}

                    <div className="absolute -bottom-16 left-10">
                        <div className="w-32 h-32 rounded-full border-[6px] border-white bg-white shadow-xl flex items-center justify-center">
                            <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold uppercase">
                                {formData?.name?.[0] ||
                                    currentUser?.name?.[0] ||
                                    "P"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}

                <div className="pt-24 px-10 pb-10">
                    {/* NAME */}

                    <div className="mb-10">
                        {editing ? (
                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                className="text-3xl font-bold text-slate-800 border-b-2 border-blue-500 focus:outline-none"
                            />
                        ) : (
                            <h2 className="text-3xl font-bold text-slate-800">
                                {formData.name ||
                                    currentUser?.name ||
                                    "Patient"}
                            </h2>
                        )}

                        <p className="text-slate-500 mt-2">
                            {currentUser?.role ||
                                "Patient"}
                        </p>
                    </div>

                    {/* GRID */}

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* EMAIL */}

                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <Mail className="text-blue-600" />

                                <h4 className="font-semibold text-slate-700">
                                    Email
                                </h4>
                            </div>

                            {editing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-slate-600 font-medium">
                                    {formData.email ||
                                        currentUser?.email ||
                                        "No Email"}
                                </p>
                            )}
                        </div>

                        {/* PHONE */}

                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <Phone className="text-blue-600" />

                                <h4 className="font-semibold text-slate-700">
                                    Phone
                                </h4>
                            </div>

                            {editing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-slate-600 font-medium">
                                    {formData.phone ||
                                        "Not Added"}
                                </p>
                            )}
                        </div>

                        {/* GENDER */}

                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                                <User className="text-blue-600" />

                                <h4 className="font-semibold text-slate-700">
                                    Gender
                                </h4>
                            </div>

                            {editing ? (
                                <select
                                    name="gender"
                                    value={
                                        formData.gender
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            ) : (
                                <p className="text-slate-600 font-medium">
                                    {formData.gender ||
                                        "Not Added"}
                                </p>
                            )}
                        </div>

                        {/* BLOOD GROUP */}

                        <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                            <div className="flex items-center gap-3 mb-3">
                                <HeartPulse className="text-red-600" />

                                <h4 className="font-semibold text-red-700">
                                    Blood Group
                                </h4>
                            </div>

                            {editing ? (
                                <select
                                    name="bloodGroup"
                                    value={
                                        formData.bloodGroup
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full bg-white border border-red-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <option value="">
                                        Select
                                    </option>

                                    <option value="A+">
                                        A+
                                    </option>

                                    <option value="A-">
                                        A-
                                    </option>

                                    <option value="B+">
                                        B+
                                    </option>

                                    <option value="B-">
                                        B-
                                    </option>

                                    <option value="AB+">
                                        AB+
                                    </option>

                                    <option value="AB-">
                                        AB-
                                    </option>

                                    <option value="O+">
                                        O+
                                    </option>

                                    <option value="O-">
                                        O-
                                    </option>
                                </select>
                            ) : (
                                <p className="text-red-700 font-bold">
                                    {formData.bloodGroup ||
                                        "Not Added"}
                                </p>
                            )}
                        </div>

                        {/* AGE */}

                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
                            <h4 className="font-semibold text-emerald-700 mb-3">
                                Age
                            </h4>

                            {editing ? (
                                <input
                                    type="number"
                                    name="age"
                                    value={
                                        formData.age
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            ) : (
                                <p className="text-emerald-700 font-bold">
                                    {formData.age ||
                                        "Not Added"}
                                </p>
                            )}
                        </div>

                        {/* ADDRESS */}

                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 md:col-span-2 xl:col-span-1">
                            <div className="flex items-center gap-3 mb-3">
                                <MapPin className="text-blue-600" />

                                <h4 className="font-semibold text-slate-700">
                                    Address
                                </h4>
                            </div>

                            {editing ? (
                                <textarea
                                    rows="3"
                                    name="address"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            ) : (
                                <p className="text-slate-600 font-medium">
                                    {formData.address ||
                                        "Not Added"}
                                </p>
                            )}
                        </div>

                        {/* EMERGENCY */}

                        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 md:col-span-2">
                            <h4 className="font-semibold text-amber-700 mb-3">
                                Emergency Contact
                            </h4>

                            {editing ? (
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    value={
                                        formData.emergencyContact
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            ) : (
                                <p className="text-amber-700 font-semibold">
                                    {formData.emergencyContact ||
                                        "Not Added"}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePatient;