import { useState, useEffect, useContext } from "react";
import {
  FaUserMd,
  FaCalendarCheck,
  FaUserInjured,
  FaAmbulance,
  FaHeartbeat,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AuthContexts } from "../../../../providers/AuthProvider";

// Mock data for charts and tables
const appointmentData = [
  { name: "Jan", count: 65 },
  { name: "Feb", count: 59 },
  { name: "Mar", count: 80 },
  { name: "Apr", count: 81 },
  { name: "May", count: 56 },
  { name: "Jun", count: 55 },
  { name: "Jul", count: 40 },
];

const bloodDonationData = [
  { name: "A+", value: 400 },
  { name: "B+", value: 300 },
  { name: "O+", value: 500 },
  { name: "AB+", value: 200 },
  { name: "A-", value: 150 },
  { name: "B-", value: 100 },
  { name: "O-", value: 120 },
  { name: "AB-", value: 80 },
];

const recentAppointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Smith",
    department: "Cardiology",
    date: "2023-05-04",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Johnson",
    department: "Neurology",
    date: "2023-05-04",
    status: "Scheduled",
  },
  {
    id: 3,
    patient: "Robert Brown",
    doctor: "Dr. Williams",
    department: "Orthopedics",
    date: "2023-05-05",
    status: "Cancelled",
  },
  {
    id: 4,
    patient: "Emily Davis",
    doctor: "Dr. Miller",
    department: "Pediatrics",
    date: "2023-05-05",
    status: "Scheduled",
  },
  {
    id: 5,
    patient: "Michael Wilson",
    doctor: "Dr. Taylor",
    department: "Dermatology",
    date: "2023-05-06",
    status: "Scheduled",
  },
];

const ambulanceStatus = [
  {
    id: "AMB-001",
    driver: "Mark Johnson",
    status: "Available",
    location: "Hospital Parking",
  },
  {
    id: "AMB-002",
    driver: "Sarah Williams",
    status: "On Call",
    location: "Downtown, Main St.",
  },
  {
    id: "AMB-003",
    driver: "David Brown",
    status: "Maintenance",
    location: "Service Center",
  },
  {
    id: "AMB-004",
    driver: "Lisa Davis",
    status: "Available",
    location: "Hospital Parking",
  },
];

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
];

