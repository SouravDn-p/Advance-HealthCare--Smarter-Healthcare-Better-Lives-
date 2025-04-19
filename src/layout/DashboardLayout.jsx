"use client";

import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Calendar,
  Activity,
  FileText,
  Bell,
  User,
  Settings,
  Pill,
  Stethoscope,
  Ambulance,
  Brain,
  MessageSquare,
  Home,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Search,
  Sun,
  Moon,
  CreditCard,
  HelpCircle,
  Users,
  CalendarCheck,
  Droplet,
  BarChart2,
  MessageCircle,
  Megaphone,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const { user, theme, setTheme, dbUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample navigation items
  const navigationItems = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      section: "dashboard/dashboard",
    },
    {
      name: "Appointments",
      icon: <Calendar className="w-5 h-5" />,
      section: "dashboard/appointments",
    },
    {
      name: "Medical Records",
      icon: <FileText className="w-5 h-5" />,
      section: "dashboard/medical-records",
    },
    {
      name: "Medications",
      icon: <Pill className="w-5 h-5" />,
      section: "dashboard/medications",
    },
    {
      name: "AI Diagnosis",
      icon: <Brain className="w-5 h-5" />,
      section: "dashboard/AiDiagnosis",
    },
    {
      name: "Emergency Services",
      icon: <Ambulance className="w-5 h-5" />,
      section: "dashboard/emergency",
    },
    {
      name: "Find Doctors",
      icon: <Stethoscope className="w-5 h-5" />,
      section: "dashboard/doctors",
    },
    {
      name: "Health Metrics",
      icon: <Activity className="w-5 h-5" />,
      section: "dashboard/metrics",
    },
    {
      name: "Messages",
      icon: <MessageSquare className="w-5 h-5" />,
      section: "dashboard/messages",
      badge: 2,
    },
    {
      name: "Billing",
      icon: <CreditCard className="w-5 h-5" />,
      section: "dashboard/billing",
    },
  ];

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "Appointment Reminder",
      message:
        "Your appointment with Dr. Sarah Johnson is tomorrow at 10:00 AM",
      time: "1 hour ago",
      read: false,
      type: "appointment",
    },
    {
      id: 2,
      title: "Medication Reminder",
      message: "Time to take your Lisinopril medication",
      time: "3 hours ago",
      read: false,
      type: "medication",
    },
    {
      id: 3,
      title: "Test Results Available",
      message: "Your recent blood test results are now available",
      time: "Yesterday",
      read: false,
      type: "test",
    },
    {
      id: 4,
      title: "Payment Confirmation",
      message:
        "Your payment of $150 for the last appointment has been processed",
      time: "2 days ago",
      read: true,
      type: "payment",
    },
  ];

  const adminNavigationItems = [
    {
      name: "Admin Dashboard",
      icon: <Home className="w-5 h-5" />,
      section: "dashboard/admin",
    },
    {
      name: "Manage Doctors",
      icon: <Stethoscope className="w-5 h-5" />,
      section: "dashboard/manageDoctors",
    },
    {
      name: "Manage Patients",
      icon: <Users className="w-5 h-5" />,
      section: "dashboard/managePatients",
    },
    {
      name: "Manage Appointments",
      icon: <CalendarCheck className="w-5 h-5" />,
      section: "dashboard/manageAppointments",
    },
    {
      name: "Manage Blood Donors",
      icon: <Droplet className="w-5 h-5" />,
      section: "dashboard/bloodDonors",
    },
    {
      name: "Health Reports",
      icon: <BarChart2 className="w-5 h-5" />,
      section: "dashboard/healthReports",
    },
    {
      name: "Feedback & Complaints",
      icon: <MessageCircle className="w-5 h-5" />,
      section: "dashboard/feedback",
      badge: 4,
    },
    {
      name: "Announcements",
      icon: <Megaphone className="w-5 h-5" />,
      section: "dashboard/announcements",
    },
    {
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      section: "dashboard/settings",
    },
  ];

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "appointment":
        return (
          <Calendar className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        );
      case "medication":
        return <Pill className="w-5 h-5 text-green-500 dark:text-green-400" />;
      case "test":
        return (
          <FileText className="w-5 h-5 text-purple-500 dark:text-purple-400" />
        );
      case "payment":
        return (
          <CreditCard className="w-5 h-5 text-orange-500 dark:text-orange-400" />
        );
      default:
        return <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
    }
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setUnreadNotifications(0);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="ml-3">
            <img
              src="/src/assets/Logo.png?height=40&width=160"
              alt="Advance Health Service"
              className="h-8"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
          >
            <Bell className="w-6 h-6" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      <section className="flex">
        {/* Sidebar */}
        <div
          className={`fixed  inset-y-0 left-0 z-50 w-72 md:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="/src/assets/Logo.png"
                alt="Logo"
                className="h-8 w-8 mr-2"
              />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Advance Health
              </h1>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              {user?.displayName ? (
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border-2 border-pink-400 transition-all duration-300 hover:border-yellow-400"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  <User className="w-5 h-5" />
                </div>
              )}

              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.displayName || "Guest User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Patient ID: {user?.id || "12345678"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
            <nav className="space-y-1">
              {(dbUser?.role === "admin"
                ? adminNavigationItems
                : navigationItems
              ).map((item) => (
                <NavLink
                  key={item.section}
                  to={`/${item.section}`}
                  onClick={() => {
                    setActiveSection(item.section);
                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors duration-200 ${
                    activeSection === item.section
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Theme Toggle */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-5 h-5 mr-3" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-3" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              <Link
                to={`/dashboard/help`}
                className="w-full flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 mt-2"
              >
                <HelpCircle className="w-5 h-5 mr-3" />
                <span>Help & Support</span>
              </Link>
              <button className="w-full flex items-center px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 mt-2">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className=" flex flex-col overflow-y-auto h-screen w-full ">
          {/* Desktop Header */}
          <div className="hidden  lg:flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
                >
                  <Bell className="w-6 h-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            !notification.read
                              ? "bg-blue-50 dark:bg-blue-900/10"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {notification.title}
                              </p>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {notification.message}
                              </p>
                              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings */}
              <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings className="w-6 h-6" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {user?.displayName ? (
                    <img
                      src={user?.photoURL}
                      alt="Profile"
                      className="w-9 h-9 rounded-full border-2 border-pink-400 transition-all duration-300 hover:border-yellow-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      <User className="w-5 h-5" />
                    </div>
                  )}

                  <span className="hidden xl:block font-medium text-gray-900 dark:text-white">
                    {user?.displayName || "Guest User"}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user?.displayName || "Guest User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email || "guest@example.com"}
                      </p>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                        My Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                        Account Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                        Privacy & Security
                      </button>
                    </div>
                    <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full text-left px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <Outlet />
          {/* <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main> */}

          {/* <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                © {new Date().getFullYear()} Advance Health Service. All rights
                reserved.
              </div>
              <div className="flex gap-4 mt-2 md:mt-0">
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </footer> */}
        </div>
      </section>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;
