import React, {
    useEffect,
    useState,
} from "react";

import jsPDF from "jspdf";

import {
    Users,
    Stethoscope,
    DollarSign,
    FlaskConical,
    Download,
    TrendingUp,
    Calendar,
} from "lucide-react";

const Reports = () => {
    // =====================================
    // STATES
    // =====================================

    const [patients, setPatients] =
        useState([]);

    const [doctors, setDoctors] =
        useState([]);

    const [
        appointments,
        setAppointments,
    ] = useState([]);

    const [labTests, setLabTests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [
        selectedYear,
        setSelectedYear,
    ] = useState(
        new Date().getFullYear()
    );

    const [
        selectedMonth,
        setSelectedMonth,
    ] = useState(
        new Date().getMonth() + 1
    );

    // =====================================
    // FETCH DATA
    // =====================================

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData =
        async () => {
            try {
                setLoading(true);

                // PATIENTS

                const patientRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/patients"
                    );

                const patientData =
                    await patientRes.json();

                if (
                    patientData.success
                ) {
                    setPatients(
                        patientData.data
                    );
                }

                // DOCTORS

                const doctorRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/doctors"
                    );

                const doctorData =
                    await doctorRes.json();

                if (
                    doctorData.success
                ) {
                    setDoctors(
                        doctorData.data
                    );
                }

                // APPOINTMENTS

                const appointmentRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/appointments/staff/all"
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
                        "http://127.0.0.1:3000/api/v1/lab-tests"
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
    // DATE HELPERS
    // =====================================

    const today = new Date();

    const last7Days =
        new Date();

    last7Days.setDate(
        today.getDate() - 7
    );

    const last30Days =
        new Date();

    last30Days.setDate(
        today.getDate() - 30
    );

    // =====================================
    // PATIENT STATS
    // =====================================

    const patient7Days =
        patients.filter(
            (item) =>
                new Date(
                    item.createdAt
                ) >= last7Days
        ).length;

    const patient30Days =
        patients.filter(
            (item) =>
                new Date(
                    item.createdAt
                ) >= last30Days
        ).length;

    // =====================================
    // TOTAL SALES
    // =====================================

    const appointmentSales =
        appointments
            .filter(
                (item) =>
                    item.paymentStatus ===
                    "Paid"
            )
            .reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    (item?.doctor
                        ?.consultationFee ||
                        0),
                0
            );

    const labSales =
        labTests
            .filter(
                (item) =>
                    item.paymentStatus ===
                    "Paid"
            )
            .reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    (item.totalAmount ||
                        0),
                0
            );

    const totalSales =
        appointmentSales +
        labSales;

    // =====================================
    // MONTHLY DATA
    // =====================================

    const monthlyAppointments =
        appointments.filter(
            (item) => {
                const date =
                    new Date(
                        item.createdAt
                    );

                return (
                    date.getFullYear() ===
                        Number(
                            selectedYear
                        ) &&
                    date.getMonth() +
                        1 ===
                        Number(
                            selectedMonth
                        )
                );
            }
        );

    const monthlyLabTests =
        labTests.filter(
            (item) => {
                const date =
                    new Date(
                        item.createdAt
                    );

                return (
                    date.getFullYear() ===
                        Number(
                            selectedYear
                        ) &&
                    date.getMonth() +
                        1 ===
                        Number(
                            selectedMonth
                        )
                );
            }
        );

    const monthlyPatients =
        patients.filter(
            (item) => {
                const date =
                    new Date(
                        item.createdAt
                    );

                return (
                    date.getFullYear() ===
                        Number(
                            selectedYear
                        ) &&
                    date.getMonth() +
                        1 ===
                        Number(
                            selectedMonth
                        )
                );
            }
        );

    const monthlyDoctors =
        doctors.filter(
            (item) => {
                const date =
                    new Date(
                        item.createdAt
                    );

                return (
                    date.getFullYear() <=
                    Number(
                        selectedYear
                    )
                );
            }
        );

    // =====================================
    // SALES
    // =====================================

    const monthlyAppointmentSales =
        monthlyAppointments
            .filter(
                (item) =>
                    item.paymentStatus ===
                    "Paid"
            )
            .reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    (item?.doctor
                        ?.consultationFee ||
                        0),
                0
            );

    const monthlyLabSales =
        monthlyLabTests
            .filter(
                (item) =>
                    item.paymentStatus ===
                    "Paid"
            )
            .reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    (item.totalAmount ||
                        0),
                0
            );

    const monthlySales =
        monthlyAppointmentSales +
        monthlyLabSales;

    // =====================================
    // PAID COUNTS
    // =====================================

    const paidAppointments =
        monthlyAppointments.filter(
            (item) =>
                item.paymentStatus ===
                "Paid"
        ).length;

    const paidLabTests =
        monthlyLabTests.filter(
            (item) =>
                item.paymentStatus ===
                "Paid"
        ).length;

    // =====================================
    // PDF DOWNLOAD
    // =====================================

    const downloadReport =
        () => {
            const doc =
                new jsPDF();

            // TITLE

            doc.setFontSize(
                24
            );

            doc.text(
                "Hospital Monthly Report",
                20,
                20
            );

            // MONTH

            doc.setFontSize(
                14
            );

            doc.text(
                `Month: ${selectedMonth}/${selectedYear}`,
                20,
                35
            );

            // LINE

            doc.line(
                20,
                42,
                190,
                42
            );

            // BODY

            doc.setFontSize(
                16
            );

            doc.text(
                `Patients Registered: ${monthlyPatients.length}`,
                20,
                60
            );

            doc.text(
                `Doctors Available: ${monthlyDoctors.length}`,
                20,
                75
            );

            doc.text(
                `Appointments: ${monthlyAppointments.length}`,
                20,
                90
            );

            doc.text(
                `Lab Tests: ${monthlyLabTests.length}`,
                20,
                105
            );

            doc.text(
                `Paid Appointments: ${paidAppointments}`,
                20,
                120
            );

            doc.text(
                `Appointment Sales: Tk ${monthlyAppointmentSales}`,
                20,
                135
            );

            doc.text(
                `Paid Lab Tests: ${paidLabTests}`,
                20,
                150
            );

            doc.text(
                `Lab Test Sales: Tk ${monthlyLabSales}`,
                20,
                165
            );

            doc.text(
                `Total Monthly Sales: Tk ${monthlySales}`,
                20,
                180
            );

            // FOOTER

            doc.setFontSize(
                18
            );

            doc.text(
                "Generated Hospital Analytics Report",
                20,
                210
            );

            // SAVE

            doc.save(
                `Hospital-Report-${selectedMonth}-${selectedYear}.pdf`
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
                        Reports &
                        Analytics
                    </h2>

                    <p className="text-slate-500 text-lg">
                        Hospital
                        statistics and
                        reports
                    </p>
                </div>

                {/* FILTER */}

                <div className="flex flex-col md:flex-row gap-4">
                    {/* YEAR */}

                    <select
                        value={
                            selectedYear
                        }
                        onChange={(
                            e
                        ) =>
                            setSelectedYear(
                                e.target
                                    .value
                            )
                        }
                        className="h-14 px-5 rounded-2xl border border-blue-100 outline-none bg-white"
                    >
                        <option>
                            2025
                        </option>

                        <option>
                            2026
                        </option>

                        <option>
                            2027
                        </option>
                    </select>

                    {/* MONTH */}

                    <select
                        value={
                            selectedMonth
                        }
                        onChange={(
                            e
                        ) =>
                            setSelectedMonth(
                                e.target
                                    .value
                            )
                        }
                        className="h-14 px-5 rounded-2xl border border-blue-100 outline-none bg-white"
                    >
                        <option value="1">
                            January
                        </option>

                        <option value="2">
                            February
                        </option>

                        <option value="3">
                            March
                        </option>

                        <option value="4">
                            April
                        </option>

                        <option value="5">
                            May
                        </option>

                        <option value="6">
                            June
                        </option>

                        <option value="7">
                            July
                        </option>

                        <option value="8">
                            August
                        </option>

                        <option value="9">
                            September
                        </option>

                        <option value="10">
                            October
                        </option>

                        <option value="11">
                            November
                        </option>

                        <option value="12">
                            December
                        </option>
                    </select>

                    {/* DOWNLOAD */}

                    <button
                        onClick={
                            downloadReport
                        }
                        className="h-14 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black flex items-center gap-3"
                    >
                        <Download
                            size={20}
                        />

                        Download PDF
                    </button>
                </div>
            </div>

            {/* TOP CARDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Patients"
                    value={
                        patients.length
                    }
                    extra={`+${patient7Days} in last 7 days`}
                    icon={
                        <Users
                            size={30}
                        />
                    }
                />

                <StatsCard
                    title="Total Doctors"
                    value={
                        doctors.length
                    }
                    extra="Hospital doctors"
                    icon={
                        <Stethoscope
                            size={30}
                        />
                    }
                />

                <StatsCard
                    title="Total Sales"
                    value={`Tk ${totalSales}`}
                    extra={`+${monthlySales} this month`}
                    icon={
                        <DollarSign
                            size={30}
                        />
                    }
                />

                <StatsCard
                    title="Lab Tests"
                    value={
                        labTests.length
                    }
                    extra={`${monthlyLabTests.length} this month`}
                    icon={
                        <FlaskConical
                            size={30}
                        />
                    }
                />
            </div>

            {/* MONTHLY ANALYTICS */}

            <div className="bg-white rounded-[35px] border border-blue-100 p-8 shadow-sm">
                <h2 className="text-3xl font-black text-slate-800 mb-8">
                    Monthly
                    Analytics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnalyticsCard
                        title="Patients"
                        value={
                            monthlyPatients.length
                        }
                    />

                    <AnalyticsCard
                        title="Doctors"
                        value={
                            monthlyDoctors.length
                        }
                    />

                    <AnalyticsCard
                        title="Appointments"
                        value={
                            monthlyAppointments.length
                        }
                    />

                    <AnalyticsCard
                        title="Paid Appointments"
                        value={
                            paidAppointments
                        }
                    />

                    <AnalyticsCard
                        title="Lab Tests"
                        value={
                            monthlyLabTests.length
                        }
                    />

                    <AnalyticsCard
                        title="Paid Lab Tests"
                        value={
                            paidLabTests
                        }
                    />

                    <AnalyticsCard
                        title="Appointment Sales"
                        value={`Tk ${monthlyAppointmentSales}`}
                    />

                    <AnalyticsCard
                        title="Lab Test Sales"
                        value={`Tk ${monthlyLabSales}`}
                    />

                    <AnalyticsCard
                        title="Total Sales"
                        value={`Tk ${monthlySales}`}
                    />
                </div>
            </div>
        </div>
    );
};

// =====================================
// STATS CARD
// =====================================

const StatsCard = ({
    title,
    value,
    extra,
    icon,
}) => {
    return (
        <div className="bg-white rounded-[35px] border border-blue-100 p-7 shadow-sm">
            <div className="w-16 h-16 rounded-[22px] bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                {icon}
            </div>

            <h3 className="text-slate-500 font-semibold mb-2">
                {title}
            </h3>

            <h2 className="text-4xl font-black text-slate-800 mb-3">
                {value}
            </h2>

            <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                <TrendingUp
                    size={16}
                />

                {extra}
            </div>
        </div>
    );
};

// =====================================
// ANALYTICS CARD
// =====================================

const AnalyticsCard = ({
    title,
    value,
}) => {
    return (
        <div className="bg-blue-50 rounded-[30px] p-7">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
                <Calendar
                    size={22}
                />

                <h3 className="font-black text-slate-800 text-lg">
                    {title}
                </h3>
            </div>

            <h2 className="text-4xl font-black text-slate-800">
                {value}
            </h2>
        </div>
    );
};

export default Reports;