import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const FeedbackComponent = () => {
  const { dbUser, isDarkMode } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    priority: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dbUser) {
      Swal.fire({
        title: "Error",
        text: "Please log in to submit feedback.",
        icon: "error",
        confirmButtonColor: isDarkMode ? "#3b82f6" : "#2563eb",
        background: isDarkMode ? "#1f2937" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#1f2937",
      });
      return;
    }

    if (
      !formData.title ||
      !formData.type ||
      !formData.category ||
      !formData.priority
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill all required fields.",
        icon: "warning",
        confirmButtonColor: isDarkMode ? "#3b82f6" : "#2563eb",
        background: isDarkMode ? "#1f2937" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#1f2937",
      });
      return;
    }

    setIsSubmitting(true);

    const feedbackPayload = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      category: formData.category,
      priority: formData.priority,
      status: "pending",
      createdAt: new Date().toISOString(),
      createdBy: {
        id: dbUser?.id || "anonymous",
        name: dbUser?.name || "Anonymous",
        email: dbUser?.email || "anonymous@example.com",
      },
      responses: [],
    };

    try {
      await axiosPublic.post("/feedback", feedbackPayload);
      Swal.fire({
        title: "Thank You!",
        text: "Your feedback has been submitted successfully.",
        icon: "success",
        confirmButtonText: "Awesome!",
        background: isDarkMode ? "#1f2937" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#1f2937",
        confirmButtonColor: isDarkMode ? "#3b82f6" : "#2563eb",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          if (typeof window !== "undefined") {
            new Audio("/sounds/success.mp3")
              .play()
              .catch((e) => console.log("Audio play failed:", e));
          }
        },
      });
      setFormData({
        title: "",
        description: "",
        type: "",
        category: "",
        priority: "",
      });
    } catch (error) {
      console.error("Feedback submission failed:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit feedback. Please try again.",
        icon: "error",
        confirmButtonColor: isDarkMode ? "#3b82f6" : "#2563eb",
        background: isDarkMode ? "#1f2937" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#1f2937",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const inputClass = `
    w-full p-4 rounded-xl border-2
    ${
      isDarkMode
        ? "bg-gray-700/50 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500/30"
        : "bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
    }
    focus:outline-none focus:ring-4 transition-all duration-200
  `;

  return (
    <div
      className={`relative py-16 px-4 sm:px-6 overflow-hidden ${
        isDarkMode ? "bg-gray-950" : "bg-gradient-to-b from-blue-50 to-teal-50"
      }`}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
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
            Share Your Healthcare Feedback
          </h2>
          <p
            className={`max-w-2xl mx-auto mb-6 text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Your input helps us enhance AdvanceHealthcare for patients and
            providers.
          </p>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                name="title"
                placeholder="Feedback Title *"
                className={inputClass}
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <textarea
                name="description"
                placeholder="Describe your feedback (optional)"
                rows="4"
                className={`${inputClass} resize-none`}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Type */}
            <div>
              <select
                name="type"
                className={`${inputClass} cursor-pointer`}
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Feedback Type *</option>
                <option value="complaint">Complaint</option>
                <option value="suggestion">Suggestion</option>
                <option value="praise">Praise</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <select
                name="category"
                className={`${inputClass} cursor-pointer`}
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category *</option>
                <option value="Technical">Technical</option>
                <option value="Service">Service</option>
                <option value="Billing">Billing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <select
                name="priority"
                className={`${inputClass} cursor-pointer`}
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority *</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform focus:outline-none shadow-lg ${
                  isSubmitting
                    ? isDarkMode
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:shadow-blue-500/30 hover:brightness-110"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                    Submitting...
                  </span>
                ) : (
                  "Submit Feedback"
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
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
  );
};

export default FeedbackComponent;
