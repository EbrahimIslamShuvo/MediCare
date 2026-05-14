import React from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  HeartPulse,
  LayoutDashboard,
  Users,
  UserRound,
  CalendarCheck,
  BedDouble,
  Pill,
  FlaskConical,
  Receipt,
  LineChart,
  Package,
  Bell,
  Ambulance,
  LogOut,
  ClipboardList,
  FileText,
  Clock3,
  Stethoscope,
  TestTube,
  FolderHeart,
  CreditCard,
  Activity,
} from "lucide-react";

const Sidebar = ({
  theme = "light",
}) => {
  const isDark =
    theme === "dark";

  const navigate =
    useNavigate();

  // =========================
  // USER FROM LOCAL STORAGE
  // =========================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );
  };

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  // =========================
  // ROLE BASED MENU
  // =========================

  const roleMenus = {
    Doctor: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard/doctor",
      },

      {
        name: "My Patients",
        icon: Users,
        path:
          "/dashboard/doctor/my-patients",
      },

      {
        name:
          "My Appointments",
        icon: CalendarCheck,
        path:
          "/dashboard/doctor/my-appointments",
      },

      {
        name:
          "My Prescription",
        icon: ClipboardList,
        path:
          "/dashboard/doctor/prescription",
      },

      {
        name:
          "My Lab Reports",
        icon: FlaskConical,
        path:
          "/dashboard/doctor/lab-reports",
      },

      {
        name: "My Schedule",
        icon: Clock3,
        path:
          "/dashboard/doctor/schedule",
      },

      {
        name: "Profile",
        icon: UserRound,
        path:
          "/dashboard/doctor/profile",
      },
    ],

    Patient: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path:
          "/dashboard/patient",
      },

      {
        name: "Doctors",
        icon: Stethoscope,
        path:
          "/dashboard/patient/doctors",
      },

      {
        name:
          "My Appointments",
        icon: CalendarCheck,
        path:
          "/dashboard/patient/appointments",
      },

      {
        name:
          "Medical Records",
        icon: FolderHeart,
        path:
          "/dashboard/patient/medical-records",
      },

      {
        name: "Lab Reports",
        icon: FlaskConical,
        path:
          "/dashboard/patient/lab-reports",
      },

      {
        name: "Prescription",
        icon: ClipboardList,
        path:
          "/dashboard/patient/prescription",
      },

      {
        name:
          "Bill & Payment",
        icon: CreditCard,
        path:
          "/dashboard/patient/payment",
      },

      {
        name:
          "Ambulance Request",
        icon: Ambulance,
        path:
          "/dashboard/patient/ambulance",
      },

      {
        name: "Profile",
        icon: UserRound,
        path:
          "/dashboard/patient/profile",
      },
    ],

    Admin: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path:
          "/dashboard/admin",
      },

      {
        name: "Staff List",
        icon: Users,
        path:
          "/dashboard/staff",
      },

      {
        name: "Patients",
        icon: HeartPulse,
        path:
          "/dashboard/patients",
      },

      {
        name: "Appointments",
        icon: CalendarCheck,
        path:
          "/dashboard/appointments",
      },

      {
        name:
          "Beds & Wards",
        icon: BedDouble,
        path:
          "/dashboard/beds",
      },

      {
        name: "Laboratory",
        icon: FlaskConical,
        path:
          "/dashboard/laboratory",
      },

      {
        name: "Billing",
        icon: Receipt,
        path:
          "/dashboard/billing",
      },

      {
        name:
          "Ambulance Request",
        icon: Ambulance,
        path:
          "/dashboard/ambulance",
      },

      {
        name: "Reports",
        icon: LineChart,
        path:
          "/dashboard/reports",
      },

      {
        name: "Profile",
        icon: UserRound,
        path:
          "/dashboard/profile",
      },
    ],

    Laboratorist: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path:
          "/dashboard/laboratorist",
      },

      {
        name:
          "Test Request",
        icon: ClipboardList,
        path:
          "/dashboard/labrotory/test-request",
      },

      {
        name:
          "Report History",
        icon: Activity,
        path:
          "/dashboard/labrotory/report-history",
      },

      {
        name: "Profile",
        icon: UserRound,
        path:
          "/dashboard/labrotory/profile",
      },
    ],

    Nurse: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path:
          "/dashboard/nurse",
      },

      {
        name:
          "Ward Management",
        icon: BedDouble,
        path:
          "/dashboard/wards",
      },

      {
        name:
          "Patient Care",
        icon: HeartPulse,
        path:
          "/dashboard/patient-care",
      },

      {
        name: "Schedule",
        icon: Clock3,
        path:
          "/dashboard/schedule",
      },

      {
        name:
          "Logs & Reports",
        icon: FileText,
        path:
          "/dashboard/logs",
      },

      {
        name: "Profile",
        icon: UserRound,
        path:
          "/dashboard/profile",
      },
    ],

    Receptionist: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        path:
          "/dashboard/receptionist",
      },

      {
        name: "Patients",
        icon: HeartPulse,
        path:
          "/dashboard/patients",
      },

      {
        name: "Doctors",
        icon: Stethoscope,
        path:
          "/dashboard/doctors",
      },

      {
        name: "Bills",
        icon: Receipt,
        path:
          "/dashboard/bills",
      },

      {
        name: "Appointments",
        icon: CalendarCheck,
        path:
          "/dashboard/appointments",
      },

      {
        name:
          "Beds & Wards",
        icon: BedDouble,
        path:
          "/dashboard/beds",
      },

      {
        name: "Ambulance",
        icon: Ambulance,
        path:
          "/dashboard/ambulance",
      },

      {
        name: "Laboratory",
        icon: FlaskConical,
        path:
          "/dashboard/lab",
      },

      {
        name: "Profile",
        icon: UserRound,
        path:
          "/dashboard/profile",
      },
    ],
  };

  // =========================
  // CURRENT USER MENU
  // =========================

  const menuItems =
    roleMenus[user?.role] || [];

  return (
    <aside
      className={`w-64 h-screen fixed top-0 left-0 flex flex-col shadow-sm z-50 transition-colors ${
        isDark
          ? "bg-[#0f172a] border-r border-[#1e293b]"
          : "bg-white border-r border-slate-200"
      }`}
    >
      {/* LOGO */}

      <NavLink to={"/"}>
        <div
        className={`h-16 flex items-center gap-3 px-6 border-b shrink-0 ${
          isDark
            ? "border-[#1e293b]"
            : "border-slate-100"
        }`}
      >
        <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          <HeartPulse
            size={20}
            strokeWidth={2.5}
          />
        </div>

        <span
          className={`text-xl font-bold tracking-tight ${
            isDark
              ? "text-white"
              : "text-slate-800"
          }`}
        >
          MediCare
          <span className="text-blue-600">
            .
          </span>
        </span>
      </div>
      </NavLink>

      {/* MENU */}

      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-1">
          {menuItems.map(
            (item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  end={
                    item.path.includes(
                      "dashboard"
                    )
                  }
                  className={({
                    isActive,
                  }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? isDark
                          ? "bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30"
                          : "bg-blue-50 text-blue-600 font-bold"
                        : isDark
                        ? "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`
                  }
                >
                  <item.icon
                    size={20}
                    className="shrink-0"
                  />

                  <span className="truncate">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* LOGOUT */}

      <div
        className={`p-4 border-t shrink-0 ${
          isDark
            ? "border-[#1e293b]"
            : "border-slate-100"
        }`}
      >
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-2.5 w-full rounded-xl font-medium transition-all duration-200 ${
            isDark
              ? "text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
              : "text-slate-500 hover:text-rose-600 hover:bg-rose-50"
          }`}
        >
          <LogOut
            size={20}
            className="shrink-0"
          />

          <span className="truncate">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;