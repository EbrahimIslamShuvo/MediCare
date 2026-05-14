import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

const Laboratory =
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
            statusFilter,
            setStatusFilter,
        ] = useState("All");

        const [
            search,
            setSearch,
        ] = useState("");

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
        // FILTER
        // =====================================

        const filteredTests =
            useMemo(() => {
                return tests.filter(
                    (
                        item
                    ) => {
                        // STATUS

                        const statusMatch =
                            statusFilter ===
                            "All"
                                ? true
                                : item.status ===
                                  statusFilter;

                        // SEARCH

                        const patientName =
                            item
                                ?.patient
                                ?.user
                                ?.name ||
                            "";

                        const searchMatch =
                            patientName
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                );

                        return (
                            statusMatch &&
                            searchMatch
                        );
                    }
                );
            }, [
                tests,

                statusFilter,

                search,
            ]);

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

                <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 mb-2">
                            Laboratory
                            Tests
                        </h2>

                        <p className="text-slate-500 text-lg">
                            All laboratory
                            reports and
                            test status
                        </p>
                    </div>

                    {/* FILTER */}

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* SEARCH */}

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
                            className="h-14 px-5 rounded-2xl border border-blue-100 outline-none bg-white min-w-[250px]"
                        />

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
                            className="h-14 px-5 rounded-2xl border border-blue-100 outline-none bg-white font-bold"
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
                        <div className="bg-white border border-blue-100 rounded-[40px] p-20 text-center">
                            <h2 className="text-3xl font-black text-slate-700 mb-3">
                                No Lab
                                Tests Found
                            </h2>

                            <p className="text-slate-500 text-lg">
                                No matching
                                reports found
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {filteredTests.length >
                    0 && (
                        <div className="bg-white border border-blue-100 rounded-[40px] overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    {/* HEAD */}

                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-6 py-5 text-left">
                                                Patient
                                            </th>

                                            <th className="px-6 py-5 text-left">
                                                Tests
                                            </th>

                                            <th className="px-6 py-5 text-left">
                                                Total
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

                                            <th className="px-6 py-5 text-left">
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

                                                    <td className="px-6 py-5">
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

                                                    <td className="px-6 py-5">
                                                        <div className="space-y-2">
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
                                                        </div>
                                                    </td>

                                                    {/* TOTAL */}

                                                    <td className="px-6 py-5">
                                                        <h4 className="text-2xl font-black text-slate-800">
                                                            ৳{" "}
                                                            {
                                                                item.totalAmount
                                                            }
                                                        </h4>
                                                    </td>

                                                    {/* PAYMENT */}

                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`px-4 py-2 rounded-2xl font-bold ${
                                                                item.paymentStatus ===
                                                                "Paid"
                                                                    ? "bg-green-100 text-green-600"
                                                                    : "bg-red-100 text-red-600"
                                                            }`}
                                                        >
                                                            {
                                                                item.paymentStatus
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="px-6 py-5">
                                                        <span
                                                            className={`px-4 py-2 rounded-2xl font-bold ${
                                                                item.status ===
                                                                "Completed"
                                                                    ? "bg-green-100 text-green-600"
                                                                    : item.status ===
                                                                      "Processing"
                                                                    ? "bg-yellow-100 text-yellow-600"
                                                                    : "bg-blue-100 text-blue-600"
                                                            }`}
                                                        >
                                                            {
                                                                item.status
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* DATE */}

                                                    <td className="px-6 py-5 font-semibold text-slate-700">
                                                        {new Date(
                                                            item.createdAt
                                                        ).toLocaleDateString()}
                                                    </td>

                                                    {/* REPORT */}

                                                    <td className="px-6 py-5">
                                                        {item.status ===
                                                            "Completed" &&
                                                        item.report ? (
                                                            <div className="flex items-center gap-3">
                                                                {/* VIEW */}

                                                                <a
                                                                    href={`http://127.0.0.1:3000${item.report}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-sm"
                                                                >
                                                                    View
                                                                </a>

                                                                {/* DOWNLOAD */}

                                                                <a
                                                                    href={`http://127.0.0.1:3000${item.report}`}
                                                                    download
                                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl font-bold text-sm"
                                                                >
                                                                    Download
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-2xl font-bold text-sm">
                                                                Report
                                                                Not
                                                                Ready
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

export default Laboratory;