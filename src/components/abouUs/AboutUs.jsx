import React, { useState, useEffect, useContext, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import healthcareBg from "../../assets/aboutUs/healthcare-bg.webp"; // Placeholder
import medical1 from "../../assets/aboutUs/doctor-consulting.jpg"; // Placeholder
import medical2 from "../../assets/aboutUs/medical-equipment.jpg"; // Placeholder
import medical3 from "../../assets/aboutUs/hospital-team.jpg"; // Placeholder
import medical4 from "../../assets/aboutUs/patient-care.jpg"; // Placeholder
import {
  MdHeadsetMic,
  MdOutlineSecurity,
  MdOutlineSecurityUpdate,
} from "react-icons/md";
import { FaHeartbeat, FaGlobe, FaShieldAlt, FaUserCheck } from "react-icons/fa";
import { FiBell, FiFileText, FiGrid } from "react-icons/fi";
import { AuthContexts } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import SouravImg from "../../assets/OurTeam/souravdebnath.jpg";
import SudiptaImg from "../../assets/OurTeam/sudiptaroy.jpg";
import JasminImg from "../../assets/OurTeam/jasminaramim.jpg";
import JoyetaImg from "../../assets/OurTeam/joyetamondal.jpg";
import RohitImg from "../../assets/OurTeam/rohit.jpg";
import AbirImg from "../../assets/OurTeam/abir.jpg";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import FeedbackComponent from "./FeedbackComponent";

const AboutUs = () => {
  const howItWorksRef = useRef(null);
  const { dbUser, isDarkMode } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContexts);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  };

  const darkModeStyles = {
    backgroundColor: isDarkMode ? "#1a1a1a" : "",
    color: isDarkMode ? "#ffffff" : "",
  };

  const [startAnimation, setStartAnimation] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (!rating) return alert("Please select a rating.");
    const newFeedback = {
      userRating: rating,
      userFeedback: feedback,
      userEmail: dbUser?.email,
      userName: dbUser?.name,
      image: dbUser?.photo,
      role: dbUser?.role,
      date: new Date().toString(),
    };

    try {
      const response = await axiosPublic.post("/feedback", newFeedback);
    } catch (error) {
      console.log(error);
    }

    Swal.fire({
      title: "Thank you!",
      text: `You rated us ${rating} stars.`,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: true,
      timer: 3000,
      timerProgressBar: true,
    });

    setRating(0);
    setFeedback("");
  };

  const teamMembers = [
    {
      image: SudiptaImg,
      name: "Sheak Fahad",
      project_role: "UI Designer and Developer",
      email: "jasminaramim@gmail.com",
      expertise: "Frontend Development, MERN Stack, Medical UI Design",
      offer:
        "I crafted intuitive interfaces to enhance patient and provider experiences on the platform.",
    },
    {
      image: SouravImg,
      name: "Sourav Debnath",
      project_role: "Team Leader",
      email: "sdsouravdebnath26@gmail.com",
      expertise: "Full stack Development, React.js, Healthcare UI/UX Design",
      offer:
        "I ensured the AdvanceHealthcare platform is responsive, user-friendly, and optimized for patient and provider needs.",
    },
    {
      image: JasminImg,
      name: "Nur Hasan Hasib",
      project_role: "UI Designer and Developer",
      email: "jasminaramim@gmail.com",
      expertise: "Frontend Development, MERN Stack, Medical UI Design",
      offer:
        "I crafted intuitive interfaces to enhance patient and provider experiences on the platform.",
    },
  ];

  useEffect(() => {
    if (inView) {
      setStartAnimation(true);
    }
  }, [inView]);

  return (
    <div style={darkModeStyles} className="overflow-x-hidden">
      {/* 🔹 Hero Section with Gradient Background */}
      <div
        className={`relative overflow-hidden ${
          isDarkMode
            ? "bg-gray-900"
            : "bg-gradient-to-r from-blue-900 to-teal-900"
        }`}
      >
        <div className="container min-h-screen mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="w-full md:w-1/2 text-center md:text-left z-10"
          >
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
                isDarkMode ? "text-white" : "text-white"
              }`}
            >
              Advancing Healthcare <br className="hidden md:block" />
              <span className="text-blue-200">Since 2015</span>
            </h1>
            <p
              className={`text-xl mb-8 ${
                isDarkMode ? "text-blue-100" : "text-blue-100"
              }`}
            >
              Your trusted platform for innovative healthcare solutions
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link to="/services" aria-label="Navigate to services page">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="lg:px-8 lg:py-3 p-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Explore Services
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:px-8 lg:py-3 p-3 border-2 border-white lg:w-1/3 text-white font-bold rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
                onClick={() =>
                  howItWorksRef.current.scrollIntoView({ behavior: "smooth" })
                }
                aria-label="Scroll to How It Works section"
              >
                How It Works
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating healthcare elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${
                isDarkMode ? "bg-blue-900/30" : "bg-white/20"
              } rounded-full`}
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 40 - 20],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* 🔹 Our Story Section */}
      <div className={`py-16 ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="w-full lg:w-1/2 relative">
              <div
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } p-2 rounded-xl shadow-2xl`}
              >
                <img
                  className="w-full h-auto rounded-lg object-cover"
                  src={healthcareBg}
                  alt="Healthcare innovation"
                />
              </div>
              <div
                className={`absolute -bottom-6 -right-6 ${
                  isDarkMode ? "bg-blue-900" : "bg-blue-500"
                } p-4 rounded-xl shadow-lg w-1/3`}
              >
                <h3
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-blue-200" : "text-white"
                  }`}
                >
                  Since 2015
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-blue-300" : "text-blue-100"
                  }`}
                >
                  Serving millions
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="mb-2">
                <span
                  className={`px-3 py-1 rounded-full ${
                    isDarkMode
                      ? "bg-blue-900 text-blue-200"
                      : "bg-blue-100 text-blue-600"
                  } text-sm font-semibold`}
                >
                  OUR JOURNEY
                </span>
              </div>
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                The Story Behind{" "}
                <span className="text-blue-500">AdvanceHealthcare</span>
              </h2>
              <div
                className={`h-1 w-20 mb-6 ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-400"
                }`}
              ></div>

              <p
                className={`text-lg mb-6 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Founded in 2015, AdvanceHealthcare was created with a vision to
                transform healthcare delivery through technology and innovation.
              </p>

              <div
                className={`p-6 rounded-lg mb-6 ${
                  isDarkMode ? "bg-gray-800" : "bg-blue-50"
                } border-l-4 border-blue-500`}
              >
                <p
                  className={`italic ${
                    isDarkMode ? "text-blue-200" : "text-blue-600"
                  }`}
                >
                  "Our commitment to patient care and provider efficiency has
                  made us a trusted partner in healthcare."
                </p>
              </div>

              <p
                className={`text-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                From a small startup, we’ve grown into a global platform,
                empowering healthcare providers and patients with cutting-edge
                solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🔹 Trust Section with Animated Cards */}
      <div className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Your <span className="text-blue-500">Trust</span> Is Our Priority
            </h2>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              AdvanceHealthcare is built on pillars of security, transparency,
              and exceptional service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <MdOutlineSecurity className="text-3xl" />,
                title: "Secure Data",
                description: "HIPAA-compliant encryption for patient data.",
                color: "from-blue-500 to-teal-500",
              },
              {
                icon: <FaUserCheck className="text-3xl" />,
                title: "Verified Providers",
                description: "All providers are vetted for quality and trust.",
                color: "from-indigo-500 to-blue-500",
              },
              {
                icon: <FaHeartbeat className="text-3xl" />,
                title: "Patient-Centric",
                description: "Solutions designed with patients in mind.",
                color: "from-teal-500 to-cyan-500",
              },
              {
                icon: <FaShieldAlt className="text-3xl" />,
                title: "Data Protection",
                description: "Robust policies to safeguard your information.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                icon: <MdOutlineSecurityUpdate className="text-3xl" />,
                title: "Regular Audits",
                description: "Frequent security and compliance checks.",
                color: "from-cyan-500 to-teal-500",
              },
              {
                icon: <MdHeadsetMic className="text-3xl" />,
                title: "24/7 Support",
                description:
                  "Dedicated team for healthcare providers and patients.",
                color: "from-indigo-500 to-blue-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative group max-w-[300px] mx-auto rounded-xl p-4 sm:p-6 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
                role="region"
                aria-label={item.title}
              >
                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-slate-800 to-gray-800"
                      : "bg-gradient-to-r from-blue-100 to-teal-100"
                  }`}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-4 group-hover:rotate-[360deg] transition-transform duration-500`}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base line-clamp-3 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 mt-4 group-hover:w-20 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 How It Works Section */}
      <div
        className={`py-16 ${isDarkMode ? "bg-gray-950" : "bg-gray-50"}`}
        ref={howItWorksRef}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              How <span className="text-blue-500">AdvanceHealthcare</span> Works
            </h2>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              A simple guide to accessing our healthcare solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <FaHeartbeat className="text-3xl" />,
                title: "Explore Services",
                description: "Discover our range of healthcare solutions.",
                color: "from-blue-500 to-teal-500",
              },
              {
                icon: <FaUserCheck className="text-3xl" />,
                title: "Connect with Providers",
                description: "Access vetted healthcare professionals.",
                color: "from-indigo-500 to-blue-500",
              },
              {
                icon: <FaShieldAlt className="text-3xl" />,
                title: "Secure Access",
                description: "Log in securely to manage your healthcare needs.",
                color: "from-teal-500 to-cyan-500",
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: "Global Reach",
                description: "Connect with healthcare providers worldwide.",
                color: "from-blue-500 to-indigo-500",
              },
              {
                icon: <FiFileText className="text-3xl" />,
                title: "Manage Records",
                description: "Securely store and access medical records.",
                color: "from-cyan-500 to-teal-500",
              },
              {
                icon: <MdHeadsetMic className="text-3xl" />,
                title: "Get Support",
                description: "Our team is here to assist you 24/7.",
                color: "from-indigo-500 to-blue-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`relative group max-w-[300px] mx-auto rounded-xl p-4 sm:p-6 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
                role="region"
                aria-label={item.title}
              >
                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-slate-800 to-gray-800"
                      : "bg-gradient-to-r from-blue-100 to-teal-100"
                  }`}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-4 group-hover:rotate-[360deg] transition-transform duration-500`}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base line-clamp-3 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.description}
                  </p>
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 mt-4 group-hover:w-20 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-blue-100"
        } py-8 px-4 text-center`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent ${
                isDarkMode
                  ? "bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400"
                  : "bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400"
              }`}
            >
              Meet Our Healthcare Innovators
            </h2>
            <p
              className={`mt-4 max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our dedicated team works tirelessly to deliver cutting-edge
              healthcare solutions for patients and providers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{ animationDelay: `${index * 0.4}s` }}
                className={`relative group rounded-xl p-6 transition-transform duration-500 ease-in-out hover:scale-105 scale-100 ${
                  isDarkMode
                    ? "bg-gray-900 shadow-[0_0_15px_rgba(59,130,246,0.95)]"
                    : "bg-slate-200 shadow-[0_0_30px_rgba(59,130,246,1)]"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-slate-800 to-gray-800"
                      : "bg-gradient-to-r from-blue-100 to-teal-100"
                  }`}
                />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-blue-400 mb-4"
                  />
                  <h3
                    className={`font-bold text-xl mb-3 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-blue-300" : "text-blue-600"
                    }`}
                  >
                    {member.project_role}
                  </p>
                  <p
                    className={`text-sm mb-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    📧 {member.email}
                  </p>
                  <p
                    className={`text-xs mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span className="font-semibold text-blue-500">
                      Expertise:
                    </span>{" "}
                    {member.expertise}
                  </p>
                  <p
                    className={`text-xs italic ${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    "{member.offer}"
                  </p>
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 mt-5 group-hover:w-20 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Rate Us Section - Enhanced with Animations */}
      <div
        className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
          isDarkMode
            ? "bg-gray-950"
            : "bg-gradient-to-b from-blue-50 to-teal-50"
        }`}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <div
            className={`text-center p-8 rounded-xl ${
              isDarkMode
                ? "bg-gray-800/90 backdrop-blur-sm"
                : "bg-white/90 backdrop-blur-sm"
            } shadow-xl transition-all duration-300 hover:shadow-2xl`}
          >
            <div className="mb-2">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  isDarkMode
                    ? "bg-blue-900/50 text-blue-300"
                    : "bg-blue-100 text-blue-800"
                } animate-pulse`}
              >
                WE VALUE YOUR FEEDBACK
              </span>
            </div>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              How was your healthcare experience?
            </h2>
            <p
              className={`max-w-2xl mx-auto mb-6 text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Your feedback helps us improve AdvanceHealthcare for everyone
            </p>

            {/* Star Rating - Enhanced with Pulse Animation */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-white/10 backdrop-blur-md p-2 rounded-full">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setRating(star);
                      if (typeof window !== "undefined") {
                        new Audio("/sounds/click.mp3")
                          .play()
                          .catch((e) => console.log("Audio play failed:", e));
                      }
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`mx-1 transition-all duration-200 transform ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 scale-125 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                        : isDarkMode
                        ? "text-gray-500 hover:text-yellow-300"
                        : "text-gray-300 hover:text-yellow-500"
                    }`}
                    aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                  >
                    <span className="text-4xl">★</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Form */}
            <div className="max-w-2xl mx-auto">
              <textarea
                rows="4"
                placeholder="Tell us about your experience (optional)..."
                className={`w-full p-4 rounded-xl border-2 ${
                  isDarkMode
                    ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/30"
                    : "bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                } focus:outline-none focus:ring-4 transition-all duration-200 resize-none`}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>

              <div className="mt-6 gap-8 grid grid-cols-1 md:flex justify-center">
                <button
                  onClick={() => {
                    handleSubmit();
                    if (typeof window !== "undefined") {
                      import("sweetalert2").then((Swal) => {
                        Swal.default.fire({
                          title: "Thank You!",
                          text: "Your feedback has been submitted successfully.",
                          icon: "success",
                          confirmButtonText: "Awesome!",
                          background: isDarkMode ? "#1f2937" : "#ffffff",
                          color: isDarkMode ? "#ffffff" : "#1f2937",
                          confirmButtonColor: isDarkMode
                            ? "#3b82f6"
                            : "#2563eb",
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: () => {
                            new Audio("/sounds/success.mp3")
                              .play()
                              .catch((e) =>
                                console.log("Audio play failed:", e)
                              );
                          },
                        });
                      });
                    }
                  }}
                  disabled={!rating}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:scale-105 focus:outline-none shadow-lg ${
                    rating
                      ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-blue-500/30 hover:brightness-110"
                      : isDarkMode
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit Feedback
                </button>
                <NavLink
                  to={"/dashboard/feedback"}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:scale-105 focus:outline-none shadow-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-blue-500/30 hover:brightness-110 ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit Complains
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for floating animation */}
        <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-100px) translateX(20px);
            }
            100% {
              transform: translateY(-200px) translateX(0);
            }
          }
        `}</style>
      </div>
      {/* <FeedbackComponent /> */}

      {/* CTA Section - Enhanced with Floating Elements */}
      {!user && (
        <div
          className={`relative overflow-hidden py-20 px-4 sm:px-6 ${
            isDarkMode
              ? "bg-gray-950"
              : "bg-gradient-to-br from-blue-900 to-teal-900"
          }`}
        >
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => {
              const size = Math.random() * 20 + 10;
              const duration = Math.random() * 20 + 10;
              const delay = Math.random() * 5;
              const color = isDarkMode
                ? `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1})`
                : `rgba(13, 148, 136, ${Math.random() * 0.3 + 0.1})`;

              return (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: color,
                    opacity: 0.3,
                    animation: `float ${duration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                    filter: "blur(1px)",
                  }}
                />
              );
            })}
          </div>

          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md`}
            >
              Ready to Transform Healthcare?
            </h2>
            <p
              className={`max-w-2xl mx-auto text-lg mb-8 ${
                isDarkMode ? "text-gray-300" : "text-blue-200"
              }`}
            >
              Join thousands of providers and patients using AdvanceHealthcare
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    new Audio("/sounds/click.mp3")
                      .play()
                      .catch((e) => console.log("Audio play failed:", e));
                  }
                }}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 focus:scale-105 focus:outline-none shadow-lg ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-blue-500/30 hover:brightness-110"
                    : "bg-white text-blue-900 hover:shadow-lg hover:shadow-white/20 hover:brightness-95"
                }`}
              >
                Join as Patient
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    new Audio("/sounds/click.mp3")
                      .play()
                      .catch((e) => console.log("Audio play failed:", e));
                  }
                }}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 focus:scale-105 focus:outline-none shadow-lg ${
                  isDarkMode
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-indigo-500/30 hover:brightness-110"
                    : "bg-gradient-to-r from-blue-500 to-teal-600 text-white hover:shadow-blue-500/30 hover:brightness-110"
                }`}
              >
                Partner as Provider
              </button>
            </div>

            <div className="mt-8">
              <Link
                to="/terms"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-300 hover:text-white"
                }`}
              >
                Terms and Conditions
              </Link>
            </div>
          </div>

          {/* CSS for floating animation */}
          <style jsx>{`
            @keyframes float {
              0% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
              }
              50% {
                transform: translateY(-50px) translateX(20px);
                opacity: 0.6;
              }
              100% {
                transform: translateY(-100px) translateX(0);
                opacity: 0.3;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
