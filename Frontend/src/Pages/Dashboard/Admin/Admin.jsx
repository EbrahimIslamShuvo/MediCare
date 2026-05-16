import React, {
    useEffect,
    useState,
} from "react";

import {
    Users,
    Stethoscope,
    Calendar,
    FlaskConical,
    DollarSign,
} from "lucide-react";

const Admin = () => {
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

    const [
        receptionists,
        setReceptionists,
    ] = useState([]);

    const [loading, setLoading] =
        useState(true);

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

                // RECEPTIONISTS

                const receptionistRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/receptionists"
                    );

                const receptionistData =
                    await receptionistRes.json();

                if (
                    receptionistData.success
                ) {
                    setReceptionists(
                        receptionistData.data
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
    // RECENT DATA
    // =====================================

    const recentStaff =
        receptionists.slice(
            0,
            5
        );

    const recentAppointments =
        appointments.slice(
            0,
            5
        );

    const recentLabTests =
        labTests.slice(0, 5);

    const recentPayments = [
        ...appointments.map(
            (item) => ({
                type: "Appointment",

                patient:
                    item?.patient?.user
                        ?.name,

                amount:
                    item?.doctor
                        ?.consultationFee,

                paymentStatus:
                    item.paymentStatus,
            })
        ),

        ...labTests.map(
            (item) => ({
                type: "Lab Test",

                patient:
                    item?.patient?.user
                        ?.name,

                amount:
                    item.totalAmount,

                paymentStatus:
                    item.paymentStatus,
            })
        ),
    ].slice(0, 5);

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
                    Admin
                    Dashboard
                </h2>

                <p className="text-slate-500 text-lg">
                    Hospital
                    overview &
                    management
                </p>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
                <StatsCard
                    title="Patients"
                    value={
                        patients.length
                    }
                    icon={
                        <Users
                            size={28}
                        />
                    }
                />

                <StatsCard
                    title="Doctors"
                    value={
                        doctors.length
                    }
                    icon={
                        <Stethoscope
                            size={28}
                        />
                    }
                />

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
                    title="Total Sales"
                    value={`৳ ${totalSales}`}
                    icon={
                        <DollarSign
                            size={28}
                        />
                    }
                />
            </div>

            {/* TABLES */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* STAFF */}

                <TableCard
                    title="Recent Staff"
                >
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    Name
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Email
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentStaff.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <tr
                                        key={
                                            index
                                        }
                                        className="border-b border-blue-50"
                                    >
                                        <td className="px-4 py-3 font-semibold">
                                            {
                                                item
                                                    ?.user
                                                    ?.name
                                            }
                                        </td>

                                        <td className="px-4 py-3 text-slate-500 text-sm">
                                            {
                                                item
                                                    ?.user
                                                    ?.email
                                            }
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-xl text-xs font-bold">
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
                </TableCard>

                {/* APPOINTMENTS */}

                <TableCard
                    title="Recent Appointments"
                >
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    Patient
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Doctor
                                </th>

                                <th className="px-4 py-3 text-left">
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
                                        className="border-b border-blue-50"
                                    >
                                        <td className="px-4 py-3 font-semibold">
                                            {
                                                item
                                                    ?.patient
                                                    ?.user
                                                    ?.name
                                            }
                                        </td>

                                        <td className="px-4 py-3 text-slate-600">
                                            Dr.{" "}
                                            {
                                                item
                                                    ?.doctor
                                                    ?.user
                                                    ?.name
                                            }
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-xl text-xs font-bold">
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

                {/* LAB TEST */}

                <TableCard
                    title="Recent Lab Tests"
                >
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    Patient
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Amount
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Status
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
                                        className="border-b border-blue-50"
                                    >
                                        <td className="px-4 py-3 font-semibold">
                                            {
                                                item
                                                    ?.patient
                                                    ?.user
                                                    ?.name
                                            }
                                        </td>

                                        <td className="px-4 py-3 font-black text-slate-800">
                                            ৳{" "}
                                            {
                                                item.totalAmount
                                            }
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-xl text-xs font-bold">
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
                </TableCard>

                {/* PAYMENTS */}

                <TableCard
                    title="Recent Payments"
                >
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    Type
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Patient
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Amount
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentPayments.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <tr
                                        key={
                                            index
                                        }
                                        className="border-b border-blue-50"
                                    >
                                        <td className="px-4 py-3 font-semibold">
                                            {
                                                item.type
                                            }
                                        </td>

                                        <td className="px-4 py-3">
                                            {
                                                item.patient
                                            }
                                        </td>

                                        <td className="px-4 py-3 font-black text-slate-800">
                                            ৳{" "}
                                            {
                                                item.amount
                                            }
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-xl text-xs font-bold">
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

export default Admin;