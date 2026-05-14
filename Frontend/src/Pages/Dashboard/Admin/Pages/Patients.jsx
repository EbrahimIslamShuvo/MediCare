import React, {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Users,
  Phone,
  MapPin,
  ShieldAlert,
  Mail,
  Droplets,
  UserRound,
  Calendar,
} from "lucide-react";

const Patients = () => {
  // =========================
  // STATE
  // =========================

  const [patients, setPatients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // =========================
  // FETCH PATIENTS
  // =========================

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients =
    async () => {
      try {
        const response =
          await fetch(
            "http://127.0.0.1:3000/api/v1/patients"
          );

        const result =
          await response.json();

        if (result.success) {
          setPatients(
            result.data
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // FILTER
  // =========================

  const filteredPatients =
    patients.filter(
      (patient) => {
        return (
          patient?.user?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          patient?.user?.email
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          patient?.phone
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );
      }
    );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold text-blue-700">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      {/* HEADER */}

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-blue-700">
          Patients
        </h2>

        <p className="text-slate-500 mt-1">
          Manage all hospital
          patients
        </p>
      </div>

      {/* SEARCH */}

      <div className="bg-white border border-blue-100 rounded-3xl p-5 mb-6 shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute top-1/2 -translate-y-1/2 left-4 text-blue-400"
          />

          <input
            type="text"
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white border border-blue-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50 border-b border-blue-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                  Patient
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                  Gender
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                  Blood
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                  Age
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                  Address
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-blue-700">
                  Emergency Contact
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map(
                (patient) => (
                  <tr
                    key={
                      patient._id
                    }
                    className="border-b border-blue-50 hover:bg-blue-50 transition"
                  >
                    {/* NAME */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg uppercase shadow">
                          {patient?.user?.name?.[0]}
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-800">
                            {
                              patient
                                ?.user
                                ?.name
                            }
                          </h4>

                          <p className="text-sm text-slate-500">
                            Role:
                            {
                              patient
                                ?.user
                                ?.role
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        {
                          patient
                            ?.user
                            ?.email
                        }
                      </div>
                    </td>

                    {/* PHONE */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        {patient.phone ||
                          "N/A"}
                      </div>
                    </td>

                    {/* GENDER */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        {patient.gender ||
                          "N/A"}
                      </div>
                    </td>

                    {/* BLOOD */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-red-600 font-bold">
                        {patient.bloodGroup ||
                          "N/A"}
                      </div>
                    </td>

                    {/* AGE */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        {patient.age ||
                          "N/A"}
                      </div>
                    </td>

                    {/* ADDRESS */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        {patient.address ||
                          "N/A"}
                      </div>
                    </td>

                    {/* EMERGENCY */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-red-600 font-medium">
                        {patient.emergencyContact ||
                          "N/A"}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}

        {filteredPatients.length ===
          0 && (
          <div className="py-16 text-center">
            <Users
              size={50}
              className="mx-auto text-blue-300 mb-4"
            />

            <h3 className="text-xl font-bold text-blue-700">
              No Patient Found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;