import React, { useState, useEffect } from "react";
import axios from "axios";

const AmbulanceManagement = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    driver: "",
    status: "Available",
    location: "",
  });
  const [editing, setEditing] = useState(false);

  // Fetch ambulances
  useEffect(() => {
    fetchAmbulances();
  }, []);

  const fetchAmbulances = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ambulances");
      setAmbulances(response.data);
    } catch (error) {
      console.error("Error fetching ambulances:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update ambulance
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `http://localhost:5000/api/ambulances/${formData.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/ambulances", formData);
      }
      fetchAmbulances();
      setFormData({ id: "", driver: "", status: "Available", location: "" });
      setEditing(false);
    } catch (error) {
      console.error("Error saving ambulance:", error);
    }
  };

  // Edit ambulance
  const handleEdit = (ambulance) => {
    setFormData(ambulance);
    setEditing(true);
  };

  // Delete ambulance
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ambulance?")) {
      try {
        await axios.delete(`http://localhost:5000/api/ambulances/${id}`);
        fetchAmbulances();
      } catch (error) {
        console.error("Error deleting ambulance:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">
          Ambulance Management
        </h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editing ? "Edit Ambulance" : "Add New Ambulance"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ID
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                disabled={editing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Driver
              </label>
              <input
                type="text"
                name="driver"
                value={formData.driver}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="Available">Available</option>
                <option value="On Call">On Call</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {editing ? "Update Ambulance" : "Add Ambulance"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    id: "",
                    driver: "",
                    status: "Available",
                    location: "",
                  });
                  setEditing(false);
                }}
                className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Ambulance List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Ambulance List
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Driver</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ambulances.map((ambulance) => (
                  <tr key={ambulance.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{ambulance.id}</td>
                    <td className="border px-4 py-2">{ambulance.driver}</td>
                    <td className="border px-4 py-2">
                      <span
                        className={`badge ${
                          ambulance.status === "Available"
                            ? "badge-success"
                            : ambulance.status === "On Call"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {ambulance.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2">{ambulance.location}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEdit(ambulance)}
                        className="btn btn-sm btn-info mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ambulance.id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceManagement;
