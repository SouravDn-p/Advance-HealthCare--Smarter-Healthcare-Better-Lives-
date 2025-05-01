"use client";

import { useState, useEffect, useRef } from "react";
import {
  AlertCircle,
  Calendar,
  Check,
  Heart,
  Info,
  Loader2,
  MapPin,
  User,
  X,
} from "lucide-react";

// Sample donation centers
const donationCenters = [
  { id: 1, name: "Downtown Medical Center", address: "123 Main St, Downtown" },
  { id: 2, name: "Westside Hospital", address: "456 West Ave, Westside" },
  {
    id: 3,
    name: "Central Health Clinic",
    address: "789 Central Blvd, Midtown",
  },
  { id: 4, name: "Northside Medical", address: "101 North Rd, Northside" },
  {
    id: 5,
    name: "Southside Health Center",
    address: "202 South St, Southside",
  },
];

export function DonateBloodModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    donationCenter: "",
    hasRecentIllness: false,
    hasTattoo: false,
    hasMedication: false,
    donationType: "whole",
    appointmentDate: "",
    termsAccepted: false,
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [bloodTypeDropdownOpen, setBloodTypeDropdownOpen] = useState(false);
  const [centerDropdownOpen, setCenterDropdownOpen] = useState(false);

  const modalRef = useRef(null);
  const bloodTypeRef = useRef(null);
  const centerRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        bloodTypeRef.current &&
        !bloodTypeRef.current.contains(event.target)
      ) {
        setBloodTypeDropdownOpen(false);
      }
      if (centerRef.current && !centerRef.current.contains(event.target)) {
        setCenterDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = ""; // Restore scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  // Focus trap inside modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTabKey(e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    }

    modalRef.current.addEventListener("keydown", handleTabKey);
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("keydown", handleTabKey);
      }
    };
  }, [isOpen, step]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.bloodType) newErrors.bloodType = "Blood type is required";
    } else if (currentStep === 2) {
      if (!formData.donationType)
        newErrors.donationType = "Please select a donation Type";
    } else if (currentStep === 3) {
      if (!formData.donationCenter)
        newErrors.donationCenter = "Please select a donation center";
      if (!formData.appointmentDate)
        newErrors.appointmentDate = "Please select an appointment date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 2 && !isEligible) {
        // Prevent moving to step 3 if not eligible
        setErrors({
          ...errors,
          eligibility:
            "You are not eligible to proceed due to health concerns. Please consult with medical staff.",
        });
        return;
      }
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 3) {
      // Just move to the next step
      handleNext();
      return;
    }
    if (!formData.termsAccepted) {
      setErrors({ termsAccepted: "You must accept the terms and conditions" });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      onSubmit({
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
        bloodType: formData.bloodType,
        location:
          donationCenters.find(
            (c) => c.id.toString() === formData.donationCenter
          )?.name || "Unknown",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        bloodType: "",
        donationCenter: "",
        hasRecentIllness: false,
        hasTattoo: false,
        hasMedication: false,
        donationType: "whole",
        appointmentDate: "",
        termsAccepted: false,
      });
      setStep(1);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEligible = !formData.hasRecentIllness && !formData.hasTattoo;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2
              id="modal-title"
              className="text-xl font-bold flex items-center gap-2"
            >
              <Heart className="h-5 w-5 text-red-500" /> Donate Blood
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Complete the form below to schedule your blood donation appointment.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="py-4">
              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                        step === i
                          ? "bg-red-600 text-white border-red-600"
                          : step > i
                          ? "bg-red-100 text-red-600 border-red-300"
                          : "bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {step > i ? <Check className="h-4 w-4" /> : i}
                    </div>
                  ))}
                </div>
                <div className="relative mb-4">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-full bg-red-600 rounded-full transition-all"
                      style={{ width: `${((step - 1) / 2) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="name"
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-2" ref={bloodTypeRef}>
                      <label
                        htmlFor="bloodType"
                        className="block text-sm font-medium"
                      >
                        Blood Type
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-3 py-2 text-left border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 flex justify-between itemsamna-center dark:bg-gray-700 dark:text-white"
                          onClick={() =>
                            setBloodTypeDropdownOpen(!bloodTypeDropdownOpen)
                          }
                        >
                          {formData.bloodType || "Select your blood type"}
                          <svg
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {bloodTypeDropdownOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1 max-h-60 overflow-auto">
                            {[
                              "A+",
                              "A-",
                              "B+",
                              "B-",
                              "AB+",
                              "AB-",
                              "O+",
                              "O-",
                              "Unknown",
                            ].map((type) => (
                              <button
                                key={type}
                                type="button"
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                  handleChange("bloodType", type);
                                  setBloodTypeDropdownOpen(false);
                                }}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.bloodType && (
                        <p className="text-sm text-red-500">
                          {errors.bloodType}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Eligibility Check */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Eligibility Check</h3>

                  <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md p-4 flex gap-3">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">
                        Important
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-200">
                        Please answer these questions honestly to ensure your
                        safety and the safety of blood recipients.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="illness"
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700"
                        checked={formData.hasRecentIllness}
                        onChange={(e) =>
                          handleChange("hasRecentIllness", e.target.checked)
                        }
                      />
                      <label htmlFor="illness" className="text-sm">
                        I have had a fever, cold, or other illness in the past
                        14 days
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="tattoo"
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700"
                        checked={formData.hasTattoo}
                        onChange={(e) =>
                          handleChange("hasTattoo", e.target.checked)
                        }
                      />
                      <label htmlFor="tattoo" className="text-sm">
                        I have gotten a tattoo or piercing in the past 3 months
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="medication"
                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700"
                        checked={formData.hasMedication}
                        onChange={(e) =>
                          handleChange("hasMedication", e.target.checked)
                        }
                      />
                      <label htmlFor="medication" className="text-sm">
                        I am currently taking medication (if yes, please inform
                        staff at donation center)
                      </label>
                    </div>
                  </div>

                  {isEligible ? (
                    <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md p-4 flex gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800 dark:text-green-300">
                          Eligible to Donate
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-200">
                          You are eligible to proceed with scheduling your
                          donation.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4 flex gap-3">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800 dark:text-red-300">
                          Eligibility Concern
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-200">
                          Based on your responses, you are not eligible to
                          donate at this time due to recent illness or
                          tattoos/piercings. Please consult with medical staff
                          for further guidance.
                        </p>
                      </div>
                    </div>
                  )}

                  {errors.eligibility && (
                    <p className="text-sm text-red-500">{errors.eligibility}</p>
                  )}

                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Donation Type</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <label
                        className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                          formData.donationType === "whole"
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="donationType"
                          value="whole"
                          className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600"
                          checked={formData.donationType === "whole"}
                          onChange={() => handleChange("donationType", "whole")}
                        />
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium">Whole Blood</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            45-60 min
                          </span>
                        </div>
                      </label>

                      <label
                        className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                          formData.donationType === "plasma"
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="donationType"
                          value="plasma"
                          className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600"
                          checked={formData.donationType === "plasma"}
                          onChange={() =>
                            handleChange("donationType", "plasma")
                          }
                        />
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium">Plasma</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            1-2 hours
                          </span>
                        </div>
                      </label>

                      <label
                        className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                          formData.donationType === "platelets"
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="donationType"
                          value="platelets"
                          className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600"
                          checked={formData.donationType === "platelets"}
                          onChange={() =>
                            handleChange("donationType", "platelets")
                          }
                        />
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium">Platelets</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            1.5-2.5 hours
                          </span>
                        </div>
                      </label>

                      <label
                        className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer ${
                          formData.donationType === "double-red"
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <input
                          type="radio"
                          name="donationType"
                          value="double-red"
                          className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600"
                          checked={formData.donationType === "double-red"}
                          onChange={() =>
                            handleChange("donationType", "double-red")
                          }
                        />
                        <div className="flex justify-between items-center w-full">
                          <span className="font-medium">Double Red Cells</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            1-2 hours
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Schedule Appointment */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Schedule Appointment</h3>

                  <div className="space-y-4">
                    <div className="space-y-2" ref={centerRef}>
                      <label
                        htmlFor="donationCenter"
                        className="block text-sm font-medium"
                      >
                        Donation Center
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          className="w-full px-3 py-2 text-left border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 flex justify-between items-center dark:bg-gray-700 dark:text-white"
                          onClick={() =>
                            setCenterDropdownOpen(!centerDropdownOpen)
                          }
                        >
                          {donationCenters.find(
                            (c) => c.id.toString() === formData.donationCenter
                          )?.name || "Select a donation center"}
                          <svg
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {centerDropdownOpen && (
                          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1 max-h-60 overflow-auto">
                            {donationCenters.map((center) => (
                              <button
                                key={center.id}
                                type="button"
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => {
                                  handleChange(
                                    "donationCenter",
                                    center.id.toString()
                                  );
                                  setCenterDropdownOpen(false);
                                }}
                              >
                                {center.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Add input field to allow manual entry */}
                      <input
                        type="text"
                        placeholder="Or enter a donation center manually"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                        value={formData.manualDonationCenter || ""}
                        onChange={(e) =>
                          handleChange("manualDonationCenter", e.target.value)
                        }
                      />

                      {errors.donationCenter && (
                        <p className="text-sm text-red-500">
                          {errors.donationCenter}
                        </p>
                      )}
                    </div>

                    {/* Show address or manual input */}
                    {(formData.donationCenter ||
                      formData.manualDonationCenter) && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {formData.manualDonationCenter ||
                            donationCenters.find(
                              (c) => c.id.toString() === formData.donationCenter
                            )?.address}
                        </span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label
                        htmlFor="lastDonationDate"
                        className="block text-sm font-medium"
                      >
                        Last Donation Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="lastDonationDate"
                          type="date"
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                          // 👇 NO min attribute anymore, so user can pick past dates
                          value={formData.lastDonationDate}
                          onChange={(e) =>
                            handleChange("lastDonationDate", e.target.value)
                          }
                        />
                      </div>
                      {errors.lastDonationDate && (
                        <p className="text-sm text-red-500">
                          {errors.lastDonationDate}
                        </p>
                      )}
                    </div>

                    <div className="pt-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700"
                          checked={formData.termsAccepted}
                          onChange={(e) =>
                            handleChange("termsAccepted", e.target.checked)
                          }
                        />
                        <label htmlFor="terms" className="text-sm">
                          I confirm that I am at least 18 years old and agree to
                          the terms and conditions for blood donation
                        </label>
                      </div>
                      {errors.termsAccepted && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.termsAccepted}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Back
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={step === 2 && !isEligible}
                  className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    step === 2 && !isEligible
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    "Schedule Donation"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
