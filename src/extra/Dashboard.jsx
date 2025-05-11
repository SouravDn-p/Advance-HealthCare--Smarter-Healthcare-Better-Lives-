"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Activity,
  Heart,
  FileText,
  Bell,
  User,
  Settings,
  Pill,
  Stethoscope,
  Ambulance,
  Brain,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart2,
  Droplet,
  Clipboard,
  ArrowRight,
  Plus,
  Search,
  Menu,
  X,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import AdminDashboard from "../components/dashboard/admin/dashboard/AdminDashboard";
import DoctorDashboard from "../components/dashboard/doctors/dashboard/DoctorDashboard";
import healthTips from "../assets/logo/logo.png";
import LoadingSpinner from "./loaders/LoadingSpinner";

const Dashboard = () => {
  const { user, dbUser, isDarkMode } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "Upcoming Appointment",
      message: "Dr. Sarah Johnson, tomorrow at 10:00 AM",
      time: "1 day",
      read: false,
    },
    {
      id: 2,
      type: "medication",
      title: "Medication Reminder",
      message: "Take Lisinopril 10mg with breakfast",
      time: "2 hours",
      read: false,
    },
    {
      id: 3,
      type: "test",
      title: "Test Results Available",
      message: "Your blood work results are ready to view",
      time: "3 days",
      read: true,
    },
  ]);

  // Sample health metrics data
  const healthMetrics = {
    bloodPressure: [
      { date: "2023-01-15", systolic: 120, diastolic: 80 },
      { date: "2023-02-15", systolic: 118, diastolic: 78 },
      { date: "2023-03-15", systolic: 122, diastolic: 82 },
      { date: "2023-04-15", systolic: 124, diastolic: 84 },
      { date: "2023-05-15", systolic: 120, diastolic: 80 },
      { date: "2023-06-15", systolic: 118, diastolic: 78 },
      { date: "2023-07-15", systolic: 116, diastolic: 76 },
    ],
    heartRate: [
      { date: "2023-01-15", value: 72 },
      { date: "2023-02-15", value: 74 },
      { date: "2023-03-15", value: 70 },
      { date: "2023-04-15", value: 73 },
      { date: "2023-05-15", value: 71 },
      { date: "2023-06-15", value: 72 },
      { date: "2023-07-15", value: 70 },
    ],
    weight: [
      { date: "2023-01-15", value: 165 },
      { date: "2023-02-15", value: 164 },
      { date: "2023-03-15", value: 163 },
      { date: "2023-04-15", value: 162 },
      { date: "2023-05-15", value: 161 },
      { date: "2023-06-15", value: 160 },
      { date: "2023-07-15", value: 160 },
    ],
    bloodSugar: [
      { date: "2023-01-15", value: 95 },
      { date: "2023-02-15", value: 98 },
      { date: "2023-03-15", value: 92 },
      { date: "2023-04-15", value: 94 },
      { date: "2023-05-15", value: 90 },
      { date: "2023-06-15", value: 93 },
      { date: "2023-07-15", value: 91 },
    ],
  };

  // Sample upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2023-07-20",
      time: "10:00 AM",
      type: "in-person",
      location: "City Medical Center",
    },
    {
      id: 2,
      doctorName: "Dr. Mark Benson",
      specialty: "Neurologist",
      date: "2023-08-05",
      time: "02:30 PM",
      type: "virtual",
      location: "Video Consultation",
    },
  ];

  // Sample recent medical records
  const recentMedicalRecords = [
    {
      id: 1,
      type: "test",
      title: "Complete Blood Count (CBC)",
      date: "2023-06-12",
      doctor: "Dr. Mark Benson",
      facility: "City Medical Center Laboratory",
    },
    {
      id: 2,
      type: "visit",
      title: "Annual Physical Examination",
      date: "2023-05-10",
      doctor: "Dr. Sarah Johnson",
      facility: "City Medical Center",
    },
    {
      id: 3,
      type: "prescription",
      title: "Lisinopril Prescription",
      date: "2023-06-15",
      doctor: "Dr. Sarah Johnson",
      facility: "City Medical Center",
    },
  ];

  // Sample medications
  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      time: "Morning",
      refillDate: "2023-08-15",
    },
    {
      id: 2,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      time: "Evening",
      refillDate: "2023-08-20",
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "Morning and Evening",
      refillDate: "2023-07-30",
    },
  ];

  // Utility functions for classNames
  const getCardClasses = () =>
    `rounded-xl shadow-sm border p-4 transition-shadow duration-200 ${
      isDarkMode
        ? "bg-gray-800 border-gray-700 hover:shadow-md"
        : "bg-white border-gray-200 hover:shadow-md"
    }`;

  const getTextColor = (baseColor = "gray") =>
    isDarkMode ? `text-${baseColor}-100` : `text-${baseColor}-900`;

  const getSecondaryTextColor = () =>
    isDarkMode ? "text-gray-400" : "text-gray-600";

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get notification icon
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
      default:
        return <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
    }
  };

  // Get trend indicator
  const getTrendIndicator = (current, previous) => {
    if (current > previous) {
      return (
        <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />
      );
    } else if (current < previous) {
      return (
        <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400" />
      );
    } else {
      return (
        <Activity className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
      );
    }
  };

  // Calculate days until appointment
  const getDaysUntil = (dateString) => {
    const appointmentDate = new Date(dateString);
    const today = new Date();
    const diffTime = appointmentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
  };

  if (dbUser?.role === "admin") {
    return <AdminDashboard />;
  } else if (dbUser?.role === "doctor") {
    return <DoctorDashboard />;
  }

  if (!user || !dbUser) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Dashboard
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden rounded-xl shadow-md mb-6 p-4 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`flex items-center gap-3 mb-4 pb-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user?.name ? (
                  user.name.charAt(0)
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className={`font-medium ${getTextColor()}`}>
                  {user?.name || "Guest User"}
                </p>
                <p className={`text-xs ${getSecondaryTextColor()}`}>
                  Patient ID: {user?.id || "12345678"}
                </p>
              </div>
            </div>
            <nav className="space-y-2">
              {["overview", "appointments", "records", "medications"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                      activeTab === tab
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {tab === "overview" && <Activity className="w-5 h-5" />}
                    {tab === "appointments" && <Calendar className="w-5 h-5" />}
                    {tab === "records" && <FileText className="w-5 h-5" />}
                    {tab === "medications" && <Pill className="w-5 h-5" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                )
              )}
            </nav>
          </div>
        )}

        {/* Dashboard Tabs - Desktop */}
        <div
          className={`hidden md:flex space-x-1 p-1 rounded-lg mb-6 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          {["overview", "appointments", "records", "medications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${
                activeTab === tab
                  ? `${
                      isDarkMode
                        ? "bg-gray-700 text-blue-400"
                        : "bg-white text-blue-600"
                    } shadow-sm`
                  : `${
                      isDarkMode
                        ? "text-gray-300 hover:text-gray-100"
                        : "text-gray-600 hover:text-gray-800"
                    }`
              } transition-colors duration-200`}
            >
              {tab === "overview" && <Activity className="w-4 h-4 mr-2" />}
              {tab === "appointments" && <Calendar className="w-4 h-4 mr-2" />}
              {tab === "records" && <FileText className="w-4 h-4 mr-2" />}
              {tab === "medications" && <Pill className="w-4 h-4 mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <div>
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Stethoscope,
                  title: "Find Doctor",
                  desc: "Search specialists",
                  action: "Search",
                  bg: "blue",
                },
                {
                  icon: Calendar,
                  title: "Book Appointment",
                  desc: "Schedule a visit",
                  action: "Book Now",
                  bg: "green",
                },
                {
                  icon: Brain,
                  title: "AI Diagnosis",
                  desc: "Check symptoms",
                  action: "Start",
                  bg: "purple",
                },
                {
                  icon: Ambulance,
                  title: "Emergency",
                  desc: "Find nearby help",
                  action: "Locate",
                  bg: "red",
                },
              ].map((action, index) => (
                <div key={index} className={getCardClasses()}>
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`p-3 rounded-full mb-3 ${
                        isDarkMode
                          ? `bg-${action.bg}-900/30`
                          : `bg-${action.bg}-100`
                      }`}
                    >
                      <action.icon
                        className={`w-6 h-6 text-${action.bg}-600 dark:text-${action.bg}-400`}
                      />
                    </div>
                    <h3 className={`font-medium ${getTextColor()} mb-1`}>
                      {action.title}
                    </h3>
                    <p className={`text-xs ${getSecondaryTextColor()} mb-3`}>
                      {action.desc}
                    </p>
                    <button className="mt-auto text-blue-600 dark:text-blue-400 text-sm hover:underline">
                      {action.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Health Metrics */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${getTextColor()}`}>
                  Health Metrics
                </h2>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Blood Pressure",
                    icon: Heart,
                    color: "red",
                    data: healthMetrics.bloodPressure,
                    unit: "mmHg",
                    render: (data) =>
                      `${data[data.length - 1].systolic}/${
                        data[data.length - 1].diastolic
                      }`,
                    trend: (data) =>
                      getTrendIndicator(
                        data[data.length - 1].systolic,
                        data[data.length - 2].systolic
                      ),
                    chart: (data) =>
                      data.map((reading, index) => (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div className="w-full flex justify-center space-x-1">
                            <div
                              className="w-1 bg-red-400 dark:bg-red-500 rounded-t"
                              style={{ height: `${reading.systolic / 10}px` }}
                            ></div>
                            <div
                              className="w-1 bg-blue-400 dark:bg-blue-500 rounded-t"
                              style={{ height: `${reading.diastolic / 10}px` }}
                            ></div>
                          </div>
                        </div>
                      )),
                  },
                  {
                    title: "Heart Rate",
                    icon: Activity,
                    color: "green",
                    data: healthMetrics.heartRate,
                    unit: "bpm",
                    render: (data) => `${data[data.length - 1].value}`,
                    trend: (data) =>
                      getTrendIndicator(
                        data[data.length - 1].value,
                        data[data.length - 2].value
                      ),
                    chart: (data) =>
                      data.map((reading, index) => (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div
                            className="w-2 bg-green-400 dark:bg-green-500 rounded-t"
                            style={{ height: `${reading.value / 6}px` }}
                          ></div>
                        </div>
                      )),
                  },
                  {
                    title: "Weight",
                    icon: BarChart2,
                    color: "blue",
                    data: healthMetrics.weight,
                    unit: "lbs",
                    render: (data) => `${data[data.length - 1].value}`,
                    trend: (data) =>
                      getTrendIndicator(
                        data[data.length - 1].value,
                        data[data.length - 2].value
                      ),
                    chart: (data) =>
                      data.map((reading, index) => (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div
                            className="w-2 bg-blue-400 dark:bg-blue-500 rounded-t"
                            style={{ height: `${(reading.value - 150) / 2}px` }}
                          ></div>
                        </div>
                      )),
                  },
                  {
                    title: "Blood Sugar",
                    icon: Droplet,
                    color: "purple",
                    data: healthMetrics.bloodSugar,
                    unit: "mg/dL",
                    render: (data) => `${data[data.length - 1].value}`,
                    trend: (data) =>
                      getTrendIndicator(
                        data[data.length - 1].value,
                        data[data.length - 2].value
                      ),
                    chart: (data) =>
                      data.map((reading, index) => (
                        <div
                          key={index}
                          className="flex-1 flex flex-col items-center"
                        >
                          <div
                            className="w-2 bg-purple-400 dark:bg-purple-500 rounded-t"
                            style={{ height: `${reading.value / 8}px` }}
                          ></div>
                        </div>
                      )),
                  },
                ].map((metric, index) => (
                  <div key={index} className={getCardClasses()}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <metric.icon
                          className={`w-5 h-5 text-${metric.color}-500 mr-2`}
                        />
                        <h3 className={`font-medium ${getTextColor()}`}>
                          {metric.title}
                        </h3>
                      </div>
                      {metric.trend(metric.data)}
                    </div>
                    <div className="flex items-end gap-2">
                      <div className={`text-2xl font-bold ${getTextColor()}`}>
                        {metric.render(metric.data)}
                      </div>
                      <div
                        className={`text-sm ${getSecondaryTextColor()} mb-1`}
                      >
                        {metric.unit}
                      </div>
                    </div>
                    <div className="mt-4 h-12 flex items-end">
                      {metric.chart(metric.data)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Upcoming Appointments */}
              <div className={`lg:col-span-2 ${getCardClasses()}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-semibold ${getTextColor()}`}>
                    Upcoming Appointments
                  </h2>
                  <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className={`font-medium ${getTextColor()}`}>
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {appointment.specialty}
                            </p>
                            <div
                              className={`flex items-center mt-2 text-sm ${getSecondaryTextColor()}`}
                            >
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{formatDate(appointment.date)}</span>
                              <span className="mx-2">•</span>
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                isDarkMode
                                  ? "bg-blue-900/30 text-blue-300"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {getDaysUntil(appointment.date)}
                            </span>
                            <span
                              className={`mt-2 text-sm ${getSecondaryTextColor()}`}
                            >
                              {appointment.location}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar
                      className={`w-12 h-12 ${getSecondaryTextColor()}`}
                    />
                    <p className={getSecondaryTextColor()}>
                      No upcoming appointments
                    </p>
                    <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm">
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className={getCardClasses()}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-semibold ${getTextColor()}`}>
                    Notifications
                  </h2>
                  <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                    Mark All as Read
                  </button>
                </div>

                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg ${
                          notification.read
                            ? isDarkMode
                              ? "bg-gray-700/30"
                              : "bg-gray-50"
                            : isDarkMode
                            ? "bg-blue-900/20 border-blue-400"
                            : "bg-gray-50 border-blue-500"
                        } border-l-4`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-medium ${
                                notification.read
                                  ? getTextColor()
                                  : isDarkMode
                                  ? "text-blue-300"
                                  : "text-blue-800"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                notification.read
                                  ? getSecondaryTextColor()
                                  : isDarkMode
                                  ? "text-blue-300"
                                  : "text-blue-700"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span
                                className={`text-xs ${getSecondaryTextColor()}`}
                              >
                                {notification.time} ago
                              </span>
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className={`w-12 h-12 ${getSecondaryTextColor()}`} />
                    <p className={getSecondaryTextColor()}>
                      No new notifications
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Medical Records */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${getTextColor()}`}>
                  Recent Medical Records
                </h2>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div
                className={`rounded-xl shadow-sm border overflow-hidden ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="overflow-x-auto">
                  <table
                    className={`min-w-full divide-y ${
                      isDarkMode ? "divide-gray-700" : "divide-gray-200"
                    }`}
                  >
                    <thead
                      className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}
                    >
                      <tr>
                        {["Type", "Title", "Date", "Provider", "Action"].map(
                          (header) => (
                            <th
                              key={header}
                              scope="col"
                              className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isDarkMode ? "divide-gray-700" : "divide-gray-200"
                      } ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
                    >
                      {recentMedicalRecords.map((record) => (
                        <tr
                          key={record.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                                record.type === "test"
                                  ? isDarkMode
                                    ? "bg-purple-900/30 text-purple-400"
                                    : "bg-purple-100 text-purple-800"
                                  : record.type === "visit"
                                  ? isDarkMode
                                    ? "bg-blue-900/30 text-blue-400"
                                    : "bg-blue-100 text-blue-800"
                                  : isDarkMode
                                  ? "bg-green-900/30 text-green-400"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {record.type}
                            </span>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getTextColor()}`}
                          >
                            {record.title}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${getSecondaryTextColor()}`}
                          >
                            {formatDate(record.date)}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${getSecondaryTextColor()}`}
                          >
                            {record.doctor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                            <button className="hover:underline">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Health Tips */}
            <div
              className={`rounded-xl p-6 border ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-800"
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <img
                    src={healthTips}
                    alt="Health Tips"
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div className="md:w-3/4">
                  <h2
                    className={`text-xl font-semibold ${getTextColor()} mb-2`}
                  >
                    Health Tip of the Day
                  </h2>
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } mb-4`}
                  >
                    Regular physical activity can help reduce your risk of
                    chronic diseases, improve your balance and coordination,
                    help you lose weight, and even improve your sleep habits and
                    self-esteem.
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm">
                    Read more health tips{" "}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${getTextColor()}`}>
                My Appointments
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Book New Appointment
              </button>
            </div>

            <div className={getCardClasses()}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div
                  className={`flex space-x-1 p-1 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {["Upcoming", "Past", "Cancelled"].map((status) => (
                    <button
                      key={status}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        status === "Upcoming"
                          ? `${
                              isDarkMode
                                ? "bg-gray-600 text-blue-400"
                                : "bg-white text-blue-600"
                            } shadow-sm`
                          : `${
                              isDarkMode
                                ? "text-gray-300 hover:text-gray-100"
                                : "text-gray-600 hover:text-gray-800"
                            }`
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search appointments"
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white dark:focus:ring-blue-400 dark:focus:border-blue-400 placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900 focus:border-blue-500 placeholder-gray-500"
                    }`}
                  />
                </div>
              </div>

              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
                            }`}
                          >
                            <Stethoscope
                              className={`w-6 h-6 ${
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className={`font-medium ${getTextColor()}`}>
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {appointment.specialty}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Date
                            </p>
                            <p
                              className={`font-medium ${getTextColor()} flex items-center`}
                            >
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(appointment.date)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Time
                            </p>
                            <p
                              className={`font-medium ${getTextColor()} flex items-center`}
                            >
                              <Clock className="w-4 h-4 mr-1" />
                              {appointment.time}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Type
                            </p>
                            <p
                              className={`font-medium ${getTextColor()} capitalize`}
                            >
                              {appointment.type}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm">
                            Reschedule
                          </button>
                          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar
                    className={`w-16 h-16 ${getSecondaryTextColor()}`}
                  />
                  <h3 className={`text-lg font-medium ${getTextColor()} mb-2`}>
                    No appointments found
                  </h3>
                  <p
                    className={`max-w-md mx-auto mb-6 ${getSecondaryTextColor()}`}
                  >
                    You don't have any upcoming appointments. Book a new
                    appointment to get started.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                    Book New Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "records" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${getTextColor()}`}>
                Medical Records
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Upload Record
              </button>
            </div>

            <div className={getCardClasses()}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div
                  className={`flex space-x-1 p-1 rounded-lg overflow-x-auto ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {[
                    "All Records",
                    "Test Results",
                    "Visits",
                    "Prescriptions",
                  ].map((filter) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                        filter === "All Records"
                          ? `${
                              isDarkMode
                                ? "bg-gray-600 text-blue-400"
                                : "bg-white text-blue-600"
                            } shadow-sm`
                          : `${
                              isDarkMode
                                ? "text-gray-300 hover:text-gray-100"
                                : "text-gray-600 hover:text-gray-800"
                            }`
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search records"
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-white dark:focus:ring-blue-400 dark:focus:border-blue-400 placeholder-gray-400"
                        : "border-gray-300 bg-white text-gray-900 focus:border-blue-500 placeholder-gray-500"
                    }`}
                  />
                </div>
              </div>

              {recentMedicalRecords.length > 0 ? (
                <div className="space-y-4">
                  {recentMedicalRecords.map((record) => (
                    <div
                      key={record.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              record.type === "test"
                                ? isDarkMode
                                  ? "bg-purple-900/30"
                                  : "bg-purple-100"
                                : record.type === "visit"
                                ? isDarkMode
                                  ? "bg-blue-900/30"
                                  : "bg-blue-100"
                                : isDarkMode
                                ? "bg-green-900/30"
                                : "bg-green-100"
                            }`}
                          >
                            {record.type === "test" ? (
                              <Clipboard
                                className={`w-6 h-6 ${
                                  isDarkMode
                                    ? "text-purple-400"
                                    : "text-purple-600"
                                }`}
                              />
                            ) : record.type === "visit" ? (
                              <Stethoscope
                                className={`w-6 h-6 ${
                                  isDarkMode ? "text-blue-400" : "text-blue-600"
                                }`}
                              />
                            ) : (
                              <Pill
                                className={`w-6 h-6 ${
                                  isDarkMode
                                    ? "text-green-400"
                                    : "text-green-600"
                                }`}
                              />
                            )}
                          </div>
                          <div>
                            <h3 className={`font-medium ${getTextColor()}`}>
                              {record.title}
                            </h3>
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              {record.facility}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Date
                            </p>
                            <p
                              className={`font-medium ${getTextColor()} flex items-center`}
                            >
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(record.date)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Provider
                            </p>
                            <p className={`font-medium ${getTextColor()}`}>
                              {record.doctor}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Type
                            </p>
                            <p
                              className={`font-medium ${getTextColor()} capitalize`}
                            >
                              {record.type}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm">
                            View
                          </button>
                          <button
                            className={`px-3 py-1 rounded-lg transition-colors duration-200 text-sm ${
                              isDarkMode
                                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText
                    className={`w-16 h-16 ${getSecondaryTextColor()}`}
                  />
                  <h3 className={`text-lg font-medium ${getTextColor()} mb-2`}>
                    No records found
                  </h3>
                  <p
                    className={`max-w-md mx-auto mb-6 ${getSecondaryTextColor()}`}
                  >
                    You don't have any medical records yet. Upload a record or
                    visit a doctor to get started.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                    Upload Record
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "medications" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-semibold ${getTextColor()}`}>
                My Medications
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Medication
              </button>
            </div>

            <div className={getCardClasses()}>
              <div className="relative w-full mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search medications"
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700 text-white dark:focus:ring-blue-400 dark:focus:border-blue-400 placeholder-gray-400"
                      : "border-gray-300 bg-white text-gray-900 focus:border-blue-500 placeholder-gray-500"
                  }`}
                />
              </div>

              {medications.length > 0 ? (
                <div className="space-y-4">
                  {medications.map((medication) => (
                    <div
                      key={medication.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isDarkMode ? "bg-green-900/30" : "bg-green-100"
                            }`}
                          >
                            <Pill
                              className={`w-6 h-6 ${
                                isDarkMode ? "text-green-400" : "text-green-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h3 className={`font-medium ${getTextColor()}`}>
                              {medication.name}
                            </h3>
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              {medication.dosage}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Frequency
                            </p>
                            <p className={`font-medium ${getTextColor()}`}>
                              {medication.frequency}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Time
                            </p>
                            <p className={`font-medium ${getTextColor()}`}>
                              {medication.time}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm ${getSecondaryTextColor()}`}>
                              Refill Date
                            </p>
                            <p className={`font-medium ${getTextColor()}`}>
                              {formatDate(medication.refillDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm">
                            Refill
                          </button>
                          <button
                            className={`px-3 py-1 rounded-lg transition-colors duration-200 text-sm ${
                              isDarkMode
                                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Pill className={`w-16 h-16 ${getSecondaryTextColor()}`} />
                  <h3 className={`text-lg font-medium ${getTextColor()} mb-2`}>
                    No medications found
                  </h3>
                  <p
                    className={`max-w-md mx-auto mb-6 ${getSecondaryTextColor()}`}
                  >
                    You don't have any medications added yet. Add a medication
                    to track your prescriptions.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                    Add Medication
                  </button>
                </div>
              )}
            </div>

            {/* Medication Reminders */}
            <div className={getCardClasses()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-lg font-semibold ${getTextColor()}`}>
                  Medication Reminders
                </h2>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  Manage Reminders
                </button>
              </div>

              <div
                className={`border rounded-lg p-4 mb-4 ${
                  isDarkMode
                    ? "bg-blue-900/20 border-blue-800"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                  <div>
                    <h3
                      className={`font-medium ${
                        isDarkMode ? "text-blue-300" : "text-blue-800"
                      } mb-1`}
                    >
                      Reminder Settings
                    </h3>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-blue-300" : "text-blue-700"
                      }`}
                    >
                      You can set up medication reminders to receive
                      notifications when it's time to take your medications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Morning Medications",
                    schedule: "Daily at 8:00 AM",
                    color: "green",
                  },
                  {
                    title: "Evening Medications",
                    schedule: "Daily at 8:00 PM",
                    color: "orange",
                  },
                  {
                    title: "Weekly Medication",
                    schedule: "Every Sunday at 10:00 AM",
                    color: "purple",
                  },
                ].map((reminder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          isDarkMode
                            ? `bg-${reminder.color}-900/30`
                            : `bg-${reminder.color}-100`
                        }`}
                      >
                        <Pill
                          className={`w-5 h-5 text-${reminder.color}-600 dark:text-${reminder.color}-400`}
                        />
                      </div>
                      <div>
                        <h3 className={`font-medium ${getTextColor()}`}>
                          {reminder.title}
                        </h3>
                        <p className={`text-sm ${getSecondaryTextColor()}`}>
                          {reminder.schedule}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div
                          className={`relative w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                            isDarkMode
                              ? "bg-gray-700 peer-focus:ring-blue-800 after:border-gray-600"
                              : "bg-gray-200 peer-focus:ring-blue-300 after:border-gray-300"
                          } peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white`}
                        ></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          className={`mt-8 p-4 rounded-xl border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <AlertCircle
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getSecondaryTextColor()}`}
            />
            <div>
              <h3 className={`font-medium ${getTextColor()} mb-1`}>
                Need help?
              </h3>
              <p className={`text-sm ${getSecondaryTextColor()}`}>
                If you need assistance with your dashboard or have questions
                about your health data, please contact our support team.
              </p>
              <div className="mt-3">
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
