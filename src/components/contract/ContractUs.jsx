import React, { useContext, useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiUser,
  FiHeart,
  FiHelpCircle,
} from "react-icons/fi";
import { AuthContexts } from "../../providers/AuthProvider";

const ContactUs = () => {
  const { theme } = useContext(AuthContexts);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);

  // Reusable input class with healthcare-themed styles
  const inputClass = `
    border 
    rounded-md 
    px-4 
    py-3 
    w-full 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-400 
    transition-all 
    duration-300
    ${
      theme === "dark"
        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 hover:border-blue-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 hover:border-blue-300"
    }
  `;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showSuccessToast();
      if (formRef.current) {
        formRef.current.reset(); // Reset form using ref
      }
    }, 1500);
  };

  const showSuccessToast = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-blue-500 ring-opacity-50 p-4`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <FiCheckCircle
              className={`h-6 w-6 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            />
          </div>
          <div className="ml-3 flex-1">
            <p
              className={`text-sm font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Inquiry submitted successfully!
            </p>
            <p
              className={`mt-1 text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Our healthcare team will contact you within 24 hours.
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className={`rounded-md inline-flex ${
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-700"
              } focus:outline-none`}
              aria-label="Close toast"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    ));
  };

  // Healthcare-related partner logos (using placeholders)
  const partners = [
    {
      name: "HealthCorp",
      logo: "https://healthcorp.com.au/wp-content/uploads/2019/10/HCP-logo-simple.png",
    },
    {
      name: "MediCare",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyeJ_rdVWc7VnXLRmAFBG-8nrsqpH4uLjoLA&s",
    },
    {
      name: "WellnessHub",
      logo: "https://wellnesshub.ae/wp-content/uploads/2024/10/Dr-Olas_Gold.svg",
    },
    {
      name: "CarePlus",
      logo: "https://play-lh.googleusercontent.com/XGezZw9y86rVKSouoBUpsKt0qJWJZGS8u9I7StdWhKOVfOJh3hEuxsBPLiDvevv0IA=w240-h480-rw",
    },
    {
      name: "LifeHealth",
      logo: "https://lifehealth.global/wp-content/uploads/2022/06/Lifehealth-new-logo.gif",
    },
  ];

  return (
    <div
      className={`min-h-screen pt-8 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-teal-50 to-white text-gray-800"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col md:flex-row p-6 md:p-16 gap-10 max-w-7xl mx-auto">
        {/* Left Section: Form */}
        <div
          className={`shadow-xl rounded-2xl p-8 w-full md:w-1/2 transition-all duration-300 transform hover:shadow-2xl ${
            theme === "dark"
              ? "bg-gray-800 text-white border border-gray-700"
              : "bg-white text-gray-900 border border-gray-100"
          }`}
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
            Connect with AdvanceHealthcare
          </h2>
          <p
            className={`mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Reach out for personalized healthcare solutions!
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <FiUser
                  className={`absolute left-3 top-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="First Name *"
                  className={`${inputClass} pl-10`}
                  required
                  aria-label="First Name"
                />
              </div>
              <div className="relative flex-1">
                <FiUser
                  className={`absolute left-3 top-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  className={`${inputClass} pl-10`}
                  required
                  aria-label="Last Name"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <FiMail
                  className={`absolute left-3 top-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  className={`${inputClass} pl-10`}
                  required
                  aria-label="Email Address"
                />
              </div>
              <div className="relative flex-1">
                <FiHeart
                  className={`absolute left-3 top-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Healthcare Role"
                  className={`${inputClass} pl-10`}
                  aria-label="Healthcare Role"
                />
              </div>
            </div>

            <div className="relative">
              <FiPhone
                className={`absolute left-3 top-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                className={`${inputClass} pl-10`}
                required
                aria-label="Phone Number"
              />
            </div>

            <div className="relative">
              <select
                className={`${inputClass} cursor-pointer`}
                required
                aria-label="Organization Type"
              >
                <option value="" disabled>
                  Select Organization Type
                </option>
                <option value="hospital">Hospital</option>
                <option value="clinic">Clinic</option>
                <option value="research">Research Institution</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="relative">
              <FiHelpCircle
                className={`absolute left-3 top-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <textarea
                placeholder="What healthcare solutions are you seeking? *"
                className={`${inputClass} h-28 pl-10 resize-y`}
                required
                aria-label="Healthcare Solutions Inquiry"
              />
            </div>

            <div className="relative">
              <FiHelpCircle
                className={`absolute left-3 top-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <textarea
                placeholder="Additional comments or questions"
                className={`${inputClass} h-28 pl-10 resize-y`}
                aria-label="Additional Comments"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                className={`mt-1 h-4 w-4 rounded ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-400"
                    : "border-gray-300 text-blue-600 focus:ring-blue-200"
                }`}
                required
              />
              <label htmlFor="terms" className="text-sm">
                Accept terms and conditions
                <br />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  By submitting, I acknowledge AdvanceHealthcare's Privacy
                  Policy
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 
                rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-[1.01] 
                shadow-md flex items-center justify-center gap-2 ${
                  isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                }`}
              aria-label={isSubmitting ? "Submitting form" : "Submit form"}
            >
              {isSubmitting ? (
                <>
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Submit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Section: Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
            Empowering Healthcare with Innovative Solutions
          </h2>

          <div className="space-y-8">
            <div
              className={`flex gap-5 p-5 rounded-xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-750"
                  : "bg-white hover:bg-gray-50 shadow-md"
              }`}
            >
              <div
                className={`p-3 h-full rounded-full ${
                  theme === "dark" ? "bg-blue-900" : "bg-blue-100"
                }`}
              >
                <FiMail
                  className={`text-xl ${
                    theme === "dark" ? "text-blue-300" : "text-blue-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`font-bold text-lg mb-1 ${
                    theme === "dark" ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  Global Healthcare Reach
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  Consult with our experts to tailor solutions for your
                  healthcare organization
                </p>
              </div>
            </div>

            <div
              className={`flex gap-5 p-5 rounded-xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-750"
                  : "bg-white hover:bg-gray-50 shadow-md"
              }`}
            >
              <div
                className={`${
                  theme === "dark" ? "bg-teal-900" : "bg-teal-100"
                } p-3 h-full rounded-full`}
              >
                <FiHeart
                  className={`text-xl ${
                    theme === "dark" ? "text-teal-300" : "text-teal-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`font-bold text-lg mb-1 ${
                    theme === "dark" ? "text-teal-300" : "text-teal-600"
                  }`}
                >
                  Trusted by 100k+ Providers
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  Discover pricing plans designed for healthcare providers of
                  all sizes
                </p>
              </div>
            </div>

            <div
              className={`flex gap-5 p-5 rounded-xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-750"
                  : "bg-white hover:bg-gray-50 shadow-md"
              }`}
            >
              <div
                className={`${
                  theme === "dark" ? "bg-indigo-900" : "bg-indigo-100"
                } p-3 h-full rounded-full`}
              >
                <FiHelpCircle
                  className={`text-xl ${
                    theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                  }`}
                />
              </div>
              <div>
                <h3
                  className={`font-bold text-lg mb-1 ${
                    theme === "dark" ? "text-indigo-300" : "text-indigo-600"
                  }`}
                >
                  Serving All Healthcare Sectors
                </h3>
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  Enhance patient care with integrated workflows and advanced
                  technology
                </p>
              </div>
            </div>
          </div>

          <div
            className={`mt-10 p-6 rounded-xl ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow-md`}
          >
            <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
              Partnered with leading healthcare organizations worldwide
            </p>
            <div className="grid grid-cols-3 gap-6 items-center justify-between">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-5 w-auto object-contain"
                    
                  />
                  <span className="ml-2 text-sm font-medium">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
