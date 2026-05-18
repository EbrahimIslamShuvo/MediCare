import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Search,
    CreditCard,
    FlaskConical,
    BedDouble,
} from "lucide-react";

const Billing = () => {

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
        admitBills,
        setAdmitBills,
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
        typeFilter,
        setTypeFilter,
    ] = useState("All");

    // =====================================
    // FETCH DATA
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

                const appointmentRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/appointments/staff/all"
                    );

                const appointmentData =
                    await appointmentRes.json();

                // LAB TESTS

                const labRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/lab-tests"
                    );

                const labData =
                    await labRes.json();

                // ADMIT REQUESTS

                const admitRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/admit-requests"
                    );

                const admitData =
                    await admitRes.json();

                if (
                    appointmentData.success
                ) {

                    setAppointmentBills(
                        appointmentData.data
                    );
                }

                if (
                    labData.success
                ) {

                    setLabBills(
                        labData.data
                    );
                }

                if (
                    admitData.success
                ) {

                    setAdmitBills(
                        admitData.data.filter(
                            (
                                item
                            ) =>
                                item.status ===
                                "Released"
                        )
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
    // MERGED BILLS
    // =====================================

    const allBills =
        [
            // APPOINTMENT

            ...appointmentBills.map(
                (
                    item
                ) => ({
                    ...item,

                    billType:
                        "Appointment",
                })
            ),

            // LAB TEST

            ...labBills.map(
                (
                    item
                ) => ({
                    ...item,

                    billType:
                        "Lab Test",
                })
            ),

            // ADMIT PATIENT

            ...admitBills.map(
                (
                    item
                ) => ({
                    ...item,

                    billType:
                        "Admit Patient",
                })
            ),
        ];

    // =====================================
    // FILTER
    // =====================================

    const filteredBills =
        useMemo(
            () => {

                return allBills.filter(
                    (
                        item
                    ) => {

                        const patientName =
                            item
                                ?.patient
                                ?.user
                                ?.name ||
                            "";

                        const patientEmail =
                            item
                                ?.patient
                                ?.user
                                ?.email ||
                            "";

                        // SEARCH

                        const searchMatch =
                            patientName
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                ) ||

                            patientEmail
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                );

                        // TYPE FILTER

                        const typeMatch =
                            typeFilter ===
                            "All"

                                ? true

                                : item.billType ===
                                  typeFilter;

                        return (
                            searchMatch &&
                            typeMatch
                        );
                    }
                );
            },

            [
                allBills,

                search,

                typeFilter,
            ]
        );

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
    // STATUS STYLE
    // =====================================

    const getStatusStyle =
        (
            status
        ) => {

            switch (
                status
            ) {

                case "Completed":

                    return "bg-green-100 text-green-600";

                case "Processing":

                    return "bg-yellow-100 text-yellow-600";

                case "Released":

                    return "bg-red-100 text-red-600";

                case "Admitted":

                    return "bg-green-100 text-green-600";

                default:

                    return "bg-blue-100 text-blue-600";
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
        <div className="min-h-screen bg-blue-50 p-6">

            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

                <div>

                    <h2 className="text-5xl font-black text-slate-800 mb-2">
                        Billing
                    </h2>

                    <p className="text-slate-500 text-lg">
                        All hospital bills & payments
                    </p>
                </div>

                {/* SEARCH + FILTER */}

                <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">

                    {/* SEARCH */}

                    <div className="relative w-full lg:w-[420px]">

                        <Search
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                            size={22}
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
                                    e.target.value
                                )
                            }
                            className="w-full h-14 bg-white border border-blue-100 rounded-2xl pl-14 pr-5 outline-none"
                        />
                    </div>

                    {/* FILTER */}

                    <select
                        value={
                            typeFilter
                        }
                        onChange={(
                            e
                        ) =>
                            setTypeFilter(
                                e.target.value
                            )
                        }
                        className="h-14 px-5 rounded-2xl border border-blue-100 bg-white outline-none font-bold"
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

                        <option>
                            Admit Patient
                        </option>
                    </select>
                </div>
            </div>

            {/* EMPTY */}

            {
                filteredBills.length ===
                0 ? (

                    <div className="bg-white rounded-[40px] p-16 text-center border border-blue-100">

                        <h2 className="text-3xl font-black text-slate-800 mb-3">
                            No Bills Found
                        </h2>

                        <p className="text-slate-500">
                            No billing data available
                        </p>
                    </div>

                ) : (

                    <div className="bg-white rounded-[40px] overflow-hidden border border-blue-100 shadow-sm">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                {/* HEAD */}

                                <thead className="bg-blue-600 text-white">

                                    <tr>

                                        <th className="px-6 py-5 text-left">
                                            Patient
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Type
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Amount
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Payment
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Status
                                        </th>

                                        <th className="px-6 py-5 text-left">
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                {/* BODY */}

                                <tbody>

                                    {
                                        filteredBills.map(
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

                                                        <div>

                                                            <h4 className="font-black text-slate-800">

                                                                {
                                                                    item
                                                                        ?.patient
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            </h4>

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

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 w-fit ${
                                                                item.billType ===
                                                                "Appointment"

                                                                    ? "bg-blue-100 text-blue-600"

                                                                    : item.billType ===
                                                                      "Lab Test"

                                                                    ? "bg-purple-100 text-purple-600"

                                                                    : "bg-green-100 text-green-600"
                                                            }`}
                                                        >

                                                            {
                                                                item.billType ===
                                                                "Appointment" ? (
                                                                    <CreditCard
                                                                        size={16}
                                                                    />
                                                                ) : item.billType ===
                                                                  "Lab Test" ? (
                                                                    <FlaskConical
                                                                        size={16}
                                                                    />
                                                                ) : (
                                                                    <BedDouble
                                                                        size={16}
                                                                    />
                                                                )
                                                            }

                                                            {
                                                                item.billType
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* AMOUNT */}

                                                    <td className="px-6 py-5 font-black text-slate-800">

                                                        ৳{" "}

                                                        {
                                                            item.billType ===
                                                            "Appointment"

                                                                ? item
                                                                      ?.doctor
                                                                      ?.consultationFee

                                                                : item.billType ===
                                                                  "Lab Test"

                                                                ? item.totalAmount

                                                                : item.totalBill
                                                        }
                                                    </td>

                                                    {/* PAYMENT */}

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${
                                                                item.billType ===
                                                                "Admit Patient"

                                                                    ? "bg-green-100 text-green-600"

                                                                    : getPaymentStyle(
                                                                          item?.paymentStatus
                                                                      )
                                                            }`}
                                                        >

                                                            {
                                                                item.billType ===
                                                                "Admit Patient"

                                                                    ? "Paid"

                                                                    : item?.paymentStatus ||
                                                                      "Pending"
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${getStatusStyle(
                                                                item?.status
                                                            )}`}
                                                        >

                                                            {
                                                                item?.status ||
                                                                "Confirmed"
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* DATE */}

                                                    <td className="px-6 py-5 font-semibold text-slate-700">

                                                        {
                                                            new Date(
                                                                item.createdAt
                                                            ).toLocaleDateString()
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
                )
            }
        </div>
    );
};

export default Billing;