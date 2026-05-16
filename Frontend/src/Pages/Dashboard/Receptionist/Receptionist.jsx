import React, {
    useEffect,
    useState,
} from "react";

import {
    Calendar,
    FlaskConical,
    Ambulance,
    Users,
} from "lucide-react";

const Receptionist = () => {
    // =====================================
    // STATES
    // =====================================

    const [
        appointments,
        setAppointments,
    ] = useState([]);

    const [labTests, setLabTests] =
        useState([]);

    const [
        ambulances,
        setAmbulances,
    ] = useState([]);

    const [
        ambulanceRequests,
        setAmbulanceRequests,
    ] = useState([]);

    const [patients, setPatients] =
        useState([]);

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

                // AMBULANCES

                const ambulanceRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/ambulances"
                    );

                const ambulanceData =
                    await ambulanceRes.json();

                if (
                    ambulanceData.success
                ) {
                    setAmbulances(
                        ambulanceData.data
                    );
                }

                // AMBULANCE REQUESTS

                const requestRes =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/ambulance-requests"
                    );

                const requestData =
                    await requestRes.json();

                if (
                    requestData.success
                ) {
                    setAmbulanceRequests(
                        requestData.data
                    );
                }

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
    // RECENT DATA
    // =====================================

    const recentAppointments =
        appointments.slice(
            0,
            5
        );

    const recentLabTests =
        labTests.slice(0, 5);

    const recentRequests =
        ambulanceRequests.slice(
            0,
            5
        );

    const freeAmbulances =
        ambulances
            .filter(
                (item) =>
                    item.status ===
                    "Available"
            )
            .slice(0, 5);

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
                    Receptionist
                    Dashboard
                </h2>

                <p className="text-slate-500 text-lg">
                    Reception &
                    hospital
                    overview
                </p>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
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
                    title="Free Ambulance"
                    value={
                        freeAmbulances.length
                    }
                    icon={
                        <Ambulance
                            size={28}
                        />
                    }
                />
            </div>

            {/* TABLES */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                                    Date
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

                                        <td className="px-4 py-3">
                                            Dr.{" "}
                                            {
                                                item
                                                    ?.doctor
                                                    ?.user
                                                    ?.name
                                            }
                                        </td>

                                        <td className="px-4 py-3">
                                            {
                                                item.appointmentDate
                                            }
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </TableCard>

                {/* LAB TESTS */}

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

                {/* AMBULANCE REQUESTS */}

                <TableCard
                    title="Ambulance Requests"
                >
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    Patient
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Emergency
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentRequests.map(
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

                                        <td className="px-4 py-3">
                                            {
                                                item.emergencyType
                                            }
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-xl text-xs font-bold">
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

                {/* FREE AMBULANCES */}

                <TableCard
                    title="Free Ambulances"
                >
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">
                                    Number
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Driver
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Phone
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {freeAmbulances.map(
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
                                        {/* NUMBER */}

                                        <td className="px-4 py-3 font-semibold">
                                            <div className="flex items-center gap-2">
                                                {
                                                    item.ambulanceNumber
                                                }

                                                {item.createdBy ===
                                                    "Receptionist" && (
                                                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-black">
                                                        Reception
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* DRIVER */}

                                        <td className="px-4 py-3">
                                            {
                                                item.driverName
                                            }
                                        </td>

                                        {/* PHONE */}

                                        <td className="px-4 py-3">
                                            {
                                                item.driverPhone
                                            }
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

export default Receptionist;