import React, {
  useEffect,
  useState,
} from "react";

import {
  Mail,
  Phone,
  Stethoscope,
  Building2,
  GraduationCap,
  BadgeDollarSign,
  Pencil,
  Save,
  Camera,
  Clock3,
  CalendarDays,
  Plus,
} from "lucide-react";

const DoctorProfile = () => {
  // =====================================
  // USER
  // =====================================

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      ) || "{}"
    );

  // =====================================
  // STATES
  // =====================================

  const [doctor, setDoctor] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [editing, setEditing] =
    useState(false);

  const [imagePreview, setImagePreview] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      department: "",
      experience: "",
      consultationFee: "",
      startTime: "",
      endTime: "",
      availableDays: [],
      qualifications: [
        {
          degree: "",
          institute: "",
          country: "",
        },
      ],
      bio: "",
      status:
        "Available",
      image: null,
    });

  // =====================================
  // DAYS
  // =====================================

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  // =====================================
  // SPECIALIZATION
  // =====================================

  const specializationDepartments =
    {
      Cardiologist: [
        "Cardiology",
        "Heart Institute",
        "ICU",
      ],

      Neurologist: [
        "Neurology",
        "Neuro Surgery",
      ],

      Dermatologist: [
        "Dermatology",
        "Skin Care",
      ],

      Orthopedic: [
        "Orthopedics",
        "Bone & Joint",
      ],

      Gynecologist: [
        "Gynecology",
        "Maternity",
      ],

      Pediatrician: [
        "Pediatrics",
        "Child Care",
      ],
    };

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
            "http://127.0.0.1:3000/api/v1/doctors"
          );

        const result =
          await response.json();

        if (result.success) {
          const myDoctor =
            result.data.find(
              (item) =>
                String(
                  item?.user
                    ?._id
                ) ===
                String(
                  currentUser?._id
                )
            );

          if (myDoctor) {
            setDoctor(myDoctor);

            setFormData({
              name:
                myDoctor.user
                  ?.name || "",

              email:
                myDoctor.user
                  ?.email || "",

              phone:
                myDoctor.phone ||
                "",

              specialization:
                myDoctor.specialization ||
                "",

              department:
                myDoctor.department ||
                "",

              experience:
                myDoctor.experience ||
                "",

              consultationFee:
                myDoctor.consultationFee ||
                "",

              startTime:
                myDoctor.startTime ||
                "",

              endTime:
                myDoctor.endTime ||
                "",

              availableDays:
                myDoctor.availableDays ||
                [],

              qualifications:
                myDoctor
                  ?.qualification
                  ?.length > 0
                  ? myDoctor.qualification
                  : [
                      {
                        degree:
                          "",
                        institute:
                          "",
                        country:
                          "",
                      },
                    ],

              bio:
                myDoctor.bio ||
                "",

              status:
                myDoctor.status ||
                "Available",

              image: null,
            });

            if (
              myDoctor.image
            ) {
              setImagePreview(
                `http://127.0.0.1:3000${myDoctor.image}`
              );
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // =====================================
  // DAY SELECT
  // =====================================

  const handleDaySelect =
    (day) => {
      if (
        formData.availableDays.includes(
          day
        )
      ) {
        setFormData({
          ...formData,

          availableDays:
            formData.availableDays.filter(
              (d) =>
                d !== day
            ),
        });
      } else {
        setFormData({
          ...formData,

          availableDays: [
            ...formData.availableDays,
            day,
          ],
        });
      }
    };

  // =====================================
  // QUALIFICATION CHANGE
  // =====================================

  const handleQualificationChange =
    (
      index,
      field,
      value
    ) => {
      const updated =
        [
          ...formData.qualifications,
        ];

      updated[index][field] =
        value;

      setFormData({
        ...formData,

        qualifications:
          updated,
      });
    };

  // =====================================
  // ADD QUALIFICATION
  // =====================================

  const addQualification =
    () => {
      setFormData({
        ...formData,

        qualifications: [
          ...formData.qualifications,

          {
            degree: "",
            institute:
              "",
            country: "",
          },
        ],
      });
    };

  // =====================================
  // IMAGE
  // =====================================

  const handleImage =
    (e) => {
      const file =
        e.target.files[0];

      if (file) {
        setImagePreview(
          URL.createObjectURL(
            file
          )
        );

        setFormData({
          ...formData,

          image: file,
        });
      }
    };

  // =====================================
  // TIME FORMAT
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
  // UPDATE
  // =====================================

  const handleUpdate =
    async () => {
      try {

        if (
          !doctor?._id
        ) {
          return;
        }

        const doctorData =
          new FormData();

        Object.keys(
          formData
        ).forEach((key) => {
          if (
            key !==
              "image" &&
            key !==
              "qualifications" &&
            key !==
              "availableDays"
          ) {
            doctorData.append(
              key,
              formData[key]
            );
          }
        });

        doctorData.append(
          "availableDays",

          JSON.stringify(
            formData.availableDays
          )
        );

        doctorData.append(
          "qualification",

          JSON.stringify(
            formData.qualifications
          )
        );

        if (
          formData.image
        ) {
          doctorData.append(
            "image",
            formData.image
          );
        }

        const response =
          await fetch(
            `http://127.0.0.1:3000/api/v1/doctors/${doctor._id}`,
            {
              method: "PATCH",

              body: doctorData,
            }
          );

        const result =
          await response.json();

        if (result.success) {
          setEditing(false);

          fetchDoctor();
        }
      } catch (error) {
        console.log(error);
      }
    };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================================= */}
        {/* PART-1 */}
        {/* ================================= */}

        <div className="bg-white rounded-[35px] border border-blue-100 p-10 shadow-sm flex flex-col items-center text-center relative">

          {/* EDIT */}

          <button
            onClick={() =>
              editing
                ? handleUpdate()
                : setEditing(
                    true
                  )
            }
            className="absolute top-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 font-semibold"
          >
            {editing ? (
              <>
                <Save size={18} />
                Save
              </>
            ) : (
              <>
                <Pencil size={18} />
                Edit
              </>
            )}
          </button>

          {/* PROFILE */}

          <div className="w-36 h-36 rounded-full bg-blue-600 text-white flex items-center justify-center text-6xl font-bold overflow-hidden">
            {imagePreview ? (
              <img
                src={
                  imagePreview ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="doctor"
                className="w-full h-full object-cover"
              />
            ) : (
              formData?.name?.[0]
            )}
          </div>

          {/* NAME */}

          <h2 className="text-4xl font-bold text-slate-800 mt-6">
            {formData.name}
          </h2>

          {/* ROLE */}

          <p className="text-blue-600 font-semibold text-lg mt-2">
            Doctor
          </p>
        </div>

        {/* ================================= */}
        {/* PART-2 */}
        {/* ================================= */}

        <div className="bg-white rounded-[35px] border border-blue-100 p-8 shadow-sm">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <InfoCard
              icon={
                <Mail />
              }
              title="Email"
            >
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
                  className="input"
                />
              ) : (
                <p>
                  {
                    formData.email
                  }
                </p>
              )}
            </InfoCard>

            <InfoCard
              icon={
                <Phone />
              }
              title="Phone"
            >
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
                  className="input"
                />
              ) : (
                <p>
                  {
                    formData.phone
                  }
                </p>
              )}
            </InfoCard>

            <InfoCard
              icon={
                <Stethoscope />
              }
              title="Specialization"
            >
              {editing ? (
                <select
                  name="specialization"
                  value={
                    formData.specialization
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                >
                  <option value="">
                    Select
                  </option>

                  {Object.keys(
                    specializationDepartments
                  ).map(
                    (spec) => (
                      <option
                        key={spec}
                        value={spec}
                      >
                        {spec}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <p>
                  {
                    formData.specialization
                  }
                </p>
              )}
            </InfoCard>

            <InfoCard
              icon={
                <Building2 />
              }
              title="Department"
            >
              {editing ? (
                <select
                  name="department"
                  value={
                    formData.department
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                >
                  <option value="">
                    Select
                  </option>

                  {(
                    specializationDepartments[
                      formData
                        .specialization
                    ] || []
                  ).map((dept) => (
                    <option
                      key={dept}
                      value={dept}
                    >
                      {dept}
                    </option>
                  ))}
                </select>
              ) : (
                <p>
                  {
                    formData.department
                  }
                </p>
              )}
            </InfoCard>

            <InfoCard
              icon={
                <GraduationCap />
              }
              title="Experience"
            >
              {editing ? (
                <input
                  type="number"
                  name="experience"
                  value={
                    formData.experience
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                />
              ) : (
                <p>
                  {
                    formData.experience
                  }{" "}
                  Years
                </p>
              )}
            </InfoCard>

            <InfoCard
              icon={
                <BadgeDollarSign />
              }
              title="Consultation Fee"
            >
              {editing ? (
                <input
                  type="number"
                  name="consultationFee"
                  value={
                    formData.consultationFee
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                />
              ) : (
                <p>
                  ৳{" "}
                  {
                    formData.consultationFee
                  }
                </p>
              )}
            </InfoCard>

            <InfoCard
              icon={
                <Clock3 />
              }
              title="Consultation Time"
            >
              {editing ? (
                <div className="flex gap-3">
                  <input
                    type="time"
                    name="startTime"
                    value={
                      formData.startTime
                    }
                    onChange={
                      handleChange
                    }
                    className="input"
                  />

                  <input
                    type="time"
                    name="endTime"
                    value={
                      formData.endTime
                    }
                    onChange={
                      handleChange
                    }
                    className="input"
                  />
                </div>
              ) : (
                <p>
                  {formatTime(
                    formData.startTime
                  )}{" "}
                  -{" "}
                  {formatTime(
                    formData.endTime
                  )}
                </p>
              )}
            </InfoCard>

            <InfoCard
              icon={
                <CalendarDays />
              }
              title="Status"
            >
              {editing ? (
                <select
                  name="status"
                  value={
                    formData.status
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="On Leave">
                    On Leave
                  </option>

                  <option value="Not Available">
                    Not
                    Available
                  </option>
                </select>
              ) : (
                <p>
                  {
                    formData.status
                  }
                </p>
              )}
            </InfoCard>

          </div>
        </div>

        {/* AVAILABLE DAYS */}

        <div className="bg-white rounded-[35px] border border-blue-100 p-8 shadow-sm">

          <h3 className="text-2xl font-bold mb-6">
            Available Days
          </h3>

          <div className="flex flex-wrap gap-3">
            {days.map(
              (day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    editing &&
                    handleDaySelect(
                      day
                    )
                  }
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    formData.availableDays.includes(
                      day
                    )
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-blue-200 text-slate-700"
                  }`}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>

        {/* IMAGE + BIO */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* IMAGE */}

          <div className="bg-white rounded-[35px] border border-blue-100 p-8 shadow-sm">

            <h3 className="text-2xl font-bold mb-6">
              Doctor Image
            </h3>

            <div className="w-full h-[350px] rounded-[30px] overflow-hidden bg-blue-50 border border-blue-100">
              {imagePreview ? (
                <img
                  src={
                    imagePreview ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="doctor-card"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-blue-600 text-5xl font-bold">
                  {
                    formData
                      ?.name?.[0]
                  }
                </div>
              )}
            </div>

            {editing && (
              <label className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl cursor-pointer font-medium">

                <Camera size={18} />

                Upload Image

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImage
                  }
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* BIO */}

          <div className="bg-white rounded-[35px] border border-blue-100 p-8 shadow-sm">

            <h3 className="text-2xl font-bold mb-6">
              Biography
            </h3>

            {editing ? (
              <textarea
                rows="15"
                name="bio"
                value={
                  formData.bio
                }
                onChange={
                  handleChange
                }
                className="w-full h-[350px] border border-blue-200 rounded-3xl p-5"
              ></textarea>
            ) : (
              <p className="text-slate-600 leading-relaxed">
                {formData.bio ||
                  "No biography added"}
              </p>
            )}
          </div>
        </div>

        {/* QUALIFICATIONS */}

        <div className="bg-white rounded-[35px] border border-blue-100 p-8 shadow-sm">

          <div className="flex items-center justify-between mb-6">

            <h3 className="text-2xl font-bold">
              Qualification
              List
            </h3>

            {editing && (
              <button
                type="button"
                onClick={
                  addQualification
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
              >
                <Plus size={18} />

                Add More
              </button>
            )}
          </div>

          <div className="space-y-6">

            {formData.qualifications.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-3xl p-6 border border-blue-100"
                >

                  <h4 className="text-blue-700 font-bold text-lg mb-5">
                    Qualification{" "}
                    {index + 1}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <QualificationInput
                      label="Degree"
                      value={
                        item.degree
                      }
                      editing={
                        editing
                      }
                      onChange={(
                        e
                      ) =>
                        handleQualificationChange(
                          index,
                          "degree",
                          e
                            .target
                            .value
                        )
                      }
                    />

                    <QualificationInput
                      label="Institute"
                      value={
                        item.institute
                      }
                      editing={
                        editing
                      }
                      onChange={(
                        e
                      ) =>
                        handleQualificationChange(
                          index,
                          "institute",
                          e
                            .target
                            .value
                        )
                      }
                    />

                    <QualificationInput
                      label="Country"
                      value={
                        item.country
                      }
                      editing={
                        editing
                      }
                      onChange={(
                        e
                      ) =>
                        handleQualificationChange(
                          index,
                          "country",
                          e
                            .target
                            .value
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================
// INFO CARD
// =====================================

const InfoCard = ({
  icon,
  title,
  children,
}) => {
  return (
    <div className="bg-blue-50 rounded-3xl p-5 border border-blue-100">

      <div className="flex items-center gap-3 mb-3 text-blue-600">
        {icon}

        <h4 className="font-semibold">
          {title}
        </h4>
      </div>

      {children}
    </div>
  );
};

// =====================================
// QUALIFICATION INPUT
// =====================================

const QualificationInput =
  ({
    label,
    value,
    editing,
    onChange,
  }) => {
    return (
      <div>
        <label className="text-sm font-semibold text-slate-600 block mb-2">
          {label}
        </label>

        {editing ? (
          <input
            type="text"
            value={value}
            onChange={
              onChange
            }
            className="w-full border border-blue-200 rounded-xl px-4 py-3"
          />
        ) : (
          <p className="text-slate-700 font-medium">
            {value || "N/A"}
          </p>
        )}
      </div>
    );
  };

export default DoctorProfile;