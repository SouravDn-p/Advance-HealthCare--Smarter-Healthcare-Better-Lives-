"use client";

import { ChartBarBig } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Users,
  FileText,
  Settings,
  LogOut,
  Search,
  Plus,
} from "react-feather";

// Doctor Dashboard Component
const DoctorDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    totalPatients: 0,
    totalStaff: 0,
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock doctor data (would come from auth context in a real app)
  const doctor = {
    id: "d123",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    hospital: "City Medical Center",
    image: "https://via.placeholder.com/300",
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // In a real app, these would be actual API calls
        // const appointmentsResponse = await axios.get('/api/appointments/doctor/' + doctor.id);
        // const patientsResponse = await axios.get('/api/patients/doctor/' + doctor.id);
        // const staffResponse = await axios.get('/api/staff/hospital/' + doctor.hospital);

        // Mock data for demonstration
        const mockAppointments = [
          {
            id: 1,
            patientName: "John Smith",
            patientImage: "https://via.placeholder.com/300",
            date: "2023-06-15",
            time: "10:00 AM",
            type: "in-person",
            status: "completed",
            notes:
              "Regular checkup for heart condition. Blood pressure was normal.",
            prescription: "Prescribed Lisinopril 10mg daily.",
            symptoms: "Chest pain, shortness of breath",
            vitals: {
              bloodPressure: "120/80",
              heartRate: "72 bpm",
              temperature: "98.6°F",
            },
          },
          {
            id: 2,
            patientName: "Emily Davis",
            patientImage: "https://via.placeholder.com/300",
            date: "2023-07-20",
            time: "02:30 PM",
            type: "virtual",
            status: "cancelled",
            notes: "Patient cancelled due to scheduling conflict.",
            symptoms: "Headache, dizziness",
            vitals: {},
          },
          {
            id: 3,
            patientName: "Michael Johnson",
            patientImage: "https://via.placeholder.com/300",
            date: "2023-08-05",
            time: "09:15 AM",
            type: "in-person",
            status: "completed",
            notes: "Follow-up after surgery. Recovery is going well.",
            prescription: "Continue with current medication.",
            symptoms: "Mild pain at incision site",
            vitals: {
              bloodPressure: "130/85",
              heartRate: "78 bpm",
              temperature: "98.8°F",
            },
          },
          {
            id: 4,
            patientName: "Sarah Wilson",
            patientImage: "https://via.placeholder.com/300",
            date: "2023-12-10",
            time: "11:30 AM",
            type: "in-person",
            status: "confirmed",
            notes: "Annual checkup",
            symptoms: "None, routine visit",
            vitals: {},
          },
          {
            id: 5,
            patientName: "Robert Brown",
            patientImage: "https://via.placeholder.com/300",
            date: "2023-12-18",
            time: "03:45 PM",
            type: "virtual",
            status: "pending",
            notes: "First consultation for heart palpitations",
            symptoms: "Heart palpitations, fatigue",
            vitals: {},
          },
        ];

        const mockPatients = [
          {
            id: "p1",
            name: "John Smith",
            age: 45,
            gender: "Male",
            contact: "555-123-4567",
            email: "john.smith@example.com",
            address: "123 Main St, Anytown, USA",
            medicalHistory: "Hypertension, Diabetes Type 2",
            lastVisit: "2023-06-15",
          },
          {
            id: "p2",
            name: "Emily Davis",
            age: 32,
            gender: "Female",
            contact: "555-987-6543",
            email: "emily.davis@example.com",
            address: "456 Oak Ave, Somewhere, USA",
            medicalHistory: "Migraines",
            lastVisit: "2023-07-20",
          },
          {
            id: "p3",
            name: "Michael Johnson",
            age: 58,
            gender: "Male",
            contact: "555-456-7890",
            email: "michael.johnson@example.com",
            address: "789 Pine Rd, Nowhere, USA",
            medicalHistory: "Coronary Artery Disease, Post-surgery",
            lastVisit: "2023-08-05",
          },
          {
            id: "p4",
            name: "Sarah Wilson",
            age: 29,
            gender: "Female",
            contact: "555-789-0123",
            email: "sarah.wilson@example.com",
            address: "321 Elm St, Anytown, USA",
            medicalHistory: "None",
            lastVisit: "2023-12-10",
          },
          {
            id: "p5",
            name: "Robert Brown",
            age: 52,
            gender: "Male",
            contact: "555-234-5678",
            email: "robert.brown@example.com",
            address: "654 Maple Dr, Somewhere, USA",
            medicalHistory: "Anxiety, High Cholesterol",
            lastVisit: "2023-12-18",
          },
        ];

        const mockStaff = [
          {
            id: "s1",
            name: "Jennifer Lee",
            role: "Nurse",
            department: "Cardiology",
            contact: "555-111-2222",
            email: "jennifer.lee@hospital.com",
            schedule: "Mon-Fri, 8AM-4PM",
          },
          {
            id: "s2",
            name: "David Miller",
            role: "Medical Assistant",
            department: "Cardiology",
            contact: "555-333-4444",
            email: "david.miller@hospital.com",
            schedule: "Mon-Fri, 9AM-5PM",
          },
          {
            id: "s3",
            name: "Lisa Chen",
            role: "Receptionist",
            department: "Front Desk",
            contact: "555-555-6666",
            email: "lisa.chen@hospital.com",
            schedule: "Mon-Fri, 8AM-4PM",
          },
        ];

        setAppointments(mockAppointments);
        setPatients(mockPatients);
        setStaff(mockStaff);

        // Calculate statistics
        setStats({
          totalAppointments: mockAppointments.length,
          completedAppointments: mockAppointments.filter(
            (a) => a.status === "completed"
          ).length,
          pendingAppointments: mockAppointments.filter(
            (a) => a.status === "pending" || a.status === "confirmed"
          ).length,
          totalPatients: mockPatients.length,
          totalStaff: mockStaff.length,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [doctor.id, doctor.hospital]);

  // Filter appointments based on status and search term
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus =
      filterStatus === "all" || appointment.status === filterStatus;
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.notes.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle appointment selection
  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    document.getElementById("appointment-modal").showModal();
  };

  // Handle appointment status change
  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );

    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }

    // In a real app, you would make an API call here
    // axios.patch(`/api/appointments/${id}`, { status: newStatus });
  };

  // Handle adding notes to an appointment
  const handleAddNotes = (id, notes) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, notes: notes } : app
      )
    );

    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, notes: notes });
    }

    // In a real app, you would make an API call here
    // axios.patch(`/api/appointments/${id}`, { notes: notes });
  };

  // Get status color class
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-content";
      case "confirmed":
        return "bg-info text-info-content";
      case "pending":
        return "bg-warning text-warning-content";
      case "cancelled":
        return "bg-error text-error-content";
      default:
        return "bg-base-300 text-base-content";
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-base-200 overflow-y-auto">
          {/* Doctor Info Card */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="card-title text-2xl">{doctor.name}</h2>
                  <p className="text-lg">{doctor.specialty}</p>
                  <p className="text-base-content/70">{doctor.hospital}</p>
                </div>
                <div className="ml-auto grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 md:mt-0">
                  <div className="stat bg-base-200 rounded-box p-4">
                    <div className="stat-title">Appointments</div>
                    <div className="stat-value text-primary">
                      {stats.totalAppointments}
                    </div>
                  </div>
                  <div className="stat bg-base-200 rounded-box p-4">
                    <div className="stat-title">Patients</div>
                    <div className="stat-value text-secondary">
                      {stats.totalPatients}
                    </div>
                  </div>
                  <div className="stat bg-base-200 rounded-box p-4 hidden md:block">
                    <div className="stat-title">Pending</div>
                    <div className="stat-value text-accent">
                      {stats.pendingAppointments}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tabs tabs-boxed mb-6">
            <a
              className={`tab ${
                activeTab === "appointments" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("appointments")}
            >
              Appointments
            </a>
            <a
              className={`tab ${activeTab === "patients" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("patients")}
            >
              Patients
            </a>
            <a
              className={`tab ${activeTab === "staff" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("staff")}
            >
              Staff
            </a>
            <a
              className={`tab ${activeTab === "analytics" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </a>
          </div>

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">Appointments</h2>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="form-control w-full md:w-auto">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search appointments..."
                        className="input input-bordered w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="btn btn-square">
                        <Search size={20} />
                      </button>
                    </div>
                  </div>

                  <select
                    className="select select-bordered w-full md:w-auto"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button className="btn btn-primary">
                    <Plus size={20} />
                    New Appointment
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="alert alert-info">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>No appointments found matching your criteria.</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleAppointmentClick(appointment)}
                    >
                      <div className="card-body p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="avatar">
                            <div className="w-16 rounded-full">
                              <img
                                src={
                                  appointment.patientImage || "/placeholder.svg"
                                }
                                alt={appointment.patientName}
                              />
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg font-bold">
                              {appointment.patientName}
                            </h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{formatDate(appointment.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={16} />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {appointment.type === "in-person" ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                    <rect
                                      x="1"
                                      y="5"
                                      width="15"
                                      height="14"
                                      rx="2"
                                      ry="2"
                                    ></rect>
                                  </svg>
                                )}
                                <span>
                                  {appointment.type === "in-person"
                                    ? "In-Person"
                                    : "Virtual"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col md:items-end gap-2">
                            <div
                              className={`badge ${getStatusColor(
                                appointment.status
                              )} capitalize`}
                            >
                              {appointment.status}
                            </div>
                            <div className="text-sm truncate max-w-xs">
                              {appointment.notes.substring(0, 60)}
                              {appointment.notes.length > 60 ? "..." : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Patients Tab */}
          {activeTab === "patients" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">Patients</h2>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="form-control w-full md:w-auto">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search patients..."
                        className="input input-bordered w-full"
                      />
                      <button className="btn btn-square">
                        <Search size={20} />
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-primary">
                    <Plus size={20} />
                    Add Patient
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Contact</th>
                        <th>Medical History</th>
                        <th>Last Visit</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient.id}>
                          <td>
                            <div className="font-bold">{patient.name}</div>
                          </td>
                          <td>{patient.age}</td>
                          <td>{patient.gender}</td>
                          <td>{patient.contact}</td>
                          <td className="max-w-xs truncate">
                            {patient.medicalHistory}
                          </td>
                          <td>{formatDate(patient.lastVisit)}</td>
                          <td>
                            <div className="flex gap-2">
                              <button className="btn btn-sm btn-info">
                                View
                              </button>
                              <button className="btn btn-sm btn-outline">
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Staff Tab */}
          {activeTab === "staff" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">Staff</h2>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <div className="form-control w-full md:w-auto">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search staff..."
                        className="input input-bordered w-full"
                      />
                      <button className="btn btn-square">
                        <Search size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {staff.map((member) => (
                    <div key={member.id} className="card bg-base-100 shadow-md">
                      <div className="card-body">
                        <h3 className="card-title">{member.name}</h3>
                        <div className="badge badge-primary">{member.role}</div>
                        <p>
                          <strong>Department:</strong> {member.department}
                        </p>
                        <p>
                          <strong>Contact:</strong> {member.contact}
                        </p>
                        <p>
                          <strong>Email:</strong> {member.email}
                        </p>
                        <p>
                          <strong>Schedule:</strong> {member.schedule}
                        </p>
                        <div className="card-actions justify-end mt-2">
                          <button className="btn btn-sm btn-outline">
                            Message
                          </button>
                          <button className="btn btn-sm btn-primary">
                            Schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="stat bg-base-100 shadow">
                  <div className="stat-figure text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect
                        x="8"
                        y="2"
                        width="8"
                        height="4"
                        rx="1"
                        ry="1"
                      ></rect>
                    </svg>
                  </div>
                  <div className="stat-title">Total Appointments</div>
                  <div className="stat-value text-primary">
                    {stats.totalAppointments}
                  </div>
                  <div className="stat-desc">All time</div>
                </div>

                <div className="stat bg-base-100 shadow">
                  <div className="stat-figure text-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="stat-title">Completed</div>
                  <div className="stat-value text-success">
                    {stats.completedAppointments}
                  </div>
                  <div className="stat-desc">Successfully completed</div>
                </div>

                <div className="stat bg-base-100 shadow">
                  <div className="stat-figure text-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div className="stat-title">Pending</div>
                  <div className="stat-value text-warning">
                    {stats.pendingAppointments}
                  </div>
                  <div className="stat-desc">Awaiting completion</div>
                </div>

                <div className="stat bg-base-100 shadow">
                  <div className="stat-figure text-secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Total Patients</div>
                  <div className="stat-value text-secondary">
                    {stats.totalPatients}
                  </div>
                  <div className="stat-desc">Under your care</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">Appointment Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center text-base-content/70">
                        <p>Chart visualization would go here</p>
                        <p className="text-sm">
                          (In a real app, this would be a pie chart showing
                          appointment status distribution)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">Monthly Appointments</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center text-base-content/70">
                        <p>Chart visualization would go here</p>
                        <p className="text-sm">
                          (In a real app, this would be a bar chart showing
                          appointments per month)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Appointment Detail Modal */}
      <dialog id="appointment-modal" className="modal">
        <div className="modal-box max-w-3xl">
          {selectedAppointment && (
            <>
              <h3 className="font-bold text-lg mb-4">Appointment Details</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img
                      src={
                        selectedAppointment.patientImage || "/placeholder.svg"
                      }
                      alt={selectedAppointment.patientName}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold">
                    {selectedAppointment.patientName}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span>{formatDate(selectedAppointment.date)}</span>
                    <span>•</span>
                    <span>{selectedAppointment.time}</span>
                    <span>•</span>
                    <span className="capitalize">
                      {selectedAppointment.type}
                    </span>
                  </div>
                </div>
                <div
                  className={`ml-auto badge ${getStatusColor(
                    selectedAppointment.status
                  )} capitalize`}
                >
                  {selectedAppointment.status}
                </div>
              </div>

              <div className="divider"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold mb-2">Symptoms</h4>
                  <p>
                    {selectedAppointment.symptoms || "No symptoms recorded"}
                  </p>
                </div>

                {selectedAppointment.vitals &&
                  Object.keys(selectedAppointment.vitals).length > 0 && (
                    <div>
                      <h4 className="font-bold mb-2">Vitals</h4>
                      <ul className="list-disc list-inside">
                        {selectedAppointment.vitals.bloodPressure && (
                          <li>
                            Blood Pressure:{" "}
                            {selectedAppointment.vitals.bloodPressure}
                          </li>
                        )}
                        {selectedAppointment.vitals.heartRate && (
                          <li>
                            Heart Rate: {selectedAppointment.vitals.heartRate}
                          </li>
                        )}
                        {selectedAppointment.vitals.temperature && (
                          <li>
                            Temperature:{" "}
                            {selectedAppointment.vitals.temperature}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
              </div>

              <div className="mb-6">
                <h4 className="font-bold mb-2">Notes</h4>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows="3"
                  defaultValue={selectedAppointment.notes}
                  placeholder="Add appointment notes..."
                  id="appointment-notes"
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      const notes =
                        document.getElementById("appointment-notes").value;
                      handleAddNotes(selectedAppointment.id, notes);
                    }}
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {selectedAppointment.prescription && (
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Prescription</h4>
                  <div className="bg-base-200 p-4 rounded-lg">
                    {selectedAppointment.prescription}
                  </div>
                </div>
              )}

              <div className="divider"></div>

              <div className="flex justify-between">
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-outline">
                    Update Status
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a
                        onClick={() =>
                          handleStatusChange(selectedAppointment.id, "pending")
                        }
                      >
                        Pending
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleStatusChange(
                            selectedAppointment.id,
                            "confirmed"
                          )
                        }
                      >
                        Confirmed
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleStatusChange(
                            selectedAppointment.id,
                            "completed"
                          )
                        }
                      >
                        Completed
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleStatusChange(
                            selectedAppointment.id,
                            "cancelled"
                          )
                        }
                      >
                        Cancelled
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default DoctorDashboard;
