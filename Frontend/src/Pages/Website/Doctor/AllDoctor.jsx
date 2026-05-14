import React, {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Stethoscope,
} from "lucide-react";
import DoctorCCard from "../../../Component/DoctorCard/DoctorCCard";

const AllDoctor = () => {
  // =====================================
  // STATES
  // =====================================

  const [doctors, setDoctors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    specialization,
    setSpecialization,
  ] = useState("");

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
            "http://127.0.0.1:3000/api/v1/doctors"
          );

        const result =
          await response.json();

        if (result.success) {
          setDoctors(
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
  // UNIQUE SPECIALIZATION
  // =====================================

  const specializations =
    [
      ...new Set(
        doctors.map(
          (doctor) =>
            doctor.specialization
        )
      ),
    ];

  // =====================================
  // FILTER
  // =====================================

  const filteredDoctors =
    doctors.filter(
      (doctor) => {
        const matchSearch =
          doctor?.user?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchSpecialization =
          specialization
            ? doctor.specialization ===
              specialization
            : true;

        return (
          matchSearch &&
          matchSpecialization
        );
      }
    );

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
        {/* TOP */}
        {/* ================================= */}

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-semibold mb-5">
            <Stethoscope size={18} />

            Our Doctors
          </div>

          <h2 className="text-5xl font-black text-slate-800 mb-4">
            Find Your
            Specialist Doctor
          </h2>

          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Search doctors by
            name and filter by
            specialization to
            get the best medical
            support.
          </p>
        </div>

        {/* ================================= */}
        {/* FILTER */}
        {/* ================================= */}

        <div className="bg-white rounded-[35px] border border-blue-100 shadow-sm p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* SEARCH */}

            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search doctor by name..."
                value={search}
                onChange={(
                  e
                ) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full bg-blue-50 border border-blue-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              />
            </div>

            {/* SPECIALIZATION */}

            <select
              value={
                specialization
              }
              onChange={(
                e
              ) =>
                setSpecialization(
                  e.target.value
                )
              }
              className="w-full bg-blue-50 border border-blue-100 rounded-2xl px-4 py-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            >
              <option value="">
                All
                Specializations
              </option>

              {specializations.map(
                (
                  item,
                  index
                ) => (
                  <option
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* ================================= */}
        {/* DOCTORS */}
        {/* ================================= */}

        {filteredDoctors.length >
        0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredDoctors.map(
              (
                doctor,
                index
              ) => (
                <DoctorCCard
                  key={index}
                  doctor={
                    doctor
                  }
                />
              )
            )}
          </div>
        ) : (
          <div className="bg-white rounded-[35px] border border-blue-100 shadow-sm p-16 text-center">
            <h3 className="text-3xl font-bold text-slate-700 mb-3">
              No Doctor Found
            </h3>

            <p className="text-slate-500">
              Try another search
              or specialization.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctor;