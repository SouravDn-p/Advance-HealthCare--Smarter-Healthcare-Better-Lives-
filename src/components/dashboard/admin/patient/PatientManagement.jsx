"use client";

import { useState, useEffect } from "react";
import {
  FaUserPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaFileMedical,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaUserInjured,
} from "react-icons/fa";
import PatientForm from "./PatientForm";
import PatientDetails from "./PatientDetails";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import UnAuthorizedAccess from "../../../../extra/errors/UnAuthorizedAccess";

// Mock data for patients
const initialPatients = [
  {
    _id: "p1",
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "555-123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, USA",
    bloodType: "O+",
    medicalHistory: ["Hypertension", "Diabetes Type 2"],
    lastVisit: "2023-04-15",
    upcomingAppointment: "2023-05-20",
    insuranceProvider: "Blue Cross",
    insuranceNumber: "BC123456789",
    emergencyContact: "Jane Doe (Wife) - 555-987-6543",
    registrationDate: "2020-01-15",
  },
  {
    _id: "p2",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    phone: "555-234-5678",
    email: "jane.smith@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    bloodType: "A-",
    medicalHistory: ["Asthma", "Allergies"],
    lastVisit: "2023-04-28",
    upcomingAppointment: "2023-05-15",
    insuranceProvider: "Aetna",
    insuranceNumber: "AE987654321",
    emergencyContact: "Mark Smith (Husband) - 555-876-5432",
    registrationDate: "2021-03-10",
  },
  {
    _id: "p3",
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    phone: "555-345-6789",
    email: "robert.johnson@example.com",
    address: "789 Pine St, Elsewhere, USA",
    bloodType: "B+",
    medicalHistory: ["Heart Disease", "Arthritis"],
    lastVisit: "2023-04-10",
    upcomingAppointment: "2023-05-25",
    insuranceProvider: "Medicare",
    insuranceNumber: "MC456789123",
    emergencyContact: "Susan Johnson (Wife) - 555-765-4321",
    registrationDate: "2019-07-22",
  },
  {
    _id: "p4",
    name: "Emily Davis",
    age: 27,
    gender: "Female",
    phone: "555-456-7890",
    email: "emily.davis@example.com",
    address: "101 Maple Dr, Nowhere, USA",
    bloodType: "AB+",
    medicalHistory: ["Migraine", "Anxiety"],
    lastVisit: "2023-04-22",
    upcomingAppointment: "2023-05-18",
    insuranceProvider: "Cigna",
    insuranceNumber: "CI789123456",
    emergencyContact: "Michael Davis (Brother) - 555-654-3210",
    registrationDate: "2022-01-05",
  },
  {
    _id: "p5",
    name: "Michael Wilson",
    age: 63,
    gender: "Male",
    phone: "555-567-8901",
    email: "michael.wilson@example.com",
    address: "202 Cedar Ln, Anyplace, USA",
    bloodType: "O-",
    medicalHistory: ["COPD", "High Cholesterol"],
    lastVisit: "2023-04-05",
    upcomingAppointment: "2023-05-10",
    insuranceProvider: "United Healthcare",
    insuranceNumber: "UH321654987",
    emergencyContact: "Linda Wilson (Wife) - 555-543-2109",
    registrationDate: "2018-11-30",
  },
  {
    _id: "p6",
    name: "Sarah Brown",
    age: 41,
    gender: "Female",
    phone: "555-678-9012",
    email: "sarah.brown@example.com",
    address: "303 Birch Rd, Somewhere Else, USA",
    bloodType: "A+",
    medicalHistory: ["Hypothyroidism"],
    lastVisit: "2023-04-18",
    upcomingAppointment: "2023-05-22",
    insuranceProvider: "Humana",
    insuranceNumber: "HU654987321",
    emergencyContact: "David Brown (Husband) - 555-432-1098",
    registrationDate: "2020-09-15",
  },
  {
    _id: "p7",
    name: "David Miller",
    age: 52,
    gender: "Male",
    phone: "555-789-0123",
    email: "david.miller@example.com",
    address: "404 Elm St, Elsewhere City, USA",
    bloodType: "B-",
    medicalHistory: ["Kidney Disease", "Gout"],
    lastVisit: "2023-04-12",
    upcomingAppointment: "2023-05-17",
    insuranceProvider: "Kaiser",
    insuranceNumber: "KP987321654",
    emergencyContact: "Jennifer Miller (Daughter) - 555-321-0987",
    registrationDate: "2019-05-20",
  },
  {
    _id: "p8",
    name: "Jennifer Taylor",
    age: 36,
    gender: "Female",
    phone: "555-890-1234",
    email: "jennifer.taylor@example.com",
    address: "505 Walnut Ave, Anytown, USA",
    bloodType: "AB-",
    medicalHistory: ["Endometriosis", "Depression"],
    lastVisit: "2023-04-25",
    upcomingAppointment: "2023-05-12",
    insuranceProvider: "Anthem",
    insuranceNumber: "AN159753456",
    emergencyContact: "Christopher Taylor (Husband) - 555-210-9876",
    registrationDate: "2021-07-08",
  },
];

