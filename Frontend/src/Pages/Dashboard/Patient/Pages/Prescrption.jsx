import React, {
    useEffect,
    useState,
} from "react";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

const Prescrption =
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

        // TEST BOOKING

        const [
            showTestModal,
            setShowTestModal,
        ] = useState(false);

        const [
            selectedTests,
            setSelectedTests,
        ] = useState([]);

        const [
            totalPrice,
            setTotalPrice,
        ] = useState(0);

        const [
            allTests,
            setAllTests,
        ] = useState([]);

        // =====================================
        // FETCH PRESCRIPTIONS
        // =====================================

        useEffect(() => {
            fetchPrescriptions();
        }, []);

        const fetchPrescriptions =
            async () => {
                try {
                    setLoading(
                        true
                    );

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/prescriptions/patient/${user._id}`
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

        useEffect(() => {
            fetchTests();
        }, []);

        const fetchTests =
            async () => {
                try {
                    const response =
                        await fetch(
                            "/tests.json"
                        );

                    const data =
                        await response.json();

                    setAllTests(
                        data
                    );
                } catch (error) {
                    console.log(
                        error
                    );
                }
            };

        // =====================================
        // DOWNLOAD PDF
        // =====================================

        const downloadPDF =
            (
                prescription
            ) => {
                const doc =
                    new jsPDF();

                // TITLE

                doc.setFontSize(
                    22
                );

                doc.text(
                    "Medical Prescription",
                    14,
                    20
                );

                // INFO

                doc.setFontSize(
                    12
                );

                doc.text(
                    `Doctor: Dr. ${prescription?.doctor?.user?.name}`,
                    14,
                    35
                );

                doc.text(
                    `Patient: ${prescription?.patient?.user?.name}`,
                    14,
                    45
                );

                doc.text(
                    `Date: ${new Date(
                        prescription?.createdAt
                    ).toLocaleDateString()}`,
                    14,
                    55
                );

                // MEDICINES

                doc.setFontSize(
                    18
                );

                doc.text(
                    "Medicines",
                    14,
                    75
                );

                autoTable(
                    doc,
                    {
                        startY: 82,

                        head: [
                            [
                                "Medicine",

                                "Time",

                                "Duration",
                            ],
                        ],

                        body: prescription?.medicines?.map(
                            (
                                medicine
                            ) => [
                                    medicine.medicine,

                                    medicine.time.join(
                                        ", "
                                    ),

                                    `${medicine.duration} Days`,
                                ]
                        ),
                    }
                );

                // TESTS

                const finalY =
                    doc.lastAutoTable
                        .finalY +
                    15;

                doc.setFontSize(
                    18
                );

                doc.text(
                    "Tests",
                    14,
                    finalY
                );

                autoTable(
                    doc,
                    {
                        startY:
                            finalY +
                            7,

                        head: [
                            [
                                "Test Name",

                                "Comment",
                            ],
                        ],

                        body: prescription?.tests?.map(
                            (
                                test
                            ) => [
                                    test.testName,

                                    test.comment ||
                                    "-",
                                ]
                        ),
                    }
                );

                // SAVE

                doc.save(
                    `Prescription-${prescription?._id}.pdf`
                );
            };

        // =====================================
        // OPEN TEST MODAL
        // =====================================

        const openTestBookingModal =
            (
                prescription
            ) => {
                const tests =
                    prescription?.tests?.map(
                        (
                            item
                        ) => ({
                            name: item.testName,

                            price:
                                getTestPrice(
                                    item.testName
                                ),
                        })
                    );

                setSelectedTests(
                    tests
                );

                const total =
                    tests.reduce(
                        (
                            sum,
                            item
                        ) =>
                            sum +
                            item.price,
                        0
                    );

                setTotalPrice(
                    total
                );

                setShowTestModal(
                    true
                );
            };

        // =====================================
        // GET TEST PRICE
        // =====================================

        const getTestPrice =
            (name) => {
                const test =
                    allTests.find(
                        (item) =>
                            item.name ===
                            name
                    );

                return test
                    ? test.price
                    : 0;
            };
        // =====================================
        // CONFIRM PAYMENT
        // =====================================

        const confirmLabPayment =
            async () => {
                try {
                    const response =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/lab-tests",
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
                                        patientId:
                                            user._id,

                                        prescriptionId:
                                            selectedPrescription._id,

                                        tests:
                                            selectedTests,

                                        totalAmount:
                                            totalPrice,
                                    }
                                ),
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        !result.success
                    ) {
                        alert(
                            result.message
                        );

                        return;
                    }

                    window.location.href =
                        result.url;
                } catch (
                error
                ) {
                    console.log(
                        error
                    );

                    alert(
                        "Something went wrong"
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
            <div className="min-h-screen bg-blue-50 p-6">
                {/* HEADER */}

                <div className="mb-10">
                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                        My
                        Prescriptions
                    </h2>

                    <p className="text-slate-500 text-lg">
                        View and
                        download
                        prescriptions
                    </p>
                </div>

                {/* EMPTY */}

                {prescriptions.length ===
                    0 && (
                        <div className="bg-white border border-blue-100 rounded-[40px] p-20 text-center">
                            <h2 className="text-3xl font-black text-slate-700 mb-3">
                                No
                                Prescription
                                Found
                            </h2>

                            <p className="text-slate-500 text-lg">
                                Your
                                prescriptions
                                will appear
                                here
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {prescriptions.length >
                    0 && (
                        <div className="bg-white border border-blue-100 rounded-[40px] overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-6 py-5 text-left">
                                                Doctor
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
                                                    className={`border-b border-blue-50 ${index %
                                                        2 ===
                                                        0
                                                        ? "bg-white"
                                                        : "bg-blue-50/40"
                                                        }`}
                                                >
                                                    {/* DOCTOR */}

                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-black uppercase">
                                                                {
                                                                    item
                                                                        ?.doctor
                                                                        ?.user
                                                                        ?.name?.[0]
                                                                }
                                                            </div>

                                                            <div>
                                                                <h4 className="font-black text-slate-800">
                                                                    Dr.{" "}
                                                                    {
                                                                        item
                                                                            ?.doctor
                                                                            ?.user
                                                                            ?.name
                                                                    }
                                                                </h4>

                                                                <p className="text-slate-500 font-medium">
                                                                    {
                                                                        item
                                                                            ?.doctor
                                                                            ?.specialization
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
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
                                                        <div className="flex items-center gap-3">
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

                                                            <button
                                                                onClick={() =>
                                                                    downloadPDF(
                                                                        item
                                                                    )
                                                                }
                                                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-2xl font-bold transition"
                                                            >
                                                                Download
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                {/* VIEW MODAL */}

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
                                        Dr.{" "}
                                        {
                                            selectedPrescription
                                                ?.doctor
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
                                                    {/* MEDICINE */}

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

                                                    {/* DURATION */}

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

                                                    {/* TIME */}

                                                    <div>
                                                        <p className="text-slate-500 font-semibold mb-2">
                                                            Time
                                                        </p>

                                                        <div className="flex flex-wrap gap-2">
                                                            {item.time?.map(
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

                            <div className="mb-10">
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
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-black text-slate-800 text-xl mb-2">
                                                            {
                                                                item.testName
                                                            }
                                                        </h4>

                                                        <p className="text-slate-500">
                                                            {
                                                                item.comment
                                                            }
                                                        </p>
                                                    </div>

                                                    <div className="text-2xl font-black text-purple-600">
                                                        ৳{" "}
                                                        {getTestPrice(
                                                            item.testName
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* BOOK TEST */}

                                <button
                                    onClick={() =>
                                        openTestBookingModal(
                                            selectedPrescription
                                        )
                                    }
                                    className="w-full h-16 rounded-3xl bg-purple-600 hover:bg-purple-700 text-white text-xl font-black mt-6"
                                >
                                    Book Lab
                                    Tests
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* TEST BOOKING MODAL */}

                {showTestModal && (
                    <div className="fixed inset-0 z-[99999] bg-black/40 flex justify-center items-center p-5">
                        <div className="w-full max-w-3xl bg-white rounded-[40px] p-8">
                            {/* HEADER */}

                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                                        Book Lab
                                        Tests
                                    </h2>

                                    <p className="text-slate-500">
                                        Select
                                        tests
                                        you want
                                        to book
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setShowTestModal(
                                            false
                                        )
                                    }
                                    className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 text-xl font-black"
                                >
                                    ×
                                </button>
                            </div>

                            {/* TESTS */}

                            <div className="space-y-5 mb-8">
                                {selectedTests.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                index
                                            }
                                            className="border border-purple-200 bg-purple-50 rounded-3xl p-5 flex items-center justify-between"
                                        >
                                            <div>
                                                <h4 className="text-xl font-black text-slate-800 mb-1">
                                                    {
                                                        item.name
                                                    }
                                                </h4>

                                                <p className="text-slate-500 font-semibold">
                                                    ৳{" "}
                                                    {
                                                        item.price
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* TOTAL */}

                            <div className="bg-purple-50 border border-purple-100 rounded-3xl p-6 mb-8">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-black text-slate-800">
                                        Total
                                    </h3>

                                    <h2 className="text-4xl font-black text-purple-600">
                                        ৳{" "}
                                        {
                                            totalPrice
                                        }
                                    </h2>
                                </div>
                            </div>

                            {/* PAYMENT */}

                            <button
                                onClick={
                                    confirmLabPayment
                                }
                                className="w-full h-16 rounded-3xl bg-purple-600 hover:bg-purple-700 text-white text-xl font-black"
                            >
                                Confirm
                                Payment
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

export default Prescrption;