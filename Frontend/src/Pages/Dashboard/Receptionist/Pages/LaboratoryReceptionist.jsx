import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FlaskConical,
    Search,
    Eye,
} from "lucide-react";

const LaboratoryReceptionist =
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
            search,
            setSearch,
        ] = useState("");

        const [
            statusFilter,
            setStatusFilter,
        ] = useState("All");

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
                        setTests(
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
        // FILTERED TESTS
        // =====================================

        const filteredTests =
            useMemo(() => {
                return tests.filter(
                    (
                        item
                    ) => {
                        const matchSearch =
                            item?.patient?.user?.name
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                ) ||
                            item?.patient?.user?.email
                                ?.toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                );

                        const matchStatus =
                            statusFilter ===
                                "All" ||
                            item.status ===
                                statusFilter;

                        return (
                            matchSearch &&
                            matchStatus
                        );
                    }
                );
            }, [
                tests,
                search,
                statusFilter,
            ]);

        // =====================================
        // STATUS STYLE
        // =====================================

        const getStatusStyle =
            (status) => {
                switch (
                    status
                ) {
                    case "Completed":
                        return "bg-green-100 text-green-600";

                    case "Processing":
                        return "bg-blue-100 text-blue-600";

                    default:
                        return "bg-yellow-100 text-yellow-600";
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

                    case "Failed":
                        return "bg-red-100 text-red-600";

                    default:
                        return "bg-yellow-100 text-yellow-600";
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

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 mb-2">
                            Laboratory
                            Tests
                        </h2>

                        <p className="text-slate-500 text-lg">
                            View all
                            laboratory
                            test requests
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
                                placeholder="Search..."
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

                        {/* STATUS */}

                        <select
                            value={
                                statusFilter
                            }
                            onChange={(
                                e
                            ) =>
                                setStatusFilter(
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
                                Pending
                            </option>

                            <option>
                                Processing
                            </option>

                            <option>
                                Completed
                            </option>
                        </select>
                    </div>
                </div>

                {/* EMPTY */}

                {filteredTests.length ===
                    0 && (
                        <div className="bg-white rounded-[35px] border border-blue-100 p-20 text-center">
                            <div className="w-24 h-24 rounded-[30px] bg-blue-100 flex items-center justify-center mx-auto mb-6">
                                <FlaskConical className="text-blue-600" size={45} />
                            </div>

                            <h2 className="text-3xl font-black text-slate-800 mb-3">
                                No
                                Laboratory
                                Test
                            </h2>

                            <p className="text-slate-500">
                                Laboratory
                                tests
                                will
                                appear
                                here
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {filteredTests.length >
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
                                                Report
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}

                                    <tbody>
                                        {filteredTests.map(
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

                                                    <td className="px-5 py-5 font-black text-slate-800">
                                                        ৳{" "}
                                                        {
                                                            item.totalAmount
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

                                                    {/* STATUS */}

                                                    <td className="px-5 py-5">
                                                        <span
                                                            className={`px-4 py-2 rounded-2xl text-sm font-bold ${getStatusStyle(
                                                                item.status
                                                            )}`}
                                                        >
                                                            {
                                                                item.status
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* REPORT */}

                                                    <td className="px-5 py-5">
                                                        {item.status ===
                                                            "Completed" &&
                                                        item.report ? (
                                                            <div className="flex gap-3">
                                                                {/* VIEW */}

                                                                <a
                                                                    href={`http://127.0.0.1:3000${item.report}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 h-11 rounded-xl flex items-center gap-2 font-bold"
                                                                >
                                                                    <Eye
                                                                        size={
                                                                            18
                                                                        }
                                                                    />

                                                                    View
                                                                </a>

                                                                {/* DOWNLOAD */}

                                                                <a
                                                                    href={`http://127.0.0.1:3000${item.report}`}
                                                                    download
                                                                    className="bg-green-100 hover:bg-green-200 text-green-600 px-4 h-11 rounded-xl flex items-center gap-2 font-bold"
                                                                >
                                                                    Download
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="text-slate-400 font-semibold">
                                                                Not
                                                                Available
                                                            </span>
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
            </div>
        );
    };

export default LaboratoryReceptionist;