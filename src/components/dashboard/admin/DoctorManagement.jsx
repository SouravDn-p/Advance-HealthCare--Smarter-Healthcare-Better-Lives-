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
  var { doctors, setDoctors, dbUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  // State for doctors list
  // var [doctors, setDoctors] = useState([
  //   {
  //     id: 1,
  //     name: "Dr. Sarah Johnson",
  //     specialty: "Cardiology",
  //     experience: "15 years experience",
  //     image:
  //       "https://images.pexels.com/photos/4167542/pexels-photo-4167542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     rating: 4.9,
  //     patients: "2,000+",
  //     availability: "Mon - Fri",
  //     achievements: [
  //       "Best Cardiology Award 2023",
  //       "Published 24 Research Papers",
  //     ],
  //     hospital: "Heart Care Hospital",
  //     consultation_fee: "150",
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Michael Chen",
  //     specialty: "Neurology",
  //     experience: "12 years experience",
  //     image:
  //       "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     rating: 4.8,
  //     patients: "1,800+",
  //     availability: "Tue - Sat",
  //     achievements: [
  //       "Neurological Research Excellence Award",
  //       "Published 18 Research Papers",
  //     ],
  //     hospital: "City Neurology Center",
  //     consultation_fee: "180",
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. Emily Rodriguez",
  //     specialty: "Pediatrics",
  //     experience: "10 years experience",
  //     image:
  //       "https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     rating: 4.9,
  //     patients: "3,000+",
  //     availability: "Mon - Thu",
  //     achievements: [
  //       "Children's Health Foundation Award",
  //       "Pediatric Care Excellence",
  //     ],
  //     hospital: "Children's Medical Center",
  //     consultation_fee: "120",
  //   },
  // ]);

  // State for form and UI
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or table

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        axiosPublic.get(`/doctors`).then((res) => {
          setDoctors(res.data);
        });
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, [axiosPublic, setDoctors]);

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
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
    // if (!formData.image.trim()) {
    //   errors.image = "Image URL is required";
    // } else if (
    //   !/^https?:\/\/.+\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(formData.image)
    // ) {
    //   errors.image = "Please enter a valid image URL";
    // }

    // Validate numeric fields
    if (
      isNaN(Number.parseFloat(formData.rating)) ||
      Number.parseFloat(formData.rating) < 0 ||
      Number.parseFloat(formData.rating) > 5
    ) {
      errors.rating = "Rating must be between 0 and 5";
    }

    if (isNaN(Number.parseFloat(formData.consultation_fee))) {
      errors.consultation_fee = "Consultation fee must be a number";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (editingDoctor) {
      // Update existing doctor
      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === editingDoctor.id ? { ...formData, id: doctor.id } : doctor
      );
      setDoctors(updatedDoctors);
      setEditingDoctor(null);
    } else {
      // Add new doctor
      const newDoctor = {
        ...formData,
        id: Date.now(), // Simple ID generation
        // Filter out empty achievements
        achievements: formData.achievements.filter(
          (achievement) => achievement.trim() !== ""
        ),
      };
      setDoctors([...doctors, newDoctor]);

      const response = await axiosPublic.post("/addDoctor", {
        doctor: newDoctor,
      });
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Successfully Added Doctor",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Doctor",
          text: "Something went wrong. Please try again!",
          confirmButtonText: "Okay",
        });
      }
    }

    // Reset form and hide it
    setFormData(emptyDoctorForm);
    setShowAddForm(false);
    setFormErrors({});
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
    setDoctorToDelete(doctor);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (doctorToDelete) {
      const updatedDoctors = doctors?.filter(
        (doctor) => doctor.id !== doctorToDelete.id
      );
      setDoctors(updatedDoctors);
      setIsDeleteModalOpen(false);
      setDoctorToDelete(null);
    }
  };

  // Filter doctors based on search and specialty filter
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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterSpecialty]);

  if (dbUser?.role != "admin") {
    return <UnAuthorizedAccess />;
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Doctor Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add, edit and manage doctors in the system
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
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Dr. Full Name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              {/* Specialty */}
              <div>
                <label
                  htmlFor="specialty"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                >
                  <option value="">Select Specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                {formErrors.specialty && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.specialty}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="15 years experience"
                />
                {formErrors.experience && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.experience}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-500"
                    title="Upload Image"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                {formErrors.image && (
                  <p className="mt-1 text-sm text-red-500">
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                {formErrors.rating && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.rating}
                  </p>
                )}
              </div>

              {/* Patients */}
              <div>
                <label
                  htmlFor="patients"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Patients Count
                </label>
                <input
                  type="text"
                  id="patients"
                  name="patients"
                  value={formData.patients}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="2,000+"
                />
              </div>

              {/* Availability */}
              <div>
                <label
                  htmlFor="availability"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Mon - Fri"
                />
                {formErrors.availability && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.availability}
                  </p>
                )}
              </div>

              {/* Hospital */}
              <div>
                <label
                  htmlFor="hospital"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Hospital Name"
                />
                {formErrors.hospital && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.hospital}
                  </p>
                )}
              </div>

              {/* Consultation Fee */}
              <div>
                <label
                  htmlFor="consultation_fee"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="150"
                />
                {formErrors.consultation_fee && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.consultation_fee}
                  </p>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder={`Achievement ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievementField(index)}
                    className="ml-2 p-2 text-gray-500 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAchievementField}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
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
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
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
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="pl-3 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:text-sm"
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

          <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
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
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
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
      {currentDoctors?.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No doctors found
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
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
                    className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Edit Doctor"
                  >
                    <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(doctor)}
                    className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Delete Doctor"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {doctor.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {doctor.specialty}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {doctor.experience}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {doctor.rating}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {doctor.patients}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {doctor.availability}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      ${doctor.consultation_fee}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-start">
                    <Building className="w-4 h-4 text-gray-500 mr-1 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {doctor.hospital}
                    </span>
                  </div>
                </div>

                {doctor.achievements && doctor.achievements.length > 0 && (
                  <div className="mt-3">
                    <div className="flex items-start">
                      <Award className="w-4 h-4 text-gray-500 mr-1 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          Achievements:
                        </span>
                        <ul className="mt-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Doctor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Specialty
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Hospital
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Fee
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Availability
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentDoctors?.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
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
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {doctor.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {doctor.experience}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {doctor.specialty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {doctor.hospital}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {doctor.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">
                        ${doctor.consultation_fee}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {doctor.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditDoctor(doctor)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          title="Edit Doctor"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(doctor)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                          title="Delete Doctor"
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
          <div className="text-sm text-gray-700 dark:text-gray-300">
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
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Delete Doctor
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete {doctorToDelete?.name}?
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDoctorToDelete(null);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;
