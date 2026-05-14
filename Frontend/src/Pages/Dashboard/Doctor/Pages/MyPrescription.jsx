import React, {
    useEffect,
    useState,
} from "react";

const MyPrescription =
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
            prescriptions,
            setPrescriptions,
        ] = useState([]);

        const [
            loading,
            setLoading,
        ] = useState(true);

        const [
            selectedPrescription,
            setSelectedPrescription,
        ] = useState(null);

        // =====================================
        // FETCH PRESCRIPTIONS
        // =====================================

        useEffect(() => {
            fetchPrescriptions();
        }, []);

        const fetchPrescriptions =
            async () => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/prescriptions/doctor/${user._id}`
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setPrescriptions(
                            result.data
                        );
                    }
                } catch (error) {
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
        // LOADING
        // =====================================

        if (loading) {
            return (
                <div className="min-h-screen flex justify-center items-center text-2xl font-bold text-blue-600">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-blue-50 p-6">
                {/* HEADER */}

                <div className="mb-10">
                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                        My
                        Prescriptions
                    </h2>

                    <p className="text-slate-500 text-lg">
                        View all
                        patient
                        prescriptions
                    </p>
                </div>

                {/* TABLE */}

                <div className="bg-white border border-blue-100 rounded-[40px] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-5 text-left">
                                        Patient
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Email
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Medicines
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Tests
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Date
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {prescriptions.map(
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
                                            {/* PATIENT */}

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-black uppercase">
                                                        {
                                                            item
                                                                ?.patient
                                                                ?.user
                                                                ?.name?.[0]
                                                        }
                                                    </div>

                                                    <h4 className="font-black text-slate-800">
                                                        {
                                                            item
                                                                ?.patient
                                                                ?.user
                                                                ?.name
                                                        }
                                                    </h4>
                                                </div>
                                            </td>

                                            {/* EMAIL */}

                                            <td className="px-6 py-5 font-semibold text-slate-700">
                                                {
                                                    item
                                                        ?.patient
                                                        ?.user
                                                        ?.email
                                                }
                                            </td>

                                            {/* MEDICINES */}

                                            <td className="px-6 py-5">
                                                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-2xl font-bold">
                                                    {
                                                        item
                                                            ?.medicines
                                                            ?.length
                                                    }{" "}
                                                    Medicines
                                                </span>
                                            </td>

                                            {/* TESTS */}

                                            <td className="px-6 py-5">
                                                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-2xl font-bold">
                                                    {
                                                        item
                                                            ?.tests
                                                            ?.length
                                                    }{" "}
                                                    Tests
                                                </span>
                                            </td>

                                            {/* DATE */}

                                            <td className="px-6 py-5 font-semibold text-slate-700">
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleDateString()}
                                            </td>

                                            {/* ACTION */}

                                            <td className="px-6 py-5">
                                                <button
                                                    onClick={() =>
                                                        setSelectedPrescription(
                                                            item
                                                        )
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-2xl font-bold transition"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MODAL */}

                {selectedPrescription && (
                    <div className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-center p-5 overflow-y-auto">
                        <div className="w-full max-w-5xl bg-white rounded-[40px] p-8">
                            {/* HEADER */}

                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                                        Prescription
                                        Details
                                    </h2>

                                    <p className="text-slate-500 font-semibold">
                                        {
                                            selectedPrescription
                                                ?.patient
                                                ?.user
                                                ?.name
                                        }
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setSelectedPrescription(
                                            null
                                        )
                                    }
                                    className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 text-xl font-black"
                                >
                                    ×
                                </button>
                            </div>

                            {/* MEDICINES */}

                            <div className="mb-10">
                                <h3 className="text-3xl font-black text-slate-800 mb-6">
                                    Medicines
                                </h3>

                                <div className="space-y-5">
                                    {selectedPrescription?.medicines?.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="bg-blue-50 border border-blue-100 rounded-3xl p-6"
                                            >
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                                    <div>
                                                        <p className="text-slate-500 font-semibold mb-2">
                                                            Medicine
                                                        </p>

                                                        <h4 className="font-black text-slate-800 text-lg">
                                                            {
                                                                item.medicine
                                                            }
                                                        </h4>
                                                    </div>

                                                    <div>
                                                        <p className="text-slate-500 font-semibold mb-2">
                                                            Duration
                                                        </p>

                                                        <h4 className="font-black text-slate-800 text-lg">
                                                            {
                                                                item.duration
                                                            }{" "}
                                                            Days
                                                        </h4>
                                                    </div>

                                                    <div>
                                                        <p className="text-slate-500 font-semibold mb-2">
                                                            Time
                                                        </p>

                                                        <div className="flex flex-wrap gap-2">
                                                            {item.time.map(
                                                                (
                                                                    time,
                                                                    i
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            i
                                                                        }
                                                                        className="bg-white border border-blue-200 text-blue-600 px-4 py-1 rounded-2xl font-bold"
                                                                    >
                                                                        {
                                                                            time
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* TESTS */}

                            <div>
                                <h3 className="text-3xl font-black text-slate-800 mb-6">
                                    Tests
                                </h3>

                                <div className="space-y-5">
                                    {selectedPrescription?.tests?.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="bg-purple-50 border border-purple-100 rounded-3xl p-6"
                                            >
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                                    <div>
                                                        <p className="text-slate-500 font-semibold mb-2">
                                                            Test
                                                            Name
                                                        </p>

                                                        <h4 className="font-black text-slate-800 text-lg">
                                                            {
                                                                item.testName
                                                            }
                                                        </h4>
                                                    </div>

                                                    <div>
                                                        <p className="text-slate-500 font-semibold mb-2">
                                                            Comment
                                                        </p>

                                                        <h4 className="font-semibold text-slate-700">
                                                            {
                                                                item.comment
                                                            }
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

export default MyPrescription;