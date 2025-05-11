
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  X,
  Star,
  Users,
  Calendar,
  Award,
  Building,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Upload,
  Save,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import UnAuthorizedAccess from "../../../extra/errors/UnAuthorizedAccess";

const DoctorManagement = () => {
  const { doctors, setDoctors, dbUser, isDarkMode } = useAuth();
  const axiosPublic = useAxiosPublic();

  // State for UI and form
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or table

  // Form state
  const emptyDoctorForm = {
    name: "",
    specialty: "",
    experience: "",
    image: "",
    rating: 5.0,
    patients: "0",
    availability: "",
    achievements: ["", ""],
    hospital: "",
    consultation_fee: "",
  };

  const [formData, setFormData] = useState(emptyDoctorForm);
  const [formErrors, setFormErrors] = useState({});

  // List of specialties for dropdown
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Urology",
  ];

  // Pagination settings
  const itemsPerPage = 6;
  const totalPages = Math.ceil(
    doctors?.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterSpecialty === "" || doctor.specialty === filterSpecialty)
    ).length / itemsPerPage
  );

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const res = await axiosPublic.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to Fetch Doctors",
          text: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [axiosPublic, setDoctors]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterSpecialty]);

  // Utility functions for classNames
  const getCardClasses = () =>
    `rounded-lg shadow-sm border p-5 transition-shadow duration-200 ${
      isDarkMode
        ? "bg-gray-800 border-gray-700 hover:shadow-md"
        : "bg-white border-gray-200 hover:shadow-md"
    }`;

  const getTextColor = () => (isDarkMode ? "text-gray-100" : "text-gray-900");
  const getSecondaryTextColor = () =>
    isDarkMode ? "text-gray-400" : "text-gray-500";

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Handle achievement input changes
  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = value;
    setFormData({
      ...formData,
      achievements: updatedAchievements,
    });
  };

  // Add new achievement field
  const addAchievementField = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ""],
    });
  };

  // Remove achievement field
  const removeAchievementField = (index) => {
    const updatedAchievements = formData.achievements.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      achievements: updatedAchievements,
    });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Doctor name is required";
    if (!formData.specialty) errors.specialty = "Specialty is required";
    if (!formData.experience.trim())
      errors.experience = "Experience is required";
    if (!formData.hospital.trim()) errors.hospital = "Hospital is required";
    if (!formData.availability.trim())
      errors.availability = "Availability is required";
    if (!formData.consultation_fee.trim())
      errors.consultation_fee = "Consultation fee is required";

    // Validate image URL
    if (!formData.image.trim()) {
      errors.image = "Image URL is required";
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(formData.image)
    ) {
      errors.image = "Please enter a valid image URL";
    }

    // Validate numeric fields
    const rating = Number.parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }

    if (isNaN(Number.parseFloat(formData.consultation_fee))) {
      errors.consultation_fee = "Consultation fee must be a number";
    }

    // Validate patients format (e.g., "2,000+" or number)
    if (formData.patients && !/^\d{1,3}(,\d{3})*\+?$/.test(formData.patients)) {
      errors.patients = "Patients must be a number or format like '2,000+'";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      if (editingDoctor) {
        // Update existing doctor
        const response = await axiosPublic.put(`/doctors/${editingDoctor._id}`, {
          doctor: { ...formData, id: editingDoctor._id },
        });
        if (response.status === 200) {
          setDoctors(
            doctors.map((doctor) =>
              doctor._id === editingDoctor._id
                ? { ...formData, _id: doctor._id }
                : doctor
            )
          );
          Swal.fire({
            icon: "success",
            title: "Doctor Updated",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        // Add new doctor
        const newDoctor = {
          ...formData,
          id: Date.now(), // Temporary ID for frontend
          achievements: formData.achievements.filter(
            (achievement) => achievement.trim() !== ""
          ),
        };
        const response = await axiosPublic.post("/addDoctor", {
          doctor: newDoctor,
        });
        if (response.status === 201) {
          setDoctors([...doctors, response.data]);
          Swal.fire({
            icon: "success",
            title: "Doctor Added",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }

      // Reset form and hide it
      setFormData(emptyDoctorForm);
      setShowAddForm(false);
      setEditingDoctor(null);
      setFormErrors({});
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: editingDoctor ? "Failed to Update" : "Failed to Add",
        text: "Something went wrong. Please try again!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit doctor
  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({ ...doctor });
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete doctor
  const handleDeleteClick = (doctor) => {
    Swal.fire({
      title: `Delete ${doctor.name}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          const response = await axiosPublic.delete(`/doctors/${doctor._id}`);
          if (response.status === 200) {
            setDoctors(doctors.filter((d) => d._id !== doctor._id));
            Swal.fire({
              icon: "success",
              title: "Doctor Deleted",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Failed to Delete",
            text: "Something went wrong. Please try again!",
          });
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  // Filter doctors
  const filteredDoctors = doctors?.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSpecialty === "" || doctor.specialty === filterSpecialty)
  );

  // Get current page items
  const currentDoctors = filteredDoctors?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Authorization check
  if (dbUser?.role !== "admin") {
    return <UnAuthorizedAccess />;
  }

  return (
    <div
      className={`p-4 lg:p-6 space-y-6 min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${getTextColor()}`}>
            Doctor Management
          </h1>
          <p className={`mt-1 text-sm ${getSecondaryTextColor()}`}>
            Add, edit, and manage doctors in the system
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingDoctor(null);
              setFormData(emptyDoctorForm);
              setFormErrors({});
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50"
            disabled={isLoading}
          >
            {showAddForm ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Doctor
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add/Edit Doctor Form */}
      {showAddForm && (
        <div className={getCardClasses()}>
          <h2 className={`text-lg font-medium ${getTextColor()} mb-4`}>
            {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Name */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Doctor Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.name
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                  }`}
                  placeholder="Dr. Full Name"
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                  disabled={isLoading}
                />
                {formErrors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-500">
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Specialty */}
              <div>
                <label
                  htmlFor="specialty"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Specialty*
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.specialty
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                  }`}
                  aria-describedby={formErrors.specialty ? "specialty-error" : undefined}
                  disabled={isLoading}
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                {formErrors.specialty && (
                  <p id="specialty-error" className="mt-1 text-sm text-red-500">
                    {formErrors.specialty}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Experience*
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.experience
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                  }`}
                  placeholder="15 years experience"
                  aria-describedby={formErrors.experience ? "experience-error" : undefined}
                  disabled={isLoading}
                />
                {formErrors.experience && (
                  <p id="experience-error" className="mt-1 text-sm text-red-500">
                    {formErrors.experience}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="image"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Profile Image URL*
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      formErrors.image
                        ? "border-red-500"
                        : isDarkMode
                        ? "border-gray-600"
                        : "border-gray-300"
                    } rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                    placeholder="https://example.com/image.jpg"
                    aria-describedby={formErrors.image ? "image-error" : undefined}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={`px-3 py-2 ${
                      isDarkMode
                        ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } rounded-r-md`}
                    title="Upload Image"
                    disabled={isLoading}
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                {formErrors.image && (
                  <p id="image-error" className="mt-1 text-sm text-red-500">
                    {formErrors.image}
                  </p>
                )}
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Doctor preview"
                      className="h-20 w-20 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg?height=80&width=80";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Rating */}
              <div>
                <label
                  htmlFor="rating"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.rating
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                  }`}
                  aria-describedby={formErrors.rating ? "rating-error" : undefined}
                  disabled={isLoading}
                />
                {formErrors.rating && (
                  <p id="rating-error" className="mt-1 text-sm text-red-500">
                    {formErrors.rating}
                  </p>
                )}
              </div>

              {/* Patients */}
              <div>
                <label
                  htmlFor="patients"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Patients Count
                </label>
                <input
                  type="text"
                  id="patients"
                  name="patients"
                  value={formData.patients}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.patients
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                  }`}
                  placeholder="2,000+"
                  aria-describedby={formErrors.patients ? "patients-error" : undefined}
                  disabled={isLoading}
                />
                {formErrors.patients && (
                  <p id="patients-error" className="mt-1 text-sm text-red-500">
                    {formErrors.patients}
                  </p>
                )}
              </div>

              {/* Availability */}
              <div>
                <label
                  htmlFor="availability"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Availability*
                </label>
                <input
                  type="text"
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.availability
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                  }`}
                  placeholder="Mon - Fri"
                  aria-describedby={
                    formErrors.availability ? "availability-error" : undefined
                  }
                  disabled={isLoading}
                />
                {formErrors.availability && (
                  <p id="availability-error" className="mt-1 text-sm text-red-500">
                    {formErrors.availability}
                  </p>
                )}
              </div>

              {/* Hospital */}
              <div>
                <label
                  htmlFor="hospital"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Hospital*
                </label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.hospital
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                  }`}
                  placeholder="Hospital Name"
                  aria-describedby={formErrors.hospital ? "hospital-error" : undefined}
                  disabled={isLoading}
                />
                {formErrors.hospital && (
                  <p id="hospital-error" className="mt-1 text-sm text-red-500">
                    {formErrors.hospital}
                  </p>
                )}
              </div>

              {/* Consultation Fee */}
              <div>
                <label
                  htmlFor="consultation_fee"
                  className={`block text-sm font-medium ${getTextColor()} mb-1`}
                >
                  Consultation Fee ($)*
                </label>
                <input
                  type="text"
                  id="consultation_fee"
                  name="consultation_fee"
                  value={formData.consultation_fee}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.consultation_fee
                      ? "border-red-500"
                      : isDarkMode
                      ? "border-gray-600"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                    isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                  }`}
                  placeholder="150"
                  aria-describedby={
                    formErrors.consultation_fee ? "consultation_fee-error" : undefined
                  }
                  disabled={isLoading}
                />
                {formErrors.consultation_fee && (
                  <p
                    id="consultation_fee-error"
                    className="mt-1 text-sm text-red-500"
                  >
                    {formErrors.consultation_fee}
                  </p>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <label
                className={`block text-sm font-medium ${getTextColor()} mb-2`}
              >
                Achievements
              </label>
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) =>
                      handleAchievementChange(index, e.target.value)
                    }
                    className={`flex-1 px-3 py-2 border ${
                      isDarkMode ? "border-gray-600" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${
                      isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                    }`}
                    placeholder={`Achievement ${index + 1}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievementField(index)}
                    className="ml-2 p-2 text-gray-500 hover:text-red-500"
                    disabled={isLoading}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAchievementField}
                className={`mt-2 text-sm ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                } hover:underline flex items-center`}
                disabled={isLoading}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Achievement
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingDoctor(null);
                  setFormData(emptyDoctorForm);
                  setFormErrors({});
                }}
                className={`px-4 py-2 border ${
                  isDarkMode ? "border-gray-600" : "border-gray-300"
                } rounded-md shadow-sm text-sm font-medium ${
                  isDarkMode
                    ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                    : "text-gray-700 bg-white hover:bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-4 w-4 mr-2 text-white"
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
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {editingDoctor ? "Update Doctor" : "Add Doctor"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 border ${
              isDarkMode ? "border-gray-600" : "border-gray-300"
            } rounded-md leading-5 ${
              isDarkMode
                ? "bg-gray-700 text-white placeholder-gray-400"
                : "bg-white text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm`}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className={`pl-3 pr-8 py-2 border ${
                isDarkMode ? "border-gray-600" : "border-gray-300"
              } rounded-md leading-5 ${
                isDarkMode
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:text-sm`}
              disabled={isLoading}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div
            className={`flex border ${
              isDarkMode ? "border-gray-600" : "border-gray-300"
            } rounded-md overflow-hidden`}
          >
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? isDarkMode
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-600"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-white text-gray-700"
              }`}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 ${
                viewMode === "table"
                  ? isDarkMode
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-blue-100 text-blue-600"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-white text-gray-700"
              }`}
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      {isLoading ? (
        <div className="text-center py-8">
          <svg
            className="animate-spin h-8 w-8 mx-auto text-blue-600"
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
          <p className={`mt-2 text-sm ${getTextColor()}`}>
            Loading doctors...
          </p>
        </div>
      ) : currentDoctors?.length === 0 ? (
        <div className={getCardClasses()}>
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className={`text-lg font-medium ${getTextColor()}`}>
            No doctors found
          </h3>
          <p className={`mt-2 text-sm ${getSecondaryTextColor()}`}>
            {searchTerm || filterSpecialty
              ? "Try adjusting your search or filters"
              : "Add your first doctor to get started"}
          </p>
          {(searchTerm || filterSpecialty) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterSpecialty("");
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              disabled={isLoading}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentDoctors?.map((doctor) => (
            <div
              key={doctor._id}
              className={getCardClasses().replace("p-5", "") + " overflow-hidden"}
            >
              <div className="relative">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=192&width=384";
                  }}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditDoctor(doctor)}
                    className={`p-2 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-100"
                    } rounded-full shadow-md`}
                    title="Edit Doctor"
                    disabled={isLoading}
                  >
                    <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(doctor)}
                    className={`p-2 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-white hover:bg-gray-100"
                    } rounded-full shadow-md`}
                    title="Delete Doctor"
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className={`text-lg font-medium ${getTextColor()}`}>
                  {doctor.name}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {doctor.specialty}
                </p>
                <p className={`text-sm ${getSecondaryTextColor()} mt-1`}>
                  {doctor.experience}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className={`text-sm ${getTextColor()}`}>
                      {doctor.rating}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-500 mr-1" />
                    <span className={`text-sm ${getTextColor()}`}>
                      {doctor.patients}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                    <span className={`text-sm ${getTextColor()}`}>
                      {doctor.availability}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                    <span className={`text-sm ${getTextColor()}`}>
                      ${doctor.consultation_fee}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-start">
                    <Building className="w-4 h-4 text-gray-500 mr-1 mt-0.5" />
                    <span className={`text-sm ${getTextColor()}`}>
                      {doctor.hospital}
                    </span>
                  </div>
                </div>

                {doctor.achievements && doctor.achievements.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-start">
                      <Award className="w-4 h-4 text-gray-500 mr-1 mt-0.5" />
                      <div>
                        <span
                          className={`text-sm font-medium ${getTextColor()}`}
                        >
                          Achievements:
                        </span>
                        <ul
                          className={`mt-1 text-sm ${getSecondaryTextColor()} list-disc list-inside`}
                        >
                          {doctor.achievements.map((achievement, index) => (
                            <li key={index} className="ml-1">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={getCardClasses().replace("p-5", "") + " overflow-hidden"}>
          <div className="overflow-x-auto">
            <table
              className={`min-w-full divide-y ${
                isDarkMode ? "divide-gray-700" : "divide-gray-200"
              }`}
            >
              <thead className={isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}>
                <tr>
                  {[
                    "Doctor",
                    "Specialty",
                    "Hospital",
                    "Rating",
                    "Fee",
                    "Availability",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      } uppercase tracking-wider`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className={`${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-200"}`}
              >
                {currentDoctors?.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className={`hover:${
                      isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={doctor.image || "/placeholder.svg"}
                            alt={doctor.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "/placeholder.svg?height=40&width=40";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div
                            className={`text-sm font-medium ${getTextColor()}`}
                          >
                            {doctor.name}
                          </div>
                          <div
                            className={`text-sm ${getSecondaryTextColor()}`}
                          >
                            {doctor.experience}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getTextColor()}`}>
                        {doctor.specialty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getTextColor()}`}>
                        {doctor.hospital}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className={`text-sm ${getTextColor()}`}>
                          {doctor.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getTextColor()}`}>
                        ${doctor.consultation_fee}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getTextColor()}`}>
                        {doctor.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditDoctor(doctor)}
                          className={`${
                            isDarkMode
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-800"
                          }`}
                          title="Edit Doctor"
                          disabled={isLoading}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(doctor)}
                          className={`${
                            isDarkMode
                              ? "text-red-400 hover:text-red-300"
                              : "text-red-600 hover:text-red-800"
                          }`}
                          title="Delete Doctor"
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className={`text-sm ${getTextColor()}`}>
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredDoctors.length)}
            </span>{" "}
            of <span className="font-medium">{filteredDoctors.length}</span>{" "}
            doctors
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || isLoading}
              className={`p-2 rounded-md ${
                currentPage === 1 || isLoading
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + 1 + Math.max(0, currentPage - 3);
              if (page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : isDarkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  disabled={isLoading}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || isLoading}
              className={`p-2 rounded-md ${
                currentPage === totalPages || isLoading
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;