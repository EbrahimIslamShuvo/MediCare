import React, {
  useEffect,
  useState,
} from "react";

import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Pencil,
  Save,
  X,
  Briefcase,
} from "lucide-react";

const Profile = () => {
  // =========================
  // USER
  // =========================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  // =========================
  // STATE
  // =========================

  const [admin, setAdmin] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [editing, setEditing] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",

      email: "",

      phone: "",

      address: "",

      designation:
        "System Administrator",
    });

  // =========================
  // FETCH ADMIN
  // =========================

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin =
    async () => {
      try {
        const response =
          await fetch(
            "http://127.0.0.1:3000/api/v1/admins"
          );

        const result =
          await response.json();

        if (result.success) {
          const matchedAdmin =
            result.data.find(
              (item) =>
                item.user?._id ===
                currentUser?._id
            );

          if (
            matchedAdmin
          ) {
            setAdmin(
              matchedAdmin
            );

            setFormData({
              name:
                matchedAdmin
                  ?.user
                  ?.name || "",

              email:
                matchedAdmin
                  ?.user
                  ?.email || "",

              phone:
                matchedAdmin?.phone ||
                "",

              address:
                matchedAdmin?.address ||
                "",

              designation:
                matchedAdmin?.designation ||
                "System Administrator",
            });
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // UPDATE PROFILE
  // =========================

  const handleUpdate =
    async () => {
      try {
        if (!admin?._id) {
          alert(
            "Admin ID not found"
          );

          return;
        }

        const response =
          await fetch(
            `http://127.0.0.1:3000/api/v1/admins/${admin._id}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                formData
              ),
            }
          );

        const result =
          await response.json();

        if (result.success) {
          localStorage.setItem(
            "user",

            JSON.stringify({
              ...currentUser,

              name:
                formData.name,

              email:
                formData.email,
            })
          );

          setSuccess(
            "Profile updated successfully"
          );

          setEditing(false);

          fetchAdmin();

          setTimeout(() => {
            setSuccess("");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold text-slate-600">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* SUCCESS */}

      {success && (
        <div className="mb-5 bg-green-100 text-green-700 px-4 py-3 rounded-2xl">
          {success}
        </div>
      )}

      {/* PROFILE CARD */}

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
        {/* TOP */}

        <div className="bg-gradient-to-r from-slate-900 to-slate-700 h-40 relative">
          {/* EDIT BUTTON */}

          <div className="absolute top-6 right-6 flex items-center gap-3">
            {editing ? (
              <>
                <button
                  onClick={
                    handleUpdate
                  }
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 font-semibold hover:bg-slate-100 transition"
                >
                  <Save size={18} />
                  Save
                </button>

                <button
                  onClick={() =>
                    setEditing(
                      false
                    )
                  }
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  setEditing(
                    true
                  )
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 font-semibold hover:bg-slate-100 transition"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            )}
          </div>

          {/* AVATAR */}

          <div className="absolute -bottom-16 left-10">
            <div className="w-32 h-32 rounded-full border-[6px] border-white bg-white shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white text-5xl font-bold uppercase">
                {formData?.name?.[0] ||
                  "A"}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="pt-24 px-10 pb-10">
          {/* NAME */}

          <div className="mb-10">
            {editing ? (
              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                className="text-3xl font-bold text-slate-800 border-b-2 border-slate-500 focus:outline-none"
              />
            ) : (
              <h2 className="text-3xl font-bold text-slate-800">
                {formData.name}
              </h2>
            )}

            <p className="text-slate-500 mt-2">
              {currentUser?.role ||
                "Admin"}
            </p>
          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* EMAIL */}

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="text-slate-700" />

                <h4 className="font-semibold text-slate-700">
                  Email
                </h4>
              </div>

              {editing ? (
                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              ) : (
                <p className="text-slate-600 font-medium">
                  {
                    formData.email
                  }
                </p>
              )}
            </div>

            {/* ROLE */}

            <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="text-indigo-600" />

                <h4 className="font-semibold text-indigo-700">
                  Role
                </h4>
              </div>

              <p className="text-indigo-700 font-bold">
                {currentUser?.role ||
                  "Admin"}
              </p>
            </div>

            {/* DESIGNATION */}

            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="text-emerald-600" />

                <h4 className="font-semibold text-emerald-700">
                  Designation
                </h4>
              </div>

              {editing ? (
                <input
                  type="text"
                  name="designation"
                  value={
                    formData.designation
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-emerald-700 font-bold">
                  {
                    formData.designation
                  }
                </p>
              )}
            </div>

            {/* PHONE */}

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="text-slate-700" />

                <h4 className="font-semibold text-slate-700">
                  Phone
                </h4>
              </div>

              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              ) : (
                <p className="text-slate-600 font-medium">
                  {formData.phone ||
                    "Not Added"}
                </p>
              )}
            </div>

            {/* ADDRESS */}

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="text-slate-700" />

                <h4 className="font-semibold text-slate-700">
                  Address
                </h4>
              </div>

              {editing ? (
                <textarea
                  rows="3"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
                ></textarea>
              ) : (
                <p className="text-slate-600 font-medium">
                  {formData.address ||
                    "Not Added"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;