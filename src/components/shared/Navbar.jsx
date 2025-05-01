import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiClipboard,
  FiLogOut,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiUser,
  FiActivity,
  FiHeart,
  FiMessageSquare,
  FiInfo,
} from "react-icons/fi";
import { IoMdContact } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { BiMoney } from "react-icons/bi";

import logo from "../../assets/logo.png";
import { AuthContexts } from "../../providers/AuthProvider";
import { LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser, theme, toggleTheme } = useContext(AuthContexts);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const isDarkMode = true;

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User Signed Out");
        navigate("/");
      })
      .catch((err) => console.error("Sign-Out error:", err.message));
  };

  const NavItem = ({ to, children, onClick = () => {} }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative px-4 py-2 rounded-lg transition-all duration-200
        hover:bg-gray-100 hover:text-white dark:hover:bg-gray-800
        flex items-center gap-2
        ${isActive ? "text-blue-600 dark:text-blue-400 font-medium" : ""}
        after:content-[''] after:absolute after:bottom-0 after:left-0
        after:w-full after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400
        after:scale-x-0 hover:after:scale-x-100 after:transition-transform
        ${isActive ? "after:scale-x-100" : ""}`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <div className="sticky top-4 z-50 mx-2 md:mx-8 ">
      <div
        className={`rounded-xl shadow-lg transition-all duration-300 border
          ${
            theme === "light"
              ? "bg-white/90 text-gray-900 border-gray-200 "
              : "bg-gray-900/90 text-gray-100 border-gray-800"
          }`}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <nav className="px-4 py-3">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="text-xl md:text-2xl font-bold flex"
              style={{
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <img
                src={logo || "/placeholder.svg"}
                alt="Company logo"
                className="h-12 w-32 sm:h-16 sm:w-40 object-contain"
              />
              {/* Advance Healthcare */}
            </NavLink>

            <div className="hidden md:flex items-center gap-2">
              <NavItem to="/">
                <FiHome className="w-4 h-4" />
                <span>Home</span>
              </NavItem>
              <NavItem to="/doctors">
                <FiHeart className="w-4 h-4" />
                Doctors
              </NavItem>
              <NavItem to="/aboutUs" onClick={() => setIsMenuOpen(false)}>
                <FiInfo className="w-4 h-4" />
                About Us
              </NavItem>
              <NavItem to="/contactUs">
                <FiUser className="w-4 h-4" />
                Contact Us
              </NavItem>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  theme === "light"
                    ? "hover:bg-gray-100 "
                    : "hover:bg-gray-800  "
                }   transition-colors`}
              >
                {theme === "light" ? (
                  <FiMoon className="w-5 h-5" />
                ) : (
                  <FiSun className="w-5 h-5" />
                )}
              </button>

              {!user ? (
                <div className="hidden md:flex items-center gap-2 ">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 rounded-lg bg-green-900 text-white hover:bg-gray-100 hover:text-white dark:hover:bg-indigo-900 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 hover:text-white dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="relative">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL || "/placeholder.svg"}
                          alt={user.displayName || "User"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                    </div>
                    <FiChevronDown className="w-4 h-4" />
                  </button>
                  {showDropdown && (
                    <div
                      className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-lg animate-fadeIn ${
                        isDarkMode
                          ? "bg-gradient-to-b from-gray-800/90 to-gray-900/90 border border-indigo-700/40"
                          : "bg-gradient-to-b from-white/90 to-indigo-100/90 border border-indigo-200/40"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 ${
                          isDarkMode
                            ? "border-b border-indigo-700/50"
                            : "border-b border-indigo-200/50"
                        }`}
                      >
                        <p
                          className={`font-semibold text-sm ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {user?.displayName || "User"}
                        </p>
                        <p
                          className={`text-xs truncate ${
                            isDarkMode ? "text-indigo-200" : "text-indigo-600"
                          }`}
                        >
                          {user?.email}
                        </p>
                        <span className="inline-block px-2 py-0.5 mt-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white text-xs font-semibold capitalize">
                          {user?.role || "Guest"}
                        </span>
                      </div>

                      {[
                        {
                          to: "/dashboard/profile",
                          icon: <FaUserCircle />,
                          label: "Your Profile",
                        },
                        {
                          to: "/dashboard/dashboard",
                          icon: <MdOutlineDashboard />,
                          label: "Dashboard",
                        },
                        {
                          to: "/dashboard/walletHistory",
                          icon: <BiMoney />,
                          label: "Wallet History",
                        },
                      ].map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.to}
                          className={`flex items-center gap-3 py-2 px-4 transition-all duration-200 relative overflow-hidden ${
                            isDarkMode
                              ? "text-indigo-100 hover:bg-indigo-700/70 hover:text-white"
                              : "text-indigo-800 hover:bg-indigo-100 hover:text-indigo-900"
                          }`}
                        >
                          <span
                            className={`${
                              isDarkMode ? "text-indigo-300" : "text-indigo-700"
                            } transition-all duration-300`}
                          >
                            {item.icon}
                          </span>
                          <span className="relative z-10">{item.label}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent hover:from-pink-500/5 hover:to-purple-400/5 transition-all duration-200 opacity-0 hover:opacity-100"></div>
                        </NavLink>
                      ))}

                      <div
                        className={`mt-1 ${
                          isDarkMode
                            ? "border-t border-indigo-700/50"
                            : "border-t border-indigo-200/50"
                        }`}
                      >
                        <button
                          onClick={handleSignOut}
                          className={`w-full flex items-center gap-3 py-2 px-4 transition-all duration-200 relative overflow-hidden ${
                            isDarkMode
                              ? "text-red-300 hover:bg-red-900/50 hover:text-red-200"
                              : "text-red-600 hover:bg-red-100 hover:text-red-700"
                          }`}
                        >
                          <MdOutlineLogout
                            className={`${
                              isDarkMode ? "text-red-300" : "text-red-600"
                            }`}
                          />
                          <span className="relative z-10">Logout</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent hover:from-red-500/10 hover:to-red-400/5 transition-all duration-200 opacity-0 hover:opacity-100"></div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-10">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500  dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-100 hover:text-white dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )} */}
                </div>
              )}

              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 hover:text-white dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FiX className="w-5 h-5" />
                ) : (
                  <FiMenu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2">
              <div className="flex flex-col gap-1">
                <NavItem to="/" onClick={() => setIsMenuOpen(false)}>
                  <FiHome className="w-4 h-4" />
                  <span>Home</span>
                </NavItem>
                <NavItem to="/doctors" onClick={() => setIsMenuOpen(false)}>
                  <FiHeart className="w-4 h-4" />
                  Doctors
                </NavItem>
                <NavItem to="/aboutUs" onClick={() => setIsMenuOpen(false)}>
                  <FiInfo className="w-4 h-4" />
                  About Us
                </NavItem>
                <NavItem to="/contactUs">
                  <FiUser className="w-4 h-4" />
                  Contact Us
                </NavItem>
                {!user && (
                  <div className="flex flex-col gap-2 p-2">
                    <button
                      onClick={() => {
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left rounded-full hover:bg-gray-100 hover:text-white dark:hover:bg-cyan-600 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
