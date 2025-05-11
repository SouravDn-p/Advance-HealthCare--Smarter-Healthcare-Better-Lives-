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

// "use client";

// import { useState, useEffect } from "react";
// import {
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   UserPlus,
//   Filter,
//   SortAsc,
//   SortDesc,
//   ChevronLeft,
//   ChevronRight,
//   Stethoscope,
// } from "lucide-react";
// import PatientForm from "./PatientForm";
// import PatientDetails from "./PatientDetails";
// import useAuth from "../../../../hooks/useAuth";
// import useAxiosPublic from "../../../../hooks/useAxiosPublic";
// import Swal from "sweetalert2";
// import UnAuthorizedAccess from "../../../../extra/errors/UnAuthorizedAccess";

// const PatientManagement = () => {
//   const { dbUser, isDarkMode } = useAuth();
//   const axiosPublic = useAxiosPublic();
//   const [patients, setPatients] = useState([]);
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [patientsPerPage] = useState(6);
//   const [sortField, setSortField] = useState("name");
//   const [sortDirection, setSortDirection] = useState("asc");
//   const [filterOptions, setFilterOptions] = useState({
//     gender: "",
//     bloodType: "",
//     ageRange: "",
//     medicalCondition: "",
//   });
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [currentPatient, setCurrentPatient] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [viewMode, setViewMode] = useState("table"); // table or grid

//   // Medical conditions for filtering
//   const medicalConditions = [
//     "Hypertension",
//     "Diabetes Type 2",
//     "Asthma",
//     "Allergies",
//     "Heart Disease",
//     "Arthritis",
//     "Migraine",
//     "Anxiety",
//     "COPD",
//     "High Cholesterol",
//     "Hypothyroidism",
//     "Kidney Disease",
//     "Gout",
//     "Endometriosis",
//     "Depression",
//   ];

//   // Fetch patients
//   useEffect(() => {
//     const fetchPatients = async () => {
//       setIsLoading(true);
//       try {
//         const res = await axiosPublic.get("/patients");
//         setPatients(res.data);
//         setFilteredPatients(res.data);
//       } catch (err) {
//         console.error("Error fetching patients:", err);
//         Swal.fire({
//           icon: "error",
//           title: "Failed to Fetch Patients",
//           text: "Please try again later.",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPatients();
//   }, [axiosPublic]);

//   // Filter and sort patients
//   useEffect(() => {
//     let result = [...patients];

//     // Apply search
//     if (searchTerm) {
//       result = result.filter(
//         (patient) =>
//           patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           patient.phone.includes(searchTerm)
//       );
//     }

//     // Apply filters
//     if (filterOptions.gender) {
//       result = result.filter(
//         (patient) => patient.gender === filterOptions.gender
//       );
//     }

//     if (filterOptions.bloodType) {
//       result = result.filter(
//         (patient) => patient.bloodType === filterOptions.bloodType
//       );
//     }

//     if (filterOptions.ageRange) {
//       switch (filterOptions.ageRange) {
//         case "0-18":
//           result = result.filter((patient) => patient.age <= 18);
//           break;
//         case "19-35":
//           result = result.filter(
//             (patient) => patient.age > 18 && patient.age <= 35
//           );
//           break;
//         case "36-50":
//           result = result.filter(
//             (patient) => patient.age > 35 && patient.age <= 50
//           );
//           break;
//         case "51+":
//           result = result.filter((patient) => patient.age > 50);
//           break;
//         default:
//           break;
//       }
//     }

//     if (filterOptions.medicalCondition) {
//       result = result.filter((patient) =>
//         patient.medicalHistory.includes(filterOptions.medicalCondition)
//       );
//     }

//     // Apply sorting
//     result.sort((a, b) => {
//       const aValue = a[sortField] || "";
//       const bValue = b[sortField] || "";
//       if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
//       if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
//       return 0;
//     });

//     setFilteredPatients(result);
//   }, [patients, searchTerm, filterOptions, sortField, sortDirection]);

