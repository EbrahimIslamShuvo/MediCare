import React, {
    useEffect,
    useState,
} from "react";

import {
    useParams,
    useNavigate,
} from "react-router-dom";

import {
    Mail,
    Phone,
    BadgeCheck,
    Stethoscope,
    Building2,
    BadgeDollarSign,
    Clock3,
    CalendarDays,
    GraduationCap,
} from "lucide-react";

const DoctorSingle = () => {
    // =====================================
    // PARAMS
    // =====================================

    const { id } =
        useParams();

    const navigate =
        useNavigate();

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

    const [doctor, setDoctor] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [
        bookingModal,
        setBookingModal,
    ] = useState(false);

    const [
        selectedDate,
        setSelectedDate,
    ] = useState("");

    const [
        bookingData,
        setBookingData,
    ] = useState(null);

    const [
        bookingLoading,
        setBookingLoading,
    ] = useState(false);

    const [
        paymentLoading,
        setPaymentLoading,
    ] = useState(false);

    // =====================================
    // FETCH DOCTOR
    // =====================================

    useEffect(() => {
        fetchDoctor();
    }, []);

    const fetchDoctor =
        async () => {
            try {
                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/doctors/${id}`
                    );

                const result =
                    await response.json();

                if (result.success) {
                    setDoctor(
                        result.data
                    );
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

    // =====================================
    // FORMAT TIME
    // =====================================

    const formatTime = (
        time
    ) => {
        if (!time)
            return "";

        const [hour, minute] =
            time.split(":");

        const h =
            hour % 12 || 12;

        const ampm =
            hour >= 12
                ? "PM"
                : "AM";

        return `${h}:${minute} ${ampm}`;
    };

    // =====================================
    // OPEN BOOKING
    // =====================================

    const handleBook =
        () => {
            if (!user) {
                navigate(
                    "/login"
                );

                return;
            }

            if (
                user.role !==
                "Patient"
            ) {
                alert(
                    "Only patients can book appointments"
                );

                return;
            }

            setBookingModal(
                true
            );
        };

    // =====================================
    // CREATE BOOKING
    // =====================================

    const handleBooking =
        async () => {
            try {
                // DATE REQUIRED

                if (
                    !selectedDate
                ) {
                    alert(
                        "Please select appointment date"
                    );

                    return;
                }

                // TODAY

                const today =
                    new Date();

                today.setHours(
                    0,
                    0,
                    0,
                    0
                );

                // SELECTED DATE

                const selected =
                    new Date(
                        selectedDate
                    );

                // PREVIOUS DATE BLOCK

                if (
                    selected <
                    today
                ) {
                    alert(
                        "Previous date appointment is not allowed"
                    );

                    return;
                }

                // DAY NAME

                const dayName =
                    selected.toLocaleDateString(
                        "en-US",
                        {
                            weekday:
                                "long",
                        }
                    );

                // DOCTOR AVAILABLE CHECK

                const isAvailable =
                    doctor?.availableDays?.includes(
                        dayName
                    );

                if (
                    !isAvailable
                ) {
                    alert(
                        `Doctor is not available on ${dayName}`
                    );

                    return;
                }

                // API

                setBookingLoading(
                    true
                );

                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/appointments",
                        {
                            method:
                                "POST",

                            headers:
                            {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify(
                                {
                                    userId:
                                        user._id,

                                    doctorId:
                                        doctor._id,

                                    appointmentDate:
                                        selectedDate,
                                }
                            ),
                        }
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {
                    setBookingData(
                        result.data
                    );
                } else {
                    alert(
                        result.message
                    );
                }
            } catch (error) {
                console.log(error);
            } finally {
                setBookingLoading(
                    false
                );
            }
        };

    // =====================================
    // PAYMENT
    // =====================================

    const handlePayment =
        async () => {
            try {
                setPaymentLoading(
                    true
                );

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/payment/init-payment/${bookingData._id}`
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {
                    window.location.href =
                        result.url;
                } else {
                    alert(
                        result.message
                    );
                }
            } catch (error) {
                console.log(error);
            } finally {
                setPaymentLoading(
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
        <div className="min-h-screen bg-blue-50 py-12 px-5">
            <div className="max-w-7xl mx-auto">
                {/* ================================= */}
                {/* TOP SECTION */}
                {/* ================================= */}

                <div className="bg-white rounded-[40px] border border-blue-100 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* IMAGE */}

                        <div className="h-[750px] bg-blue-100">
                            {doctor?.image ? (
                                <img
                                    src={`http://127.0.0.1:3000${doctor.image}`}
                                    alt={
                                        doctor
                                            ?.user
                                            ?.name
                                    }
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-blue-600 text-9xl font-black uppercase">
                                    {
                                        doctor
                                            ?.user
                                            ?.name?.[0]
                                    }
                                </div>
                            )}
                        </div>

                        {/* CONTENT */}

                        <div className="p-10 flex flex-col justify-between">
                            <div>
                                {/* TOP BAR */}

                                <div className="flex items-start justify-between mb-10">
                                    <div className="flex items-center gap-3 bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-bold">
                                        <BadgeCheck
                                            size={
                                                20
                                            }
                                        />

                                        Verified
                                        Doctor
                                    </div>

                                    {/* CONTACT */}

                                    <div className="flex items-center gap-4">
                                        {/* PHONE */}

                                        <div className="group relative">
                                            <div className="w-14 h-14 rounded-2xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 cursor-pointer transition">
                                                <Phone
                                                    size={
                                                        24
                                                    }
                                                />
                                            </div>

                                            <div className="absolute right-0 top-16 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition whitespace-nowrap z-20">
                                                {
                                                    doctor?.phone
                                                }
                                            </div>
                                        </div>

                                        {/* EMAIL */}

                                        <div className="group relative">
                                            <div className="w-14 h-14 rounded-2xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 cursor-pointer transition">
                                                <Mail
                                                    size={
                                                        24
                                                    }
                                                />
                                            </div>

                                            <div className="absolute right-0 top-16 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition whitespace-nowrap z-20">
                                                {
                                                    doctor
                                                        ?.user
                                                        ?.email
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* NAME */}

                                <h2 className="text-5xl font-black text-slate-800 mb-5">
                                    Dr.{" "}
                                    {
                                        doctor?.user
                                            ?.name
                                    }
                                </h2>

                                {/* SPECIALIZATION */}

                                <div className="flex items-center gap-3 text-blue-600 font-bold text-2xl mb-4">
                                    <Stethoscope
                                        size={
                                            28
                                        }
                                    />

                                    {
                                        doctor?.specialization
                                    }
                                </div>

                                {/* DEPARTMENT */}

                                <div className="flex items-center gap-3 text-slate-600 font-semibold text-lg mb-10">
                                    <Building2
                                        size={
                                            24
                                        }
                                    />

                                    {
                                        doctor?.department
                                    }
                                </div>

                                {/* INFO */}

                                <div className="space-y-5">
                                    {/* FEE */}

                                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <BadgeDollarSign
                                                size={
                                                    30
                                                }
                                            />
                                        </div>

                                        <div>
                                            <p className="text-slate-500 font-medium">
                                                Consultation
                                                Fee
                                            </p>

                                            <h4 className="text-3xl font-black text-slate-800">
                                                ৳{" "}
                                                {
                                                    doctor?.consultationFee
                                                }
                                            </h4>
                                        </div>
                                    </div>

                                    {/* TIME */}

                                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <Clock3
                                                size={
                                                    30
                                                }
                                            />
                                        </div>

                                        <div>
                                            <p className="text-slate-500 font-medium">
                                                Consultation
                                                Time
                                            </p>

                                            <h4 className="text-2xl font-black text-slate-800">
                                                {formatTime(
                                                    doctor?.startTime
                                                )}{" "}
                                                -{" "}
                                                {formatTime(
                                                    doctor?.endTime
                                                )}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* DAYS */}

                                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5">
                                        <div className="flex items-center gap-3 text-blue-600 mb-5">
                                            <CalendarDays
                                                size={
                                                    24
                                                }
                                            />

                                            <h4 className="font-bold text-lg">
                                                Available
                                                Days
                                            </h4>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            {doctor?.availableDays?.map(
                                                (
                                                    day,
                                                    index
                                                ) => (
                                                    <span
                                                        key={
                                                            index
                                                        }
                                                        className="bg-white border border-blue-200 text-blue-600 px-5 py-2 rounded-2xl font-semibold"
                                                    >
                                                        {day}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOOK BUTTON */}

                            {user?.role ===
                                "Patient" && (
                                    <button
                                        onClick={
                                            handleBook
                                        }
                                        className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-3xl text-xl font-bold transition"
                                    >
                                        Book
                                        Appointment
                                    </button>
                                )}
                        </div>
                    </div>
                </div>

                {/* ================================= */}
                {/* BIO */}
                {/* ================================= */}

                <div className="bg-white rounded-[40px] border border-blue-100 shadow-sm p-10 mt-8">
                    <h3 className="text-4xl font-black text-slate-800 mb-6">
                        Biography
                    </h3>

                    <p className="text-slate-600 text-lg leading-relaxed">
                        {doctor?.bio ||
                            "No biography available"}
                    </p>
                </div>

                {/* ================================= */}
                {/* QUALIFICATION */}
                {/* ================================= */}

                <div className="bg-white rounded-[40px] border border-blue-100 shadow-sm p-10 mt-8">
                    <div className="flex items-center gap-4 mb-8">
                        <GraduationCap className="text-blue-600" />

                        <h3 className="text-4xl font-black text-slate-800">
                            Qualifications
                        </h3>
                    </div>

                    {doctor?.qualification?.filter(
                        (item) =>
                            item.degree ||
                            item.institute ||
                            item.country
                    )?.length >
                        0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-y-4">
                                <thead>
                                    <tr>
                                        <th className="bg-blue-600 text-white text-left px-6 py-4 rounded-l-2xl text-lg">
                                            Degree
                                        </th>

                                        <th className="bg-blue-600 text-white text-left px-6 py-4 text-lg">
                                            Institute
                                        </th>

                                        <th className="bg-blue-600 text-white text-left px-6 py-4 rounded-r-2xl text-lg">
                                            Country
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {doctor?.qualification
                                        ?.filter(
                                            (
                                                item
                                            ) =>
                                                item.degree ||
                                                item.institute ||
                                                item.country
                                        )
                                        ?.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <tr
                                                    key={
                                                        index
                                                    }
                                                    className="bg-blue-50"
                                                >
                                                    <td className="px-6 py-5 rounded-l-2xl font-bold text-slate-800 text-lg border-y border-l border-blue-100">
                                                        {
                                                            item.degree
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5 font-semibold text-slate-600 text-lg border-y border-blue-100">
                                                        {
                                                            item.institute
                                                        }
                                                    </td>

                                                    <td className="px-6 py-5 rounded-r-2xl font-semibold text-slate-600 text-lg border-y border-r border-blue-100">
                                                        {
                                                            item.country
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 text-center text-slate-500 font-semibold">
                            No qualification added
                        </div>
                    )}
                </div>

                {/* ================================= */}
                {/* BOOKING MODAL */}
                {/* ================================= */}

                {bookingModal && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-5">
                        <div className="bg-white w-full max-w-2xl rounded-[40px] p-8 relative">
                            {/* CLOSE */}

                            <button
                                onClick={() => {
                                    setBookingModal(
                                        false
                                    );

                                    setBookingData(
                                        null
                                    );

                                    setSelectedDate(
                                        ""
                                    );
                                }}
                                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-red-50 hover:bg-red-100 text-red-500 font-bold transition"
                            >
                                ✕
                            </button>

                            {/* TITLE */}

                            <h2 className="text-4xl font-black text-slate-800 mb-8">
                                Book Appointment
                            </h2>

                            {!bookingData ? (
                                <>
                                    {/* DOCTOR */}

                                    <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 mb-6">
                                        <h3 className="text-2xl font-black text-slate-800 mb-2">
                                            Dr.{" "}
                                            {
                                                doctor
                                                    ?.user
                                                    ?.name
                                            }
                                        </h3>

                                        <p className="text-blue-600 font-semibold mb-4">
                                            {
                                                doctor?.specialization
                                            }
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            {doctor?.availableDays?.map(
                                                (
                                                    day,
                                                    index
                                                ) => (
                                                    <span
                                                        key={
                                                            index
                                                        }
                                                        className="bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-2xl font-semibold text-sm"
                                                    >
                                                        {
                                                            day
                                                        }
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* DATE */}

                                    <input
                                        type="date"
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split(
                                                    "T"
                                                )[0]
                                        }
                                        value={
                                            selectedDate
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setSelectedDate(
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="w-full border border-blue-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-100 mb-6"
                                    />

                                    {/* BUTTON */}

                                    <button
                                        onClick={
                                            handleBooking
                                        }
                                        disabled={
                                            bookingLoading
                                        }
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-3xl text-xl font-bold transition"
                                    >
                                        {bookingLoading
                                            ? "Processing..."
                                            : "Confirm Appointment"}
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* INFO */}

                                    <div className="space-y-5">
                                        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                                            <p className="text-slate-500 font-medium mb-2">
                                                Serial Number
                                            </p>

                                            <h3 className="text-4xl font-black text-slate-800">
                                                #
                                                {
                                                    bookingData.serialNumber
                                                }
                                            </h3>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                                            <p className="text-slate-500 font-medium mb-2">
                                                Appointment Time
                                            </p>

                                            <h3 className="text-3xl font-black text-slate-800">
                                                {
                                                    bookingData.appointmentTime
                                                }
                                            </h3>
                                        </div>

                                        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6">
                                            <p className="text-slate-500 font-medium mb-2">
                                                Appointment Date
                                            </p>

                                            <h3 className="text-3xl font-black text-slate-800">
                                                {
                                                    bookingData.appointmentDate
                                                }
                                            </h3>
                                        </div>

                                        <div className="bg-red-50 border border-red-100 rounded-3xl p-5 text-red-500 font-semibold">
                                            Complete payment within 10 minutes otherwise appointment will be cancelled automatically.
                                        </div>
                                    </div>

                                    {/* PAYMENT */}

                                    <button
                                        onClick={
                                            handlePayment
                                        }
                                        disabled={
                                            paymentLoading
                                        }
                                        className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white py-5 rounded-3xl text-xl font-bold transition"
                                    >
                                        {paymentLoading
                                            ? "Processing Payment..."
                                            : "Payment To Confirm"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorSingle;