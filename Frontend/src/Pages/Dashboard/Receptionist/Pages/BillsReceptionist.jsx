import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import jsPDF from "jspdf";

import {
    Search,
    Download,
    Receipt,
} from "lucide-react";

const BillsReceptionist =
    () => {
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

        const [
            search,
            setSearch,
        ] = useState("");

        const [
            billType,
            setBillType,
        ] = useState("All");

        // =====================================
        // FETCH
        // =====================================

        useEffect(() => {
            fetchBills();
        }, []);

        const fetchBills =
            async () => {
                try {
                    setLoading(
                        true
                    );

                    // APPOINTMENTS

                    const appointmentResponse =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/appointments/staff/all"
                        );

                    const appointmentResult =
                        await appointmentResponse.json();

                    if (
                        appointmentResult.success
                    ) {
                        setAppointmentBills(
                            appointmentResult.data
                        );
                    }

                    // LAB TESTS

                    const labResponse =
                        await fetch(
                            "http://127.0.0.1:3000/api/v1/lab-tests"
                        );

                    const labResult =
                        await labResponse.json();

                    if (
                        labResult.success
                    ) {
                        setLabBills(
                            labResult.data
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
        // ALL BILLS
        // =====================================

        const allBills =
            useMemo(() => {
                // APPOINTMENT

                const appointmentData =
                    appointmentBills.map(
                        (
                            item
                        ) => ({
                            id: item._id,

                            patient:
                                item
                                    ?.patient
                                    ?.user
                                    ?.name,

                            email:
                                item
                                    ?.patient
                                    ?.user
                                    ?.email,

                            type: "Appointment",

                            amount:
                                item
                                    ?.doctor
                                    ?.consultationFee,

                            paymentStatus:
                                item.paymentStatus,

                            date: item.appointmentDate,

                            details: `Dr. ${item?.doctor?.user?.name}`,

                            original:
                                item,
                        })
                    );

                // LAB TEST

                const labData =
                    labBills.map(
                        (
                            item
                        ) => ({
                            id: item._id,

                            patient:
                                item
                                    ?.patient
                                    ?.user
                                    ?.name,

                            email:
                                item
                                    ?.patient
                                    ?.user
                                    ?.email,

                            type: "Lab Test",

                            amount:
                                item.totalAmount,

                            paymentStatus:
                                item.paymentStatus,

                            date: new Date(
                                item.createdAt
                            ).toLocaleDateString(),

                            details:
                                item.tests
                                    .map(
                                        (
                                            t
                                        ) =>
                                            t.name
                                    )
                                    .join(
                                        ", "
                                    ),

                            original:
                                item,
                        })
                    );

                return [
                    ...appointmentData,

                    ...labData,
                ];
            }, [
                appointmentBills,
                labBills,
            ]);

        // =====================================
        // FILTERED
        // =====================================

        const filteredBills =
            useMemo(() => {
                return allBills.filter(
                    (
                        item
                    ) => {
                        const matchSearch =
                            item.patient
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                ) ||
                            item.email
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                );

                        const matchType =
                            billType ===
                                "All" ||
                            item.type ===
                                billType;

                        return (
                            matchSearch &&
                            matchType
                        );
                    }
                );
            }, [
                allBills,
                search,
                billType,
            ]);

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
        // PDF DOWNLOAD
        // =====================================

        const downloadBill =
            (
                item
            ) => {
                const doc =
                    new jsPDF();

                // TITLE

                doc.setFontSize(
                    22
                );

                doc.text(
                    "Hospital Bill Receipt",
                    20,
                    20
                );

                // LINE

                doc.line(
                    20,
                    28,
                    190,
                    28
                );

                // CONTENT

                doc.setFontSize(
                    14
                );

                doc.text(
                    `Patient Name: ${item.patient}`,
                    20,
                    45
                );

                doc.text(
                    `Patient Email: ${item.email}`,
                    20,
                    58
                );

                doc.text(
                    `Bill Type: ${item.type}`,
                    20,
                    71
                );

                doc.text(
                    `Details: ${item.details}`,
                    20,
                    84
                );

                doc.text(
                    `Amount: Tk ${item.amount}`,
                    20,
                    97
                );

                doc.text(
                    `Payment Status: ${item.paymentStatus}`,
                    20,
                    110
                );

                doc.text(
                    `Date: ${item.date}`,
                    20,
                    123
                );

                // FOOTER

                doc.setFontSize(
                    16
                );

                doc.text(
                    "Thank You",
                    20,
                    155
                );

                // SAVE

                doc.save(
                    `${item.type}-Bill.pdf`
                );
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

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 mb-2">
                            Bills
                        </h2>

                        <p className="text-slate-500 text-lg">
                            View and
                            download
                            all bills
                        </p>
                    </div>

                    {/* FILTER */}

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* SEARCH */}

                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                size={
                                    20
                                }
                            />

                            <input
                                type="text"
                                placeholder="Search patient..."
                                value={
                                    search
                                }
                                onChange={(
                                    e
                                ) =>
                                    setSearch(
                                        e
                                            .target
                                            .value
                                    )
                                }
                                className="w-full md:w-[280px] h-14 pl-12 pr-5 rounded-2xl border border-blue-100 outline-none bg-white"
                            />
                        </div>

                        {/* TYPE */}

                        <select
                            value={
                                billType
                            }
                            onChange={(
                                e
                            ) =>
                                setBillType(
                                    e
                                        .target
                                        .value
                                )
                            }
                            className="h-14 px-5 rounded-2xl border border-blue-100 outline-none bg-white"
                        >
                            <option>
                                All
                            </option>

                            <option>
                                Appointment
                            </option>

                            <option>
                                Lab Test
                            </option>
                        </select>
                    </div>
                </div>

                {/* EMPTY */}

                {filteredBills.length ===
                    0 && (
                        <div className="bg-white rounded-[35px] border border-blue-100 p-20 text-center">
                            <div className="w-24 h-24 rounded-[30px] bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <Receipt className="text-blue-600" size={45} />
                            </div>

                            <h2 className="text-3xl font-black text-slate-800 mb-3">
                                No Bills
                            </h2>

                            <p className="text-slate-500">
                                Bills will
                                appear
                                here
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {filteredBills.length >
                    0 && (
                        <div className="bg-white rounded-[35px] border border-blue-100 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    {/* HEAD */}

                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-5 py-4 text-left">
                                                Patient
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Type
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Details
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Amount
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Payment
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Date
                                            </th>

                                            <th className="px-5 py-4 text-left">
                                                Download
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}

                                    <tbody>
                                        {filteredBills.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <tr
                                                    key={
                                                        item.id
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
                                                            <h4 className="font-black text-slate-800">
                                                                {
                                                                    item.patient
                                                                }
                                                            </h4>

                                                            <p className="text-slate-500 text-sm">
                                                                {
                                                                    item.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>

                                                    {/* TYPE */}

                                                    <td className="px-5 py-5">
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

                                                    {/* DETAILS */}

                                                    <td className="px-5 py-5 font-semibold text-slate-700">
                                                        {
                                                            item.details
                                                        }
                                                    </td>

                                                    {/* AMOUNT */}

                                                    <td className="px-5 py-5 font-black text-slate-800">
                                                        ৳{" "}
                                                        {
                                                            item.amount
                                                        }
                                                    </td>

                                                    {/* PAYMENT */}

                                                    <td className="px-5 py-5">
                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${getPaymentStyle(
                                                                item.paymentStatus
                                                            )}`}
                                                        >
                                                            {
                                                                item.paymentStatus
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* DATE */}

                                                    <td className="px-5 py-5 font-semibold text-slate-700">
                                                        {
                                                            item.date
                                                        }
                                                    </td>

                                                    {/* DOWNLOAD */}

                                                    <td className="px-5 py-5">
                                                        <button
                                                            onClick={() =>
                                                                downloadBill(
                                                                    item
                                                                )
                                                            }
                                                            className="bg-green-100 hover:bg-green-200 text-green-600 px-4 h-11 rounded-xl flex items-center gap-2 font-bold"
                                                        >
                                                            <Download
                                                                size={
                                                                    18
                                                                }
                                                            />

                                                            PDF
                                                        </button>
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

export default BillsReceptionist;