//   // Pagination
//   const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
//   const currentPatients = filteredPatients.slice(
//     (currentPage - 1) * patientsPerPage,
//     currentPage * patientsPerPage
//   );

//   // Utility functions for styling
//   const getCardClasses = () =>
//     `rounded-lg shadow-sm border p-5 transition-shadow duration-200 ${
//       isDarkMode
//         ? "bg-gray-800 border-gray-700 hover:shadow-md"
//         : "bg-white border-gray-200 hover:shadow-md"
//     }`;

//   const getTextColor = () => (isDarkMode ? "text-gray-100" : "text-gray-900");
//   const getSecondaryTextColor = () =>
//     isDarkMode ? "text-gray-400" : "text-gray-500";

//   // Handle sort
//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//   };

//   // Handle filter change
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilterOptions((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setCurrentPage(1);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm("");
//     setFilterOptions({
//       gender: "",
//       bloodType: "",
//       ageRange: "",
//       medicalCondition: "",
//     });
//     setCurrentPage(1);
//   };

//   // Handle add patient
//   const handleAddPatient = async (newPatient) => {
//     setIsLoading(true);
//     try {
//       const response = await axiosPublic.post("/addPatient", {
//         patient: {
//           ...newPatient,
//           registrationDate: new Date().toISOString().split("T")[0],
//         },
//       });
//       if (response.status === 201) {
//         setPatients([...patients, response.data]);
//         setIsAddModalOpen(false);
//         Swal.fire({
//           icon: "success",
//           title: "Patient Added",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Add Patient",
//         text: "Please try again!",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle edit patient
//   const handleEditPatient = async (updatedPatient) => {
//     setIsLoading(true);
//     try {
//       const response = await axiosPublic.put(
//         `/patients/${updatedPatient._id}`,
//         {
//           patient: updatedPatient,
//         }
//       );
//       if (response.status === 200) {
//         setPatients(
//           patients.map((patient) =>
//             patient._id === updatedPatient._id ? response.data : patient
//           )
//         );
//         setIsEditModalOpen(false);
//         Swal.fire({
//           icon: "success",
//           title: "Patient Updated",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Update Patient",
//         text: "Please try again!",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle delete patient
//   const handleDeletePatient = (patient) => {
//     Swal.fire({
//       title: `Delete ${patient.name}?`,
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Delete",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         setIsLoading(true);
//         try {
//           const response = await axiosPublic.delete(`/patients/${patient._id}`);
//           if (response.status === 200) {
//             setPatients(patients.filter((p) => p._id !== patient._id));
//             Swal.fire({
//               icon: "success",
//               title: "Patient Deleted",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           }
//         } catch (err) {
//           Swal.fire({
//             icon: "error",
//             title: "Failed to Delete",
//             text: "Please try again!",
//           });
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     });
//   };

//   // Open modals
//   const openEditModal = (patient) => {
//     setCurrentPatient(patient);
//     setIsEditModalOpen(true);
//   };

//   const openViewModal = (patient) => {
//     setCurrentPatient(patient);
//     setIsViewModalOpen(true);
//   };

//   // Authorization check
//   if (dbUser?.role !== "admin") {
//     return <UnAuthorizedAccess />;
//   }

//   return (
//     <div
//       className={`p-4 lg:p-6 space-y-6 min-h-screen ${
//         isDarkMode ? "bg-gray-900" : "bg-gray-50"
//       } transition-colors duration-300`}
//     >
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1
//             className={`text-2xl font-bold ${getTextColor()} flex items-center`}
//           >
//             <Stethoscope className="w-6 h-6 mr-2" /> Patient Management
//           </h1>
//           <p className={`mt-1 text-sm ${getSecondaryTextColor()}`}>
//             Add, edit, and manage patients in the system
//           </p>
//         </div>
//         <div className="mt-4 md:mt-0">
//           <button
//             onClick={() => setIsAddModalOpen(true)}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50"
//             disabled={isLoading}
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Add Patient
//           </button>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div className="relative flex-1 max-w-md">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-5 w-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search patients..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={`block w-full pl-10 pr-3 py-2 border ${
//               isDarkMode ? "border-gray-600" : "border-gray-300"
//             } rounded-md leading-5 ${
//               isDarkMode
//                 ? "bg-gray-700 text-white placeholder-gray-400"
//                 : "bg-white text-gray-900 placeholder-gray-500"
//             } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm`}
//             disabled={isLoading}
//             aria-label="Search patients"
//           />
//         </div>

