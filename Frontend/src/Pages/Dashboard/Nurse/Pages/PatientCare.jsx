import React, {
    useEffect,
    useState,
} from "react";

import {
    Users,
    Search,
    FileText,
    FlaskConical,
    Plus,
    Save,
    Trash2,
    Stethoscope,
} from "lucide-react";

const PatientCare = () => {

    // =====================================
    // STATES
    // =====================================

    const [
        admits,
        setAdmits,
    ] = useState([]);

    const [
        selectedPatient,
        setSelectedPatient,
    ] = useState(null);

    const [
        doctors,
        setDoctors,
    ] = useState([]);

    const [
        availableTests,
        setAvailableTests,
    ] = useState([]);

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        loading,
        setLoading,
    ] = useState(true);

    // =====================================
    // FORM STATES
    // =====================================

    const [
        medicines,
        setMedicines,
    ] = useState([
        {
            medicine: "",

            duration: "",

            times: [],
        },
    ]);

    const [
        tests,
        setTests,
    ] = useState([
        {
            testName: "",

            price: "",

            note: "",
        },
    ]);

    const [
        doctorVisit,
        setDoctorVisit,
    ] = useState({
        doctorName: "",

        fee: 0,

        note: "",
    });

    // =====================================
    // FETCH
    // =====================================

    useEffect(() => {

        fetchAdmits();

        fetchDoctors();

        fetchTests();

    }, []);

    // =====================================
    // FETCH ADMITS
    // =====================================

    const fetchAdmits =
        async () => {

            try {

                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/admit-requests"
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    const admitted =
                        result.data.filter(
                            (
                                item
                            ) =>
                                item.status ===
                                "Admitted"
                        );

                    setAdmits(
                        admitted
                    );

                    // IMPORTANT

                    if (
                        selectedPatient
                    ) {

                        const updatedPatient =
                            admitted.find(
                                (
                                    item
                                ) =>
                                    item._id ===
                                    selectedPatient._id
                            );

                        if (
                            updatedPatient
                        ) {

                            setSelectedPatient(
                                updatedPatient
                            );
                        }
                    }
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
    // FETCH DOCTORS
    // =====================================

    const fetchDoctors =
        async () => {

            try {

                const response =
                    await fetch(
                        "http://127.0.0.1:3000/api/v1/doctors"
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    setDoctors(
                        result.data
                    );
                }

            } catch (
            error
            ) {

                console.log(
                    error
                );
            }
        };

    // =====================================
    // FETCH TESTS
    // =====================================

    const fetchTests =
        async () => {

            try {

                const response =
                    await fetch(
                        "/tests.json"
                    );

                const data =
                    await response.json();

                setAvailableTests(
                    data
                );

            } catch (
            error
            ) {

                console.log(
                    error
                );
            }
        };

    // =====================================
    // FILTER
    // =====================================

    const filteredPatients =
        admits.filter(
            (item) =>
                item?.patient?.user?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    // =====================================
    // ADD MEDICINE
    // =====================================

    const handleAddMedicine =
        async () => {

            try {

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/admit-requests/medicine/${selectedPatient._id}`,
                        {
                            method:
                                "PATCH",

                            headers:
                            {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify(
                                {
                                    medicines,
                                }
                            ),
                        }
                    );
                console.log(medicines)

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    alert(
                        "Medicine Added"
                    );

                    setMedicines([
                        {
                            medicine:
                                "",

                            duration:
                                "",

                            times:
                                [],
                        },
                    ]);

                    fetchAdmits();
                }

            } catch (
            error
            ) {

                console.log(
                    error
                );
            }
        };

    // =====================================
    // ADD TEST
    // =====================================

    const handleAddTest =
        async () => {

            try {

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/admit-requests/test-request/${selectedPatient._id}`,
                        {
                            method:
                                "PATCH",

                            headers:
                            {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify(
                                {
                                    tests,
                                }
                            ),
                        }
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    alert(
                        "Lab Test Added"
                    );

                    setTests([
                        {
                            testName:
                                "",

                            price:
                                "",

                            note:
                                "",
                        },
                    ]);

                    fetchAdmits();
                }

            } catch (
            error
            ) {

                console.log(
                    error
                );
            }
        };

    // =====================================
    // ADD VISIT
    // =====================================

    const handleAddVisit =
        async () => {

            try {

                const response =
                    await fetch(
                        `http://127.0.0.1:3000/api/v1/admit-requests/doctor-visit/${selectedPatient._id}`,
                        {
                            method:
                                "PATCH",

                            headers:
                            {
                                "Content-Type":
                                    "application/json",
                            },

                            body: JSON.stringify(
                                doctorVisit
                            ),
                        }
                    );

                const result =
                    await response.json();

                if (
                    result.success
                ) {

                    alert(
                        "Doctor Visit Added"
                    );

                    setDoctorVisit(
                        {
                            doctorName:
                                "",

                            fee: 0,

                            note: "",
                        }
                    );

                    fetchAdmits();
                }

            } catch (
            error
            ) {

                console.log(
                    error
                );
            }
        };

    // =====================================
    // DELETE MEDICINE
    // =====================================

    const handleDeleteMedicine =
        async (
            index
        ) => {

            await fetch(
                `http://127.0.0.1:3000/api/v1/admit-requests/medicine/${selectedPatient._id}/${index}`,
                {
                    method:
                        "DELETE",
                }
            );

            fetchAdmits();
        };

    // =====================================
    // DELETE TEST
    // =====================================

    const handleDeleteTest =
        async (
            index
        ) => {

            await fetch(
                `http://127.0.0.1:3000/api/v1/admit-requests/test-request/${selectedPatient._id}/${index}`,
                {
                    method:
                        "DELETE",
                }
            );

            fetchAdmits();
        };

    // =====================================
    // DELETE VISIT
    // =====================================

    const handleDeleteVisit =
        async (
            index
        ) => {

            await fetch(
                `http://127.0.0.1:3000/api/v1/admit-requests/doctor-visit/${selectedPatient._id}/${index}`,
                {
                    method:
                        "DELETE",
                }
            );

            fetchAdmits();
        };

    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <div className="h-screen flex items-center justify-center text-4xl font-black">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f4f9ff] p-6">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="mb-10">

                    <h1 className="text-5xl font-black text-slate-800">
                        Patient Care
                    </h1>
                </div>

                {/* SEARCH */}

                <div className="bg-white rounded-[30px] p-5 mb-8 border border-blue-100">

                    <div className="relative">

                        <Search
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
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
                                    e.target
                                        .value
                                )
                            }
                            className="w-full h-14 pl-14 pr-5 rounded-2xl border border-blue-100 outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    {/* LEFT */}

                    <div className="bg-white rounded-[35px] p-8 border border-blue-100">

                        <div className="flex items-center gap-3 mb-8">

                            <Users className="text-blue-600" />

                            <h2 className="text-3xl font-black">
                                Patients
                            </h2>
                        </div>

                        <div className="space-y-5">

                            {
                                filteredPatients.map(
                                    (
                                        item
                                    ) => (

                                        <div
                                            key={
                                                item._id
                                            }
                                            onClick={() =>
                                                setSelectedPatient(
                                                    item
                                                )
                                            }
                                            className={`border rounded-[25px] p-5 cursor-pointer ${selectedPatient?._id ===
                                                item._id
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-blue-100"
                                                }`}
                                        >

                                            <h2 className="text-2xl font-black text-slate-800">
                                                {
                                                    item
                                                        ?.patient
                                                        ?.user
                                                        ?.name
                                                }
                                            </h2>

                                            <p className="text-slate-500 font-semibold mt-2">
                                                Room:
                                                {" "}
                                                {
                                                    item
                                                        ?.room
                                                        ?.roomNumber
                                                }
                                            </p>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>

                    {/* RIGHT */}

                    <div className="space-y-8">

                        {
                            selectedPatient && (
                                <>

                                    {/* MEDICINE */}

                                    <div className="bg-white rounded-[35px] p-8 border border-blue-100">

                                        <div className="flex items-center justify-between mb-8">

                                            <div className="flex items-center gap-3">

                                                <FileText className="text-blue-600" />

                                                <h2 className="text-3xl font-black">
                                                    Medicines
                                                </h2>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setMedicines([
                                                        ...medicines,

                                                        {
                                                            medicine:
                                                                "",

                                                            duration:
                                                                "",

                                                            times:
                                                                [],
                                                        },
                                                    ])
                                                }
                                                className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center"
                                            >
                                                <Plus />
                                            </button>
                                        </div>

                                        <div className="space-y-5">

                                            {
                                                medicines.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <div
                                                            key={
                                                                index
                                                            }
                                                            className="border border-blue-100 rounded-[25px] p-5"
                                                        >

                                                            <div className="grid grid-cols-2 gap-4 mb-4">

                                                                <input
                                                                    type="text"
                                                                    placeholder="Medicine"
                                                                    value={
                                                                        item.medicine
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {

                                                                        const updated =
                                                                            [...medicines];

                                                                        updated[
                                                                            index
                                                                        ].medicine =
                                                                            e.target.value;

                                                                        setMedicines(
                                                                            updated
                                                                        );
                                                                    }}
                                                                    className="h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                                                />

                                                                <input
                                                                    type="text"
                                                                    placeholder="Duration"
                                                                    value={
                                                                        item.duration
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {

                                                                        const updated =
                                                                            [...medicines];

                                                                        updated[
                                                                            index
                                                                        ].duration =
                                                                            e.target.value;

                                                                        setMedicines(
                                                                            updated
                                                                        );
                                                                    }}
                                                                    className="h-14 px-5 rounded-2xl border border-blue-100 outline-none"
                                                                />
                                                            </div>

                                                            <div className="flex flex-wrap gap-3">

                                                                {
                                                                    [
                                                                        "Morning",
                                                                        "Afternoon",
                                                                        "Evening",
                                                                        "Night",
                                                                    ].map(
                                                                        (
                                                                            time
                                                                        ) => (

                                                                            <button
                                                                                key={
                                                                                    time
                                                                                }
                                                                                onClick={() => {

                                                                                    const updated =
                                                                                        [...medicines];

                                                                                    if (
                                                                                        updated[
                                                                                            index
                                                                                        ].times.includes(
                                                                                            time
                                                                                        )
                                                                                    ) {

                                                                                        updated[
                                                                                            index
                                                                                        ].times =
                                                                                            updated[
                                                                                                index
                                                                                            ].times.filter(
                                                                                                (
                                                                                                    item
                                                                                                ) =>
                                                                                                    item !==
                                                                                                    time
                                                                                            );

                                                                                    } else {

                                                                                        updated[
                                                                                            index
                                                                                        ].times.push(
                                                                                            time
                                                                                        );
                                                                                    }

                                                                                    setMedicines(
                                                                                        updated
                                                                                    );
                                                                                }}
                                                                                className={`px-5 h-12 rounded-2xl font-bold ${item.times.includes(
                                                                                    time
                                                                                )
                                                                                    ? "bg-blue-600 text-white"
                                                                                    : "bg-blue-100 text-blue-700"
                                                                                    }`}
                                                                            >
                                                                                {
                                                                                    time
                                                                                }
                                                                            </button>
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>

                                        <button
                                            onClick={
                                                handleAddMedicine
                                            }
                                            className="mt-8 w-full h-14 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center gap-3"
                                        >
                                            <Save />

                                            Save Medicine
                                        </button>
                                    </div>
                                    <div className="mt-8 overflow-x-auto">

                                        <table className="w-full border-collapse">

                                            <thead>

                                                <tr className="bg-blue-50">

                                                    <th className="text-left p-4 text-slate-700 font-black border border-blue-100">
                                                        Medicine
                                                    </th>

                                                    <th className="text-left p-4 text-slate-700 font-black border border-blue-100">
                                                        Duration
                                                    </th>

                                                    <th className="text-left p-4 text-slate-700 font-black border border-blue-100">
                                                        Times
                                                    </th>

                                                    <th className="text-center p-4 text-slate-700 font-black border border-blue-100">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>

                                                {
                                                    selectedPatient
                                                        ?.medicines
                                                        ?.length > 0 ? (

                                                        selectedPatient
                                                            ?.medicines
                                                            ?.map(
                                                                (
                                                                    medicine,
                                                                    index
                                                                ) => (

                                                                    <tr
                                                                        key={index}
                                                                        className="hover:bg-blue-50 transition"
                                                                    >

                                                                        <td className="p-4 border border-blue-100 font-bold text-slate-800">
                                                                            {
                                                                                medicine.medicine
                                                                            }
                                                                        </td>

                                                                        <td className="p-4 border border-blue-100 text-slate-600 font-semibold">
                                                                            {
                                                                                medicine.duration
                                                                            }
                                                                        </td>

                                                                        <td className="p-4 border border-blue-100">

                                                                            <div className="flex flex-wrap gap-2">

                                                                                {
                                                                                    medicine
                                                                                        ?.times
                                                                                        ?.map(
                                                                                            (
                                                                                                time,
                                                                                                idx
                                                                                            ) => (

                                                                                                <span
                                                                                                    key={
                                                                                                        idx
                                                                                                    }
                                                                                                    className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-sm font-bold"
                                                                                                >
                                                                                                    {
                                                                                                        time
                                                                                                    }
                                                                                                </span>
                                                                                            )
                                                                                        )
                                                                                }
                                                                            </div>
                                                                        </td>

                                                                        <td className="p-4 border border-blue-100 text-center">

                                                                            <button
                                                                                onClick={() =>
                                                                                    handleDeleteMedicine(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                className="w-10 h-10 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center justify-center mx-auto"
                                                                            >
                                                                                <Trash2 size={18} />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )

                                                    ) : (

                                                        <tr>

                                                            <td
                                                                colSpan="4"
                                                                className="p-10 text-center text-slate-500 font-bold border border-blue-100"
                                                            >
                                                                No Medicines Added
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* ===================================== */
/* LAB TEST */
/* ===================================== */}

                                    <div className="bg-white rounded-[35px] p-8 border border-green-100">

                                        <div className="flex items-center justify-between mb-8">

                                            <div className="flex items-center gap-3">

                                                <FlaskConical className="text-green-600" />

                                                <h2 className="text-3xl font-black">
                                                    Lab Test
                                                </h2>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setTests([
                                                        ...tests,

                                                        {
                                                            testName: "",

                                                            price: "",

                                                            note: "",
                                                        },
                                                    ])
                                                }
                                                className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center"
                                            >
                                                <Plus />
                                            </button>
                                        </div>

                                        {/* ===================================== */}
                                        {/* NEW TEST FORM */}
                                        {/* ===================================== */}

                                        <div className="space-y-5">

                                            {
                                                tests.map(
                                                    (
                                                        item,
                                                        index
                                                    ) => (

                                                        <div
                                                            key={index}
                                                            className="border border-green-100 rounded-[25px] p-5"
                                                        >

                                                            {/* DELETE UNSAVED TEST */}

                                                            <div className="flex justify-end mb-4">

                                                                <button
                                                                    onClick={() => {

                                                                        const updated =
                                                                            [...tests];

                                                                        updated.splice(
                                                                            index,
                                                                            1
                                                                        );

                                                                        setTests(
                                                                            updated
                                                                        );
                                                                    }}
                                                                    className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                                                {/* TEST NAME */}

                                                                <select
                                                                    value={
                                                                        item.testName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {

                                                                        const selected =
                                                                            availableTests.find(
                                                                                (
                                                                                    test
                                                                                ) =>
                                                                                    test.name ===
                                                                                    e.target.value
                                                                            );

                                                                        const updated =
                                                                            [...tests];

                                                                        updated[
                                                                            index
                                                                        ].testName =
                                                                            selected?.name || "";

                                                                        updated[
                                                                            index
                                                                        ].price =
                                                                            selected?.price || "";

                                                                        setTests(
                                                                            updated
                                                                        );
                                                                    }}
                                                                    className="h-14 px-5 rounded-2xl border border-green-100 outline-none"
                                                                >

                                                                    <option value="">
                                                                        Select Test
                                                                    </option>

                                                                    {
                                                                        availableTests.map(
                                                                            (
                                                                                test,
                                                                                idx
                                                                            ) => (

                                                                                <option
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                    value={
                                                                                        test.name
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        test.name
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )
                                                                    }
                                                                </select>

                                                                {/* PRICE */}

                                                                <input
                                                                    type="number"
                                                                    value={
                                                                        item.price
                                                                    }
                                                                    readOnly
                                                                    className="h-14 px-5 rounded-2xl border border-green-100 bg-slate-100 outline-none"
                                                                />

                                                                {/* NOTE */}

                                                                <input
                                                                    type="text"
                                                                    placeholder="Note"
                                                                    value={
                                                                        item.note
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) => {

                                                                        const updated =
                                                                            [...tests];

                                                                        updated[
                                                                            index
                                                                        ].note =
                                                                            e.target.value;

                                                                        setTests(
                                                                            updated
                                                                        );
                                                                    }}
                                                                    className="h-14 px-5 rounded-2xl border border-green-100 outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>

                                        {/* SAVE BUTTON */}

                                        <button
                                            onClick={
                                                handleAddTest
                                            }
                                            className="mt-8 w-full h-14 rounded-2xl bg-green-600 text-white font-black flex items-center justify-center gap-3"
                                        >

                                            <Save />

                                            Save Lab Test
                                        </button>

                                        {/* ===================================== */}
                                        {/* SAVED TEST LIST */}
                                        {/* ===================================== */}

                                        <div className="mt-8 overflow-x-auto">

                                            <table className="w-full border-collapse">

                                                <thead>

                                                    <tr className="bg-green-50">

                                                        <th className="text-left p-4 border border-green-100 font-black text-slate-700">
                                                            Test
                                                        </th>

                                                        <th className="text-left p-4 border border-green-100 font-black text-slate-700">
                                                            Price
                                                        </th>

                                                        <th className="text-left p-4 border border-green-100 font-black text-slate-700">
                                                            Status
                                                        </th>

                                                        <th className="text-left p-4 border border-green-100 font-black text-slate-700">
                                                            Report
                                                        </th>

                                                    </tr>
                                                </thead>

                                                <tbody>

                                                    {
                                                        selectedPatient
                                                            ?.testRequests
                                                            ?.length > 0 ? (

                                                            selectedPatient
                                                                ?.testRequests
                                                                ?.map(
                                                                    (
                                                                        test,
                                                                        index
                                                                    ) => (

                                                                        <tr
                                                                            key={index}
                                                                            className="hover:bg-green-50 transition"
                                                                        >

                                                                            {/* TEST NAME */}

                                                                            <td className="p-4 border border-green-100 font-bold text-slate-800">

                                                                                {
                                                                                    test.testName
                                                                                }
                                                                            </td>

                                                                            {/* PRICE */}

                                                                            <td className="p-4 border border-green-100 font-semibold text-slate-600">

                                                                                ৳
                                                                                {
                                                                                    test.price
                                                                                }
                                                                            </td>

                                                                            {/* STATUS */}

                                                                            <td className="p-4 border border-green-100">

                                                                                <span
                                                                                    className={`px-3 py-1 rounded-xl text-sm font-black ${test.status ===
                                                                                            "Completed"
                                                                                            ? "bg-green-100 text-green-600"
                                                                                            : test.status ===
                                                                                                "Processing"
                                                                                                ? "bg-blue-100 text-blue-600"
                                                                                                : "bg-yellow-100 text-yellow-600"
                                                                                        }`}
                                                                                >

                                                                                    {
                                                                                        test.status ||
                                                                                        "Pending"
                                                                                    }
                                                                                </span>
                                                                            </td>

                                                                            {/* REPORT PDF */}

                                                                            <td className="p-4 border border-green-100">

                                                                                {
                                                                                    test.reportPdf ? (

                                                                                        <a
                                                                                            href={`http://127.0.0.1:3000${test.reportPdf}`}
                                                                                            target="_blank"
                                                                                            rel="noreferrer"
                                                                                            className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold text-sm"
                                                                                        >
                                                                                            View PDF
                                                                                        </a>

                                                                                    ) : (

                                                                                        <span className="text-slate-400 font-semibold">
                                                                                            No Report
                                                                                        </span>
                                                                                    )
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )

                                                        ) : (

                                                            <tr>

                                                                <td
                                                                    colSpan="5"
                                                                    className="p-10 text-center text-slate-500 font-bold border border-green-100"
                                                                >
                                                                    No Lab Test Added
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* ===================================== */
/* DOCTOR VISIT */
/* ===================================== */}

                                    <div className="bg-white rounded-[35px] p-8 border border-purple-100">

                                        <div className="flex items-center gap-3 mb-8">

                                            <Stethoscope className="text-purple-600" />

                                            <h2 className="text-3xl font-black">
                                                Doctor Visit
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">

                                            <select
                                                value={
                                                    doctorVisit.doctorName
                                                }
                                                onChange={(
                                                    e
                                                ) => {

                                                    const selectedDoctor =
                                                        doctors.find(
                                                            (
                                                                doc
                                                            ) =>
                                                                doc
                                                                    ?.user
                                                                    ?.name ===
                                                                e.target.value
                                                        );

                                                    setDoctorVisit(
                                                        {
                                                            doctorName:
                                                                e.target.value,

                                                            fee:
                                                                selectedDoctor?.consultationFee ||
                                                                0,

                                                            note:
                                                                "",
                                                        }
                                                    );
                                                }}
                                                className="h-14 px-5 rounded-2xl border border-purple-100 outline-none"
                                            >

                                                <option value="">
                                                    Select Doctor
                                                </option>

                                                {
                                                    doctors.map(
                                                        (
                                                            doctor
                                                        ) => (

                                                            <option
                                                                key={
                                                                    doctor._id
                                                                }
                                                                value={
                                                                    doctor
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            >
                                                                Dr.
                                                                {" "}
                                                                {
                                                                    doctor
                                                                        ?.user
                                                                        ?.name
                                                                }
                                                            </option>
                                                        )
                                                    )
                                                }
                                            </select>

                                            <input
                                                type="number"
                                                value={
                                                    doctorVisit.fee
                                                }
                                                readOnly
                                                className="h-14 px-5 rounded-2xl border border-purple-100 bg-slate-100 outline-none"
                                            />

                                            <input
                                                type="text"
                                                placeholder="Visit Note"
                                                value={
                                                    doctorVisit.note
                                                }
                                                onChange={(
                                                    e
                                                ) =>
                                                    setDoctorVisit(
                                                        {
                                                            ...doctorVisit,

                                                            note:
                                                                e.target.value,
                                                        }
                                                    )
                                                }
                                                className="h-14 px-5 rounded-2xl border border-purple-100 outline-none"
                                            />
                                        </div>

                                        <button
                                            onClick={
                                                handleAddVisit
                                            }
                                            className="w-full h-14 rounded-2xl bg-purple-600 text-white font-black flex items-center justify-center gap-3"
                                        >

                                            <Save />

                                            Save Doctor Visit
                                        </button>

                                        {/* EXISTING VISITS */}

                                        <div className="space-y-4 mt-8">

                                            {
                                                selectedPatient
                                                    ?.doctorVisits
                                                    ?.map(
                                                        (
                                                            visit,
                                                            index
                                                        ) => (

                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between border border-purple-100 rounded-2xl p-4"
                                                            >

                                                                <div>

                                                                    <h2 className="font-black text-slate-800">
                                                                        {
                                                                            visit.doctorName
                                                                        }
                                                                    </h2>

                                                                    <p className="text-slate-500">
                                                                        ৳
                                                                        {
                                                                            visit.fee
                                                                        }
                                                                    </p>
                                                                </div>

                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteVisit(
                                                                            index
                                                                        )
                                                                    }
                                                                    className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        )
                                                    )
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientCare;