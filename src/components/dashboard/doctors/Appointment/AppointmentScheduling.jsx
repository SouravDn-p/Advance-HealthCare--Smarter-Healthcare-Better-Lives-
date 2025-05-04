"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "react-feather";

const AppointmentScheduling = () => {
  // State for calendar and appointments
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState("week"); // week or day
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    patientName: "",
    date: "",
    time: "",
    duration: 30,
    type: "in-person",
    notes: "",
  });
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPatientSearch, setShowPatientSearch] = useState(false);

  // Fetch appointments and available slots
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be actual API calls
        // const appointmentsResponse = await axios.get('/api/appointments', { params: { doctorId: 'd123', startDate: startOfWeek, endDate: endOfWeek } });
        // const slotsResponse = await axios.get('/api/available-slots', { params: { doctorId: 'd123', startDate: startOfWeek, endDate: endOfWeek } });
        // const patientsResponse = await axios.get('/api/patients');

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock appointments
        const mockAppointments = [
          {
            id: 1,
            patientId: "p1",
            patientName: "John Smith",
            date: "2023-12-10",
            time: "09:00 AM",
            endTime: "09:30 AM",
            duration: 30,
            type: "in-person",
            status: "confirmed",
            notes: "Follow-up appointment for heart condition.",
          },
          {
            id: 2,
            patientId: "p2",
            patientName: "Emily Davis",
            date: "2023-12-10",
            time: "10:00 AM",
            endTime: "10:30 AM",
            duration: 30,
            type: "virtual",
            status: "confirmed",
            notes: "Initial consultation for migraines.",
          },
          {
            id: 3,
            patientId: "p3",
            patientName: "Michael Johnson",
            date: "2023-12-11",
            time: "11:00 AM",
            endTime: "11:45 AM",
            duration: 45,
            type: "in-person",
            status: "confirmed",
            notes: "Post-surgery follow-up.",
          },
          {
            id: 4,
            patientId: "p4",
            patientName: "Sarah Wilson",
            date: "2023-12-12",
            time: "02:00 PM",
            endTime: "02:30 PM",
            duration: 30,
            type: "in-person",
            status: "confirmed",
            notes: "Annual checkup.",
          },
          {
            id: 5,
            patientId: "p5",
            patientName: "Robert Brown",
            date: "2023-12-13",
            time: "03:00 PM",
            endTime: "03:30 PM",
            duration: 30,
            type: "virtual",
            status: "confirmed",
            notes: "Consultation for heart palpitations.",
          },
        ];

        // Mock available slots
        const mockAvailableSlots = [
          { date: "2023-12-10", time: "11:00 AM", duration: 30 },
          { date: "2023-12-10", time: "11:30 AM", duration: 30 },
          { date: "2023-12-10", time: "01:00 PM", duration: 30 },
          { date: "2023-12-10", time: "01:30 PM", duration: 30 },
          { date: "2023-12-10", time: "02:00 PM", duration: 30 },
          { date: "2023-12-11", time: "09:00 AM", duration: 30 },
          { date: "2023-12-11", time: "09:30 AM", duration: 30 },
          { date: "2023-12-11", time: "10:00 AM", duration: 30 },
          { date: "2023-12-11", time: "01:00 PM", duration: 30 },
          { date: "2023-12-11", time: "01:30 PM", duration: 30 },
          { date: "2023-12-12", time: "09:00 AM", duration: 30 },
          { date: "2023-12-12", time: "09:30 AM", duration: 30 },
          { date: "2023-12-12", time: "10:00 AM", duration: 30 },
          { date: "2023-12-12", time: "10:30 AM", duration: 30 },
          { date: "2023-12-12", time: "11:00 AM", duration: 30 },
          { date: "2023-12-13", time: "09:00 AM", duration: 30 },
          { date: "2023-12-13", time: "09:30 AM", duration: 30 },
          { date: "2023-12-13", time: "10:00 AM", duration: 30 },
          { date: "2023-12-13", time: "10:30 AM", duration: 30 },
          { date: "2023-12-13", time: "11:00 AM", duration: 30 },
          { date: "2023-12-14", time: "09:00 AM", duration: 30 },
          { date: "2023-12-14", time: "09:30 AM", duration: 30 },
          { date: "2023-12-14", time: "10:00 AM", duration: 30 },
          { date: "2023-12-14", time: "10:30 AM", duration: 30 },
          { date: "2023-12-14", time: "11:00 AM", duration: 30 },
        ];

        // Mock patients
        const mockPatients = [
          {
            id: "p1",
            name: "John Smith",
            age: 45,
            gender: "Male",
            contact: "555-123-4567",
          },
          {
            id: "p2",
            name: "Emily Davis",
            age: 32,
            gender: "Female",
            contact: "555-987-6543",
          },
          {
            id: "p3",
            name: "Michael Johnson",
            age: 58,
            gender: "Male",
            contact: "555-456-7890",
          },
          {
            id: "p4",
            name: "Sarah Wilson",
            age: 29,
            gender: "Female",
            contact: "555-789-0123",
          },
          {
            id: "p5",
            name: "Robert Brown",
            age: 52,
            gender: "Male",
            contact: "555-234-5678",
          },
        ];

        setAppointments(mockAppointments);
        setAvailableSlots(mockAvailableSlots);
        setPatients(mockPatients);
        setFilteredPatients(mockPatients);

        // Set selected date to current date
        const today = new Date();
        setSelectedDate(formatDateForState(today));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper functions for date manipulation
  const formatDateForDisplay = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateForState = (date) => {
    return date.toISOString().split("T")[0];
  };

  const getDaysInWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    const monday = new Date(date);
    monday.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      days.push(formatDateForState(nextDay));
    }

    return days;
  };

  const weekDays = getDaysInWeek(currentDate);

  // Navigation functions
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Filter appointments for selected date
  const getAppointmentsForDate = (date) => {
    return appointments.filter((appointment) => appointment.date === date);
  };

  // Filter available slots for selected date
  const getSlotsForDate = (date) => {
    return availableSlots.filter((slot) => slot.date === date);
  };

  // Handle patient search
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter((patient) =>
        patient.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  };

  // Handle patient selection
  const handlePatientSelect = (patient) => {
    setNewAppointment({
      ...newAppointment,
      patientId: patient.id,
      patientName: patient.name,
    });
    setShowPatientSearch(false);
  };

  // Handle new appointment form changes
  const handleAppointmentFormChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setNewAppointment({
      ...newAppointment,
      date: slot.date,
      time: slot.time,
    });
    setShowNewAppointmentModal(true);
  };

  // Handle appointment creation
  const handleCreateAppointment = async () => {
    try {
      // In a real app, this would be an API call
      // await axios.post('/api/appointments', newAppointment);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a new ID (in a real app, this would come from the backend)
      const newId = appointments.length + 1;

      // Calculate end time (simple implementation)
      const timeParts = newAppointment.time.match(/(\d+):(\d+) ([AP]M)/);
      let hours = Number.parseInt(timeParts[1]);
      const minutes = Number.parseInt(timeParts[2]);
      const period = timeParts[3];

      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const endDate = new Date(
        `${newAppointment.date}T${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:00`
      );
      endDate.setMinutes(endDate.getMinutes() + newAppointment.duration);

      const endHours = endDate.getHours();
      const endMinutes = endDate.getMinutes();
      const endPeriod = endHours >= 12 ? "PM" : "AM";
      const displayEndHours =
        endHours > 12 ? endHours - 12 : endHours === 0 ? 12 : endHours;
      const endTime = `${displayEndHours}:${endMinutes
        .toString()
        .padStart(2, "0")} ${endPeriod}`;

      // Create new appointment object
      const createdAppointment = {
        id: newId,
        patientId: newAppointment.patientId,
        patientName: newAppointment.patientName,
        date: newAppointment.date,
        time: newAppointment.time,
        endTime: endTime,
        duration: newAppointment.duration,
        type: newAppointment.type,
        status: "confirmed",
        notes: newAppointment.notes,
      };

      // Update state
      setAppointments([...appointments, createdAppointment]);

      // Remove the slot from available slots
      const updatedSlots = availableSlots.filter(
        (slot) =>
          !(
            slot.date === newAppointment.date &&
            slot.time === newAppointment.time
          )
      );
      setAvailableSlots(updatedSlots);

      // Reset form and close modal
      setNewAppointment({
        patientId: "",
        patientName: "",
        date: "",
        time: "",
        duration: 30,
        type: "in-person",
        notes: "",
      });
      setShowNewAppointmentModal(false);

      // Show success message
      document.getElementById("success-toast").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("success-toast").classList.add("hidden");
      }, 3000);
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Show error message
      document.getElementById("error-toast").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("error-toast").classList.add("hidden");
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Toast */}
      <div id="success-toast" className="toast toast-top toast-end hidden">
        <div className="alert alert-success">
          <span>Appointment created successfully!</span>
        </div>
      </div>

      {/* Error Toast */}
      <div id="error-toast" className="toast toast-top toast-end hidden">
        <div className="alert alert-error">
          <span>Error creating appointment. Please try again.</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Appointment Scheduling</h1>

        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button className="btn btn-sm" onClick={goToPreviousWeek}>
            <ChevronLeft size={18} />
          </button>
          <button className="btn btn-sm btn-outline" onClick={goToToday}>
            Today
          </button>
          <button className="btn btn-sm" onClick={goToNextWeek}>
            <ChevronRight size={18} />
          </button>

          <div className="dropdown dropdown-end ml-2">
            <label tabIndex={0} className="btn btn-sm">
              {view === "week" ? "Week View" : "Day View"}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => setView("week")}>Week View</a>
              </li>
              <li>
                <a onClick={() => setView("day")}>Day View</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : view === "week" ? (
        <div className="grid grid-cols-7 gap-4">
          {/* Day Headers */}
          {weekDays.map((date) => (
            <div
              key={date}
              className={`p-2 text-center font-medium ${
                date === selectedDate
                  ? "bg-primary text-primary-content rounded-t-lg"
                  : "bg-base-200 rounded-t-lg"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {formatDateForDisplay(date)}
            </div>
          ))}

          {/* Appointment Cells */}
          {weekDays.map((date) => (
            <div
              key={`appointments-${date}`}
              className={`min-h-[200px] p-2 ${
                date === selectedDate
                  ? "bg-base-100 border-2 border-primary rounded-b-lg"
                  : "bg-base-100 border border-base-200 rounded-b-lg"
              }`}
            >
              {getAppointmentsForDate(date).length === 0 ? (
                <div className="text-center text-base-content/50 py-4">
                  No appointments
                </div>
              ) : (
                <div className="space-y-2">
                  {getAppointmentsForDate(date).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-base-200 p-2 rounded-lg text-sm cursor-pointer hover:bg-base-300 transition-colors"
                      onClick={() => {
                        // In a real app, this would open appointment details
                        console.log("View appointment:", appointment);
                      }}
                    >
                      <div className="font-medium">
                        {appointment.time} - {appointment.endTime}
                      </div>
                      <div>{appointment.patientName}</div>
                      <div className="text-xs text-base-content/70 capitalize">
                        {appointment.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Available Slots */}
              <div className="mt-4 pt-2 border-t border-base-200">
                <h3 className="text-xs font-medium mb-2">Available Slots:</h3>
                <div className="flex flex-wrap gap-1">
                  {getSlotsForDate(date).map((slot, index) => (
                    <button
                      key={`slot-${date}-${index}`}
                      className="btn btn-xs btn-outline"
                      onClick={() => handleSlotSelect(slot)}
                    >
                      {slot.time}
                    </button>
                  ))}
                  {getSlotsForDate(date).length === 0 && (
                    <span className="text-xs text-base-content/50">
                      No available slots
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              {selectedDate
                ? formatDateForDisplay(selectedDate)
                : "Select a date"}
            </h2>

            {selectedDate ? (
              <>
                <div className="divider">Appointments</div>

                {getAppointmentsForDate(selectedDate).length === 0 ? (
                  <div className="alert alert-info">
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
                    <span>No appointments scheduled for this day.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getAppointmentsForDate(selectedDate).map((appointment) => (
                      <div key={appointment.id} className="card bg-base-200">
                        <div className="card-body p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">
                                {appointment.time} - {appointment.endTime}
                              </h3>
                              <p className="text-base-content/80">
                                {appointment.patientName}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="badge badge-sm">
                                  {appointment.type}
                                </div>
                                <div className="text-xs text-base-content/70">
                                  {appointment.duration} min
                                </div>
                              </div>
                            </div>
                            <div className="badge badge-primary">Confirmed</div>
                          </div>

                          {appointment.notes && (
                            <div className="mt-2 text-sm">
                              <p className="font-medium">Notes:</p>
                              <p className="text-base-content/80">
                                {appointment.notes}
                              </p>
                            </div>
                          )}

                          <div className="card-actions justify-end mt-2">
                            <button className="btn btn-sm btn-outline">
                              Reschedule
                            </button>
                            <button className="btn btn-sm btn-error">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="divider">Available Slots</div>

                {getSlotsForDate(selectedDate).length === 0 ? (
                  <div className="alert alert-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
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
                    <span>No available slots for this day.</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {getSlotsForDate(selectedDate).map((slot, index) => (
                      <button
                        key={`day-slot-${index}`}
                        className="btn btn-outline"
                        onClick={() => handleSlotSelect(slot)}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="alert alert-info">
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
                <span>Please select a date to view details.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Schedule New Appointment</h3>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Patient</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="input input-bordered w-full pr-10"
                  placeholder="Search for patient..."
                  value={newAppointment.patientName || searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowPatientSearch(true)}
                />
                {newAppointment.patientName && (
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => {
                      setNewAppointment({
                        ...newAppointment,
                        patientId: "",
                        patientName: "",
                      });
                      setSearchTerm("");
                    }}
                  >
                    <X size={16} />
                  </button>
                )}

                {showPatientSearch && (
                  <div className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg rounded-md max-h-60 overflow-auto">
                    {filteredPatients.length === 0 ? (
                      <div className="p-2 text-center text-base-content/70">
                        No patients found
                      </div>
                    ) : (
                      filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className="p-2 hover:bg-base-200 cursor-pointer"
                          onClick={() => handlePatientSelect(patient)}
                        >
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-base-content/70">
                            {patient.age} years, {patient.gender} •{" "}
                            {patient.contact}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered"
                  value={newAppointment.date}
                  onChange={handleAppointmentFormChange}
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
                  className="input input-bordered"
                  value={newAppointment.time}
                  onChange={handleAppointmentFormChange}
                  placeholder="e.g. 10:00 AM"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Duration (minutes)</span>
                </label>
                <select
                  name="duration"
                  className="select select-bordered w-full"
                  value={newAppointment.duration}
                  onChange={handleAppointmentFormChange}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  name="type"
                  className="select select-bordered w-full"
                  value={newAppointment.type}
                  onChange={handleAppointmentFormChange}
                >
                  <option value="in-person">In-Person</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Notes</span>
              </label>
              <textarea
                name="notes"
                className="textarea textarea-bordered"
                value={newAppointment.notes}
                onChange={handleAppointmentFormChange}
                placeholder="Add appointment notes..."
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setShowNewAppointmentModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateAppointment}
                disabled={
                  !newAppointment.patientId ||
                  !newAppointment.date ||
                  !newAppointment.time
                }
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduling;
