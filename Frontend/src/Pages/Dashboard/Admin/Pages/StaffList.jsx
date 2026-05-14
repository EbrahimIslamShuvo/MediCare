import React, {
    useEffect,
    useState,
} from "react";

import {
    Search,
    Plus,
    Mail,
    UserRound,
    Shield,
    X,
} from "lucide-react";

const StaffList = () => {
    // =========================
    // STATE
    // =========================

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [roleFilter, setRoleFilter] =
        useState("All");

    const [showModal, setShowModal] =
        useState(false);

    const [creating, setCreating] =
        useState(false);

    const [formData, setFormData] =
        useState({
            name: "",

            email: "",

            role: "Doctor",
        });

    // =========================
    // FETCH USERS
    // =========================

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers =
        async () => {
            try {
                const [
                    doctorsRes,
                    nursesRes,
                    receptionistsRes,
                    laboratoristsRes,
                ] = await Promise.all([
                    fetch(
                        "http://127.0.0.1:3000/api/v1/doctors"
                    ),

                    fetch(
                        "http://127.0.0.1:3000/api/v1/nurses"
                    ),

                    fetch(
                        "http://127.0.0.1:3000/api/v1/receptionists"
                    ),

                    fetch(
                        "http://127.0.0.1:3000/api/v1/laboratorists"
                    ),
                ]);

                const doctors =
                    await doctorsRes.json();

                const nurses =
                    await nursesRes.json();

                const receptionists =
                    await receptionistsRes.json();

                const laboratorists =
                    await laboratoristsRes.json();

                // =========================
                // MERGE ALL STAFF
                // =========================

                const allStaff = [
                    ...(doctors.data || []),

                    ...(nurses.data || []),

                    ...(receptionists.data ||
                        []),

                    ...(laboratorists.data ||
                        []),
                ];

                setUsers(allStaff);
            } catch (error) {
                console.log(error);
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
    // ADD STAFF
    // =========================

    const handleAddStaff =
        async (e) => {
            e.preventDefault();

            try {
                setCreating(true);

                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/auth/register",
                        {
                            method: "POST",

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

                if (result.success) {
                    setShowModal(false);

                    setFormData({
                        name: "",

                        email: "",

                        role: "Doctor",
                    });

                    fetchUsers();
                } else {
                    alert(
                        result.message
                    );
                }
            } catch (error) {
                console.log(error);
            } finally {
                setCreating(false);
            }
        };

    // =========================
    // FILTER USERS
    // =========================

    const filteredUsers =
        users.filter((user) => {
            const matchesSearch =
                user?.user?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                user?.user?.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesRole =
                roleFilter === "All"
                    ? true
                    : user?.user?.role ===
                    roleFilter;

            return (
                matchesSearch &&
                matchesRole
            );
        });

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <h2 className="text-xl font-semibold text-blue-700">
                    Loading...
                </h2>
            </div>
        );
    }

    return (
        <div className="p-6 bg-blue-50 min-h-screen">
            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">
                {/* TITLE */}

                <div>
                    <h2 className="text-3xl font-bold text-blue-700">
                        Staff List
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Manage hospital staff
                    </p>
                </div>

                {/* BUTTON */}

                <button
                    onClick={() =>
                        setShowModal(true)
                    }
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold transition shadow-lg"
                >
                    <Plus size={20} />

                    Add Staff
                </button>
            </div>

            {/* FILTER */}

            <div className="bg-white border border-blue-100 rounded-3xl p-5 mb-6 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* SEARCH */}

                    <div className="flex-1 relative">
                        <Search
                            size={18}
                            className="absolute top-1/2 -translate-y-1/2 left-4 text-blue-400"
                        />

                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* FILTER */}

                    <select
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(
                                e.target.value
                            )
                        }
                        className="px-4 py-3 rounded-2xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">
                            All Roles
                        </option>

                        <option value="Doctor">
                            Doctor
                        </option>

                        <option value="Nurse">
                            Nurse
                        </option>

                        <option value="Receptionist">
                            Receptionist
                        </option>

                        <option value="Laboratorist">
                            Laboratorist
                        </option>

                        <option value="Admin">
                            Admin
                        </option>
                    </select>
                </div>
            </div>

            {/* TABLE */}

            <div className="bg-white border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-50 border-b border-blue-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                                    Staff
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map(
                                (user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-blue-50 hover:bg-blue-50 transition"
                                    >
                                        {/* NAME */}

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg uppercase shadow">
                                                    {user.user?.name?.[0]}
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-slate-800">
                                                        {
                                                            user.user?.name
                                                        }
                                                    </h4>
                                                </div>
                                            </div>
                                        </td>

                                        {/* EMAIL */}

                                        <td className="px-6 py-5 text-slate-600 font-medium">
                                            {
                                                user.user?.email
                                            }
                                        </td>

                                        {/* ROLE */}

                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                                                {user.user?.role}
                                            </span>
                                        </td>

                                        {/* STATUS */}

                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* EMPTY */}

                {filteredUsers.length ===
                    0 && (
                        <div className="py-16 text-center">
                            <Shield
                                size={50}
                                className="mx-auto text-blue-300 mb-4"
                            />

                            <h3 className="text-xl font-bold text-blue-700">
                                No Staff Found
                            </h3>
                        </div>
                    )}
            </div>

            {/* MODAL */}

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl p-8 relative">
                        {/* CLOSE */}

                        <button
                            onClick={() =>
                                setShowModal(
                                    false
                                )
                            }
                            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center"
                        >
                            <X size={20} />
                        </button>

                        {/* TITLE */}

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-blue-700">
                                Add Staff
                            </h2>

                            <p className="text-slate-500 mt-2">
                                Password will be auto
                                generated and sent to
                                email
                            </p>
                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={
                                handleAddStaff
                            }
                            className="space-y-5"
                        >
                            {/* NAME */}

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <UserRound
                                        size={18}
                                        className="absolute top-1/2 -translate-y-1/2 left-4 text-blue-400"
                                    />

                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter full name"
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute top-1/2 -translate-y-1/2 left-4 text-blue-400"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter email"
                                    />
                                </div>
                            </div>

                            {/* ROLE */}

                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Role
                                </label>

                                <select
                                    name="role"
                                    value={
                                        formData.role
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full px-4 py-3 rounded-2xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Doctor">
                                        Doctor
                                    </option>

                                    <option value="Nurse">
                                        Nurse
                                    </option>

                                    <option value="Receptionist">
                                        Receptionist
                                    </option>

                                    <option value="Laboratorist">
                                        Laboratorist
                                    </option>
                                </select>
                            </div>

                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={creating}
                                className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg"
                            >
                                {creating
                                    ? "Creating..."
                                    : "Create Staff"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffList;