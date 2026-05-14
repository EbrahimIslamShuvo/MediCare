import React from "react";

import {
  Link,
} from "react-router-dom";

const DoctorCCard = ({
  doctor,
}) => {
  return (
    <Link
      to={`/doctor/${doctor?._id}`}
      className="group block rounded-[32px] overflow-hidden relative shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* ================================= */}
      {/* IMAGE */}
      {/* ================================= */}

      <div className="relative h-[420px] overflow-hidden">
        {doctor?.image ? (
          <img
            src={`http://127.0.0.1:3000${doctor.image}`}
            alt={
              doctor?.user
                ?.name
            }
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
        ) : (
          <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-8xl font-black uppercase">
            {
              doctor?.user
                ?.name?.[0]
            }
          </div>
        )}

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* CONTENT */}

        <div className="absolute bottom-0 left-0 w-full p-7 text-white">
          {/* NAME */}

          <h2 className="text-3xl font-black mb-2 group-hover:text-blue-300 transition">
            Dr.{" "}
            {
              doctor?.user
                ?.name
            }
          </h2>

          {/* SPECIALIZATION */}

          <p className="text-lg font-semibold text-blue-200">
            {
              doctor?.specialization
            }, 
            {
              doctor?.department
            }
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCCard;