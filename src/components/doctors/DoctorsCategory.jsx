"use client";

import { useEffect, useState } from "react";
import {
  Award,
  MessageCircle,
  Calendar,
  Star,
  Users,
  Clock,
  ArrowRight,
  HospitalIcon,
  X,
  CheckCircle,
  MapPin,
  Phone,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../extra/loaders/LoadingSpinner";
const DoctorsCategory = ({ speciality }) => {
  const { doctors, setDoctors, theme, user, loader, setLoader, isDarkMode } =
    useAuth();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
    setFormStep(1);
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setAppointmentDate("");
    setAppointmentTime("");
    setFormStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newAppointment = {
      patientName: user?.displayName,
      patientEmail: user?.email,
      doctorName: selectedDoctor.name,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      appointmentType: appointmentType,
      doctorId: selectedDoctor._id,
      selectedDoctor: selectedDoctor,
    };

    try {
      const response = await axiosPublic.post(`/appointment`, newAppointment);
      console.log("Appointment Created:", response.data);
    } catch (error) {
      console.error(
        "Error creating appointment:",
        error.response?.data || error.message
      );
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      console.log("specialty:", speciality);
      if (!speciality) return;

      try {
        const res = await axiosPublic.get(`/doctors/${speciality}`);
        const data = await res.data;
        console.log("Fetched Data:", data);

        // Filter the doctors based on speciality (if needed)
        const selectedCategoryDoctors = data.filter(
          (d) => d.specialty === speciality
        );
        console.log("selectedCategoryDoctors:", selectedCategoryDoctors);

        setDoctors(selectedCategoryDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoader(false);
      }
    };

    fetchDoctors();
  }, [speciality]);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  if (loader) {
    return <LoadingSpinner />;
  }

  return (
    <section
      className={`py-16 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200"
          : "bg-gradient-to-r from-[#D3E2CD] to-[#e8f0e5] text-gray-900"
      } transition-all relative duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            } mb-4 relative inline-block`}
          >
            Meet Our Expert Doctors
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
          </h2>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Our team of highly qualified medical professionals is here to
            provide you with the best healthcare services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {doctors?.slice(0, 3).map((doctor, index) => (
            <div
              key={index}
              className={`group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                isDarkMode
                  ? " border border-gray-700 bg-gray-800"
                  : "border border-gray-100 bg-white"
              }`}
            >
              <div className="relative overflow-hidden">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 flex items-center gap-1 shadow-md transform group-hover:scale-110 transition-transform duration-300 ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{doctor.rating}</span>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className={`p-2 rounded-full shadow-lg transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-blue-50"
                    }`}
                  >
                    <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button
                    className={`p-2 rounded-full shadow-lg transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-blue-50"
                    }`}
                  >
                    <Phone
                      className={`w-5 h-5 ${
                        isDarkMode ? "text-green-400" : "text-green-600"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3
                    className={`text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${
                      isDarkMode
                        ? "text-white group-hover:text-blue-400"
                        : "text-gray-900"
                    }`}
                  >
                    {doctor.name}
                  </h3>

                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <HospitalIcon
                        className={`w-5 h-5 ${
                          isDarkMode ? "text-green-400" : "text-green-600"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {doctor.hospital}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`inline-block px-3 py-1 rounded-full font-medium text-sm ${
                      isDarkMode
                        ? "bg-gradient-to-r from-blue-900/30 to-indigo-900/30 text-blue-400"
                        : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600"
                    }`}
                  >
                    {doctor.specialty}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
                    }`}
                  >
                    <Clock
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-indigo-400" : "text-indigo-500"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {doctor.experience}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
                    }`}
                  >
                    <Users
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-indigo-400" : "text-indigo-500"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {doctor.patients} Patients
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Achievements
                    </span>
                  </div>
                  <ul
                    className={`text-sm space-y-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {doctor.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-2 pl-2 border-l-2 ${
                          isDarkMode ? "border-blue-800" : "border-blue-200"
                        }`}
                      >
                        <span
                          className={
                            isDarkMode ? "text-blue-400" : "text-blue-500"
                          }
                        >
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleOpenModal(doctor)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                  <button
                    className={`p-3 border rounded-lg transition-all duration-300 flex items-center justify-center ${
                      isDarkMode
                        ? "text-blue-400 hover:text-blue-300 border-blue-800 hover:border-blue-700 hover:bg-blue-900/20"
                        : "text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/doctors"
            className={`inline-flex items-center px-6 py-3 rounded-lg shadow-md hover:shadow-lg font-semibold group transition-all duration-300 transform hover:-translate-y-1 ${
              isDarkMode
                ? "bg-gray-800 text-blue-400 hover:text-blue-300"
                : "bg-white text-blue-600 hover:text-blue-700"
            }`}
          >
            View All Doctors
            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {isModalOpen && selectedDoctor && (
          <div
            className={`absolute fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 ${
              isDarkMode ? "dark" : ""
            }`}
            onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
          >
            <div
              role="dialog"
              aria-labelledby="modal-title"
              className={`bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden transition-all duration-300 transform ${
                isDarkMode ? "dark:bg-gray-800" : ""
              } ${
                isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="absolute top-12 left-6 flex items-end">
                  <div
                    className={`w-24 h-24 rounded-full border-4 overflow-hidden bg-white ${
                      isDarkMode ? "dark:border-gray-800" : "border-white"
                    }`}
                  >
                    <img
                      src={selectedDoctor.image || "/placeholder.svg"}
                      alt={selectedDoctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 pb-2">
                    <h3 className="text-xl font-bold text-white">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-blue-100">{selectedDoctor.specialty}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="absolute top-3 right-3 text-white hover:text-gray-200 bg-black/20 hover:bg-black/30 rounded-full p-1 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 pt-16">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div
                      className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        isDarkMode ? "bg-green-900/30" : "bg-green-100"
                      }`}
                    >
                      <CheckCircle
                        className={`w-10 h-10 ${
                          isDarkMode ? "text-green-400" : "text-green-600"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Appointment Confirmed!
                    </h3>
                    <p
                      className={`mb-6 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Your appointment with {selectedDoctor.name} has been
                      scheduled for {appointmentDate} at {appointmentTime}.
                    </p>
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          formStep >= 1
                            ? "bg-blue-600 text-white"
                            : isDarkMode
                            ? "bg-gray-700 text-gray-400"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        1
                      </div>
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          formStep >= 2
                            ? "bg-blue-600"
                            : isDarkMode
                            ? "bg-gray-700"
                            : "bg-gray-200"
                        }`}
                      ></div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          formStep >= 2
                            ? "bg-blue-600 text-white"
                            : isDarkMode
                            ? "bg-gray-700 text-gray-400"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        2
                      </div>
                    </div>

                    {formStep === 1 ? (
                      <div className="space-y-4">
                        <div
                          className={`flex items-start gap-4 p-4 rounded-lg mb-6 ${
                            isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
                          }`}
                        >
                          <MapPin
                            className={`w-5 h-5 flex-shrink-0 mt-1 ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          />
                          <div>
                            <h4
                              className={`font-medium ${
                                isDarkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Hospital
                            </h4>
                            <p
                              className={`${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {selectedDoctor.hospital}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label
                              className={`block text-sm font-medium mb-1 ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Appointment Date
                            </label>
                            <input
                              type="date"
                              value={appointmentDate}
                              onChange={(e) =>
                                setAppointmentDate(e.target.value)
                              }
                              min={new Date().toISOString().split("T")[0]}
                              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                isDarkMode
                                  ? "border-gray-600 bg-gray-700 text-white dark:focus:ring-blue-400"
                                  : "border-gray-300"
                              }`}
                              required
                            />
                          </div>

                          <div>
                            <label
                              className={`block text-sm font-medium mb-1 ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                            >
                              Appointment Type
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                type="button"
                                className={`px-4 py-2 rounded-lg border ${
                                  appointmentType === "in-person"
                                    ? isDarkMode
                                      ? "bg-blue-900/20 border-blue-800 text-blue-400"
                                      : "bg-blue-50 border-blue-200 text-blue-600"
                                    : isDarkMode
                                    ? "border-gray-600 text-gray-300"
                                    : "border-gray-300 text-gray-700"
                                }`}
                                onClick={() => setAppointmentType("in-person")}
                              >
                                In-Person
                              </button>
                              <button
                                type="button"
                                className={`px-4 py-2 rounded-lg border ${
                                  appointmentType === "virtual"
                                    ? isDarkMode
                                      ? "bg-blue-900/20 border-blue-800 text-blue-400"
                                      : "bg-blue-50 border-blue-200 text-blue-600"
                                    : isDarkMode
                                    ? "border-gray-600 text-gray-300"
                                    : "border-gray-300 text-gray-700"
                                }`}
                                onClick={() => setAppointmentType("virtual")}
                              >
                                Virtual
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setFormStep(2)}
                            disabled={!appointmentDate}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label
                            className={`block text-sm font-medium mb-2 ${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            Available Time Slots
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                className={`px-2 py-2 text-sm rounded-lg border ${
                                  appointmentTime === time
                                    ? isDarkMode
                                      ? "bg-blue-900/20 border-blue-800 text-blue-400"
                                      : "bg-blue-50 border-blue-200 text-blue-600"
                                    : isDarkMode
                                    ? "border-gray-600 text-gray-300"
                                    : "border-gray-300 text-gray-700"
                                }`}
                                onClick={() => setAppointmentTime(time)}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div
                          className={`mt-6 p-4 rounded-lg ${
                            isDarkMode ? "bg-gray-700/30" : "bg-gray-50"
                          }`}
                        >
                          <h4
                            className={`font-medium mb-2 ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            Appointment Summary
                          </h4>
                          <ul
                            className={`space-y-2 text-sm ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <li className="flex justify-between">
                              <span>Doctor:</span>
                              <span className="font-medium">
                                {selectedDoctor.name}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Date:</span>
                              <span className="font-medium">
                                {appointmentDate}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Time:</span>
                              <span className="font-medium">
                                {appointmentTime}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span>Type:</span>
                              <span className="font-medium capitalize">
                                {appointmentType}
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <button
                            type="button"
                            onClick={() => setFormStep(1)}
                            className={`px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-300 ${
                              isDarkMode
                                ? "border-gray-600 text-gray-300 dark:hover:bg-gray-700"
                                : "border-gray-300 text-gray-700"
                            }`}
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={!appointmentTime || isSubmitting}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            {isSubmitting ? (
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
                                Processing...
                              </>
                            ) : (
                              "Confirm Booking"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsCategory;
