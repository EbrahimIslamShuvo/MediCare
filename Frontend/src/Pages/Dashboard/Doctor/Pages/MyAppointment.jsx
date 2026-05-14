import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

const MyAppointment =
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
            appointments,
            setAppointments,
        ] = useState([]);

        const [
            loading,
            setLoading,
        ] = useState(true);

        const [
            filter,
            setFilter,
        ] = useState("All");

        // =====================================
        // PRESCRIPTION MODAL
        // =====================================

        const [
            showPrescriptionModal,
            setShowPrescriptionModal,
        ] = useState(false);

        const [
            selectedAppointment,
            setSelectedAppointment,
        ] = useState(null);

        const [
            medicines,
            setMedicines,
        ] = useState([
            {
                medicine: "",

                time: [],

                duration: "",
            },
        ]);

        const [
            tests,
            setTests,
        ] = useState([
            {
                testName: "",

                comment: "",
            },
        ]);

        // =====================================
        // TEST LIST
        // =====================================

        const [allTests, setAllTests,] = useState([]);

        // =====================================
        // FETCH APPOINTMENTS
        // =====================================

        useEffect(() => {
            fetchAppointments();
        }, []);

        // =====================================
        // FETCH TESTS
        // =====================================

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

        const fetchAppointments =
            async () => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/appointments/doctor/${user._id}`
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setAppointments(
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
        // FILTER
        // =====================================

        const filteredAppointments =
            useMemo(() => {
                const today =
                    new Date();

                return appointments.filter(
                    (
                        item
                    ) => {
                        const appointmentDate =
                            new Date(
                                item.appointmentDate
                            );

                        if (
                            filter ===
                            "All"
                        ) {
                            return true;
                        }

                        if (
                            filter ===
                            "Today"
                        ) {
                            return (
                                appointmentDate.toDateString() ===
                                today.toDateString()
                            );
                        }

                        if (
                            filter ===
                            "This Week"
                        ) {
                            const firstDay =
                                new Date(
                                    today
                                );

                            firstDay.setDate(
                                today.getDate() -
                                today.getDay()
                            );

                            const lastDay =
                                new Date(
                                    firstDay
                                );

                            lastDay.setDate(
                                firstDay.getDate() +
                                6
                            );

                            return (
                                appointmentDate >=
                                firstDay &&
                                appointmentDate <=
                                lastDay
                            );
                        }

                        if (
                            filter ===
                            "This Month"
                        ) {
                            return (
                                appointmentDate.getMonth() ===
                                today.getMonth() &&
                                appointmentDate.getFullYear() ===
                                today.getFullYear()
                            );
                        }

                        return true;
                    }
                );
            }, [
                appointments,
                filter,
            ]);

        // =====================================
        // STATUS STYLE
        // =====================================

        const getStatusStyle =
            (
                status
            ) => {
                switch (
                status
                ) {
                    case "Confirmed":
                        return "bg-green-100 text-green-600";

                    case "Pending":
                        return "bg-yellow-100 text-yellow-600";

                    case "Cancelled":
                        return "bg-red-100 text-red-600";

                    default:
                        return "bg-slate-100 text-slate-600";
                }
            };

        // =====================================
        // PAYMENT STYLE
        // =====================================

        const getPaymentStyle =
            (
                status
            ) => {
                switch (
                status
                ) {
                    case "Paid":
                        return "bg-green-100 text-green-600";

                    case "Pending":
                        return "bg-yellow-100 text-yellow-600";

                    case "Failed":
                        return "bg-red-100 text-red-600";

                    default:
                        return "bg-slate-100 text-slate-600";
                }
            };

        // =====================================
        // OPEN MODAL
        // =====================================

        const openPrescriptionModal =
            async (
                appointment
            ) => {
                try {
                    setSelectedAppointment(
                        appointment
                    );

                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/prescriptions/${appointment._id}`
                        );

                    const result =
                        await response.json();

                    if (
                        result.success &&
                        result.data
                    ) {
                        setMedicines(
                            result.data
                                .medicines
                                ?.length >
                                0
                                ? result
                                    .data
                                    .medicines
                                : [
                                    {
                                        medicine:
                                            "",

                                        time: [],

                                        duration:
                                            "",
                                    },
                                ]
                        );

                        setTests(
                            result.data
                                .tests
                                ?.length >
                                0
                                ? result
                                    .data
                                    .tests
                                : [
                                    {
                                        testName:
                                            "",

                                        comment:
                                            "",
                                    },
                                ]
                        );
                    } else {
                        setMedicines([
                            {
                                medicine:
                                    "",

                                time: [],

                                duration:
                                    "",
                            },
                        ]);

                        setTests([
                            {
                                testName:
                                    "",

                                comment:
                                    "",
                            },
                        ]);
                    }

                    setShowPrescriptionModal(
                        true
                    );
                } catch (
                error
                ) {
                    console.log(
                        error
                    );
                }
            };

        // =====================================
        // CLOSE MODAL
        // =====================================

        const closePrescriptionModal =
            () => {
                setShowPrescriptionModal(
                    false
                );

                setSelectedAppointment(
                    null
                );

                setMedicines([
                    {
                        medicine:
                            "",

                        time: [],

                        duration:
                            "",
                    },
                ]);

                setTests([
                    {
                        testName:
                            "",

                        comment:
                            "",
                    },
                ]);
            };

        // =====================================
        // MEDICINE CHANGE
        // =====================================

        const handleMedicineChange =
            (
                index,
                field,
                value
            ) => {
                const updated = [
                    ...medicines,
                ];

                updated[index][field] =
                    value;

                setMedicines(
                    updated
                );
            };

        // =====================================
        // TIME TOGGLE
        // =====================================

        const handleTimeToggle =
            (
                index,
                value
            ) => {
                const updated = [
                    ...medicines,
                ];

                const current =
                    updated[index]
                        .time;

                if (
                    current.includes(
                        value
                    )
                ) {
                    updated[
                        index
                    ].time =
                        current.filter(
                            (
                                item
                            ) =>
                                item !==
                                value
                        );
                } else {
                    updated[
                        index
                    ].time = [
                            ...current,
                            value,
                        ];
                }

                setMedicines(
                    updated
                );
            };

        // =====================================
        // ADD MEDICINE
        // =====================================

        const addMedicine =
            () => {
                setMedicines([
                    ...medicines,

                    {
                        medicine:
                            "",

                        time: [],

                        duration:
                            "",
                    },
                ]);
            };

        // =====================================
        // TEST CHANGE
        // =====================================

        const handleTestChange =
            (
                index,
                field,
                value
            ) => {
                const updated = [
                    ...tests,
                ];

                updated[index][field] =
                    value;

                setTests(
                    updated
                );
            };

        // =====================================
        // ADD TEST
        // =====================================

        const addTest =
            () => {
                setTests([
                    ...tests,

                    {
                        testName:
                            "",

                        comment:
                            "",
                    },
                ]);
            };

        // =====================================
        // SAVE PRESCRIPTION
        // =====================================

        const handleSavePrescription =
            async () => {
                try {
                    const hasPrescription =
                        selectedAppointment?.hasPrescription;

                    const url =
                        hasPrescription
                            ? `http://127.0.0.1:3000/api/v1/prescriptions/${selectedAppointment?._id}`
                            : "http://127.0.0.1:3000/api/v1/prescriptions";

                    const method =
                        hasPrescription
                            ? "PATCH"
                            : "POST";

                    const response =
                        await fetch(
                            url,
                            {
                                method,

                                headers:
                                {
                                    "Content-Type":
                                        "application/json",
                                },

                                body: JSON.stringify(
                                    {
                                        appointmentId:
                                            selectedAppointment?._id,

                                        medicines,

                                        tests,
                                    }
                                ),
                            }
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        alert(
                            hasPrescription
                                ? "Prescription Updated Successfully"
                                : "Prescription Added Successfully"
                        );

                        closePrescriptionModal();

                        fetchAppointments();
                    } else {
                        alert(
                            result.message
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

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 mb-2">
                            My
                            Appointments
                        </h2>

                        <p className="text-slate-500 text-lg">
                            View all
                            patient
                            appointments
                        </p>
                    </div>

                    {/* FILTER */}

                    <div className="flex flex-wrap items-center gap-3">
                        {[
                            "All",

                            "Today",

                            "This Week",

                            "This Month",
                        ].map(
                            (
                                item
                            ) => (
                                <button
                                    key={
                                        item
                                    }
                                    onClick={() =>
                                        setFilter(
                                            item
                                        )
                                    }
                                    className={`px-6 py-3 rounded-2xl font-bold transition ${filter ===
                                        item
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-slate-700 border border-blue-100 hover:bg-blue-50"
                                        }`}
                                >
                                    {
                                        item
                                    }
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* TABLE */}

                <div className="bg-white border border-blue-100 rounded-[40px] shadow-sm">
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
                                        Date
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Time
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Serial
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Payment
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Status
                                    </th>

                                    <th className="px-6 py-5 text-left">
                                        Prescription
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredAppointments.map(
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

                                            <td className="px-6 py-5 font-semibold text-slate-700">
                                                {
                                                    item
                                                        ?.patient
                                                        ?.user
                                                        ?.email
                                                }
                                            </td>

                                            <td className="px-6 py-5">
                                                {
                                                    item?.appointmentDate
                                                }
                                            </td>

                                            <td className="px-6 py-5">
                                                {
                                                    item?.appointmentTime
                                                }
                                            </td>

                                            <td className="px-6 py-5 font-bold">
                                                #
                                                {
                                                    item?.serialNumber
                                                }
                                            </td>

                                            <td className="px-6 py-5">
                                                <span
                                                    className={`px-4 py-2 rounded-2xl text-sm font-bold ${getPaymentStyle(
                                                        item?.paymentStatus
                                                    )}`}
                                                >
                                                    {
                                                        item?.paymentStatus
                                                    }
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span
                                                    className={`px-4 py-2 rounded-2xl text-sm font-bold ${getStatusStyle(
                                                        item?.status
                                                    )}`}
                                                >
                                                    {
                                                        item?.status
                                                    }
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openPrescriptionModal(
                                                            item
                                                        )
                                                    }
                                                    className={`px-5 py-2 rounded-2xl font-bold transition ${item?.hasPrescription
                                                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                                        }`}
                                                >
                                                    {item?.hasPrescription
                                                        ? "Edit"
                                                        : "Add"}
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

                {showPrescriptionModal && (
                    <div className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-center p-5 overflow-y-auto">
                        <div className="w-full max-w-6xl bg-white rounded-[40px] p-8 max-h-[95vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-4xl font-black text-slate-800 mb-2">
                                        {selectedAppointment?.hasPrescription
                                            ? "Edit Prescription"
                                            : "Add Prescription"}
                                    </h2>

                                    <p className="text-slate-500 font-semibold">
                                        {
                                            selectedAppointment
                                                ?.patient
                                                ?.user
                                                ?.name
                                        }
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        closePrescriptionModal
                                    }
                                    className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 text-xl font-black"
                                >
                                    ×
                                </button>
                            </div>

                            {/* MEDICINE SECTION */}

                            <div className="bg-blue-50 border border-blue-100 rounded-[40px] p-8 mb-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-3xl font-black text-slate-800">
                                        Medicines
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={
                                            addMedicine
                                        }
                                        className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold"
                                    >
                                        Add
                                        Medicine
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {medicines.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="bg-white rounded-3xl border border-blue-100 p-6"
                                            >
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                                    <input
                                                        type="text"
                                                        placeholder="Medicine name"
                                                        value={
                                                            item.medicine
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleMedicineChange(
                                                                index,
                                                                "medicine",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                                    />

                                                    <input
                                                        type="number"
                                                        placeholder="Duration"
                                                        value={
                                                            item.duration
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleMedicineChange(
                                                                index,
                                                                "duration",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                                    />

                                                    <div className="flex flex-wrap gap-3">
                                                        {[
                                                            "Morning",

                                                            "Afternoon",

                                                            "Evening",

                                                            "Night",
                                                        ].map(
                                                            (
                                                                time
                                                            ) => (
                                                                <button
                                                                    key={
                                                                        time
                                                                    }
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleTimeToggle(
                                                                            index,
                                                                            time
                                                                        )
                                                                    }
                                                                    className={`px-4 py-2 rounded-2xl font-semibold ${item.time.includes(
                                                                        time
                                                                    )
                                                                        ? "bg-blue-600 text-white"
                                                                        : "bg-white border border-blue-100 text-slate-700"
                                                                        }`}
                                                                >
                                                                    {
                                                                        time
                                                                    }
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* TEST SECTION */}

                            <div className="bg-blue-50 border border-blue-100 rounded-[40px] p-8 mb-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-3xl font-black text-slate-800">
                                        Tests
                                    </h3>

                                    <button
                                        type="button"
                                        onClick={
                                            addTest
                                        }
                                        className="bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold"
                                    >
                                        Add
                                        Test
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {tests.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="bg-white rounded-3xl border border-blue-100 p-6"
                                            >
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                                    {/* TEST */}

                                                    <select
                                                        value={
                                                            item.testName
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleTestChange(
                                                                index,
                                                                "testName",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                                    >
                                                        <option value="">
                                                            Select
                                                            Test
                                                        </option>

                                                        {allTests.map(
                                                            (
                                                                test
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        test.id
                                                                    }
                                                                    value={
                                                                        test.name
                                                                    }
                                                                >
                                                                    {
                                                                        test.name
                                                                    }{" "}
                                                                    - ৳{" "}
                                                                    {
                                                                        test.price
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    {/* COMMENT */}

                                                    <input
                                                        type="text"
                                                        placeholder="Comment"
                                                        value={
                                                            item.comment
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleTestChange(
                                                                index,
                                                                "comment",
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className="w-full h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                                    />
                                                </div>

                                                {/* PRICE */}

                                                {item.testName && (
                                                    <div className="mt-4">
                                                        <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-2xl font-bold">
                                                            Price:
                                                            ৳{" "}
                                                            {allTests.find(
                                                                (
                                                                    test
                                                                ) =>
                                                                    test.name ===
                                                                    item.testName
                                                            )
                                                                ?.price ||
                                                                0}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* SAVE */}

                            <button
                                type="button"
                                onClick={
                                    handleSavePrescription
                                }
                                className="w-full h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 text-white text-xl font-black"
                            >
                                Save
                                Prescription
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

export default MyAppointment;