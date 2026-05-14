import React, {
  useState,
} from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "../Component/Sidebar/Sidebar";

import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // =========================
  // USER
  // =========================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* =========================
          SIDEBAR DESKTOP
      ========================= */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* =========================
          MOBILE SIDEBAR
      ========================= */}

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* BACKDROP */}

          <div
            className="fixed inset-0 bg-black/40"
            onClick={() =>
              setSidebarOpen(false)
            }
          ></div>

          {/* SIDEBAR */}

          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="lg:ml-64">
        {/* =========================
            TOPBAR
        ========================= */}

        <header className="sticky top-0 z-40 h-16 border-b flex items-center justify-between px-4 lg:px-8 bg-white border-slate-200 backdrop-blur-xl">
          {/* LEFT */}

          <div className="flex items-center gap-3">
            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="lg:hidden p-2 rounded-lg transition hover:bg-slate-100 text-slate-700"
            >
              <Menu size={22} />
            </button>

            {/* DASHBOARD TEXT */}

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Dashboard
              </h2>

              <p className="text-xs text-slate-500">
                Welcome to
                MediCare
                Management System
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">
            {/* PROFILE */}

            <div className="flex items-center gap-3">
              {/* AVATAR */}

              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase border-2 border-blue-500">
                {user?.name?.[0] ||
                  "U"}
              </div>

              {/* USER INFO */}

              <div className="hidden sm:block">
                <h4 className="text-sm font-semibold text-slate-800">
                  {user?.name ||
                    "Unknown"}
                </h4>

                <p className="text-xs text-slate-500">
                  {user?.role ||
                    "No Role"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* =========================
            PAGE CONTENT
        ========================= */}

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;