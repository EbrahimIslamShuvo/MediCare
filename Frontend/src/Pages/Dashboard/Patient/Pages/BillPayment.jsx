import React, {
    useEffect,
    useState,
} from "react";

const BillPayment =
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
            appointmentBills,
            setAppointmentBills,
        ] = useState([]);

        const [
            labBills,
            setLabBills,
        ] = useState([]);

        const [
            loading,
            setLoading,
        ] = useState(true);

        // =====================================
        // FETCH
        // =====================================

        useEffect(() => {
            fetchAppointmentBills();

            fetchLabBills();
        }, []);

        // =====================================
        // APPOINTMENT BILLS
        // =====================================

        const fetchAppointmentBills =
            async () => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/appointments/my/${user._id}`
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setAppointmentBills(
                            result.data
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
        // LAB BILLS
        // =====================================

        const fetchLabBills =
            async () => {
                try {
                    const response =
                        await fetch(
                            `http://127.0.0.1:3000/api/v1/lab-tests/patient/${user._id}`
                        );

                    const result =
                        await response.json();

                    if (
                        result.success
                    ) {
                        setLabBills(
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
        // ALL BILLS
        // =====================================

        const allBills = [
            ...appointmentBills.map(
                (
                    item
                ) => ({
                    type: "Appointment",

                    reason: `Doctor Appointment - Dr. ${item?.doctor?.user?.name}`,

                    date: item?.appointmentDate,

                    time: item?.appointmentTime,

                    amount:
                        item
                            ?.doctor
                            ?.consultationFee,

                    status:
                        item?.paymentStatus,

                    createdAt:
                        item?.createdAt,
                })
            ),

            ...labBills.map(
                (
                    item
                ) => ({
                    type: "Lab Test",

                    reason: item?.tests
                        ?.map(
                            (
                                test
                            ) =>
                                test.name
                        )
                        .join(
                            ", "
                        ),

                    date: new Date(
                        item.createdAt
                    ).toLocaleDateString(),

                    time: new Date(
                        item.createdAt
                    ).toLocaleTimeString(),

                    amount:
                        item?.totalAmount,

                    status:
                        item?.paymentStatus,

                    createdAt:
                        item?.createdAt,
                })
            ),
        ].sort(
            (
                a,
                b
            ) =>
                new Date(
                    b.createdAt
                ) -
                new Date(
                    a.createdAt
                )
        );

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
                        Bill &
                        Payments
                    </h2>

                    <p className="text-slate-500 text-lg">
                        View all
                        payment
                        history
                    </p>
                </div>

                {/* EMPTY */}

                {allBills.length ===
                0 ? (
                    <div className="bg-white border border-blue-100 rounded-[40px] p-16 text-center">
                        <h3 className="text-3xl font-black text-slate-800 mb-3">
                            No Bills
                            Found
                        </h3>

                        <p className="text-slate-500 text-lg">
                            No payment
                            history
                            available
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-blue-100 rounded-[40px] shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                {/* HEAD */}

                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Type
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Reason
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Date
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Time
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Amount
                                        </th>

                                        <th className="px-6 py-5 text-left text-lg font-bold">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                {/* BODY */}

                                <tbody>
                                    {allBills.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <tr
                                                key={
                                                    index
                                                }
                                                className={`border-b border-blue-50 hover:bg-blue-50 transition ${
                                                    index %
                                                        2 ===
                                                    0
                                                        ? "bg-white"
                                                        : "bg-blue-50/40"
                                                }`}
                                            >
                                                {/* TYPE */}

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                                                            item.type ===
                                                            "Appointment"
                                                                ? "bg-blue-100 text-blue-600"
                                                                : "bg-purple-100 text-purple-600"
                                                        }`}
                                                    >
                                                        {
                                                            item.type
                                                        }
                                                    </span>
                                                </td>

                                                {/* REASON */}

                                                <td className="px-6 py-5 font-semibold text-slate-700">
                                                    {
                                                        item.reason
                                                    }
                                                </td>

                                                {/* DATE */}

                                                <td className="px-6 py-5 font-semibold text-slate-700">
                                                    {
                                                        item.date
                                                    }
                                                </td>

                                                {/* TIME */}

                                                <td className="px-6 py-5 font-semibold text-slate-700">
                                                    {
                                                        item.time
                                                    }
                                                </td>

                                                {/* AMOUNT */}

                                                <td className="px-6 py-5 font-black text-slate-800">
                                                    ৳{" "}
                                                    {
                                                        item.amount
                                                    }
                                                </td>

                                                {/* STATUS */}

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`px-4 py-2 rounded-2xl text-sm font-bold ${getPaymentStyle(
                                                            item.status
                                                        )}`}
                                                    >
                                                        {
                                                            item.status
                                                        }
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        );
    };

export default BillPayment;