const PatientManagement = () => {
  const { dbUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [patients, setPatients] = useState(initialPatients);
  const [filteredPatients, setFilteredPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterOptions, setFilterOptions] = useState({
    gender: "",
    bloodType: "",
    ageRange: "",
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Filter and sort patients
  useEffect(() => {
    let result = [...patients];

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phone.includes(searchTerm)
      );
    }

    // Apply filters
    if (filterOptions.gender) {
      result = result.filter(
        (patient) => patient.gender === filterOptions.gender
      );
    }

    if (filterOptions.bloodType) {
      result = result.filter(
        (patient) => patient.bloodType === filterOptions.bloodType
      );
    }

    if (filterOptions.ageRange) {
      switch (filterOptions.ageRange) {
        case "0-18":
          result = result.filter((patient) => patient.age <= 18);
          break;
        case "19-35":
          result = result.filter(
            (patient) => patient.age > 18 && patient.age <= 35
          );
          break;
        case "36-50":
          result = result.filter(
            (patient) => patient.age > 35 && patient.age <= 50
          );
          break;
        case "51+":
          result = result.filter((patient) => patient.age > 50);
          break;
        default:
          break;
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredPatients(result);
  }, [patients, searchTerm, filterOptions, sortField, sortDirection]);

  // Get current patients for pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilterOptions({
      gender: "",
      bloodType: "",
      ageRange: "",
    });
  };

  // Handle add patient
  const handleAddPatient = (newPatient) => {
    // In a real app, you would make an API call here
    const patient = {
      ...newPatient,
      _id: `p${patients.length + 1}`,
      registrationDate: new Date().toISOString().split("T")[0],
    };

    setPatients([...patients, patient]);
    setIsAddModalOpen(false);
  };

  // Handle edit patient
  const handleEditPatient = (updatedPatient) => {
    // In a real app, you would make an API call here
    const updatedPatients = patients.map((patient) =>
      patient._id === updatedPatient._id ? updatedPatient : patient
    );

    setPatients(updatedPatients);
    setIsEditModalOpen(false);
  };

  // Handle delete patient
  const handleDeletePatient = () => {
    // In a real app, you would make an API call here
    const updatedPatients = patients.filter(
      (patient) => patient._id !== currentPatient._id
    );

    setPatients(updatedPatients);
    setIsDeleteModalOpen(false);
  };

  // Open edit modal
  const openEditModal = (patient) => {
    setCurrentPatient(patient);
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (patient) => {
    setCurrentPatient(patient);
    setIsDeleteModalOpen(true);
  };

  if (dbUser?.role != "admin") {
    return <UnAuthorizedAccess />;
  }

  // Open view modal
  const openViewModal = (patient) => {
    setCurrentPatient(patient);
    setIsViewModalOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary flex items-center">
            <FaUserInjured className="mr-2" /> Patient Management
          </h1>
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FaUserPlus className="mr-2" /> Add New Patient
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square">
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <select
                className="select select-bordered flex-1"
                name="gender"
                value={filterOptions.gender}
                onChange={handleFilterChange}
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <select
                className="select select-bordered flex-1"
                name="bloodType"
                value={filterOptions.bloodType}
                onChange={handleFilterChange}
              >
                <option value="">All Blood Types</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <select
                className="select select-bordered flex-1"
                name="ageRange"
                value={filterOptions.ageRange}
                onChange={handleFilterChange}
              >
                <option value="">All Ages</option>
                <option value="0-18">0-18</option>
                <option value="19-35">19-35</option>
                <option value="36-50">36-50</option>
                <option value="51+">51+</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredPatients.length} patients
            </div>
            <button className="btn btn-sm btn-outline" onClick={resetFilters}>
              <FaFilter className="mr-1" /> Reset Filters
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {sortField === "name" &&
                      (sortDirection === "asc" ? (
                        <FaSortAmountUp className="ml-1" />
                      ) : (
                        <FaSortAmountDown className="ml-1" />
                      ))}
                  </div>
                </th>
                <th
                  className="cursor-pointer"
                  onClick={() => handleSort("age")}
                >
                  <div className="flex items-center">
                    Age
                    {sortField === "age" &&
                      (sortDirection === "asc" ? (
                        <FaSortAmountUp className="ml-1" />
                      ) : (
                        <FaSortAmountDown className="ml-1" />
                      ))}
                  </div>
                </th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Blood Type</th>
                <th>Last Visit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr key={patient._id}>
                  <td className="font-medium">{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>
                    <div>{patient.phone}</div>
                    <div className="text-xs text-gray-500">{patient.email}</div>
                  </td>
                  <td>
                    <div className="badge badge-outline">
                      {patient.bloodType}
                    </div>
                  </td>
                  <td>{patient.lastVisit}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button
                        className="btn btn-sm btn-ghost text-blue-600"
                        onClick={() => openViewModal(patient)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-green-600"
                        onClick={() => openEditModal(patient)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-ghost text-red-600"
                        onClick={() => openDeleteModal(patient)}
                      >
                        <FaTrash />
                      </button>
                      <button className="btn btn-sm btn-ghost text-purple-600">
                        <FaFileMedical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentPatients.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No patients found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredPatients.length > 0 && (
          <div className="flex justify-center mt-6">
            <div className="btn-group">
              <button
                className="btn"
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    className={`btn ${
                      currentPage === number ? "btn-active" : ""
                    }`}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                className="btn"
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Add New Patient</h3>
            <PatientForm
              onSubmit={handleAddPatient}
              onCancel={() => setIsAddModalOpen(false)}
            />
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setIsAddModalOpen(false)}
          ></div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {isEditModalOpen && currentPatient && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Edit Patient</h3>
            <PatientForm
              patient={currentPatient}
              onSubmit={handleEditPatient}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setIsEditModalOpen(false)}
          ></div>
        </div>
      )}

      {/* Delete Patient Modal */}
      {isDeleteModalOpen && currentPatient && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">
              Are you sure you want to delete the patient record for{" "}
              <span className="font-semibold">{currentPatient.name}</span>? This
              action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDeletePatient}>
                Delete
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
        </div>
      )}

      {/* View Patient Modal */}
      {isViewModalOpen && currentPatient && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-4">Patient Details</h3>
            <PatientDetails
              patient={currentPatient}
              onClose={() => setIsViewModalOpen(false)}
            />
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setIsViewModalOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;
