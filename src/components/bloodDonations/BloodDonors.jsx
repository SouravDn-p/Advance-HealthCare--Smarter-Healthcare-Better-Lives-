"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Phone,
  MapPin,
  Droplet,
  Clock,
} from "lucide-react";
import { DonateBloodModal } from "./DonateBloodModal";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import LoadingSpinner from "../../extra/loaders/LoadingSpinner";

export function BloodDonors() {
  const axiosPublic = useAxiosPublic();
  const { isDarkMode } = useAuth();
  const [allDonors, setAllDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [bloodTypeDropdownOpen, setBloodTypeDropdownOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  // Fetch donors from API
  useEffect(() => {
    const fetchDonors = async () => {
      setLoader(true);
      try {
        const response = await axiosPublic.get("/bloodDonors");
        setAllDonors(response.data);
        setFilteredDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch donors",
          text: "Please try again later.",
          confirmButtonColor: "#3085d6",
        });
      } finally {
        setLoader(false);
      }
    };

    fetchDonors();
  }, [axiosPublic]);

  // Apply filters whenever searchTerm, bloodTypeFilter, activeTab, or allDonors change
  useEffect(() => {
    let result = [...allDonors];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (donor) =>
          donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by blood type
    if (bloodTypeFilter && bloodTypeFilter !== "all") {
      result = result.filter((donor) => donor.bloodType === bloodTypeFilter);
    }

    // Filter by tab
    if (activeTab === "eligible") {
      result = result.filter((donor) => donor.eligibleToDonateDays > 0);
    } else if (activeTab === "recent") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter((donor) => {
        const donationDate = new Date(donor.lastDonation);
        return donationDate >= thirtyDaysAgo;
      });
    }

    setFilteredDonors(result);
  }, [searchTerm, bloodTypeFilter, activeTab, allDonors]);

  // Handle adding a new donor
  const handleAddDonor = async (newDonor) => {
    const donor = {
      _id: (allDonors.length + 1).toString(),
      ...newDonor,
      avatar: "/placeholder.svg?height=40&width=40",
      lastDonation: new Date().toISOString().split("T")[0],
      eligibleToDonateDays: 0,
    };

    try {
      const response = await axiosPublic.post("/addDonor", donor);
      if (response.status === 201) {
        setAllDonors((prev) => [donor, ...prev]);
        setFilteredDonors((prev) => [donor, ...prev]);
        Swal.fire({
          icon: "success",
          title: "Successfully Added Blood Donor",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Failed to add donor");
      }
    } catch (error) {
      console.error("Error adding donor:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Blood Donor",
        text: "Something went wrong. Please try again!",
        confirmButtonText: "Okay",
        confirmButtonColor: "#3085d6",
      });
    }

    setIsModalOpen(false);
  };

  if (loader) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`container mx-auto px-4 py-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2
            className={`text-3xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Blood Donors
          </h2>
          <p className="text-gray-400 dark:text-gray-300">
            Manage blood donors and donation records
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2 transition-colors duration-200"
          aria-label="Open donate blood modal"
        >
          <Plus className="h-4 w-4" /> Donate Blood
        </button>
      </div>

      <div className="w-full mt-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div
            className={`flex space-x-1 p-1 rounded-md transition-colors duration-300 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <button
              className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                activeTab === "all"
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("all")}
              aria-label="Show all donors"
            >
              All Donors
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                activeTab === "eligible"
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("eligible")}
              aria-label="Show eligible donors"
            >
              Eligible to Donate
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                activeTab === "recent"
                  ? isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                  : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-gray-600 hover:bg-gray-200 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("recent")}
              aria-label="Show recent donations"
            >
              Recent Donations
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="search"
                placeholder="Search donors..."
                className={`pl-9 pr-3 py-2 w-full sm:w-[200px] lg:w-[300px] border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-200"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search donors by name, location, or blood type"
              />
            </div>

            <div className="relative">
              <button
                className={`flex items-center gap-2 px-3 py-2 border rounded-md w-full sm:w-[150px] focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 text-gray-200"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
                onClick={() => setBloodTypeDropdownOpen(!bloodTypeDropdownOpen)}
                aria-label="Toggle blood type filter dropdown"
              >
                <Filter
                  className={`h-4 w-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span className="text-sm">
                  {bloodTypeFilter || "Blood Type"}
                </span>
                <svg
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } ml-auto`}
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
                <div
                  className={`absolute z-10 mt-1 w-full shadow-lg rounded-md border py-1 transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <button
                    className={`w-full text-left px-3 py-2 text-sm transition-colors duration-200 ${
                      isDarkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => {
                      setBloodTypeFilter("");
                      setBloodTypeDropdownOpen(false);
                    }}
                    aria-label="Select all blood types"
                  >
                    All Types
                  </button>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (type) => (
                      <button
                        key={type}
                        className={`w-full text-left px-3 py-2 text-sm transition-colors duration-200 ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        onClick={() => {
                          setBloodTypeFilter(type);
                          setBloodTypeDropdownOpen(false);
                        }}
                        aria-label={`Filter by blood type ${type}`}
                      >
                        {type}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <DonorsList donors={filteredDonors} />
      </div>

      <DonateBloodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDonor}
      />
    </div>
  );
}

function DonorsList({ donors }) {
  const { isDarkMode } = useAuth();

  if (donors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Droplet
          className={`h-12 w-12 ${
            isDarkMode ? "text-red-400" : "text-red-500"
          }`}
        />
        <h3
          className={`text-lg font-medium ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          No donors found
        </h3>
        <p className="text-gray-400 dark:text-gray-300 mt-2">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {donors.map((donor) => (
        <div
          key={donor.id}
          className={`rounded-lg shadow overflow-hidden border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`relative w-10 h-10 rounded-full overflow-hidden ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  <img
                    src={donor.avatar || "/placeholder.svg"}
                    alt={donor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (e.target.src !== "/placeholder.svg") {
                        e.target.src = "/placeholder.svg";
                      }
                    }}
                  />
                </div>
                <div>
                  <h3
                    className={`text-lg font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {donor.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {donor.email}
                  </p>
                </div>
              </div>

              {/* Blood Type Badge */}
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  donor.bloodType === "O"
                    ? isDarkMode
                      ? "bg-green-900/30 text-green-300"
                      : "bg-green-100 text-green-800"
                    : donor.bloodType === "A"
                    ? isDarkMode
                      ? "bg-blue-900/30 text-blue-300"
                      : "bg-blue-100 text-blue-800"
                    : donor.bloodType === "B"
                    ? isDarkMode
                      ? "bg-purple-900/30 text-purple-300"
                      : "bg-purple-100 text-purple-800"
                    : isDarkMode
                    ? "bg-amber-900/30 text-amber-300"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {donor.bloodType}
              </span>
            </div>
          </div>

          <div className="px-4 pb-2">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone
                  className={`h-4 w-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  {donor.contact}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin
                  className={`h-4 w-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  {donor.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar
                  className={`h-4 w-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}
                >
                  Last donation:{" "}
                  {new Date(donor.lastDonation).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`px-4 py-3 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {donor.eligibleToDonateDays > 0 ? (
              <div
                className={`flex items-center gap-1 text-sm ${
                  isDarkMode ? "text-green-400" : "text-green-700"
                }`}
              >
                <Clock className="h-3 w-3" />
                Eligible to donate in {donor.eligibleToDonateDays} days
              </div>
            ) : (
              <div
                className={`flex items-center gap-1 text-sm ${
                  isDarkMode ? "text-red-400" : "text-red-700"
                }`}
              >
                <Droplet className="h-3 w-3" />
                Eligible to donate now
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
