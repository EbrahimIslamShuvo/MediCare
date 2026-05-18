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

                    // NORMAL TESTS

                    const labResponse =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/lab-tests"
                        );

                    const labResult =
                        await labResponse.json();

                    // ADMIT TESTS

                    const admitResponse =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/admit-requests"
                        );

                    const admitResult =
                        await admitResponse.json();

                    let allTests =
                        [];

                    // =====================================
                    // NORMAL TESTS
                    // =====================================

                    if (
                        labResult.success
                    ) {

                        const normalTests =
                            labResult.data.map(
                                (
                                    item
                                ) => ({
                                    _id:
                                        item._id,

                                    type:
                                        "Normal",

                                    patient:
                                        item.patient,

                                    tests:
                                        item.tests,

                                    totalAmount:
                                        item.totalAmount,

                                    status:
                                        item.status ||
                                        "Pending",

                                    report:
                                        item.report ||
                                        "",
                                })
                            );

                        allTests = [
                            ...allTests,
                            ...normalTests,
                        ];
                    }

                    // =====================================
                    // ADMIT TESTS
                    // =====================================

                    if (
                        admitResult.success
                    ) {

                        const admitTests =
                            [];

                        admitResult.data.forEach(
                            (
                                admit
                            ) => {

                                admit?.testRequests?.forEach(
                                    (
                                        test,
                                        index
                                    ) => {

                                        admitTests.push(
                                            {
                                                _id:
                                                    `${admit._id}-${index}`,

                                                type:
                                                    "Admit",

                                                admitId:
                                                    admit._id,

                                                testIndex:
                                                    index,

                                                patient:
                                                    admit.patient || {},

                                                room:
                                                    admit.room || {},

                                                status:
                                                    test.status ||
                                                    "Pending",

                                                reportPdf:
                                                    test.reportPdf ||
                                                    "",

                                                totalAmount:
                                                    test.price || 0,

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
                                );
                            }
                        );

                        allTests = [
                            ...allTests,
                            ...admitTests,
                        ];
                    }

                    // =====================================
                    // ONLY PENDING & PROCESSING
                    // =====================================

                    allTests =
                        allTests.filter(
                            (
                                item
                            ) =>
                                item.status ===
                                    "Pending" ||
                                item.status ===
                                    "Processing"
                        );

                    setTests(
                        allTests
                    );

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
                item,
                status
            ) => {

                try {

                    // ADMIT TEST

                    if (
                        item.type ===
                        "Admit"
                    ) {

                        const formData =
                            new FormData();

                        formData.append(
                            "status",
                            status
                        );

                        const response =
                            await fetch(
                                `http://127.0.0.1:3000/api/v1/admit-requests/lab-test/${item.admitId}/${item.testIndex}`,
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
                    }

                    // NORMAL TEST

                    else {

                        const response =
                            await fetch(
                                `http://127.0.0.1:3000/api/v1/lab-tests/${item._id}`,
                                {
                                    method:
                                        "PATCH",

                                    headers:
                                    {
                                        "Content-Type":
                                            "application/json",
                                    },

                                    body:
                                        JSON.stringify(
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

                    // =====================================
                    // ADMIT TEST
                    // =====================================

                    if (
                        selectedTest.type ===
                        "Admit"
                    ) {

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
                    }

                    // =====================================
                    // NORMAL TEST
                    // =====================================

                    else {

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

        if (
            loading
        ) {

            return (
                <div className="min-h-screen flex justify-center items-center text-3xl font-black text-blue-600">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-blue-50 p-5">

                {/* HEADER */}

                <div className="mb-6">

                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                        Laboratory Tests
                    </h2>

                    <p className="text-slate-500">
                        Pending &
                        Processing
                        laboratory
                        requests
                    </p>
                </div>

                {/* TABLE */}

                <div className="bg-white rounded-[30px] overflow-hidden border border-blue-100">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-blue-600 text-white">

                                <tr>

                                    <th className="px-5 py-4 text-left">
                                        Patient
                                    </th>

                                    <th className="px-5 py-4 text-left">
                                        Type
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

                                                {/* PATIENT */}

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

                                                {/* TYPE */}

                                                <td className="px-5 py-5">

                                                    <span
                                                        className={`px-4 py-2 rounded-2xl text-sm font-black ${
                                                            item.type ===
                                                            "Admit"
                                                                ? "bg-blue-100 text-blue-600"
                                                                : "bg-green-100 text-green-600"
                                                        }`}
                                                    >
                                                        {
                                                            item.type
                                                        }
                                                    </span>
                                                </td>

                                                {/* ROOM */}

                                                <td className="px-5 py-5 font-bold">

                                                    {
                                                        item
                                                            ?.room
                                                            ?.roomNumber ||
                                                        "N/A"
                                                    }
                                                </td>

                                                {/* TEST */}

                                                <td className="px-5 py-5">

                                                    {
                                                        item
                                                            ?.tests?.[0]
                                                            ?.name
                                                    }
                                                </td>

                                                {/* AMOUNT */}

                                                <td className="px-5 py-5 font-black">

                                                    ৳
                                                    {
                                                        item.totalAmount
                                                    }
                                                </td>

                                                {/* STATUS */}

                                                <td className="px-5 py-5">

                                                    <span
                                                        className={`px-4 py-2 rounded-2xl text-sm font-black ${
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

                                                    {
                                                        item.status ===
                                                        "Pending" && (

                                                            <button
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        item,
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

                                                                Upload
                                                                Report
                                                            </button>
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