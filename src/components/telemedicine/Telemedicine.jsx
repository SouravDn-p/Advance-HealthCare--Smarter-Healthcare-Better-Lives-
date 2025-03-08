"use client";

import { useState, useEffect, useRef } from "react";
import {
  Video,
  Phone,
  Mic,
  MicOff,
  VideoOff,
  MessageSquare,
  X,
  Paperclip,
  Send,
  Clock,
  Calendar,
  User,
  FileText,
  ChevronRight,
  ChevronDown,
  Check,
  AlertCircle,
  Info,
  Settings,
  Upload,
  Download,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  MoreVertical,
  Loader,
  Star,
  ThumbsUp,
  ThumbsDown,
  Clipboard,
  MapPin,
  Shield,
  Pill,
  Stethoscope,
  Heart,
  Brain,
  Bone,
  Eye,
  Thermometer,
  Activity,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import DoctorCard from "../shared/DoctorCard";

const Telemedicine = () => {
  const { user, theme } = useAuth();
  const [activeView, setActiveView] = useState("upcoming");
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showPreConsultForm, setShowPreConsultForm] = useState(false);
  const [preConsultForm, setPreConsultForm] = useState({
    symptoms: "",
    duration: "",
    medications: "",
    allergies: "",
    questions: "",
  });
  const [showPostConsultSummary, setShowPostConsultSummary] = useState(false);
  const [consultationRating, setConsultationRating] = useState(0);
  const [consultationFeedback, setConsultationFeedback] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    doctor: null,
    date: "",
    time: "",
    reason: "",
  });

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Sample upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Cardiologist",
      date: "2023-12-15",
      time: "10:00 AM",
      status: "confirmed",
      duration: 30,
      notes: "Follow-up on recent test results",
    },
    {
      id: 2,
      doctorName: "Dr. Mark Wilson",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Neurologist",
      date: "2023-12-18",
      time: "02:30 PM",
      status: "confirmed",
      duration: 45,
      notes: "Initial consultation for headaches",
    },
  ];

  // Sample completed appointments
  const completedAppointments = [
    {
      id: 3,
      doctorName: "Dr. Emily Carter",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Dermatologist",
      date: "2023-11-05",
      time: "09:15 AM",
      status: "completed",
      duration: 20,
      notes: "Skin examination",
      summary:
        "Patient presented with eczema on both arms. Prescribed hydrocortisone cream to be applied twice daily for two weeks.",
      prescription:
        "Hydrocortisone 1% cream, apply to affected areas twice daily for 14 days.",
      followUp: "Schedule follow-up in 3 weeks if condition doesn't improve.",
    },
    {
      id: 4,
      doctorName: "Dr. Sarah Johnson",
      doctorImage: "https://via.placeholder.com/300",
      specialty: "Cardiologist",
      date: "2023-10-10",
      time: "11:30 AM",
      status: "completed",
      duration: 30,
      notes: "Regular checkup",
      summary:
        "Routine cardiac follow-up. Blood pressure within normal range. ECG shows normal sinus rhythm.",
      prescription: "Continue current medications. No changes needed.",
      followUp: "Schedule next appointment in 6 months.",
    },
  ];

  // Sample available doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      image: "https://via.placeholder.com/300",
      specialty: "Cardiology",
      hospital: "City Medical Center",
      rating: 4.9,
      experience: "15 years",
      nextAvailable: "Today, 4:00 PM",
      bio: "Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart disease management.",
      education: "Harvard Medical School",
      languages: ["English", "Spanish"],
      consultationFee: "$150",
    },
    {
      id: 2,
      name: "Dr. Mark Wilson",
      image: "https://via.placeholder.com/300",
      specialty: "Neurology",
      hospital: "Metro Neurology Clinic",
      rating: 4.8,
      experience: "12 years",
      nextAvailable: "Tomorrow, 10:00 AM",
      bio: "Dr. Wilson specializes in treating neurological disorders including migraines, epilepsy, and stroke recovery.",
      education: "Johns Hopkins University",
      languages: ["English", "French"],
      consultationFee: "$175",
    },
    {
      id: 3,
      name: "Dr. Emily Carter",
      image: "https://via.placeholder.com/300",
      specialty: "Dermatology",
      hospital: "Skin Health Center",
      rating: 4.7,
      experience: "8 years",
      nextAvailable: "Today, 2:30 PM",
      bio: "Dr. Carter is an expert in medical and cosmetic dermatology, treating conditions from acne to skin cancer.",
      education: "Stanford University",
      languages: ["English"],
      consultationFee: "$140",
    },
    {
      id: 4,
      name: "Dr. James Rodriguez",
      image: "https://via.placeholder.com/300",
      specialty: "Orthopedics",
      hospital: "Joint & Spine Institute",
      rating: 4.9,
      experience: "20 years",
      nextAvailable: "Dec 16, 9:00 AM",
      bio: "Dr. Rodriguez specializes in sports medicine and joint replacement surgery with a focus on minimally invasive techniques.",
      education: "Yale School of Medicine",
      languages: ["English", "Spanish"],
      consultationFee: "$160",
    },
    {
      id: 5,
      name: "Dr. Lisa Chen",
      image: "https://via.placeholder.com/300",
      specialty: "Pediatrics",
      hospital: "Children's Medical Center",
      rating: 4.9,
      experience: "10 years",
      nextAvailable: "Today, 5:30 PM",
      bio: "Dr. Chen is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.",
      education: "University of California, San Francisco",
      languages: ["English", "Mandarin"],
      consultationFee: "$130",
    },
  ];

  // Sample specialties
  const specialties = [
    { name: "Cardiology", icon: <Heart className="w-5 h-5" /> },
    { name: "Neurology", icon: <Brain className="w-5 h-5" /> },
    { name: "Dermatology", icon: <Clipboard className="w-5 h-5" /> },
    { name: "Orthopedics", icon: <Bone className="w-5 h-5" /> },
    { name: "Pediatrics", icon: <User className="w-5 h-5" /> },
    { name: "Ophthalmology", icon: <Eye className="w-5 h-5" /> },
    { name: "Internal Medicine", icon: <Stethoscope className="w-5 h-5" /> },
    { name: "General Practice", icon: <Thermometer className="w-5 h-5" /> },
  ];

  // Sample chat messages
  const sampleMessages = [
    {
      id: 1,
      sender: "doctor",
      text: "Hello! How can I help you today?",
      time: "10:01 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Hi Dr. Johnson, I've been experiencing chest pain when I exercise.",
      time: "10:02 AM",
    },
    {
      id: 3,
      sender: "doctor",
      text: "I'm sorry to hear that. Can you describe the pain? Is it sharp, dull, or pressure-like?",
      time: "10:03 AM",
    },
    {
      id: 4,
      sender: "user",
      text: "It's more like pressure, and sometimes it radiates to my left arm.",
      time: "10:04 AM",
    },
    {
      id: 5,
      sender: "doctor",
      text: "How long have you been experiencing these symptoms?",
      time: "10:05 AM",
    },
    {
      id: 6,
      sender: "user",
      text: "For about 2 weeks now. It only happens when I'm doing cardio exercise.",
      time: "10:06 AM",
    },
    {
      id: 7,
      sender: "doctor",
      text: "I see. Have you had any shortness of breath, dizziness, or sweating along with the chest pain?",
      time: "10:07 AM",
    },
    {
      id: 8,
      sender: "user",
      text: "Yes, I do feel short of breath and sometimes a bit dizzy.",
      time: "10:08 AM",
    },
    {
      id: 9,
      sender: "doctor",
      text: "Thank you for sharing that information. Given your symptoms, I'd like to run some tests to check your heart function. I'll send a prescription for an ECG and stress test.",
      time: "10:10 AM",
    },
    {
      id: 10,
      sender: "doctor",
      text: "In the meantime, please avoid strenuous exercise until we get the test results. If the chest pain becomes severe or lasts more than a few minutes, please go to the emergency room immediately.",
      time: "10:11 AM",
    },
    {
      id: 11,
      sender: "user",
      text: "I understand. Thank you, doctor.",
      time: "10:12 AM",
    },
    {
      id: 12,
      sender: "doctor",
      text: "You're welcome. I'm sending the test prescriptions now. You should receive them in your email shortly. Do you have any other questions?",
      time: "10:13 AM",
    },
    {
      id: 13,
      sender: "user",
      text: "No, that's all for now. I'll schedule those tests right away.",
      time: "10:14 AM",
    },
    {
      id: 14,
      sender: "doctor",
      text: "Great. Please let me know once you have the results, and we can schedule a follow-up appointment to discuss them.",
      time: "10:15 AM",
    },
    {
      id: 15,
      sender: "system",
      text: "Dr. Johnson has sent you a prescription. Check your email or the Prescriptions section to view it.",
      time: "10:16 AM",
    },
  ];

  // Initialize available doctors
  useEffect(() => {
    setAvailableDoctors(doctors);
  }, []);

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle joining consultation
  const handleJoinConsultation = (appointment) => {
    setIsLoading(true);
    setSelectedAppointment(appointment);

    // Simulate connection delay
    setTimeout(() => {
      setActiveView("waiting");
      setIsLoading(false);
      setCountdown(30); // 30 seconds in waiting room

      // Simulate doctor joining after countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setActiveView("consultation");
            setMessages(sampleMessages);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 2000);
  };

  // Handle ending consultation
  const handleEndConsultation = () => {
    setShowPostConsultSummary(true);
  };

  // Handle submitting post-consultation feedback
  const handleSubmitFeedback = () => {
    // In a real app, you would send this feedback to your backend
    console.log("Feedback submitted:", {
      rating: consultationRating,
      feedback: consultationFeedback,
    });
    setActiveView("completed");
    setShowPostConsultSummary(false);
    setChatOpen(false);
  };

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  // Handle pre-consultation form submission
  const handlePreConsultSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log("Pre-consultation form submitted:", preConsultForm);
    setShowPreConsultForm(false);
    handleJoinConsultation(selectedAppointment);
  };

  // Filter doctors by specialty and search query
  const filteredDoctors = availableDoctors.filter((doctor) => {
    const matchesSpecialty =
      selectedSpecialty === "all" ||
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  // Handle booking appointment
  const handleBookAppointment = (doctor) => {
    setBookingDetails({ ...bookingDetails, doctor });
    setShowBookingModal(true);
  };

  // Handle booking submission
  const handleSubmitBooking = () => {
    // In a real app, you would send this booking to your backend
    console.log("Booking submitted:", bookingDetails);
    setShowBookingModal(false);

    // Show success message or redirect
    alert(
      `Appointment booked successfully with ${bookingDetails.doctor.name} on ${bookingDetails.date} at ${bookingDetails.time}`
    );
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    // In a real app, this would come from your backend based on doctor availability
    return [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
    ];
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get specialty icon
  const getSpecialtyIcon = (specialtyName) => {
    const specialty = specialties.find(
      (s) => s.name.toLowerCase() === specialtyName.toLowerCase()
    );
    return specialty ? specialty.icon : <Stethoscope className="w-5 h-5" />;
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Telemedicine</h1>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Connect with healthcare providers through secure video
              consultations
            </p>
          </div>

          {activeView === "upcoming" && (
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveView("find")}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                Book New Consultation
              </button>
            </div>
          )}
        </div>

        {/* View selector tabs */}
        {(activeView === "upcoming" || activeView === "completed") && (
          <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 mb-6 w-fit">
            <button
              onClick={() => setActiveView("upcoming")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeView === "upcoming"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              } transition-colors duration-200`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveView("completed")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeView === "completed"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              } transition-colors duration-200`}
            >
              Past Consultations
            </button>
          </div>
        )}

        {/* Main content based on active view */}
        {activeView === "upcoming" && (
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold mb-4">
              Upcoming Telemedicine Appointments
            </h2>

            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Doctor info */}
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

                    {/* Middle - Appointment details */}
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
                            {appointment.time} ({appointment.duration} min)
                          </span>
                        </div>

                        <div className="flex items-center gap-2 col-span-2">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {appointment.notes}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right - Actions */}
                    <div className="p-4 md:p-6 flex flex-col justify-between items-end md:w-1/4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
                      <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">
                          {appointment.status}
                        </span>
                      </div>

                      {/* Check if appointment is today and within 15 minutes of start time */}
                      {new Date(appointment.date).toDateString() ===
                        new Date().toDateString() && (
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowPreConsultForm(true);
                          }}
                          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                        >
                          <Video className="w-4 h-4" />
                          Join Consultation
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No upcoming appointments
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  You don't have any upcoming telemedicine appointments. Book a
                  consultation to get started.
                </p>
                <button
                  onClick={() => setActiveView("find")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Book New Consultation
                </button>
              </div>
            )}
          </div>
        )}

        {activeView === "completed" && (
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold mb-4">Past Consultations</h2>

            {completedAppointments.length > 0 ? (
              completedAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Doctor info */}
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

                    {/* Middle - Appointment details */}
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
                            {appointment.time} ({appointment.duration} min)
                          </span>
                        </div>

                        <div className="flex items-center gap-2 col-span-2">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {appointment.notes}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right - Actions */}
                    <div className="p-4 md:p-6 flex flex-col justify-between items-end md:w-1/4 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
                      <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">
                          {appointment.status}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setActiveView("summary");
                        }}
                        className="mt-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        View Summary
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No past consultations
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                  You haven't had any telemedicine consultations yet. Book your
                  first consultation to get started.
                </p>
                <button
                  onClick={() => setActiveView("find")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Book New Consultation
                </button>
              </div>
            )}
          </div>
        )}

        {activeView === "find" && (
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-semibold">Find a Doctor</h2>

              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="all">All Specialties</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty.name.toLowerCase()}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Specialty quick filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSpecialty("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedSpecialty === "all"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                } transition-colors duration-200 flex items-center gap-2`}
              >
                <Stethoscope className="w-4 h-4" />
                All
              </button>

              {specialties.map((specialty, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedSpecialty(specialty.name.toLowerCase())
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    selectedSpecialty === specialty.name.toLowerCase()
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                  } transition-colors duration-200 flex items-center gap-2`}
                >
                  {specialty.icon}
                  {specialty.name}
                </button>
              ))}
            </div>

            {/* Doctors list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <DoctorCard
                      doctor={doctor}
                      getSpecialtyIcon={getSpecialtyIcon}
                      handleBookAppointment={handleBookAppointment}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                    No doctors match your search criteria. Try adjusting your
                    filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === "waiting" && (
          <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <Loader className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Waiting for {selectedAppointment?.doctorName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
              Your doctor will join the consultation shortly. Please stay on
              this page.
            </p>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-8">
              {Math.floor(countdown / 60)}:
              {(countdown % 60).toString().padStart(2, "0")}
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg max-w-md">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Make sure your camera and microphone are working properly. You
                  can test your settings using the buttons below.
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Test Audio & Video
              </button>
              <button
                onClick={() => setActiveView("upcoming")}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Leave Waiting Room
              </button>
            </div>
          </div>
        )}

        {activeView === "consultation" && (
          <div
            className={`grid ${
              chatOpen ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"
            } gap-4 h-[calc(100vh-200px)]`}
          >
            {/* Video area */}
            <div
              className={`${
                chatOpen ? "col-span-2" : "col-span-1"
              } bg-black rounded-xl overflow-hidden relative`}
            >
              {/* Remote video (doctor) */}
              <video
                ref={remoteVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                poster="https://via.placeholder.com/1280x720/333333/666666?text=Doctor's+Video"
              />

              {/* Local video (patient) - small overlay */}
              <div className="absolute bottom-4 right-4 w-1/4 h-1/4 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                <video
                  ref={localVideoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                  poster="https://via.placeholder.com/320x240/666666/999999?text=Your+Video"
                />

                {!isVideoOn && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <VideoOff className="w-8 h-8 text-red-500" />
                  </div>
                )}

                {!isAudioOn && (
                  <div className="absolute bottom-2 left-2 bg-red-500 rounded-full p-1">
                    <MicOff className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Controls overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`p-3 rounded-full ${
                    isAudioOn
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-red-600 hover:bg-red-700"
                  } transition-colors duration-200`}
                >
                  {isAudioOn ? (
                    <Mic className="w-6 h-6 text-white" />
                  ) : (
                    <MicOff className="w-6 h-6 text-white" />
                  )}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full ${
                    isVideoOn
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-red-600 hover:bg-red-700"
                  } transition-colors duration-200`}
                >
                  {isVideoOn ? (
                    <Video className="w-6 h-6 text-white" />
                  ) : (
                    <VideoOff className="w-6 h-6 text-white" />
                  )}
                </button>

                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                >
                  {isFullScreen ? (
                    <Minimize className="w-6 h-6 text-white" />
                  ) : (
                    <Maximize className="w-6 h-6 text-white" />
                  )}
                </button>

                <button
                  onClick={handleEndConsultation}
                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200"
                >
                  <Phone className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Doctor info overlay */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={selectedAppointment?.doctorImage || "/placeholder.svg"}
                    alt={selectedAppointment?.doctorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {selectedAppointment?.doctorName}
                  </p>
                  <p className="text-gray-300 text-xs">
                    {selectedAppointment?.specialty}
                  </p>
                </div>
              </div>

              {/* Timer overlay */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                <p className="text-white text-sm font-medium">25:13</p>
              </div>
            </div>

            {/* Chat area */}
            {chatOpen && (
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Chat
                  </h3>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user"
                          ? "justify-end"
                          : msg.sender === "system"
                          ? "justify-center"
                          : "justify-start"
                      }`}
                    >
                      {msg.sender === "system" ? (
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 max-w-[80%]">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {msg.text}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {msg.time}
                          </p>
                        </div>
                      ) : (
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            msg.sender === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === "user"
                                ? "text-blue-100"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type your message..."
                      className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeView === "summary" && selectedAppointment && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Consultation Summary
                </h2>
                <button
                  onClick={() => setActiveView("completed")}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        selectedAppointment.doctorImage || "/placeholder.svg"
                      }
                      alt={selectedAppointment.doctorName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {selectedAppointment.doctorName}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {selectedAppointment.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {formatDate(selectedAppointment.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {selectedAppointment.time} (
                        {selectedAppointment.duration} min)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Consultation Summary
                    </h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedAppointment.summary}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Prescription
                    </h4>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <Pill className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedAppointment.prescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Follow-up
                    </h4>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedAppointment.followUp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3 mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Summary
                </button>
                <button
                  onClick={() => setActiveView("find")}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Follow-up
                </button>
                <button
                  onClick={() => setActiveView("completed")}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pre-consultation form modal */}
      {showPreConsultForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Pre-Consultation Form
                </h2>
                <button
                  onClick={() => setShowPreConsultForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please provide some information about your condition to help the
                doctor prepare for your consultation.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePreConsultSubmit();
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      What symptoms are you experiencing?
                    </label>
                    <textarea
                      value={preConsultForm.symptoms}
                      onChange={(e) =>
                        setPreConsultForm({
                          ...preConsultForm,
                          symptoms: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      placeholder="Describe your symptoms in detail"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      How long have you been experiencing these symptoms?
                    </label>
                    <input
                      type="text"
                      value={preConsultForm.duration}
                      onChange={(e) =>
                        setPreConsultForm({
                          ...preConsultForm,
                          duration: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      placeholder="e.g., 3 days, 2 weeks, etc."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Are you currently taking any medications?
                    </label>
                    <textarea
                      value={preConsultForm.medications}
                      onChange={(e) =>
                        setPreConsultForm({
                          ...preConsultForm,
                          medications: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      placeholder="List all medications and dosages"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Do you have any allergies?
                    </label>
                    <textarea
                      value={preConsultForm.allergies}
                      onChange={(e) =>
                        setPreConsultForm({
                          ...preConsultForm,
                          allergies: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      placeholder="List any allergies to medications or other substances"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Do you have any specific questions for the doctor?
                    </label>
                    <textarea
                      value={preConsultForm.questions}
                      onChange={(e) =>
                        setPreConsultForm({
                          ...preConsultForm,
                          questions: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      placeholder="List any questions you want to ask during the consultation"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPreConsultForm(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Submit & Join Consultation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Post-consultation feedback modal */}
      {showPostConsultSummary && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Consultation Feedback
                </h2>
                <button
                  onClick={() => setShowPostConsultSummary(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Thank you for using our telemedicine service. Please take a
                moment to rate your consultation experience.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    How would you rate your consultation with{" "}
                    {selectedAppointment?.doctorName}?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setConsultationRating(rating)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          consultationRating >= rating
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                        } transition-colors duration-200`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            consultationRating >= rating ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Do you have any additional feedback?
                  </label>
                  <textarea
                    value={consultationFeedback}
                    onChange={(e) => setConsultationFeedback(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    placeholder="Share your experience and any suggestions for improvement"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Your feedback helps us improve our telemedicine services.
                      All responses are confidential.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPostConsultSummary(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking modal */}
      {showBookingModal && bookingDetails.doctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Book Appointment
                </h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <img
                  src={bookingDetails.doctor.image || "/placeholder.svg"}
                  alt={bookingDetails.doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {bookingDetails.doctor.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                    {getSpecialtyIcon(bookingDetails.doctor.specialty)}
                    <span>{bookingDetails.doctor.specialty}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Consultation Fee: {bookingDetails.doctor.consultationFee}
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitBooking();
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={bookingDetails.date}
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          date: e.target.value,
                        })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Select Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {getAvailableTimeSlots().map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() =>
                            setBookingDetails({ ...bookingDetails, time })
                          }
                          className={`px-3 py-2 text-sm rounded-lg border ${
                            bookingDetails.time === time
                              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reason for Consultation
                    </label>
                    <textarea
                      value={bookingDetails.reason}
                      onChange={(e) =>
                        setBookingDetails({
                          ...bookingDetails,
                          reason: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      placeholder="Briefly describe your symptoms or reason for the consultation"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                        Secure Telemedicine Consultation
                      </p>
                      <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                        Your consultation will be conducted through our secure
                        platform. You'll receive a confirmation email with
                        instructions to join.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !bookingDetails.date ||
                      !bookingDetails.time ||
                      !bookingDetails.reason
                    }
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Audio & Video Settings
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Camera Preview
                  </h3>
                  <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video mb-4">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      playsInline
                      muted
                      poster="https://via.placeholder.com/640x360/666666/999999?text=Camera+Preview"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Camera
                      </label>
                      <select className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                        <option>FaceTime HD Camera</option>
                        <option>External Webcam</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Enable Camera
                      </span>
                      <button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                          isVideoOn
                            ? "bg-blue-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        } transition-colors duration-200`}
                      >
                        <span
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
                            isVideoOn ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Audio Settings
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Microphone
                      </label>
                      <select className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                        <option>Built-in Microphone</option>
                        <option>External Microphone</option>
                        <option>Headset Microphone</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Speaker
                      </label>
                      <select className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent">
                        <option>Built-in Speakers</option>
                        <option>External Speakers</option>
                        <option>Headphones</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Enable Microphone
                      </span>
                      <button
                        onClick={() => setIsAudioOn(!isAudioOn)}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                          isAudioOn
                            ? "bg-blue-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        } transition-colors duration-200`}
                      >
                        <span
                          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${
                            isAudioOn ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Audio Level
                      </label>
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="75"
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <VolumeX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        Test your audio by speaking and watching the audio level
                        indicator. If there's no movement, check your microphone
                        settings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Telemedicine;
