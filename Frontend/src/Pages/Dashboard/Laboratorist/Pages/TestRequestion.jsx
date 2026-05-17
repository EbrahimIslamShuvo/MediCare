import React, {
    useEffect,
    useState,
} from "react";

import {
    Clock3,
    Activity,
    FileText,
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
                            "http://127.0.0.1:3000/api/v1/admit-requests"
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {

                        const formatted =
                            [];

                        result.data.forEach(
                            (
                                admit
                            ) => {

                                if (
                                    admit.status ===
                                    "Admitted"
                                ) {

                                    admit.testRequests?.forEach(
                                        (
                                            test,
                                            index
                                        ) => {

                                            if (
                                                test.isSent
                                            ) {

                                                formatted.push(
                                                    {
                                                        _id:
                                                            `${admit._id}-${index}`,

                                                        admitId:
                                                            admit._id,

                                                        testIndex:
                                                            index,

                                                        patient:
                                                            admit.patient,

                                                        room:
                                                            admit.room,

                                                        status:
                                                            test.status ||
                                                            "Pending",

                                                        reportPdf:
                                                            test.reportPdf ||
                                                            "",

                                                        totalAmount:
                                                            test.price,

                                                        tests:
                                                            [
                                                                {
                                                                    name:
                                                                        test.testName,
                                                                },
                                                            ],
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        );

                        setTests(
                            formatted
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
                admitId,
                index,
                status
            ) => {

                try {

                    const formData =
                        new FormData();

                    formData.append(
                        "status",
                        status
                    );

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/admit-requests/lab-test/${admitId}/${index}`,
                            {
                                method:
                                    "PATCH",

                                body:
                                    formData,
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
                            "Select PDF report"
                        );

                        return;
                    }

                    const formData =
                        new FormData();

                    formData.append(
                        "status",
                        "Completed"
                    );

                    formData.append(
                        "reportPdf",
                        report
                    );

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/admit-requests/lab-test/${selectedTest.admitId}/${selectedTest.testIndex}`,
                            {
                                method:
                                    "PATCH",

                                body:
                                    formData,
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {

                        alert(
                            "Report Uploaded"
                        );

                        setShowModal(
                            false
                        );

                        setReport(
                            null
                        );

                        setSelectedTest(
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
                <div className="min-h-screen flex justify-center items-center text-3xl font-black text-blue-600">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-blue-50 p-5">

                <div className="mb-6">

                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                        Laboratory
                        Tests
                    </h2>

                    <p className="text-slate-500">
                        Admitted patient
                        laboratory requests
                    </p>
                </div>

                <div className="bg-white rounded-[30px] overflow-hidden border border-blue-100">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-blue-600 text-white">

                                <tr>

                                    <th className="px-5 py-4 text-left">
                                        Patient
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Room
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Test
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Amount
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

                                {
                                    tests.map(
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
                                                        : "bg-blue-50/30"
                                                }`}
                                            >

                                                <td className="px-5 py-5">

                                                    <div>

                                                        <h2 className="font-black text-slate-800">
                                                            {
                                                                item
                                                                    ?.patient
                                                                    ?.user
                                                                    ?.name
                                                            }
                                                        </h2>

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

                                                <td className="px-5 py-5 font-bold">

                                                    {
                                                        item
                                                            ?.room
                                                            ?.roomNumber
                                                    }
                                                </td>

                                                <td className="px-5 py-5">

                                                    {
                                                        item
                                                            ?.tests[0]
                                                            ?.name
                                                    }
                                                </td>

                                                <td className="px-5 py-5 font-black">

                                                    ৳
                                                    {
                                                        item.totalAmount
                                                    }
                                                </td>

                                                <td className="px-5 py-5">

                                                    <span
                                                        className={`px-4 py-2 rounded-2xl text-sm font-black ${
                                                            item.status ===
                                                            "Pending"
                                                                ? "bg-yellow-100 text-yellow-600"
                                                                : item.status ===
                                                                  "Processing"
                                                                ? "bg-blue-100 text-blue-600"
                                                                : "bg-green-100 text-green-600"
                                                        }`}
                                                    >
                                                        {
                                                            item.status
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-5 py-5">

                                                    {
                                                        item.status ===
                                                        "Pending" && (

                                                            <button
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        item.admitId,
                                                                        item.testIndex,
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
                                                        )
                                                    }

                                                    {
                                                        item.status ===
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

                                                                Upload Report
                                                            </button>
                                                        )
                                                    }

                                                    {
                                                        item.status ===
                                                        "Completed" && (

                                                            <a
                                                                href={`http://127.0.0.1:3000${item.reportPdf}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-blue-600 font-black flex items-center gap-2"
                                                            >

                                                                <FileText
                                                                    size={
                                                                        18
                                                                    }
                                                                />

                                                                View PDF
                                                            </a>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MODAL */}

                {
                    showModal && (

                        <div className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-center p-5">

                            <div className="w-full max-w-lg bg-white rounded-[30px] p-6">

                                <div className="flex items-center justify-between mb-6">

                                    <h2 className="text-2xl font-black text-slate-800">
                                        Upload PDF
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
                                            e.target
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
                                    Upload PDF
                                    Report
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    };

export default TestRequestion;