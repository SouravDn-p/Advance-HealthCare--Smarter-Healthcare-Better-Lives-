import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendarAlt,
  FaFilter,
  FaDownload,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import axios from "axios";
import UnAuthorizedAccess from "../../../../extra/errors/UnAuthorizedAccess";
import useAuth from "../../../../hooks/useAuth";

const AppointmentManage = ({ isDarkMode, toggleDarkMode }) => {
  const { dbUser } = useAuth();
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

  // State for managing UI
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  // Fetch appointments from backend (commented out for now)
  /*
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    
    fetchAppointments();
  }, []);
  */

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      // In a real app, you would make an API call here
      // await axios.patch(`/api/appointments/${id}`, { status: newStatus });

      // Update local state
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  // Handle appointment deletion
  const handleDeleteAppointment = async (id) => {
    try {
      // In a real app, you would make an API call here
      // await axios.delete(`/api/appointments/${id}`);

      // Update local state
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Handle appointment edit
  const handleEditAppointment = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you would make an API call here
      // await axios.put(`/api/appointments/${editFormData.id}`, editFormData);

      // Update local state
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === editFormData.id ? editFormData : appointment
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  // Handle form input changes
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Sorting function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedAppointments = [...appointments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Apply filters and search
  const filteredAppointments = sortedAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.hospital.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    const matchesType = typeFilter === "all" || appointment.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Doctor",
      "Specialty",
      "Hospital",
      "Date",
      "Time",
      "Type",
      "Status",
      "Notes",
    ];
    const csvData = filteredAppointments.map((appointment) => [
      appointment.id,
      appointment.doctorName,
      appointment.specialty,
      appointment.hospital,
      appointment.date,
      appointment.time,
      appointment.type,
      appointment.status,
      appointment.notes,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "appointments.csv");
    link.click();
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "completed":
        return "badge badge-success";
      case "confirmed":
        return "badge badge-info";
      case "pending":
        return "badge badge-warning";
      case "cancelled":
        return "badge badge-error";
      default:
        return "badge";
    }
  };

  if (dbUser?.role != "admin") {
    return <UnAuthorizedAccess />;
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Appointment Management</h1>
          <button
            className={`btn btn-circle ${
              isDarkMode ? "btn-outline" : "btn-primary"
            }`}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div
            className={`stat ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow rounded-lg`}
          >
            <div className="stat-figure text-primary">
              <FaCalendarAlt className="text-3xl" />
            </div>
            <div className="stat-title">Total Appointments</div>
            <div className="stat-value text-primary">{appointments.length}</div>
          </div>
          <div
            className={`stat ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow rounded-lg`}
          >
            <div className="stat-figure text-success">
              <div className="badge badge-success badge-lg">✓</div>
            </div>
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">
              {appointments.filter((a) => a.status === "completed").length}
            </div>
          </div>
          <div
            className={`stat ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow rounded-lg`}
          >
            <div className="stat-figure text-info">
              <div className="badge badge-info badge-lg">!</div>
            </div>
            <div className="stat-title">Confirmed/Pending</div>
            <div className="stat-value text-info">
              {
                appointments.filter(
                  (a) => a.status === "confirmed" || a.status === "pending"
                ).length
              }
            </div>
          </div>
          <div
            className={`stat ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow rounded-lg`}
          >
            <div className="stat-figure text-error">
              <div className="badge badge-error badge-lg">✕</div>
            </div>
            <div className="stat-title">Cancelled</div>
            <div className="stat-value text-error">
              {appointments.filter((a) => a.status === "cancelled").length}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div
          className={`p-4 mb-6 rounded-lg shadow ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search by doctor, specialty, or hospital..."
                  className={`input input-bordered w-full ${
                    isDarkMode ? "bg-gray-700" : ""
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square">
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                className={`select select-bordered ${
                  isDarkMode ? "bg-gray-700" : ""
                }`}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                className={`select select-bordered ${
                  isDarkMode ? "bg-gray-700" : ""
                }`}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="in-person">In-Person</option>
                <option value="virtual">Virtual</option>
              </select>

              <button
                className="btn btn-outline btn-primary"
                onClick={exportToCSV}
              >
                <FaDownload className="mr-2" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div
          className={`overflow-x-auto rounded-lg shadow ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <table className="table w-full">
            <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-100"}>
              <tr>
                <th>
                  <button
                    onClick={() => requestSort("id")}
                    className="flex items-center"
                  >
                    ID{" "}
                    {sortConfig.key === "id" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => requestSort("doctorName")}
                    className="flex items-center"
                  >
                    Doctor{" "}
                    {sortConfig.key === "doctorName" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => requestSort("specialty")}
                    className="flex items-center"
                  >
                    Specialty{" "}
                    {sortConfig.key === "specialty" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => requestSort("date")}
                    className="flex items-center"
                  >
                    Date & Time{" "}
                    {sortConfig.key === "date" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => requestSort("type")}
                    className="flex items-center"
                  >
                    Type{" "}
                    {sortConfig.key === "type" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => requestSort("status")}
                    className="flex items-center"
                  >
                    Status{" "}
                    {sortConfig.key === "status" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className={
                      isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    }
                  >
                    <td>{appointment.id}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={
                                appointment.doctorImage || "/placeholder.svg"
                              }
                              alt={appointment.doctorName}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {appointment.doctorName}
                          </div>
                          <div className="text-sm opacity-50">
                            {appointment.hospital}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{appointment.specialty}</td>
                    <td>
                      {appointment.date}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {appointment.time}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          appointment.type === "virtual"
                            ? "badge-accent"
                            : "badge-neutral"
                        }`}
                      >
                        {appointment.type}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown dropdown-hover">
                        <label tabIndex={0}>
                          <span
                            className={getStatusBadgeClass(appointment.status)}
                          >
                            {appointment.status}
                          </span>
                        </label>
                        <ul
                          tabIndex={0}
                          className={`dropdown-content z-[1] menu p-2 shadow rounded-box w-52 ${
                            isDarkMode ? "bg-gray-700" : "bg-base-100"
                          }`}
                        >
                          <li>
                            <button
                              onClick={() =>
                                handleStatusUpdate(appointment.id, "pending")
                              }
                            >
                              Set as Pending
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleStatusUpdate(appointment.id, "confirmed")
                              }
                            >
                              Set as Confirmed
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleStatusUpdate(appointment.id, "completed")
                              }
                            >
                              Set as Completed
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleStatusUpdate(appointment.id, "cancelled")
                              }
                            >
                              Set as Cancelled
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          className="btn btn-sm btn-circle btn-ghost"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setIsModalOpen(true);
                          }}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-sm btn-circle btn-ghost text-blue-500"
                          onClick={() => {
                            setEditFormData(appointment);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-circle btn-ghost text-red-500"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No appointments found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredAppointments.length)} of{" "}
              {filteredAppointments.length} entries
            </span>
          </div>
          <div className="join">
            <button
              className={`join-item btn ${isDarkMode ? "btn-outline" : ""}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              className={`join-item btn ${isDarkMode ? "btn-outline" : ""}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  Math.abs(page - currentPage) < 3 ||
                  page === 1 ||
                  page === totalPages
              )
              .map((page, index, array) => {
                // Add ellipsis
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <button
                      key={`ellipsis-${page}`}
                      className={`join-item btn ${
                        isDarkMode ? "btn-outline" : ""
                      }`}
                      disabled
                    >
                      ...
                    </button>
                  );
                }
                return (
                  <button
                    key={page}
                    className={`join-item btn ${
                      currentPage === page ? "btn-active" : ""
                    } ${isDarkMode ? "btn-outline" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
            <button
              className={`join-item btn ${isDarkMode ? "btn-outline" : ""}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className={`join-item btn ${isDarkMode ? "btn-outline" : ""}`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>

        {/* View Appointment Modal */}
        {isModalOpen && selectedAppointment && (
          <div
            className={`modal modal-open ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <div
              className={`modal-box ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className="font-bold text-lg">Appointment Details</h3>
              <div className="py-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img
                        src={
                          selectedAppointment.doctorImage || "/placeholder.svg"
                        }
                        alt={selectedAppointment.doctorName}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      {selectedAppointment.doctorName}
                    </h4>
                    <p>{selectedAppointment.specialty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm font-semibold">Hospital</p>
                    <p>{selectedAppointment.hospital}</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm font-semibold">Date & Time</p>
                    <p>
                      {selectedAppointment.date} at {selectedAppointment.time}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm font-semibold">Type</p>
                    <p className="capitalize">{selectedAppointment.type}</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm font-semibold">Status</p>
                    <span
                      className={getStatusBadgeClass(
                        selectedAppointment.status
                      )}
                    >
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>

                <div
                  className={`mt-4 p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm font-semibold">Notes</p>
                  <p>{selectedAppointment.notes || "No notes available"}</p>
                </div>

                {selectedAppointment.prescription && (
                  <div
                    className={`mt-4 p-3 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm font-semibold">Prescription</p>
                    <p>{selectedAppointment.prescription}</p>
                  </div>
                )}
              </div>
              <div className="modal-action">
                <button className="btn" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Appointment Modal */}
        {isEditModalOpen && (
          <div
            className={`modal modal-open ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <div
              className={`modal-box ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className="font-bold text-lg">Edit Appointment</h3>
              <form onSubmit={handleEditAppointment} className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Doctor Name</span>
                    </label>
                    <input
                      type="text"
                      name="doctorName"
                      value={editFormData.doctorName || ""}
                      onChange={handleEditFormChange}
                      className={`input input-bordered ${
                        isDarkMode ? "bg-gray-700" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Specialty</span>
                    </label>
                    <input
                      type="text"
                      name="specialty"
                      value={editFormData.specialty || ""}
                      onChange={handleEditFormChange}
                      className={`input input-bordered ${
                        isDarkMode ? "bg-gray-700" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Hospital</span>
                    </label>
                    <input
                      type="text"
                      name="hospital"
                      value={editFormData.hospital || ""}
                      onChange={handleEditFormChange}
                      className={`input input-bordered ${
                        isDarkMode ? "bg-gray-700" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Date</span>
                    </label>
                    <input
                      type="text"
                      name="date"
                      value={editFormData.date || ""}
                      onChange={handleEditFormChange}
                      className={`input input-bordered ${
                        isDarkMode ? "bg-gray-700" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Time</span>
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={editFormData.time || ""}
                      onChange={handleEditFormChange}
                      className={`input input-bordered ${
                        isDarkMode ? "bg-gray-700" : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Type</span>
                    </label>
                    <select
                      name="type"
                      value={editFormData.type || ""}
                      onChange={handleEditFormChange}
                      className={`select select-bordered ${
                        isDarkMode ? "bg-gray-700" : ""
                      }`}
                      required
                    >
                      <option value="in-person">In-Person</option>
                      <option value="virtual">Virtual</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Status</span>
                    </label>
                    <select
                      name="status"
                      value={editFormData.status || ""}
                      onChange={handleEditFormChange}
                      className={`select select-bordered ${
                        isDarkMode ? "bg-gray-700" : ""
                      }`}
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Notes</span>
                  </label>
                  <textarea
                    name="notes"
                    value={editFormData.notes || ""}
                    onChange={handleEditFormChange}
                    className={`textarea textarea-bordered h-24 ${
                      isDarkMode ? "bg-gray-700" : ""
                    }`}
                  ></textarea>
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Prescription</span>
                  </label>
                  <textarea
                    name="prescription"
                    value={editFormData.prescription || ""}
                    onChange={handleEditFormChange}
                    className={`textarea textarea-bordered h-24 ${
                      isDarkMode ? "bg-gray-700" : ""
                    }`}
                  ></textarea>
                </div>

                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedAppointment && (
          <div
            className={`modal modal-open ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <div
              className={`modal-box ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className="font-bold text-lg">Confirm Deletion</h3>
              <p className="py-4">
                Are you sure you want to delete the appointment with{" "}
                {selectedAppointment.doctorName} on {selectedAppointment.date}?
                This action cannot be undone.
              </p>
              <div className="modal-action">
                <button
                  className="btn btn-error"
                  onClick={() =>
                    handleDeleteAppointment(selectedAppointment.id)
                  }
                >
                  Delete
                </button>
                <button
                  className="btn"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentManage;
