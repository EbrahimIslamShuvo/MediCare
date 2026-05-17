import React, {
    useEffect,
    useState,
} from "react";

import {
    Mail,
    Phone,
    MapPin,
    Pencil,
    Save,
    X,
} from "lucide-react";

const NurseProfile =
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
        // STATE
        // =========================

        const [
            nurse,
            setNurse,
        ] = useState(
            null
        );

        const [
            loading,
            setLoading,
        ] = useState(
            true
        );

        const [
            editing,
            setEditing,
        ] = useState(
            false
        );

        const [
            success,
            setSuccess,
        ] = useState(
            ""
        );

        const [
            formData,
            setFormData,
        ] = useState(
            {
                name: "",

                email: "",

                phone: "",

                address: "",
            }
        );

        // =========================
        // FETCH NURSE
        // =========================

        useEffect(
            () => {

                fetchNurse();

            },
            []
        );

        const fetchNurse =
            async () => {

                try {

                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/nurses"
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {

                        const matchedNurse =
                            result.data.find(
                                (
                                    item
                                ) =>
                                    item.user
                                        ?._id ===
                                    currentUser
                                        ?._id
                            );

                        if (
                            matchedNurse
                        ) {

                            setNurse(
                                matchedNurse
                            );

                            setFormData(
                                {
                                    name:
                                        matchedNurse
                                            ?.user
                                            ?.name ||
                                        "",

                                    email:
                                        matchedNurse
                                            ?.user
                                            ?.email ||
                                        "",

                                    phone:
                                        matchedNurse?.phone ||
                                        "",

                                    address:
                                        matchedNurse?.address ||
                                        "",
                                }
                            );
                        }
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
        // HANDLE CHANGE
        // =========================

        const handleChange =
            (
                e
            ) => {

                setFormData(
                    {
                        ...formData,

                        [e.target.name]:
                            e.target.value,
                    }
                );
            };

        // =========================
        // UPDATE PROFILE
        // =========================

        const handleUpdate =
            async () => {

                try {

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/nurses/${nurse?._id}`,
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

                        localStorage.setItem(
                            "user",

                            JSON.stringify(
                                {
                                    ...currentUser,

                                    name:
                                        formData.name,

                                    email:
                                        formData.email,
                                }
                            )
                        );

                        setSuccess(
                            "Profile Updated Successfully"
                        );

                        setEditing(
                            false
                        );

                        fetchNurse();

                        setTimeout(
                            () => {

                                setSuccess(
                                    ""
                                );

                            },
                            3000
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

        // =========================
        // LOADING
        // =========================

        if (
            loading
        ) {

            return (
                <div className="flex justify-center items-center h-[70vh]">

                    <h2 className="text-2xl font-bold text-blue-600">
                        Loading...
                    </h2>
                </div>
            );
        }

        return (
            <div className="max-w-5xl mx-auto">

                {/* SUCCESS */}

                {
                    success && (

                        <div className="mb-5 bg-green-100 text-green-700 px-5 py-4 rounded-2xl font-semibold">
                            {success}
                        </div>
                    )
                }

                {/* PROFILE CARD */}

                <div className="bg-white rounded-[35px] shadow-sm border border-blue-100 overflow-hidden">

                    {/* TOP */}

                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-44 relative">

                        {/* BUTTON */}

                        <div className="absolute top-6 right-6 flex items-center gap-3">

                            {
                                editing ? (

                                    <>

                                        <button
                                            onClick={
                                                handleUpdate
                                            }
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition"
                                        >

                                            <Save size={18} />

                                            Save
                                        </button>

                                        <button
                                            onClick={() =>
                                                setEditing(
                                                    false
                                                )
                                            }
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition"
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
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition"
                                    >

                                        <Pencil size={18} />

                                        Edit Profile
                                    </button>
                                )
                            }
                        </div>

                        {/* AVATAR */}

                        <div className="absolute -bottom-16 left-10">

                            <div className="w-32 h-32 rounded-full border-[6px] border-white bg-white shadow-xl flex items-center justify-center">

                                <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-black uppercase">

                                    {
                                        formData?.name?.[0] ||
                                        "N"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT */}

                    <div className="pt-24 px-10 pb-10">

                        {/* NAME */}

                        <div className="mb-10">

                            {
                                editing ? (

                                    <input
                                        type="text"
                                        name="name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="text-4xl font-black text-slate-800 border-b-2 border-blue-500 focus:outline-none"
                                    />

                                ) : (

                                    <h2 className="text-4xl font-black text-slate-800">
                                        {
                                            formData.name
                                        }
                                    </h2>
                                )
                            }

                            <p className="text-blue-600 font-bold mt-2">
                                Nurse
                            </p>
                        </div>

                        {/* GRID */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* EMAIL */}

                            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">

                                <div className="flex items-center gap-3 mb-4">

                                    <Mail className="text-blue-600" />

                                    <h4 className="font-black text-blue-700 text-lg">
                                        Email
                                    </h4>
                                </div>

                                {
                                    editing ? (

                                        <input
                                            type="email"
                                            name="email"
                                            value={
                                                formData.email
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full bg-white border border-blue-200 rounded-2xl px-4 py-3 focus:outline-none"
                                        />

                                    ) : (

                                        <p className="text-slate-700 font-semibold text-lg">
                                            {
                                                formData.email
                                            }
                                        </p>
                                    )
                                }
                            </div>

                            {/* PHONE */}

                            <div className="bg-green-50 rounded-3xl p-6 border border-green-100">

                                <div className="flex items-center gap-3 mb-4">

                                    <Phone className="text-green-600" />

                                    <h4 className="font-black text-green-700 text-lg">
                                        Phone
                                    </h4>
                                </div>

                                {
                                    editing ? (

                                        <input
                                            type="text"
                                            name="phone"
                                            value={
                                                formData.phone
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full bg-white border border-green-200 rounded-2xl px-4 py-3 focus:outline-none"
                                        />

                                    ) : (

                                        <p className="text-slate-700 font-semibold text-lg">

                                            {
                                                formData.phone ||
                                                "Not Added"
                                            }
                                        </p>
                                    )
                                }
                            </div>

                            {/* ADDRESS */}

                            <div className="bg-yellow-50 rounded-3xl p-6 border border-yellow-100 md:col-span-2">

                                <div className="flex items-center gap-3 mb-4">

                                    <MapPin className="text-yellow-600" />

                                    <h4 className="font-black text-yellow-700 text-lg">
                                        Address
                                    </h4>
                                </div>

                                {
                                    editing ? (

                                        <textarea
                                            rows="4"
                                            name="address"
                                            value={
                                                formData.address
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            className="w-full bg-white border border-yellow-200 rounded-2xl px-4 py-3 focus:outline-none"
                                        ></textarea>

                                    ) : (

                                        <p className="text-slate-700 font-semibold text-lg">

                                            {
                                                formData.address ||
                                                "Not Added"
                                            }
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

export default NurseProfile;