const AdminDashboard = () => {
  const { theme, setTheme } = useContext(AuthContexts);

  const [stats, setStats] = useState({
    appointments: 0,
    doctors: 0,
    patients: 0,
    ambulances: 0,
    bloodDonations: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        appointments: 1248,
        doctors: 36,
        patients: 5429,
        ambulances: 8,
        bloodDonations: 1850,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Admin Dashboard
            </h1>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === "dark"
                  ? "bg-indigo-700 text-yellow-400 hover:bg-indigo-600"
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              } hover:scale-110`}
            >
              {theme === "dark" ? (
                <FaHeartbeat className="w-6 h-6" />
              ) : (
                <FaHeartbeat className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Appointments",
                value: stats.appointments,
                icon: <FaCalendarCheck className="text-3xl" />,
                gradient: "from-blue-500 to-indigo-600",
                desc: "↗︎ 14% from last month",
              },
              {
                title: "Doctors",
                value: stats.doctors,
                icon: <FaUserMd className="text-3xl" />,
                gradient: "from-teal-500 to-cyan-600",
                desc: "↗︎ 2 new this month",
              },
              {
                title: "Patients",
                value: stats.patients,
                icon: <FaUserInjured className="text-3xl" />,
                gradient: "from-purple-500 to-pink-600",
                desc: "↗︎ 7% from last month",
              },
              {
                title: "Ambulances",
                value: stats.ambulances,
                icon: <FaAmbulance className="text-3xl" />,
                gradient: "from-red-500 to-orange-600",
                desc: "↘︎ 1 in maintenance",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  theme === "dark" ? "bg-gray-800/80" : "bg-white/90"
                } backdrop-blur-md border border-opacity-20 ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-20`}
                ></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-75">
                      {stat.title}
                    </p>
                    <p
                      className={`text-3xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient}`}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs opacity-60 mt-1">{stat.desc}</p>
                  </div>
                  <div
                    className={`p-3 rounded-full ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div
              className={`card p-6 rounded-xl shadow-lg transition-all duration-300 ${
                theme === "dark" ? "bg-gray-800/80" : "bg-white/90"
              } backdrop-blur-md border border-opacity-20 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Appointment Trends
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={appointmentData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme === "dark" ? "#4B5563" : "#E5E7EB"}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    />
                    <YAxis stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                          theme === "dark" ? "#1F2937" : "#FFFFFF",
                        borderColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
                        color: theme === "dark" ? "#D1D5DB" : "#374151",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#7C3AED"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div
              className={`card p-6 rounded-xl shadow-lg transition-all duration-300 ${
                theme === "dark" ? "bg-gray-800/80" : "bg-white/90"
              } backdrop-blur-md border border-opacity-20 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Blood Donation by Type
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={bloodDonationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      dataKey="value"
                    >
                      {bloodDonationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                          theme === "dark" ? "#1F2937" : "#FFFFFF",
                        borderColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
                        color: theme === "dark" ? "#D1D5DB" : "#374151",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div
            className={`card p-6 rounded-xl shadow-lg mb-8 transition-all duration-300 ${
              theme === "dark" ? "bg-gray-800/80" : "bg-white/90"
            } backdrop-blur-md border border-opacity-20 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Recent Appointments
              </h2>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-indigo-700 text-white hover:bg-indigo-600"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className={`transition-all duration-200 ${
                        theme === "dark"
                          ? "hover:bg-gray-700/50"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <td>#{appointment.id}</td>
                      <td>{appointment.patient}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.department}</td>
                      <td>{appointment.date}</td>
                      <td>
                        <div
                          className={`badge font-medium px-3 py-1 rounded-full ${
                            appointment.status === "Completed"
                              ? "bg-green-500/20 text-green-400 border border-green-500/40"
                              : appointment.status === "Scheduled"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                              : "bg-red-500/20 text-red-400 border border-red-500/40"
                          }`}
                        >
                          {appointment.status}
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className={`btn btn-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                              theme === "dark"
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            View
                          </button>
                          <button
                            className={`btn btn-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                              theme === "dark"
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className={`card p-6 rounded-xl shadow-lg mb-8 transition-all duration-300 ${
              theme === "dark" ? "bg-gray-800/80" : "bg-white/90"
            } backdrop-blur-md border border-opacity-20 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Ambulance Status
              </h2>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-indigo-700 text-white hover:bg-indigo-600"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                Dispatch
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }
                  >
                    <th>ID</th>
                    <th>Driver</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ambulanceStatus.map((ambulance) => (
                    <tr
                      key={ambulance.id}
                      className={`transition-all duration-200 ${
                        theme === "dark"
                          ? "hover:bg-gray-700/50"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <td>{ambulance.id}</td>
                      <td>{ambulance.driver}</td>
                      <td>
                        <div
                          className={`badge font-medium px-3 py-1 rounded-full ${
                            ambulance.status === "Available"
                              ? "bg-green-500/20 text-green-400 border border-green-500/40"
                              : ambulance.status === "On Call"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                              : "bg-red-500/20 text-red-400 border border-red-500/40"
                          }`}
                        >
                          {ambulance.status}
                        </div>
                      </td>
                      <td>{ambulance.location}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className={`btn btn-xs font-medium rounded-full px-4 py-1 transition-all duration-200 hover:scale-105 ${
                              theme === "dark"
                                ? "bg-indigo-700 text-white hover:bg-indigo-600"
                                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                            }`}
                          >
                            Track
                          </button>
                          <button
                            className={`btn btn-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${
                              theme === "dark"
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              className={`card p-6 rounded-xl shadow-lg transition-all duration-300 ${
                theme === "dark" ? "bg-gray-800/80" : "bg-white/90"
              } backdrop-blur-md border border-opacity-20 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Blood Inventory
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bloodDonationData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme === "dark" ? "#4B5563" : "#E5E7EB"}
                    />
                    <XAxis
                      dataKey="name"
                      stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"}
                    />
                    <YAxis stroke={theme === "dark" ? "#9CA3AF" : "#6B7280"} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                          theme === "dark" ? "#1F2937" : "#FFFFFF",
                        borderColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
                        color: theme === "dark" ? "#D1D5DB" : "#374151",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="value"
                      fill="#7C3AED"
                      name="Units Available"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-6">
                <div
                  className={`stats p-4 rounded-lg shadow-md transition-all duration-300 ${
                    theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
                  }`}
                >
                  <div className="stat">
                    <p className="text-sm font-medium opacity-75">
                      Total Donations
                    </p>
                    <p
                      className={`text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500`}
                    >
                      {stats.bloodDonations}
                    </p>
                    <p className="text-xs opacity-60 mt-1">
                      ↗︎ 12% from last month
                    </p>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-indigo-700 text-white hover:bg-indigo-600"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  }`}
                >
                  Schedule Donation Drive
                </button>
              </div>
            </div>
            <div
              className={`card p-6 rounded-xl shadow-lg transition-all duration-300 ${
                theme === "dark" ? "bg-gray-800/80" : "bg-white/90"
              } backdrop-blur-md border border-opacity-20 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Critical Alerts
              </h2>
              <div
                className={`alert p-4 rounded-lg mb-4 shadow-lg transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-yellow-500/10 border border-yellow-500/40 text-yellow-300"
                    : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                }`}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Low inventory for O- blood type (Critical)</span>
                </div>
              </div>
              <div
                className={`alert p-4 rounded-lg mb-4 shadow-lg transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-blue-500/10 border border-blue-500/40 text-blue-300"
                    : "bg-blue-50 border border-blue-200 text-blue-700"
                }`}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current flex-shrink-0 w-6 h-6 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Ambulance AMB-003 scheduled for maintenance tomorrow
                  </span>
                </div>
              </div>
              <div
                className={`alert p-4 rounded-lg shadow-lg transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-green-500/10 border border-green-500/40 text-green-300"
                    : "bg-green-50 border border-green-200 text-green-700"
                }`}
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current flex-shrink-0 h-6 w-6 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    New doctor onboarding completed: Dr. Jessica Chen
                    (Pediatrics)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .table th,
        .table td {
          padding: 12px 16px;
          text-align: left;
        }
        .table th {
          font-weight: 600;
        }
        .table tr {
          transition: background-color 0.3s ease;
        }
        .badge {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .btn {
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
