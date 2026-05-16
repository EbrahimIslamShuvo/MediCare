import React, {
    useEffect,
    useState,
} from "react";

import {
    User,
    Phone,
    MapPin,
    Calendar,
    Save,
    Pencil,
} from "lucide-react";

const ProfileReceptionist =
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
        ] = useState(true);

        const [
            updating,
            setUpdating,
        ] = useState(false);

        const [
            isEdit,
            setIsEdit,
        ] = useState(false);

        const [
            profile,
            setProfile,
        ] = useState(null);

        const [
            formData,
            setFormData,
        ] = useState({
            name: "",

            email: "",

            phone: "",

            gender:
                "Male",

            department:
                "",

            shift:
                "Morning",

            experience: 0,

            address: "",

            emergencyContact:
                "",

            status:
                "Active",
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
                            `http://127.0.0.1:3000/api/v1/receptionists/user/${user._id}`
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setProfile(
                            result.data
                        );

                        setFormData(
                            {
                                name:
                                    result
                                        ?.data
                                        ?.user
                                        ?.name ||
                                    "",

                                email:
                                    result
                                        ?.data
                                        ?.user
                                        ?.email ||
                                    "",

                                phone:
                                    result
                                        ?.data
                                        ?.phone ||
                                    "",

                                gender:
                                    result
                                        ?.data
                                        ?.gender ||
                                    "Male",

                                department:
                                    result
                                        ?.data
                                        ?.department ||
                                    "",

                                shift:
                                    result
                                        ?.data
                                        ?.shift ||
                                    "Morning",

                                experience:
                                    result
                                        ?.data
                                        ?.experience ||
                                    0,

                                address:
                                    result
                                        ?.data
                                        ?.address ||
                                    "",

                                emergencyContact:
                                    result
                                        ?.data
                                        ?.emergencyContact ||
                                    "",

                                status:
                                    result
                                        ?.data
                                        ?.status ||
                                    "Active",
                            }
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
        // UPDATE
        // =====================================

        const handleSubmit =
            async (
                e
            ) => {
                e.preventDefault();

                try {
                    setUpdating(
                        true
                    );

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/receptionists/${profile._id}`,
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

                        setIsEdit(
                            false
                        );

                        fetchProfile();
                    }
                } catch (
                    error
                ) {
                    console.log(
                        error
                    );
                } finally {
                    setUpdating(
                        false
                    );
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
            <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
                <div className="w-full max-w-5xl">
                    {/* CARD */}

                    <div className="bg-white rounded-[40px] border border-blue-100 shadow-sm overflow-hidden">
                        {/* TOP */}

                        <div className="bg-blue-600 p-10 text-white">
                            <div className="flex items-center justify-between flex-wrap gap-5">
                                <div className="flex items-center gap-6">
                                    <div className="w-32 h-32 rounded-[35px] bg-white/20 flex items-center justify-center">
                                        <User
                                            size={
                                                60
                                            }
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-4xl font-black mb-2">
                                            {
                                                profile
                                                    ?.user
                                                    ?.name
                                            }
                                        </h2>

                                        <p className="text-blue-100 text-lg">
                                            {
                                                profile
                                                    ?.user
                                                    ?.email
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* EDIT BUTTON */}

                                <button
                                    onClick={() =>
                                        setIsEdit(
                                            !isEdit
                                        )
                                    }
                                    className="bg-white text-blue-600 px-6 h-14 rounded-2xl font-black flex items-center gap-2"
                                >
                                    <Pencil
                                        size={
                                            20
                                        }
                                    />

                                    {isEdit
                                        ? "Close"
                                        : "Edit"}
                                </button>
                            </div>
                        </div>

                        {/* BODY */}

                        <div className="p-8">
                            {/* INFO */}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                                <InfoCard
                                    title="Phone"
                                    value={
                                        profile?.phone
                                    }
                                    icon={
                                        <Phone />
                                    }
                                />

                                <InfoCard
                                    title="Address"
                                    value={
                                        profile?.address
                                    }
                                    icon={
                                        <MapPin />
                                    }
                                />

                                <InfoCard
                                    title="Department"
                                    value={
                                        profile?.department
                                    }
                                    icon={
                                        <User />
                                    }
                                />

                                <InfoCard
                                    title="Shift"
                                    value={
                                        profile?.shift
                                    }
                                    icon={
                                        <Calendar />
                                    }
                                />

                                <InfoCard
                                    title="Experience"
                                    value={`${profile?.experience} Years`}
                                    icon={
                                        <User />
                                    }
                                />

                                <InfoCard
                                    title="Emergency Contact"
                                    value={
                                        profile?.emergencyContact
                                    }
                                    icon={
                                        <Phone />
                                    }
                                />
                            </div>

                            {/* EDIT FORM */}

                            {isEdit && (
                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField
                                            label="Name"
                                            name="name"
                                            value={
                                                formData.name
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                        />

                                        <InputField
                                            label="Email"
                                            name="email"
                                            value={
                                                formData.email
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                        />

                                        <InputField
                                            label="Phone"
                                            name="phone"
                                            value={
                                                formData.phone
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                        />

                                        <InputField
                                            label="Department"
                                            name="department"
                                            value={
                                                formData.department
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                        />

                                        <InputField
                                            label="Experience"
                                            name="experience"
                                            type="number"
                                            value={
                                                formData.experience
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                        />

                                        <InputField
                                            label="Emergency Contact"
                                            name="emergencyContact"
                                            value={
                                                formData.emergencyContact
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                        />

                                        {/* GENDER */}

                                        <SelectField
                                            label="Gender"
                                            name="gender"
                                            value={
                                                formData.gender
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                            options={[
                                                "Male",
                                                "Female",
                                                "Other",
                                            ]}
                                        />

                                        {/* SHIFT */}

                                        <SelectField
                                            label="Shift"
                                            name="shift"
                                            value={
                                                formData.shift
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                            options={[
                                                "Morning",
                                                "Evening",
                                                "Night",
                                            ]}
                                        />

                                        {/* STATUS */}

                                        <SelectField
                                            label="Status"
                                            name="status"
                                            value={
                                                formData.status
                                            }
                                            handleChange={
                                                handleChange
                                            }
                                            options={[
                                                "Active",
                                                "On Leave",
                                                "Inactive",
                                            ]}
                                        />
                                    </div>

                                    {/* ADDRESS */}

                                    <div>
                                        <label className="block text-slate-700 font-black mb-3">
                                            Address
                                        </label>

                                        <textarea
                                            name="address"
                                            value={
                                                formData.address
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            rows="4"
                                            className="w-full p-5 rounded-2xl border border-blue-100 outline-none resize-none"
                                        />
                                    </div>

                                    {/* BUTTON */}

                                    <button
                                        type="submit"
                                        disabled={
                                            updating
                                        }
                                        className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-black flex items-center justify-center gap-3"
                                    >
                                        <Save
                                            size={
                                                22
                                            }
                                        />

                                        {updating
                                            ? "Updating..."
                                            : "Update Profile"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

// =====================================
// INFO CARD
// =====================================

const InfoCard = ({
    title,
    value,
    icon,
}) => {
    return (
        <div className="bg-blue-50 rounded-[30px] p-6">
            <div className="flex items-center gap-3 mb-3 text-blue-600">
                {icon}

                <h3 className="text-lg font-black text-slate-800">
                    {title}
                </h3>
            </div>

            <p className="text-slate-600 font-semibold">
                {value ||
                    "Not Added"}
            </p>
        </div>
    );
};

// =====================================
// INPUT FIELD
// =====================================

const InputField = ({
    label,
    name,
    value,
    handleChange,
    type = "text",
}) => {
    return (
        <div>
            <label className="block text-slate-700 font-black mb-3">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={
                    handleChange
                }
                className="w-full h-16 px-5 rounded-2xl border border-blue-100 outline-none"
            />
        </div>
    );
};

// =====================================
// SELECT FIELD
// =====================================

const SelectField = ({
    label,
    name,
    value,
    handleChange,
    options,
}) => {
    return (
        <div>
            <label className="block text-slate-700 font-black mb-3">
                {label}
            </label>

            <select
                name={name}
                value={value}
                onChange={
                    handleChange
                }
                className="w-full h-16 px-5 rounded-2xl border border-blue-100 outline-none bg-white"
            >
                {options.map(
                    (
                        option,
                        index
                    ) => (
                        <option
                            key={
                                index
                            }
                        >
                            {option}
                        </option>
                    )
                )}
            </select>
        </div>
    );
};

export default ProfileReceptionist;