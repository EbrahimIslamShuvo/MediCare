import React, {
    useEffect,
    useState,
} from "react";

import {
    Clock3,
    Activity,
} from "lucide-react";

const TestRequestion =
    () => {
        // =====================================
        // STATES
        // =====================================

        const [
            tests,
            setTests,
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
            selectedTest,
            setSelectedTest,
        ] = useState(null);

        const [
            report,
            setReport,
        ] = useState(null);

        // =====================================
        // FETCH TESTS
        // =====================================

        useEffect(() => {
            fetchTests();
        }, []);

        const fetchTests =
            async () => {
                try {
                    setLoading(
                        true
                    );

                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/lab-tests"
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        const filtered =
                            result.data.filter(
                                (
                                    item
                                ) =>
                                    item.status ===
                                        "Pending" ||
                                    item.status ===
                                        "Processing"
                            );

                        setTests(
                            filtered
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
        // UPDATE STATUS
        // =====================================

        const updateStatus =
            async (
                id,
                status
            ) => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/lab-tests/${id}`,
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
                                        status,
                                    }
                                ),
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        fetchTests();
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
        // UPLOAD REPORT
        // =====================================

        const uploadReport =
            async () => {
                try {
                    if (
                        !report
                    ) {
                        alert(
                            "Please select PDF report"
                        );

                        return;
                    }

                    const formData =
                        new FormData();

                    formData.append(
                        "report",
                        report
                    );

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/lab-tests/complete/${selectedTest._id}`,
                            {
                                method:
                                    "PATCH",

                                body: formData,
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        alert(
                            "Report uploaded successfully"
                        );

                        setShowModal(
                            false
                        );

                        setReport(
                            null
                        );

                        fetchTests();
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

                <div className="mb-5">
                    <h2 className="text-3xl font-black text-slate-800 mb-1">
                        Test
                        Requests
                    </h2>

                    <p className="text-slate-500">
                        Pending and
                        processing
                        laboratory
                        tests
                    </p>
                </div>

                {/* EMPTY */}

                {tests.length ===
                    0 && (
                        <div className="bg-white rounded-[30px] border border-blue-100 p-16 text-center">
                            <h2 className="text-3xl font-black text-slate-800 mb-3">
                                No Test
                                Requests
                            </h2>

                            <p className="text-slate-500">
                                No pending
                                laboratory
                                tests found
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {tests.length >
                    0 && (
                        <div className="bg-white rounded-[30px] border border-blue-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-5 py-4 text-left">
                                                Patient
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Tests
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Amount
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Payment
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tests.map(
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

                                                    <td className="px-5 py-5">
                                                        <div>
                                                            <h3 className="font-black text-slate-800">
                                                                {
                                                                    item
                                                                        ?.patient
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            </h3>

                                                            <p className="text-slate-500 text-sm">
                                                                {
                                                                    item
                                                                        ?.patient
                                                                        ?.user
                                                                        ?.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>

                                                    {/* TESTS */}

                                                    <td className="px-5 py-5">
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.tests.map(
                                                                (
                                                                    test,
                                                                    i
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            i
                                                                        }
                                                                        className="bg-purple-100 text-purple-600 px-3 py-1 rounded-xl text-sm font-bold"
                                                                    >
                                                                        {
                                                                            test.name
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* AMOUNT */}

                                                    <td className="px-5 py-5 font-black">
                                                        ৳{" "}
                                                        {
                                                            item.totalAmount
                                                        }
                                                    </td>

                                                    {/* PAYMENT */}

                                                    <td className="px-5 py-5">
                                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-xl text-sm font-bold">
                                                            {
                                                                item.paymentStatus
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="px-5 py-5">
                                                        <span
                                                            className={`px-3 py-1 rounded-xl text-sm font-bold ${
                                                                item.status ===
                                                                "Pending"
                                                                    ? "bg-yellow-100 text-yellow-600"
                                                                    : "bg-blue-100 text-blue-600"
                                                            }`}
                                                        >
                                                            {
                                                                item.status
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* ACTION */}

                                                    <td className="px-5 py-5">
                                                        {item.status ===
                                                            "Pending" && (
                                                            <button
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        item._id,
                                                                        "Processing"
                                                                    )
                                                                }
                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                                                            >
                                                                <Clock3
                                                                    size={
                                                                        16
                                                                    }
                                                                />

                                                                Start
                                                            </button>
                                                        )}

                                                        {item.status ===
                                                            "Processing" && (
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedTest(
                                                                        item
                                                                    );

                                                                    setShowModal(
                                                                        true
                                                                    );
                                                                }}
                                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                                                            >
                                                                <Activity
                                                                    size={
                                                                        16
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
                    )}

                {/* MODAL */}

                {showModal && (
                    <div className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center p-5">
                        <div className="w-full max-w-lg bg-white rounded-[30px] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black text-slate-800">
                                    Upload
                                    Report
                                </h2>

                                <button
                                    onClick={() =>
                                        setShowModal(
                                            false
                                        )
                                    }
                                    className="w-10 h-10 rounded-xl bg-red-100 text-red-600 text-xl font-black"
                                >
                                    ×
                                </button>
                            </div>

                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(
                                    e
                                ) =>
                                    setReport(
                                        e
                                            .target
                                            .files[0]
                                    )
                                }
                                className="w-full border border-slate-200 rounded-2xl p-4 mb-5"
                            />

                            <button
                                onClick={
                                    uploadReport
                                }
                                className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black"
                            >
                                Upload
                                Report
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

export default TestRequestion;