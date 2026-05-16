import React, {
    useEffect,
    useState,
} from "react";

import {
    Calendar,
    FlaskConical,
    Ambulance,
    FileText,
} from "lucide-react";

const Patient = () => {
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
        appointments,
        setAppointments,
    ] = useState([]);

    const [labTests, setLabTests] =
        useState([]);

    const [
        ambulanceRequests,
        setAmbulanceRequests,
    ] = useState([]);

    const [
        prescriptions,
        setPrescriptions,
    ] = useState([]);

    const [loading, setLoading] =
        useState(true);

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
        selectedPrescription,
        setSelectedPrescription,
    ] = useState(null);

    const [allTests, setAllTests] =
        useState([]);

    // =====================================
    // FETCH DATA
    // =====================================

    useEffect(() => {
        fetchAllData();
        fetchTests();
    }, []);

    const fetchAllData =
        async () => {
            try {
                setLoading(true);

                // APPOINTMENTS

                const appointmentRes =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/appointments/my/${user?._id}`
                    );

                const appointmentData =
                    await appointmentRes.json();

                if (
                    appointmentData.success
                ) {
                    setAppointments(
                        appointmentData.data
                    );
                }

                // LAB TESTS

                const labRes =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/lab-tests/patient/${user?._id}`
                    );

                const labData =
                    await labRes.json();

                if (
                    labData.success
                ) {
                    setLabTests(
                        labData.data
                    );
                }

                // AMBULANCE

                const ambulanceRes =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/ambulance-requests/patient/${user?._id}`
                    );

                const ambulanceData =
                    await ambulanceRes.json();

                if (
                    ambulanceData.success
                ) {
                    setAmbulanceRequests(
                        ambulanceData.data
                    );
                }

                // PRESCRIPTIONS

                const prescriptionRes =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/prescriptions/patient/${user?._id}`
                    );

                const prescriptionData =
                    await prescriptionRes.json();

                if (
                    prescriptionData.success
                ) {
                    setPrescriptions(
                        prescriptionData.data
                    );
                }
            } catch (
            error
            ) {
                console.log(
                    error
                );
            } finally {
                setLoading(false);
            }
        };

    // =====================================
    // FETCH TESTS
    // =====================================

    const fetchTests =
        async () => {
            try {
                const response =
                    await fetch(
                        "/tests.json"
                    );

                const data =
                    await response.json();

                setAllTests(data);
            } catch (
            error
            ) {
                console.log(
                    error
                );
            }
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
    // BOOK LAB TEST
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

            setSelectedPrescription(
                prescription
            );

            setShowTestModal(
                true
            );
        };

    // =====================================
    // PAYMENT
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
            }
        };

    // =====================================
    // RECENT DATA
    // =====================================

    const recentAppointments =
        appointments.slice(
            0,
            5
        );

    const recentLabTests =
        labTests.slice(0, 5);

    const recentPrescriptions =
        prescriptions.slice(
            0,
            5
        );

    const recentAmbulances =
        ambulanceRequests.slice(
            0,
            5
        );

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

            <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-800 mb-2">
                    Patient
                    Dashboard
                </h2>

                <p className="text-slate-500 text-lg">
                    Welcome back,
                    {" "}
                    {
                        user?.name
                    }
                </p>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                <StatsCard
                    title="Appointments"
                    value={
                        appointments.length
                    }
                    icon={
                        <Calendar
                            size={28}
                        />
                    }
                />

                <StatsCard
                    title="Lab Tests"
                    value={
                        labTests.length
                    }
                    icon={
                        <FlaskConical
                            size={28}
                        />
                    }
                />

                <StatsCard
                    title="Prescriptions"
                    value={
                        prescriptions.length
                    }
                    icon={
                        <FileText
                            size={28}
                        />
                    }
                />

                <StatsCard
                    title="Ambulance"
                    value={
                        ambulanceRequests.length
                    }
                    icon={
                        <Ambulance
                            size={28}
                        />
                    }
                />
            </div>


            {/* TABLES */}

            <div className="space-y-8">
                <div className="grid grid-cols-2 gap-10">
                    {/* APPOINTMENTS */}

                    <TableCard
                        title="Recent Appointments"
                    >
                        <table className="w-full">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-5 text-left">
                                        Doctor
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Date
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Payment
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentAppointments.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <tr
                                            key={
                                                index
                                            }
                                            className={`border-b border-blue-50 ${index %
                                                2 ===
                                                0
                                                ? "bg-white"
                                                : "bg-blue-50/40"
                                                }`}
                                        >
                                            <td className="px-6 py-5 font-semibold">
                                                Dr.
                                                {" "}
                                                {
                                                    item
                                                        ?.doctor
                                                        ?.user
                                                        ?.name
                                                }
                                            </td>

                                            <td className="px-6 py-5">
                                                {
                                                    item.appointmentDate
                                                }
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-2xl text-sm font-bold">
                                                    {
                                                        item.paymentStatus
                                                    }
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </TableCard>

                    {/* LAB TESTS */}

                    <TableCard
                        title="Recent Lab Tests"
                    >
                        <table className="w-full">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-5 text-left">
                                        name
                                    </th>
                                    <th className="px-6 py-5 text-left">
                                        Amount
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Status
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Report
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentLabTests.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <tr
                                            key={
                                                index
                                            }
                                            className={`border-b border-blue-50 ${index %
                                                2 ===
                                                0
                                                ? "bg-white"
                                                : "bg-blue-50/40"
                                                }`}
                                        >
                                            <td className="px-6 py-5 font-black text-slate-800">

                                                {" "}
                                                {item.tests.map(
                                                    (
                                                        test,
                                                        i
                                                    ) => (
                                                        <div
                                                            key={
                                                                i
                                                            }
                                                            className="bg-purple-100 text-purple-600 px-4 py-2 rounded-2xl font-bold inline-block mr-2"
                                                        >
                                                            {
                                                                test.name
                                                            }
                                                        </div>
                                                    )
                                                )}
                                            </td>
                                            <td className="px-6 py-5 font-black text-slate-800">
                                                ৳
                                                {" "}
                                                {
                                                    item.totalAmount
                                                }
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-2xl text-sm font-bold">
                                                    {
                                                        item.status
                                                    }
                                                </span>
                                            </td>


                                            <td className="px-6 py-5">
                                                {item.report ? (
                                                    <a
                                                        href={`http://127.0.0.1:3000${item.report}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-2xl font-bold"
                                                    >
                                                        View
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-400">
                                                        No
                                                        Report
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </TableCard>

                    {/* PRESCRIPTIONS */}

                    <TableCard
                        title="Recent Prescriptions"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="px-6 py-5 text-left">
                                            Doctor
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Specialization
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Date
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Prescription
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentPrescriptions.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <tr
                                                key={
                                                    index
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
                                                    <div>
                                                        <h4 className="font-black text-slate-800">
                                                            Dr.
                                                            {" "}
                                                            {
                                                                item
                                                                    ?.doctor
                                                                    ?.user
                                                                    ?.name
                                                            }
                                                        </h4>
                                                    </div>
                                                </td>

                                                {/* SPECIALIZATION */}

                                                <td className="px-6 py-5 font-semibold text-blue-600">
                                                    {
                                                        item
                                                            ?.doctor
                                                            ?.specialization
                                                    }
                                                </td>

                                                {/* DATE */}

                                                <td className="px-6 py-5 font-semibold text-slate-700">
                                                    {new Date(
                                                        item.createdAt
                                                    ).toLocaleDateString()}
                                                </td>

                                                {/* VIEW */}

                                                <td className="px-6 py-5">
                                                    <button
                                                        onClick={() =>
                                                            setSelectedPrescription(
                                                                item
                                                            )
                                                        }
                                                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-2xl font-bold"
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
                    </TableCard>



                    {/* ===================================== */}
                    {/* PRESCRIPTION MODAL */}
                    {/* ===================================== */}

                    {selectedPrescription && (
                        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-5">
                            <div className="w-full max-w-4xl bg-white rounded-[40px] p-8 relative max-h-[90vh] overflow-y-auto">
                                {/* CLOSE */}

                                <button
                                    onClick={() =>
                                        setSelectedPrescription(
                                            null
                                        )
                                    }
                                    className="absolute top-5 right-5 w-12 h-12 rounded-2xl bg-red-100 text-red-600 text-xl font-black"
                                >
                                    ×
                                </button>

                                {/* HEADER */}

                                <div className="mb-8">
                                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                                        Prescription
                                    </h2>

                                    <p className="text-slate-500 text-lg">
                                        Dr.
                                        {" "}
                                        {
                                            selectedPrescription
                                                ?.doctor
                                                ?.user
                                                ?.name
                                        }
                                    </p>
                                </div>

                                {/* DIAGNOSIS */}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-slate-800 mb-3">
                                        Diagnosis
                                    </h3>

                                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5">
                                        <p className="text-slate-700 font-semibold">
                                            {
                                                selectedPrescription.diagnosis
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* MEDICINES */}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-slate-800 mb-4">
                                        Medicines
                                    </h3>

                                    <div className="space-y-4">
                                        {selectedPrescription?.medicines?.map(
                                            (
                                                medicine,
                                                index
                                            ) => (
                                                <div
                                                    key={
                                                        index
                                                    }
                                                    className="bg-blue-50 border border-blue-100 rounded-3xl p-5"
                                                >
                                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                                        {/* NAME */}

                                                        <div>
                                                            <p className="text-slate-500 font-semibold mb-2">
                                                                Medicine
                                                            </p>

                                                            <h4 className="font-black text-slate-800 text-lg">
                                                                {
                                                                    medicine.medicine
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
                                                                    medicine.duration
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
                                                                {medicine.time?.map(
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

                                {selectedPrescription
                                    ?.tests
                                    ?.length >
                                    0 && (
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-800 mb-4">
                                                Recommended
                                                Tests
                                            </h3>

                                            <div className="space-y-4">
                                                {selectedPrescription?.tests?.map(
                                                    (
                                                        test,
                                                        index
                                                    ) => (
                                                        <div
                                                            key={
                                                                index
                                                            }
                                                            className="bg-purple-50 border border-purple-100 rounded-3xl p-5"
                                                        >
                                                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                                                <div>
                                                                    <h4 className="text-xl font-black text-slate-800 mb-2">
                                                                        {
                                                                            test.testName
                                                                        }
                                                                    </h4>

                                                                    <p className="text-slate-500">
                                                                        {
                                                                            test.comment
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <div className="text-2xl font-black text-purple-600">
                                                                    ৳
                                                                    {" "}
                                                                    {getTestPrice(
                                                                        test.testName
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}

                    {/* AMBULANCE */}

                    <TableCard
                        title="Ambulance Requests"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="px-6 py-5 text-left">
                                            Emergency
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Phone
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Status
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Ambulance
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentAmbulances.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <tr
                                                key={
                                                    index
                                                }
                                                className={`border-b border-blue-50 ${index %
                                                    2 ===
                                                    0
                                                    ? "bg-white"
                                                    : "bg-blue-50/40"
                                                    }`}
                                            >
                                                <td className="px-6 py-5">
                                                    <span className="bg-red-100 text-red-600 px-4 py-2 rounded-2xl font-bold">
                                                        {
                                                            item.emergencyType
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5 font-semibold text-slate-700">
                                                    {
                                                        item.phone
                                                    }
                                                </td>


                                                <td className="px-6 py-5">
                                                    <span className={`px-4 py-2 rounded-2xl font-bold ${item.status ===
                                                        "Completed"
                                                        ? "bg-green-100 text-green-600"
                                                        : item.status ===
                                                            "Assigned"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : "bg-yellow-100 text-yellow-600"
                                                        }`}>
                                                        {
                                                            item.status
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    {item
                                                        ?.ambulance ? (
                                                        <div>
                                                            <h4 className="font-black text-slate-800">
                                                                {
                                                                    item
                                                                        ?.ambulance
                                                                        ?.ambulanceNumber
                                                                }
                                                            </h4>

                                                            <p className="text-slate-500 text-sm">
                                                                {
                                                                    item
                                                                        ?.ambulance
                                                                        ?.driverName
                                                                }
                                                            </p>

                                                            <p className="text-slate-500 text-sm">
                                                                {
                                                                    item
                                                                        ?.ambulance
                                                                        ?.driverPhone
                                                                }
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-400 font-semibold">
                                                            Not
                                                            Assigned
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </TableCard>
                </div>

            </div>

            {/* TEST BOOKING MODAL */}

            {showTestModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-5">
                    <div className="w-full max-w-3xl bg-white rounded-[40px] p-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-4xl font-black text-slate-800 mb-2">
                                    Book
                                    Lab
                                    Tests
                                </h2>

                                <p className="text-slate-500">
                                    Confirm
                                    your lab
                                    test
                                    booking
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

                        <div className="space-y-4 mb-8">
                            {selectedTests.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <div
                                        key={
                                            index
                                        }
                                        className="bg-purple-50 border border-purple-100 rounded-3xl p-5 flex items-center justify-between"
                                    >
                                        <h4 className="font-black text-slate-800 text-xl">
                                            {
                                                item.name
                                            }
                                        </h4>

                                        <h4 className="font-black text-purple-600 text-xl">
                                            ৳
                                            {" "}
                                            {
                                                item.price
                                            }
                                        </h4>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-8 flex items-center justify-between">
                            <h3 className="text-2xl font-black text-slate-800">
                                Total
                            </h3>

                            <h2 className="text-4xl font-black text-blue-600">
                                ৳
                                {" "}
                                {
                                    totalPrice
                                }
                            </h2>
                        </div>

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

// =====================================
// STATS CARD
// =====================================

const StatsCard = ({
    title,
    value,
    icon,
}) => {
    return (
        <div className="bg-white rounded-[30px] border border-blue-100 p-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                {icon}
            </div>

            <h3 className="text-slate-500 font-semibold mb-2">
                {title}
            </h3>

            <h2 className="text-3xl font-black text-slate-800">
                {value}
            </h2>
        </div>
    );
};

// =====================================
// TABLE CARD
// =====================================

const TableCard = ({
    title,
    children,
}) => {
    return (
        <div className="bg-white rounded-[30px] border border-blue-100 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-blue-50">
                <h2 className="text-xl font-black text-slate-800">
                    {title}
                </h2>
            </div>

            <div className="overflow-x-auto">
                {children}
            </div>
        </div>
    );
};

export default Patient;