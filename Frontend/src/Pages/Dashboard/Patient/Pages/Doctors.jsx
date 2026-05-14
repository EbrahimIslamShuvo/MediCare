import React, {
    useEffect,
    useState,
} from "react";
import DoctorCCard from "../../../../Component/DoctorCard/DoctorCCard";


const Doctors = () => {
    // =====================================
    // USER
    // =====================================

    const user = JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    // =====================================
    // STATES
    // =====================================

    const [doctors, setDoctors] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    // =====================================
    // FETCH DOCTORS
    // =====================================

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors =
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
                    // UNIQUE DOCTORS

                    const uniqueDoctors =
                        [];

                    result.data.forEach(
                        (
                            item
                        ) => {
                            const exists =
                                uniqueDoctors.find(
                                    (
                                        doctor
                                    ) =>
                                        doctor._id ===
                                        item
                                            ?.doctor
                                            ?._id
                                );

                            if (
                                !exists
                            ) {
                                uniqueDoctors.push(
                                    item.doctor
                                );
                            }
                        }
                    );

                    setDoctors(
                        uniqueDoctors
                    );
                }
            } catch (error) {
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
            <div className="min-h-screen flex justify-center items-center text-2xl font-bold text-blue-600">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50 p-6">
            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="mb-10">
                <h2 className="text-4xl font-black text-slate-800 mb-2">
                    My Doctors
                </h2>

                <p className="text-slate-500 text-lg">
                    Doctors you
                    have taken
                    appointments
                    with
                </p>
            </div>

            {/* ================================= */}
            {/* EMPTY */}
            {/* ================================= */}

            {doctors.length ===
            0 ? (
                <div className="bg-white border border-blue-100 rounded-[40px] p-16 text-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-black mx-auto mb-6">
                        D
                    </div>

                    <h3 className="text-3xl font-black text-slate-800 mb-3">
                        No Doctor
                        Found
                    </h3>

                    <p className="text-slate-500 text-lg">
                        You have
                        not booked
                        any doctor
                        yet
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {doctors.map(
                        (
                            doctor
                        ) => (
                            <DoctorCCard
                                key={
                                    doctor._id
                                }
                                doctor={
                                    doctor
                                }
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Doctors;