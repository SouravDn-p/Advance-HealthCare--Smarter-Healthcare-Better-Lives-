import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Search,
  Filter,
  Plus,
  MapPin,
  User,
  Truck,
  Grid,
  List,
} from "lucide-react";
import useAuth from "../../../../hooks/useAuth";
import UnAuthorizedAccess from "../../../../extra/errors/UnAuthorizedAccess";

const initialAmbulances = [
  {
    id: "AMB001",
    driver: "John Doe",
    status: "Available",
    location: "Central Hospital",
  },
  {
    id: "AMB002",
    driver: "Jane Smith",
    status: "On Call",
    location: "Downtown Clinic",
  },
  {
    id: "AMB003",
    driver: "Mike Johnson",
    status: "Maintenance",
    location: "Northside Garage",
  },
];

const AmbulanceManagement = () => {
  const { dbUser, isDarkMode } = useAuth();
  const [ambulances, setAmbulances] = useState(initialAmbulances);
  const [formData, setFormData] = useState({
    id: "",
    driver: "",
    status: "Available",
    location: "",
  });
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  useEffect(() => {
    fetchAmbulances();
  }, []);

  const fetchAmbulances = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ambulances");
      setAmbulances(
        response.data.length > 0 ? response.data : initialAmbulances
      );
    } catch (error) {
      console.error("Error fetching ambulances:", error);
      setAmbulances(initialAmbulances);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (newAmbulance) => {
    try {
      if (editing) {
        await axios.put(
          `http://localhost:5000/api/ambulances/${newAmbulance.id}`,
          newAmbulance
        );
        Swal.fire({
          icon: "success",
          title: "Ambulance Updated",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axios.post("http://localhost:5000/api/ambulances", newAmbulance);
        Swal.fire({
          icon: "success",
          title: "Ambulance Added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      fetchAmbulances();
      setFormData({ id: "", driver: "", status: "Available", location: "" });
      setEditing(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving ambulance:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Save Ambulance",
        text: "Something went wrong. Please try again!",
        confirmButtonText: "Okay",
      });
    }
  };

  const handleEdit = (ambulance) => {
    setFormData(ambulance);
    setEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/ambulances/${id}`);
        fetchAmbulances();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Ambulance has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error deleting ambulance:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to Delete",
          text: "Something went wrong. Please try again!",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  const filteredAmbulances = ambulances.filter(
    (ambulance) =>
      (ambulance.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ambulance.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ambulance.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter ? ambulance.status === statusFilter : true)
  );

  if (dbUser?.role != "admin") {
    return <UnAuthorizedAccess />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Ambulance Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage ambulance fleet and assignments
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              id: "",
              driver: "",
              status: "Available",
              location: "",
            });
            setEditing(false);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Ambulance
        </button>
      </div>

      <div className="w-full mt-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search ambulances..."
                className="pl-9 pr-3 py-2 w-full sm:w-[200px] lg:w-[300px] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full sm:w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{statusFilter || "Status"}</span>
                <svg
                  className="h-5 w-5 text-gray-400 ml-auto"
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
              {statusDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1">
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setStatusFilter("");
                      setStatusDropdownOpen(false);
                    }}
                  >
                    All Statuses
                  </button>
                  {["Available", "On Call", "Maintenance"].map((status) => (
                    <button
                      key={status}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setStatusFilter(status);
                        setStatusDropdownOpen(false);
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
        {viewMode === "grid" ? (
          <AmbulanceGrid
            ambulances={filteredAmbulances}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <AmbulanceTable
            ambulances={filteredAmbulances}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <AmbulanceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditing(false);
          setFormData({
            id: "",
            driver: "",
            status: "Available",
            location: "",
          });
        }}
        onSubmit={handleSubmit}
        initialData={formData}
        editing={editing}
      />
    </div>
  );
};

const AmbulanceGrid = ({ ambulances, onEdit, onDelete }) => {
  if (ambulances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Truck className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium">No ambulances found</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ambulances.map((ambulance) => (
        <div
          key={ambulance.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Truck className="w-full h-full text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    Ambulance {ambulance.id}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {ambulance.driver}
                  </p>
                </div>
              </div>
              <span
                className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${
                    ambulance.status === "Available"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : ambulance.status === "On Call"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }
                `}
              >
                {ambulance.status}
              </span>
            </div>
          </div>
          <div className="px-4 pb-2">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  {ambulance.driver}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  {ambulance.location}
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              onClick={() => onEdit(ambulance)}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(ambulance.id)}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const AmbulanceTable = ({ ambulances, onEdit, onDelete }) => {
  if (ambulances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Truck className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium">No ambulances found</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Driver
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {ambulances.map((ambulance) => (
            <tr
              key={ambulance.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {ambulance.id}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {ambulance.driver}
              </td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      ambulance.status === "Available"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : ambulance.status === "On Call"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }
                  `}
                >
                  {ambulance.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {ambulance.location}
              </td>
              <td className="px-4 py-3 text-sm">
                <button
                  onClick={() => onEdit(ambulance)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(ambulance.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AmbulanceModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  editing,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? "Edit Ambulance" : "Add New Ambulance"}
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              ID
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
              disabled={editing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Driver
            </label>
            <input
              type="text"
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="Available">Available</option>
              <option value="On Call">On Call</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {editing ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AmbulanceManagement;
