import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Activity,
  Menu,
  X,
  Home,
  Stethoscope,
  BriefcaseMedical,
  Info,
  PhoneCall,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  // =====================================
  // USER
  // =====================================

  const user = JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

  const navigate =
    useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [
    mobileMenu,
    setMobileMenu,
  ] = useState(false);

  const [
    profileDropdown,
    setProfileDropdown,
  ] = useState(false);

  const dropdownRef =
    useRef();

  // =====================================
  // CLOSE DROPDOWN
  // =====================================

  useEffect(() => {
    const handleClickOutside =
      (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {
          setProfileDropdown(
            false
          );
        }
      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {
    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    navigate("/login");

    window.location.reload();
  };

  // =====================================
  // ROLE STYLE
  // =====================================

  const roleStyle = (
    role
  ) => {
    if (role === "Admin")
      return "bg-red-100 text-red-600";

    if (role === "Doctor")
      return "bg-blue-100 text-blue-600";

    if (role === "Patient")
      return "bg-green-100 text-green-600";

    if (
      role ===
      "Receptionist"
    )
      return "bg-purple-100 text-purple-600";

    if (role === "Nurse")
      return "bg-pink-100 text-pink-600";

    return "bg-orange-100 text-orange-600";
  };

  // =====================================
  // NAV LINKS
  // =====================================

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },

    {
      name: "Services",
      path: "/services",
      icon:
        BriefcaseMedical,
    },

    {
      name: "Doctors",
      path: "/doctor",
      icon: Stethoscope,
    },

    {
      name: "About",
      path: "/about",
      icon: Info,
    },

    {
      name: "Contact",
      path: "/contact",
      icon: PhoneCall,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ================================= */}
        {/* LOGO */}
        {/* ================================= */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md">
            <Activity
              size={24}
            />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-800">
              MediCare
            </h2>

            <p className="text-xs text-slate-500 font-medium">
              Hospital
              Management
            </p>
          </div>
        </Link>

        {/* ================================= */}
        {/* DESKTOP MENU */}
        {/* ================================= */}

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(
            (
              item,
              index
            ) => (
              <Link
                key={index}
                to={
                  item.path
                }
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition"
              >
                <item.icon
                  size={18}
                />

                {item.name}
              </Link>
            )
          )}
        </div>

        {/* ================================= */}
        {/* RIGHT SIDE */}
        {/* ================================= */}

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div
              className="relative"
              ref={
                dropdownRef
              }
            >
              {/* PROFILE BUTTON */}

              <button
                onClick={() =>
                  setProfileDropdown(
                    !profileDropdown
                  )
                }
                className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-2xl transition"
              >
                {/* IMAGE */}

                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold uppercase">
                  {user?.name?.[0]}
                </div>

                {/* INFO */}

                <div className="text-left">
                  <h4 className="font-bold text-slate-800 leading-none">
                    {
                      user?.name
                    }
                  </h4>

                  <span
                    className={`inline-block mt-2 px-2.5 py-1 rounded-full text-[10px] font-bold ${roleStyle(
                      user.role
                    )}`}
                  >
                    {
                      user.role
                    }
                  </span>
                </div>

                <ChevronDown
                  size={18}
                  className="text-slate-500"
                />
              </button>

              {/* DROPDOWN */}

              {profileDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                  {/* TOP */}

                  <div className="p-5 border-b border-slate-100 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold uppercase">
                      {
                        user?.name?.[0]
                      }
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800">
                        {
                          user?.name
                        }
                      </h4>

                      <p className="text-sm text-slate-500">
                        {
                          user?.email
                        }
                      </p>
                    </div>
                  </div>

                  {/* MENU */}

                  <div className="p-3">
                    {/* DASHBOARD */}

                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-blue-50 text-slate-700 font-semibold transition"
                      onClick={() =>
                        setProfileDropdown(
                          false
                        )
                      }
                    >
                      <LayoutDashboard
                        size={20}
                        className="text-blue-600"
                      />

                      Dashboard
                    </Link>

                    {/* LOGOUT */}

                    <button
                      onClick={
                        handleLogout
                      }
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl hover:bg-red-50 text-red-500 font-semibold transition"
                    >
                      <LogOut
                        size={20}
                      />

                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* LOGIN */}

              <Link
                to="/login"
                className="text-slate-700 hover:text-blue-600 font-semibold transition"
              >
                Login
              </Link>

              {/* REGISTER */}

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-semibold transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* ================================= */}
        {/* MOBILE BUTTON */}
        {/* ================================= */}

        <button
          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }
          className="lg:hidden bg-blue-50 p-2.5 rounded-xl text-blue-600"
        >
          {mobileMenu ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* ================================= */}
      {/* MOBILE MENU */}
      {/* ================================= */}

      {mobileMenu && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-6">
          {/* LINKS */}

          <div className="flex flex-col gap-5">
            {navLinks.map(
              (
                item,
                index
              ) => (
                <Link
                  key={index}
                  to={
                    item.path
                  }
                  className="flex items-center gap-3 text-slate-700 hover:text-blue-600 font-semibold transition"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >
                  <item.icon
                    size={20}
                  />

                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* USER */}

          <div className="mt-8">
            {user ? (
              <div className="space-y-4">
                {/* USER CARD */}

                <div className="bg-blue-50 rounded-3xl p-5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold uppercase">
                    {
                      user?.name?.[0]
                    }
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800">
                      {
                        user?.name
                      }
                    </h4>

                    <p className="text-sm text-slate-500">
                      {
                        user?.email
                      }
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${roleStyle(
                        user.role
                      )}`}
                    >
                      {
                        user.role
                      }
                    </span>
                  </div>
                </div>

                {/* DASHBOARD */}

                <Link
                  to="/dashboard"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-center font-semibold transition"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >
                  Dashboard
                </Link>

                {/* LOGOUT */}

                <button
                  onClick={
                    handleLogout
                  }
                  className="w-full border border-red-200 text-red-500 hover:bg-red-50 py-3 rounded-2xl font-semibold transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* LOGIN */}

                <Link
                  to="/login"
                  className="w-full border border-slate-200 text-slate-700 py-3 rounded-2xl text-center font-semibold"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >
                  Login
                </Link>

                {/* REGISTER */}

                <Link
                  to="/register"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-center font-semibold transition"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;