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

const Dashboard = () => {
  const { user, theme } = useAuth();
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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 p-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {user?.name ? (
                  user.name.charAt(0)
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user?.name || "Guest User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Patient ID: {user?.id || "12345678"}
                </p>
              </div>
            </div>
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab("overview");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                  activeTab === "overview"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Activity className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => {
                  setActiveTab("appointments");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                  activeTab === "appointments"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Calendar className="w-5 h-5" />
                Appointments
              </button>
              <button
                onClick={() => {
                  setActiveTab("records");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                  activeTab === "records"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FileText className="w-5 h-5" />
                Medical Records
              </button>
              <button
                onClick={() => {
                  setActiveTab("medications");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${
                  activeTab === "medications"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Pill className="w-5 h-5" />
                Medications
              </button>
            </nav>
          </div>
        )}

        {/* Dashboard Tabs - Desktop */}
        <div className="hidden md:flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "overview"
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            } transition-colors duration-200 flex items-center`}
          >
            <Activity className="w-4 h-4 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "appointments"
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            } transition-colors duration-200 flex items-center`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Appointments
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "records"
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            } transition-colors duration-200 flex items-center`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Medical Records
          </button>
          <button
            onClick={() => setActiveTab("medications")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "medications"
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            } transition-colors duration-200 flex items-center`}
          >
            <Pill className="w-4 h-4 mr-2" />
            Medications
          </button>
        </div>

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <div>
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3">
                    <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Find Doctor
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Search specialists
                  </p>
                  <button className="mt-auto text-blue-600 dark:text-blue-400 text-sm hover:underline">
                    Search
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                    <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Book Appointment
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Schedule a visit
                  </p>
                  <button className="mt-auto text-blue-600 dark:text-blue-400 text-sm hover:underline">
                    Book Now
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-3">
                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    AI Diagnosis
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Check symptoms
                  </p>
                  <button className="mt-auto text-blue-600 dark:text-blue-400 text-sm hover:underline">
                    Start
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-3">
                    <Ambulance className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Emergency
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Find nearby help
                  </p>
                  <button className="mt-auto text-blue-600 dark:text-blue-400 text-sm hover:underline">
                    Locate
                  </button>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Health Metrics
                </h2>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Blood Pressure
                      </h3>
                    </div>
                    {getTrendIndicator(
                      healthMetrics.bloodPressure[
                        healthMetrics.bloodPressure.length - 1
                      ].systolic,
                      healthMetrics.bloodPressure[
                        healthMetrics.bloodPressure.length - 2
                      ].systolic
                    )}
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {
                        healthMetrics.bloodPressure[
                          healthMetrics.bloodPressure.length - 1
                        ].systolic
                      }
                      /
                      {
                        healthMetrics.bloodPressure[
                          healthMetrics.bloodPressure.length - 1
                        ].diastolic
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      mmHg
                    </div>
                  </div>
                  <div className="mt-4 h-12 flex items-end">
                    {healthMetrics.bloodPressure.map((reading, index) => (
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
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 text-green-500 mr-2" />
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Heart Rate
                      </h3>
                    </div>
                    {getTrendIndicator(
                      healthMetrics.heartRate[
                        healthMetrics.heartRate.length - 1
                      ].value,
                      healthMetrics.heartRate[
                        healthMetrics.heartRate.length - 2
                      ].value
                    )}
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {
                        healthMetrics.heartRate[
                          healthMetrics.heartRate.length - 1
                        ].value
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      bpm
                    </div>
                  </div>
                  <div className="mt-4 h-12 flex items-end">
                    {healthMetrics.heartRate.map((reading, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-2 bg-green-400 dark:bg-green-500 rounded-t"
                          style={{ height: `${reading.value / 6}px` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <BarChart2 className="w-5 h-5 text-blue-500 mr-2" />
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Weight
                      </h3>
                    </div>
                    {getTrendIndicator(
                      healthMetrics.weight[healthMetrics.weight.length - 1]
                        .value,
                      healthMetrics.weight[healthMetrics.weight.length - 2]
                        .value
                    )}
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {
                        healthMetrics.weight[healthMetrics.weight.length - 1]
                          .value
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      lbs
                    </div>
                  </div>
                  <div className="mt-4 h-12 flex items-end">
                    {healthMetrics.weight.map((reading, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-2 bg-blue-400 dark:bg-blue-500 rounded-t"
                          style={{ height: `${(reading.value - 150) / 2}px` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Droplet className="w-5 h-5 text-purple-500 mr-2" />
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Blood Sugar
                      </h3>
                    </div>
                    {getTrendIndicator(
                      healthMetrics.bloodSugar[
                        healthMetrics.bloodSugar.length - 1
                      ].value,
                      healthMetrics.bloodSugar[
                        healthMetrics.bloodSugar.length - 2
                      ].value
                    )}
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {
                        healthMetrics.bloodSugar[
                          healthMetrics.bloodSugar.length - 1
                        ].value
                      }
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      mg/dL
                    </div>
                  </div>
                  <div className="mt-4 h-12 flex items-end">
                    {healthMetrics.bloodSugar.map((reading, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-2 bg-purple-400 dark:bg-purple-500 rounded-t"
                          style={{ height: `${reading.value / 8}px` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Upcoming Appointments */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {appointment.specialty}
                            </p>
                            <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{formatDate(appointment.date)}</span>
                              <span className="mx-2">•</span>
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                              {getDaysUntil(appointment.date)}
                            </span>
                            <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
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
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No upcoming appointments
                    </p>
                    <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm">
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                            ? "bg-gray-50 dark:bg-gray-700/30"
                            : "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-medium ${
                                notification.read
                                  ? "text-gray-900 dark:text-white"
                                  : "text-blue-800 dark:text-blue-300"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                notification.read
                                  ? "text-gray-600 dark:text-gray-400"
                                  : "text-blue-700 dark:text-blue-300"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
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
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No new notifications
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Medical Records */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Recent Medical Records
                </h2>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Provider
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {recentMedicalRecords.map((record) => (
                        <tr
                          key={record.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className="px-2 py-1 text-xs font-medium rounded-full capitalize
                              ${record.type === 'test' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : 
                                record.type === 'visit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : 
                                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}"
                            >
                              {record.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {record.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Health Tips"
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <div className="md:w-3/4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Health Tip of the Day
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                My Appointments
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Book New Appointment
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-700">
                  <button className="px-4 py-2 rounded-md text-sm font-medium bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400">
                    Upcoming
                  </button>
                  <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                    Past
                  </button>
                  <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
                    Cancelled
                  </button>
                </div>

                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search appointments"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
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
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400">
                              {appointment.specialty}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Date
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(appointment.date)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Time
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {appointment.time}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Type
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white capitalize">
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
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No appointments found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Medical Records
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Upload Record
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-x-auto">
                  <button className="px-4 py-2 rounded-md text-sm font-medium bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    All Records
                  </button>
                  <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 whitespace-nowrap">
                    Test Results
                  </button>
                  <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 whitespace-nowrap">
                    Visits
                  </button>
                  <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 whitespace-nowrap">
                    Prescriptions
                  </button>
                </div>

                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search records"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
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
                            className={`w-12 h-12 rounded-full flex items-center justify-center
                            ${
                              record.type === "test"
                                ? "bg-purple-100 dark:bg-purple-900/30"
                                : record.type === "visit"
                                ? "bg-blue-100 dark:bg-blue-900/30"
                                : "bg-green-100 dark:bg-green-900/30"
                            }`}
                          >
                            {record.type === "test" ? (
                              <Clipboard
                                className={`w-6 h-6 ${
                                  record.type === "test"
                                    ? "text-purple-600 dark:text-purple-400"
                                    : record.type === "visit"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-green-600 dark:text-green-400"
                                }`}
                              />
                            ) : record.type === "visit" ? (
                              <Stethoscope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <Pill className="w-6 h-6 text-green-600 dark:text-green-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {record.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {record.facility}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Date
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(record.date)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Provider
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {record.doctor}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Type
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white capitalize">
                              {record.type}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm">
                            View
                          </button>
                          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No records found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                My Medications
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Medication
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="relative w-full mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search medications"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
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
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <Pill className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {medication.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {medication.dosage}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Frequency
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {medication.frequency}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Time
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {medication.time}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Refill Date
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {formatDate(medication.refillDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm">
                            Refill
                          </button>
                          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-sm">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No medications found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Medication Reminders
                </h2>
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  Manage Reminders
                </button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                      Reminder Settings
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      You can set up medication reminders to receive
                      notifications when it's time to take your medications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Pill className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Morning Medications
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Daily at 8:00 AM
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
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                      <Pill className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Evening Medications
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Daily at 8:00 PM
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
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Weekly Medication
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Every Sunday at 10:00 AM
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
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Need help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
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
