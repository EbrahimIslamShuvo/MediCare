import React, {
    useEffect,
    useState,
} from "react";

import {
    FlaskConical,
    FileText,
    CheckCircle,
    Clock3,
    Activity,
    TestTube2,
} from "lucide-react";

const Laboratorist = () => {
    // =====================================
    // STATES
    // =====================================

    const [labTests, setLabTests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // =====================================
    // FETCH LAB TESTS
    // =====================================

    useEffect(() => {
        fetchLabTests();
    }, []);

    const fetchLabTests =
        async () => {
            try {
                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/lab-tests"
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {
                    setLabTests(
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
    // STATS
    // =====================================

    const totalTests =
        labTests.length;

    const completedTests =
        labTests.filter(
            (item) =>
                item?.status ===
                "Completed"
        ).length;

    const pendingTests =
        labTests.filter(
            (item) =>
                item?.status ===
                "Pending"
        ).length;

    const processingTests =
        labTests.filter(
            (item) =>
                item?.status ===
                "Processing"
        ).length;

    return (
        <div className="min-h-screen bg-[#f7fbff] p-6">
            {/* ===================================== */}
            {/* HEADER */}
            {/* ===================================== */}

            <div className="mb-10">
                <p className="uppercase tracking-[6px] text-blue-600 font-black mb-3">
                    Laboratory Dashboard
                </p>

                <h1 className="text-5xl font-black text-slate-800">
                    Laboratory Panel
                </h1>
            </div>

            {/* ===================================== */}
            {/* STATS */}
            {/* ===================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                <StatCard
                    icon={
                        <FlaskConical
                            size={36}
                        />
                    }
                    title="Total Tests"
                    value={
                        totalTests
                    }
                    color="blue"
                />

                <StatCard
                    icon={
                        <CheckCircle
                            size={36}
                        />
                    }
                    title="Completed"
                    value={
                        completedTests
                    }
                    color="green"
                />

                <StatCard
                    icon={
                        <Clock3
                            size={36}
                        />
                    }
                    title="Pending"
                    value={
                        pendingTests
                    }
                    color="orange"
                />

                <StatCard
                    icon={
                        <Activity
                            size={36}
                        />
                    }
                    title="Processing"
                    value={
                        processingTests
                    }
                    color="purple"
                />
            </div>
        </div>
    );
};

// =====================================
// STAT CARD
// =====================================

const StatCard = ({
    icon,
    title,
    value,
    color,
}) => {
    const colors = {
        blue: "bg-blue-100 text-blue-600",
        green:
            "bg-green-100 text-green-600",
        orange:
            "bg-orange-100 text-orange-600",
        purple:
            "bg-purple-100 text-purple-600",
    };

    return (
        <div className="bg-white rounded-[35px] border border-blue-100 p-8 shadow-sm hover:-translate-y-2 transition duration-500 hover:shadow-xl hover:shadow-blue-100">
            <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 ${colors[color]}`}
            >
                {icon}
            </div>

            <h2 className="text-5xl font-black text-slate-800 mb-3">
                {value}
            </h2>

            <p className="text-slate-500 text-lg font-semibold">
                {title}
            </p>
        </div>
    );
};

export default Laboratorist;