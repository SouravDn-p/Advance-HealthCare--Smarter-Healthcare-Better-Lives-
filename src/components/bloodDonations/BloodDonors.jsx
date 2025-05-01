"use client";

import { useState, useEffect, useContext } from "react";
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
import Swal from "sweetalert2";
import { AuthContexts } from "../../providers/AuthProvider";
import Loader from "../../extra/Loader";

export function BloodDonors() {
  const axiosPublic = useAxiosPublic();
  const [donors, setDonors] = useState([
    {
      _id: 1,
      name: "Sarah Johnson",
      bloodType: "O+",
      location: "Downtown Medical Center",
      lastDonation: "2023-12-15",
      contact: "+1 (555) 123-4567",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      eligibleToDonateDays: 0,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodTypeFilter, setBloodTypeFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [bloodTypeDropdownOpen, setBloodTypeDropdownOpen] = useState(false);
  const { loader, setLoader } = useContext(AuthContexts);

  // Filter donors based on search term and blood type
  useEffect(() => {
    setLoader(true);
    let filteredDonors = donors;

    // Filter by search term
    if (searchTerm) {
      filteredDonors = filteredDonors.filter(
        (donor) =>
          donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by blood type
    if (bloodTypeFilter && bloodTypeFilter !== "all") {
      filteredDonors = filteredDonors.filter(
        (donor) => donor.bloodType === bloodTypeFilter
      );
    }

    // Filter by tab
    if (activeTab === "eligible") {
      filteredDonors = filteredDonors.filter(
        (donor) => donor.eligibleToDonateDays > 0
      );
    } else if (activeTab === "recent") {
      // Donors who donated in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      filteredDonors = filteredDonors.filter((donor) => {
        const donationDate = new Date(donor.lastDonation);
        return donationDate >= thirtyDaysAgo;
      });
    }

    setDonors(filteredDonors);
    setLoader(false);
  }, [searchTerm, bloodTypeFilter, activeTab]);

  useEffect(() => {
    setLoader(true);
    const fetchDonors = async () => {
      try {
        const response = await axiosPublic.get("/bloodDonors");
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
    setLoader(false);
  }, [axiosPublic, setDonors, setLoader]);

  // Handle adding a new donor
  const handleAddDonor = async (newDonor) => {
    // In a real app, you would send this to an API
    const donor = {
      id: donors.length + 1,
      ...newDonor,
      avatar: "/placeholder.svg?height=40&width=40",
      lastDonation: new Date().toISOString().split("T")[0],
      eligibleToDonateDays: 0,
    };

    setDonors((prevDonors) => [donor, ...prevDonors]);
    console.log("donor", donor);

    const response = await axiosPublic.post("/addDonor", {
      donor,
    });
    if (response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Successfully Added Blood Donor",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Blood Donor",
        text: "Something went wrong. Please try again!",
        confirmButtonText: "Okay",
      });
    }

    setIsModalOpen(false);
  };

  if (loader) {
    <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blood Donors</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage blood donors and donation records
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Donate Blood
        </button>
      </div>

      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-md mb-4 sm:mb-0">
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "all"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Donors
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "eligible"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab("eligible")}
            >
              Eligible to Donate
            </button>
            <button
              className={`px-4 py-2 text-sm rounded-md ${
                activeTab === "recent"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              }`}
              onClick={() => setActiveTab("recent")}
            >
              Recent Donations
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search donors..."
                className="pl-9 pr-3 py-2 w-full sm:w-[200px] lg:w-[300px] border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full sm:w-[150px] focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                onClick={() => setBloodTypeDropdownOpen(!bloodTypeDropdownOpen)}
              >
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm">
                  {bloodTypeFilter || "Blood Type"}
                </span>
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

              {bloodTypeDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1">
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setBloodTypeFilter("");
                      setBloodTypeDropdownOpen(false);
                    }}
                  >
                    All Types
                  </button>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (type) => (
                      <button
                        key={type}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                          setBloodTypeFilter(type);
                          setBloodTypeDropdownOpen(false);
                        }}
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

        <DonorsList donors={donors} />
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
  if (donors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Droplet className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium">No donors found</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
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
          className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={donor.avatar || "/placeholder.svg"}
                    alt={donor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=40&width=40";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{donor.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {donor.email}
                  </p>
                </div>
              </div>
              <span
                className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${
                  donor.bloodType.includes("O")
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : ""
                }
                ${
                  donor.bloodType.includes("A")
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    : ""
                }
                ${
                  donor.bloodType.includes("B")
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    : ""
                }
                ${
                  donor.bloodType.includes("AB")
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                    : ""
                }
              `}
              >
                {donor.bloodType}
              </span>
            </div>
          </div>
          <div className="px-4 pb-2">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  {donor.contact}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  {donor.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Last donation:{" "}
                  {new Date(donor.lastDonation).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
            {donor.eligibleToDonateDays > 0 ? (
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <Clock className="h-3 w-3" />
                Eligible to donate in {donor.eligibleToDonateDays} days
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
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
