import React, {
    useEffect,
    useState,
} from "react";

import {
    FileText,
    Download,
    Eye,
    CheckCircle2,
} from "lucide-react";

const ReportHistory =
    () => {
        // =====================================
        // STATES
        // =====================================

        const [
            reports,
            setReports,
        ] = useState([]);

        const [
            loading,
            setLoading,
        ] = useState(true);

        // =====================================
        // FETCH REPORTS
        // =====================================

        useEffect(() => {
            fetchReports();
        }, []);

        const fetchReports =
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
                        // ONLY COMPLETED

                        const completed =
                            result.data.filter(
                                (
                                    item
                                ) =>
                                    item.status ===
                                    "Completed"
                            );

                        setReports(
                            completed
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
        // LOADING
        // =====================================

        if (loading) {
            return (
                <div className="min-h-screen flex justify-center items-center text-2xl font-black text-blue-600">
                    Loading...
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-blue-50 p-4">
                {/* HEADER */}

                <div className="mb-5">
                    <h2 className="text-3xl font-black text-slate-800 mb-1">
                        Report
                        History
                    </h2>

                    <p className="text-slate-500">
                        Completed lab
                        reports and
                        tests
                    </p>
                </div>

                {/* EMPTY */}

                {reports.length ===
                    0 && (
                        <div className="bg-white rounded-[30px] border border-blue-100 p-16 text-center">
                            <h2 className="text-3xl font-black text-slate-800 mb-3">
                                No Reports
                                Found
                            </h2>

                            <p className="text-slate-500">
                                Completed
                                reports will
                                appear here
                            </p>
                        </div>
                    )}

                {/* TABLE */}

                {reports.length >
                    0 && (
                        <div className="bg-white rounded-[30px] border border-blue-100 shadow-sm overflow-hidden">
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
                                        {reports.map(
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

                                                    <td className="px-5 py-5">
                                                        <h3 className="font-black text-slate-800">
                                                            ৳{" "}
                                                            {
                                                                item.totalAmount
                                                            }
                                                        </h3>
                                                    </td>

                                                    {/* PAYMENT */}

                                                    <td className="px-5 py-5">
                                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-xl text-sm font-bold">
                                                            {
                                                                item.paymentStatus
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="px-5 py-5">
                                                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-xl text-sm font-bold flex items-center gap-2 w-fit">
                                                            <CheckCircle2
                                                                size={
                                                                    16
                                                                }
                                                            />

                                                            {
                                                                item.status
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* REPORT */}

                                                    <td className="px-5 py-5">
                                                        {item.report ? (
                                                            <div className="flex items-center gap-3">
                                                                {/* VIEW */}

                                                                <a
                                                                    href={`http://127.0.0.1:3000${item.report}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                                                                >
                                                                    <Eye
                                                                        size={
                                                                            16
                                                                        }
                                                                    />

                                                                    View
                                                                </a>

                                                                {/* DOWNLOAD */}

                                                                <a
                                                                    href={`http://127.0.0.1:3000${item.report}`}
                                                                    download
                                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                                                                >
                                                                    <Download
                                                                        size={
                                                                            16
                                                                        }
                                                                    />

                                                                    Download
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-xl text-sm font-bold">
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
                            </div>
                        </div>
                    )}
            </div>
        );
    };

export default ReportHistory;