//         <div className="flex items-center gap-4 flex-wrap">
//           <div className="relative">
//             <select
//               name="gender"
//               value={filterOptions.gender}
//               onChange={handleFilterChange}
//               className={`pl-3 pr-8 py-2 border ${
//                 isDarkMode ? "border-gray-600" : "border-gray-300"
//               } rounded-md leading-5 ${
//                 isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
//               } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:text-sm`}
//               disabled={isLoading}
//               aria-label="Filter by gender"
//             >
//               <option value="">All Genders</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//               <Filter className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>

//           <div className="relative">
//             <select
//               name="bloodType"
//               value={filterOptions.bloodType}
//               onChange={handleFilterChange}
//               className={`pl-3 pr-8 py-2 border ${
//                 isDarkMode ? "border-gray-600" : "border-gray-300"
//               } rounded-md leading-5 ${
//                 isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
//               } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:text-sm`}
//               disabled={isLoading}
//               aria-label="Filter by blood type"
//             >
//               <option value="">All Blood Types</option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                 (type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 )
//               )}
//             </select>
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//               <Filter className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>

//           <div className="relative">
//             <select
//               name="ageRange"
//               value={filterOptions.ageRange}
//               onChange={handleFilterChange}
//               className={`pl-3 pr-8 py-2 border ${
//                 isDarkMode ? "border-gray-600" : "border-gray-300"
//               } rounded-md leading-5 ${
//                 isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
//               } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:text-sm`}
//               disabled={isLoading}
//               aria-label="Filter by age range"
//             >
//               <option value="">All Ages</option>
//               <option value="0-18">0-18</option>
//               <option value="19-35">19-35</option>
//               <option value="36-50">36-50</option>
//               <option value="51+">51+</option>
//             </select>
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//               <Filter className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>

//           <div className="relative">
//             <select
//               name="medicalCondition"
//               value={filterOptions.medicalCondition}
//               onChange={handleFilterChange}
//               className={`pl-3 pr-8 py-2 border ${
//                 isDarkMode ? "border-gray-600" : "border-gray-300"
//               } rounded-md leading-5 ${
//                 isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
//               } focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:text-sm`}
//               disabled={isLoading}
//               aria-label="Filter by medical condition"
//             >
//               <option value="">All Conditions</option>
//               {medicalConditions.map((condition) => (
//                 <option key={condition} value={condition}>
//                   {condition}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//               <Filter className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>

