import { useState } from "react";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  ChevronDown,
  MapPin,
  Video,
  X,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  User,
  Plus,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import MeetOurExperts from "../Home/MeetOurExperts";

const Appointments = () => {
  const { theme } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    type: "all",
    status: "all",
    sortBy: "date-desc",
  });

  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Cardiologist",
      hospital: "City Medical Center",
      date: "2023-06-15",
      time: "10:00 AM",
      type: "in-person",
      status: "completed",
      notes: "Regular checkup for heart condition. Blood pressure was normal.",
      prescription: "Prescribed Lisinopril 10mg daily.",
    },
    {
      id: 2,
      doctorName: "Dr. Mark Benson",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Neurologist",
      hospital: "Metro Neurology Clinic",
      date: "2023-07-20",
      time: "02:30 PM",
      type: "virtual",
      status: "cancelled",
      notes: "Patient cancelled due to scheduling conflict.",
    },
    {
      id: 3,
      doctorName: "Dr. Emily Carter",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Dermatologist",
      hospital: "Skin Health Center",
      date: "2023-08-05",
      time: "09:15 AM",
      type: "in-person",
      status: "completed",
      notes: "Skin examination for suspicious mole. Biopsy taken.",
      prescription: "Apply prescribed cream twice daily.",
    },
    {
      id: 4,
      doctorName: "Dr. Sarah Johnson",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Cardiologist",
      hospital: "City Medical Center",
      date: "2023-12-10",
      time: "11:30 AM",
      type: "in-person",
      status: "confirmed",
      notes: "Follow-up appointment for heart condition.",
    },
    {
      id: 5,
      doctorName: "Dr. Emily Carter",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Dermatologist",
      hospital: "Skin Health Center",
      date: "2023-12-18",
      time: "03:45 PM",
      type: "virtual",
      status: "pending",
      notes: "Virtual consultation for acne treatment.",
    },
  ]);

  const handleOpenDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = (id) => {
    setIsCancelling(true);
    // Simulate API call
    setTimeout(() => {
      setAppointments(
        appointments.map((app) =>
          app.id === id ? { ...app, status: "cancelled" } : app
        )
      );
      setIsCancelling(false);
      setIsDetailsOpen(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const isUpcoming = (appointment) => {
    return (
      new Date(appointment.date) >= new Date() &&
      appointment.status !== "cancelled"
    );
  };

  const isPast = (appointment) => {
    return (
      new Date(appointment.date) < new Date() ||
      appointment.status === "cancelled"
    );
  };

  const filteredAppointments = appointments
    .filter((appointment) => {
      // Filter by tab
      if (activeTab === "upcoming" && !isUpcoming(appointment)) return false;
      if (activeTab === "past" && !isPast(appointment)) return false;

      // Filter by search query
      if (
        searchQuery &&
        !appointment.doctorName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        !appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by type
      if (
        filterOptions.type !== "all" &&
        appointment.type !== filterOptions.type
      )
        return false;

      // Filter by status
      if (
        filterOptions.status !== "all" &&
        appointment.status !== filterOptions.status
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      // Sort by selected option
      if (filterOptions.sortBy === "date-asc") {
        return new Date(a.date) - new Date(b.date);
      } else if (filterOptions.sortBy === "date-desc") {
        return new Date(b.date) - new Date(a.date);
      } else if (filterOptions.sortBy === "doctor") {
        return a.doctorName.localeCompare(b.doctorName);
      } else {
        return 0;
      }
    });

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      {isBookingOpen ? (
        <MeetOurExperts />
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Manage your upcoming and past medical appointments
              </p>
            </div>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Book New Appointment
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "upcoming"
                    ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                } transition-colors duration-200`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === "past"
                    ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                } transition-colors duration-200`}
              >
                Past
              </button>
            </div>

            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search doctor or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Filter
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 p-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Appointment Type
                      </label>
                      <select
                        value={filterOptions.type}
                        onChange={(e) =>
                          setFilterOptions({
                            ...filterOptions,
                            type: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <option value="all">All Types</option>
                        <option value="in-person">In-Person</option>
                        <option value="virtual">Virtual</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select
                        value={filterOptions.status}
                        onChange={(e) =>
                          setFilterOptions({
                            ...filterOptions,
                            status: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <option value="all">All Statuses</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sort By
                      </label>
                      <select
                        value={filterOptions.sortBy}
                        onChange={(e) =>
                          setFilterOptions({
                            ...filterOptions,
                            sortBy: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        <option value="date-desc">Date (Newest First)</option>
                        <option value="date-asc">Date (Oldest First)</option>
                        <option value="doctor">Doctor Name</option>
                      </select>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          setFilterOptions({
                            type: "all",
                            status: "all",
                            sortBy: "date-desc",
                          });
                        }}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {filteredAppointments.length > 0 ? (
            <div className="grid gap-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 md:p-6 flex items-center space-x-4 md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                      <div className="flex-shrink-0">
                        <img
                          src={appointment.doctorImage || "/placeholder.svg"}
                          alt={appointment.doctorName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {appointment.doctorName}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {appointment.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {formatDate(appointment.date)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {appointment.time}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {appointment.hospital}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {appointment.type === "virtual" ? (
                            <Video className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                          ) : (
                            <User className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                          )}
                          <span className="text-gray-700 dark:text-gray-300 capitalize">
                            {appointment.type} Appointment
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-6 flex flex-col justify-between items-end md:w-1/4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
                      <div
                        className={`px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusIcon(appointment.status)}
                        <span className="text-sm font-medium capitalize">
                          {appointment.status}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenDetails(appointment)}
                        className="mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No appointments found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming appointments. Book a new appointment to get started."
                  : "You don't have any past appointments that match your filters."}
              </p>
              {activeTab === "upcoming" && (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Book New Appointment
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {isDetailsOpen && selectedAppointment && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleCloseDetails()}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="absolute top-12 left-6 flex items-end">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
                  <img
                    src={selectedAppointment.doctorImage || "/placeholder.svg"}
                    alt={selectedAppointment.doctorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 pb-2">
                  <h3 className="text-xl font-bold text-white">
                    {selectedAppointment.doctorName}
                  </h3>
                  <p className="text-blue-100">
                    {selectedAppointment.specialty}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseDetails}
                className="absolute top-3 right-3 text-white hover:text-gray-200 bg-black/20 hover:bg-black/30 rounded-full p-1 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute top-3 right-16">
                <div
                  className={`px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(
                    selectedAppointment.status
                  )}`}
                >
                  {getStatusIcon(selectedAppointment.status)}
                  <span className="text-sm font-medium capitalize">
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Date & Time
                    </h4>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {formatDate(selectedAppointment.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {selectedAppointment.time}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Location
                    </h4>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {selectedAppointment.hospital}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Appointment Type
                    </h4>
                    <div className="flex items-center gap-2">
                      {selectedAppointment.type === "virtual" ? (
                        <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                      <span className="text-gray-900 dark:text-white font-medium capitalize">
                        {selectedAppointment.type} Appointment
                      </span>
                    </div>
                  </div>

                  {selectedAppointment.type === "virtual" &&
                    selectedAppointment.status === "confirmed" && (
                      <div className="mt-2">
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          Join Video Call
                        </button>
                      </div>
                    )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Notes
                </h4>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedAppointment.notes ||
                      "No notes available for this appointment."}
                  </p>
                </div>
              </div>

              {selectedAppointment.prescription && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Prescription
                  </h4>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedAppointment.prescription}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-3 mt-8">
                {selectedAppointment.status === "confirmed" && (
                  <>
                    <button
                      onClick={() => setIsRescheduling(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reschedule
                    </button>
                    <button
                      onClick={() =>
                        handleCancelAppointment(selectedAppointment.id)
                      }
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                      disabled={isCancelling}
                    >
                      {isCancelling ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          Cancel Appointment
                        </>
                      )}
                    </button>
                  </>
                )}
                <button
                  onClick={handleCloseDetails}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