//           <div
//             className={`flex border ${
//               isDarkMode ? "border-gray-600" : "border-gray-300"
//             } rounded-md overflow-hidden`}
//           >
//             <button
//               onClick={() => setViewMode("grid")}
//               className={`p-2 ${
//                 viewMode === "grid"
//                   ? isDarkMode
//                     ? "bg-blue-900/30 text-blue-400"
//                     : "bg-blue-100 text-blue-600"
//                   : isDarkMode
//                   ? "bg-gray-700 text-gray-300"
//                   : "bg-white text-gray-700"
//               }`}
//               disabled={isLoading}
//               aria-label="Grid view"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect x="3" y="3" width="7" height="7"></rect>
//                 <rect x="14" y="3" width="7" height="7"></rect>
//                 <rect x="3" y="14" width="7" height="7"></rect>
//                 <rect x="14" y="14" width="7" height="7"></rect>
//               </svg>
//             </button>
//             <button
//               onClick={() => setViewMode("table")}
//               className={`p-2 ${
//                 viewMode === "table"
//                   ? isDarkMode
//                     ? "bg-blue-900/30 text-blue-400"
//                     : "bg-blue-100 text-blue-600"
//                   : isDarkMode
//                   ? "bg-gray-700 text-gray-300"
//                   : "bg-white text-gray-700"
//               }`}
//               disabled={isLoading}
//               aria-label="Table view"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="3" y1="6" x2="21" y2="6"></line>
//                 <line x1="3" y1="12" x2="21" y2="12"></line>
//                 <line x1="3" y1="18" x2="21" y2="18"></line>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Patients List */}
//       {isLoading ? (
//         <div className="text-center py-8">
//           <svg
//             className="animate-spin h-8 w-8 mx-auto text-blue-600"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             ></path>
//           </svg>
//           <p className={`mt-2 text-sm ${getTextColor()}`}>
//             Loading patients...
//           </p>
//         </div>
//       ) : filteredPatients.length === 0 ? (
//         <div className={getCardClasses()}>
//           <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
//             <UserPlus className="w-8 h-8 text-gray-500 dark:text-gray-400" />
//           </div>
//           <h3 className={`text-lg font-medium ${getTextColor()}`}>
//             No patients found
//           </h3>
//           <p className={`mt-2 text-sm ${getSecondaryTextColor()}`}>
//             {searchTerm || Object.values(filterOptions).some((v) => v)
//               ? "Try adjusting your search or filters"
//               : "Add your first patient to get started"}
//           </p>
//           {(searchTerm || Object.values(filterOptions).some((v) => v)) && (
//             <button
//               onClick={resetFilters}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
//               disabled={isLoading}
//             >
//               Clear Filters
//             </button>
//           )}
//         </div>
//       ) : viewMode === "grid" ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {currentPatients.map((patient) => (
//             <div
//               key={patient._id}
//               className={
//                 getCardClasses().replace("p-5", "") + " overflow-hidden"
//               }
//             >
//               <div className="p-4">
//                 <h3 className={`text-lg font-medium ${getTextColor()}`}>
//                   {patient.name}
//                 </h3>
//                 <p
//                   className={`text-sm ${
//                     isDarkMode ? "text-blue-400" : "text-blue-600"
//                   }`}
//                 >
//                   {patient.gender}, {patient.age} years
//                 </p>
//                 <p className={`text-sm ${getSecondaryTextColor()} mt-1`}>
//                   Blood Type: {patient.bloodType}
//                 </p>
//                 <div className="mt-3">
//                   <p className={`text-sm ${getTextColor()}`}>
//                     <strong>Contact:</strong> {patient.phone}
//                   </p>
//                   <p className={`text-sm ${getSecondaryTextColor()}`}>
//                     {patient.email}
//                   </p>
//                 </div>
//                 {patient.medicalHistory &&
//                   patient.medicalHistory.length > 0 && (
//                     <div className="mt-3">
//                       <p className={`text-sm font-medium ${getTextColor()}`}>
//                         Medical History:
//                       </p>
//                       <ul
//                         className={`mt-1 text-sm ${getSecondaryTextColor()} list-disc list-inside`}
//                       >
//                         {patient.medicalHistory.map((condition, index) => (
//                           <li key={index}>{condition}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 <div className="mt-3">
//                   <p className={`text-sm ${getTextColor()}`}>
//                     <strong>Last Visit:</strong> {patient.lastVisit}
//                   </p>
//                   <p className={`text-sm ${getTextColor()}`}>
//                     <strong>Next Appointment:</strong>{" "}
//                     {patient.upcomingAppointment || "None"}
//                   </p>
//                 </div>
//                 <div className="mt-4 flex space-x-2">
//                   <button
//                     onClick={() => openViewModal(patient)}
//                     className={`p-2 ${
//                       isDarkMode
//                         ? "bg-gray-800 hover:bg-gray-700"
//                         : "bg-white hover:bg-gray-100"
//                     } rounded-full shadow-md`}
//                     title="View Patient"
//                     disabled={isLoading}
//                   >
//                     <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                   </button>
//                   <button
//                     onClick={() => openEditModal(patient)}
//                     className={`p-2 ${
//                       isDarkMode
//                         ? "bg-gray-800 hover:bg-gray-700"
//                         : "bg-white hover:bg-gray-100"
//                     } rounded-full shadow-md`}
//                     title="Edit Patient"
//                     disabled={isLoading}
//                   >
//                     <Edit className="w-4 h-4 text-green-600 dark:text-green-400" />
//                   </button>
//                   <button
//                     onClick={() => handleDeletePatient(patient)}
//                     className={`p-2 ${
//                       isDarkMode
//                         ? "bg-gray-800 hover:bg-gray-700"
//                         : "bg-white hover:bg-gray-100"
//                     } rounded-full shadow-md`}
//                     title="Delete Patient"
//                     disabled={isLoading}
//                   >
//                     <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div
//           className={getCardClasses().replace("p-5", "") + " overflow-hidden"}
//         >
//           <div className="overflow-x-auto">
//             <table
//               className={`min-w-full divide-y ${
//                 isDarkMode ? "divide-gray-700" : "divide-gray-200"
//               }`}
//             >
//               <thead className={isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}>
//                 <tr>
//                   {[
//                     { label: "Name", field: "name" },
//                     { label: "Age", field: "age" },
//                     { label: "Gender", field: "gender" },
//                     { label: "Contact", field: "phone" },
//                     { label: "Blood Type", field: "bloodType" },
//                     { label: "Last Visit", field: "lastVisit" },
//                     { label: "Actions", field: null },
//                   ].map(({ label, field }) => (
//                     <th
//                       key={label}
//                       scope="col"
//                       className={`px-6 py-3 text-left text-xs font-medium ${
//                         isDarkMode ? "text-gray-400" : "text-gray-500"
//                       } uppercase tracking-wider ${
//                         field ? "cursor-pointer" : ""
//                       }`}
//                       onClick={field ? () => handleSort(field) : undefined}
//                     >
//                       <div className="flex items-center">
//                         {label}
//                         {field &&
//                           sortField === field &&
//                           (sortDirection === "asc" ? (
//                             <SortAsc className="ml-1 w-4 h-4" />
//                           ) : (
//                             <SortDesc className="ml-1 w-4 h-4" />
//                           ))}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody
//                 className={`${
//                   isDarkMode ? "bg-gray-800" : "bg-white"
//                 } divide-y ${
//                   isDarkMode ? "divide-gray-700" : "divide-gray-200"
//                 }`}
//               >
//                 {currentPatients.map((patient) => (
//                   <tr
//                     key={patient._id}
//                     className={`hover:${
//                       isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
//                     }`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm font-medium ${getTextColor()}`}>
//                         {patient.name}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${getTextColor()}`}>
//                         {patient.age}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${getTextColor()}`}>
//                         {patient.gender}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${getTextColor()}`}>
//                         {patient.phone}
//                       </div>
//                       <div className={`text-xs ${getSecondaryTextColor()}`}>
//                         {patient.email}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div
//                         className={`text-sm ${
//                           isDarkMode
//                             ? "text-blue-400 border-blue-400"
//                             : "text-blue-600 border-blue-600"
//                         } inline-block px-2 py-1 border rounded-full`}
//                       >
//                         {patient.bloodType}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${getTextColor()}`}>
//                         {patient.lastVisit}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex justify-end space-x-2">
//                         <button
//                           onClick={() => openViewModal(patient)}
//                           className={`${
//                             isDarkMode
//                               ? "text-blue-400 hover:text-blue-300"
//                               : "text-blue-600 hover:text-blue-800"
//                           }`}
//                           title="View Patient"
//                           disabled={isLoading}
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => openEditModal(patient)}
//                           className={`${
//                             isDarkMode
//                               ? "text-green-400 hover:text-green-300"
//                               : "text-green-600 hover:text-green-800"
//                           }`}
//                           title="Edit Patient"
//                           disabled={isLoading}
//                         >
//                           <Edit className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => handleDeletePatient(patient)}
//                           className={`${
//                             isDarkMode
//                               ? "text-red-400 hover:text-red-300"
//                               : "text-red-600 hover:text-red-800"
//                           }`}
//                           title="Delete Patient"
//                           disabled={isLoading}
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-between">
//           <div className={`text-sm ${getTextColor()}`}>
//             Showing{" "}
//             <span className="font-medium">
//               {(currentPage - 1) * patientsPerPage + 1}
//             </span>{" "}
//             to{" "}
//             <span className="font-medium">
//               {Math.min(currentPage * patientsPerPage, filteredPatients.length)}
//             </span>{" "}
//             of <span className="font-medium">{filteredPatients.length}</span>{" "}
//             patients
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1 || isLoading}
//               className={`p-2 rounded-md ${
//                 currentPage === 1 || isLoading
//                   ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
//                   : isDarkMode
//                   ? "text-gray-300 hover:bg-gray-700"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//               aria-label="Previous page"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//             {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//               const page = i + 1 + Math.max(0, currentPage - 3);
//               if (page > totalPages) return null;
//               return (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`px-3 py-1 rounded-md ${
//                     currentPage === page
//                       ? "bg-blue-600 text-white"
//                       : isDarkMode
//                       ? "text-gray-300 hover:bg-gray-700"
//                       : "text-gray-700 hover:bg-gray-100"
//                   }`}
//                   disabled={isLoading}
//                   aria-label={`Page ${page}`}
//                 >
//                   {page}
//                 </button>
//               );
//             })}
//             <button
//               onClick={() =>
//                 setCurrentPage(Math.min(totalPages, currentPage + 1))
//               }
//               disabled={currentPage === totalPages || isLoading}
//               className={`p-2 rounded-md ${
//                 currentPage === totalPages || isLoading
//                   ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
//                   : isDarkMode
//                   ? "text-gray-300 hover:bg-gray-700"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//               aria-label="Next page"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Add Patient Modal */}
//       {isAddModalOpen && (
//         <div
//           className="fixed inset-0 z-50 overflow-y-auto"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75 transition-opacity"
//               aria-hidden="true"
//               onClick={() => setIsAddModalOpen(false)}
//             ></div>
//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <div
//               className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full ${
//                 isDarkMode ? "bg-gray-800" : "bg-white"
//               }`}
//             >
//               <div className="p-6">
//                 <h3 className={`font-bold text-lg ${getTextColor()} mb-4`}>
//                   Add New Patient
//                 </h3>
//                 <PatientForm
//                   onSubmit={handleAddPatient}
//                   onCancel={() => setIsAddModalOpen(false)}
//                   isLoading={isLoading}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Patient Modal */}
//       {isEditModalOpen && currentPatient && (
//         <div
//           className="fixed inset-0 z-50 overflow-y-auto"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75 transition-opacity"
//               aria-hidden="true"
//               onClick={() => setIsEditModalOpen(false)}
//             ></div>
//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <div
//               className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full ${
//                 isDarkMode ? "bg-gray-800" : "bg-white"
//               }`}
//             >
//               <div className="p-6">
//                 <h3 className={`font-bold text-lg ${getTextColor()} mb-4`}>
//                   Edit Patient
//                 </h3>
//                 <PatientForm
//                   patient={currentPatient}
//                   onSubmit={handleEditPatient}
//                   onCancel={() => setIsEditModalOpen(false)}
//                   isLoading={isLoading}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Patient Modal */}
//       {isViewModalOpen && currentPatient && (
//         <div
//           className="fixed inset-0 z-50 overflow-y-auto"
//           role="dialog"
//           aria-modal="true"
//         >
//           <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div
//               className="fixed inset-0 bg-gray-500 dark:bg-gray-900 opacity-75 transition-opacity"
//               aria-hidden="true"
//               onClick={() => setIsViewModalOpen(false)}
//             ></div>
//             <span
//               className="hidden sm:inline-block sm:align-middle sm:h-screen"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <div
//               className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full ${
//                 isDarkMode ? "bg-gray-800" : "bg-white"
//               }`}
//             >
//               <div className="p-6">
//                 <h3 className={`font-bold text-lg ${getTextColor()} mb-4`}>
//                   Patient Details
//                 </h3>
//                 <PatientDetails
//                   patient={currentPatient}
//                   onClose={() => setIsViewModalOpen(false)}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientManagement;
