"use client";

import { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  User,
  Activity,
  Pill,
  FileCheck,
  Download,
  X,
  Heart,
  TrendingUp,
  Droplet,
  Clipboard,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  Upload,
  Printer,
  Share2,
  MapPin,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const MedicalRecord = () => {
  const { user, theme } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    recordType: "all",
    dateRange: "all",
    sortBy: "date-desc",
  });

  // Sample medical records data
  const [medicalRecords, setMedicalRecords] = useState([
    {
      id: 1,
      type: "visit",
      title: "Annual Physical Examination",
      date: "2023-05-10",
      doctor: "Dr. Sarah Johnson",
      facility: "City Medical Center",
      description: "Routine annual physical examination. All vitals normal.",
      details: {
        symptoms: "None reported",
        diagnosis: "Healthy adult",
        recommendations:
          "Continue regular exercise and balanced diet. Schedule next annual exam in 12 months.",
        vitals: {
          bloodPressure: "120/80 mmHg",
          heartRate: "72 bpm",
          temperature: "98.6°F",
          respiratoryRate: "16 breaths/min",
          weight: "165 lbs",
          height: "5'10\"",
        },
      },
      sensitive: false,
    },
    {
      id: 2,
      type: "test",
      title: "Complete Blood Count (CBC)",
      date: "2023-05-12",
      doctor: "Dr. Mark Benson",
      facility: "City Medical Center Laboratory",
      description: "Routine blood work as part of annual physical.",
      details: {
        results: [
          {
            name: "White Blood Cell Count",
            value: "7.5",
            unit: "x10^9/L",
            range: "4.5-11.0",
            status: "normal",
          },
          {
            name: "Red Blood Cell Count",
            value: "5.2",
            unit: "x10^12/L",
            range: "4.5-5.9",
            status: "normal",
          },
          {
            name: "Hemoglobin",
            value: "15.1",
            unit: "g/dL",
            range: "13.5-17.5",
            status: "normal",
          },
          {
            name: "Hematocrit",
            value: "45",
            unit: "%",
            range: "41-50",
            status: "normal",
          },
          {
            name: "Platelet Count",
            value: "250",
            unit: "x10^9/L",
            range: "150-450",
            status: "normal",
          },
        ],
        summary: "All values within normal range. No abnormalities detected.",
      },
      sensitive: false,
    },
    {
      id: 3,
      type: "prescription",
      title: "Lisinopril Prescription",
      date: "2023-06-15",
      doctor: "Dr. Sarah Johnson",
      facility: "City Medical Center",
      description: "Prescription for blood pressure management.",
      details: {
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "90 days",
        refills: 3,
        instructions:
          "Take in the morning with or without food. Avoid potassium supplements.",
      },
      sensitive: true,
    },
    {
      id: 4,
      type: "immunization",
      title: "Influenza Vaccine",
      date: "2023-10-05",
      doctor: "Dr. Emily Carter",
      facility: "Community Health Clinic",
      description: "Annual flu vaccination.",
      details: {
        vaccine: "Influenza (Flu) Vaccine",
        manufacturer: "GlaxoSmithKline",
        lotNumber: "ADFG456789",
        site: "Left deltoid",
        nextDose: "October 2024",
      },
      sensitive: false,
    },
    {
      id: 5,
      type: "allergy",
      title: "Penicillin Allergy",
      date: "2022-03-18",
      doctor: "Dr. Mark Benson",
      facility: "City Medical Center",
      description: "Documented allergic reaction to penicillin.",
      details: {
        allergen: "Penicillin",
        reaction: "Hives, difficulty breathing",
        severity: "Severe",
        notes:
          "Patient experienced anaphylaxis requiring emergency treatment. Avoid all penicillin-based antibiotics.",
      },
      sensitive: true,
    },
    {
      id: 6,
      type: "surgery",
      title: "Appendectomy",
      date: "2021-08-22",
      doctor: "Dr. James Wilson",
      facility: "University Hospital",
      description: "Emergency appendectomy due to acute appendicitis.",
      details: {
        procedure: "Laparoscopic appendectomy",
        duration: "45 minutes",
        anesthesia: "General",
        complications: "None",
        recovery: "Uncomplicated. Patient discharged after 24 hours.",
        followUp:
          "Two-week post-operative check scheduled for September 5, 2021.",
      },
      sensitive: true,
    },
    {
      id: 7,
      type: "imaging",
      title: "Chest X-Ray",
      date: "2023-02-15",
      doctor: "Dr. Emily Carter",
      facility: "City Medical Center Radiology",
      description: "Chest X-ray to evaluate persistent cough.",
      details: {
        findings:
          "No acute cardiopulmonary process. Lungs are clear. Heart size is normal.",
        impression:
          "Normal chest X-ray. No evidence of pneumonia or other acute process.",
        recommendations: "No follow-up imaging required.",
      },
      sensitive: false,
    },
  ]);

  const handleOpenDetails = (record) => {
    setSelectedRecord(record);
    setIsDetailsOpen(true);
    setShowSensitiveInfo(false);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedRecord(null);
    setShowSensitiveInfo(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getRecordTypeIcon = (type) => {
    switch (type) {
      case "visit":
        return <User className="w-5 h-5" />;
      case "test":
        return <Activity className="w-5 h-5" />;
      case "prescription":
        return <Pill className="w-5 h-5" />;
      case "immunization":
        return <FileCheck className="w-5 h-5" />;
      case "allergy":
        return <AlertTriangle className="w-5 h-5" />;
      case "surgery":
        return <Clipboard className="w-5 h-5" />;
      case "imaging":
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getRecordTypeColor = (type) => {
    switch (type) {
      case "visit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "test":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "prescription":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "immunization":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400";
      case "allergy":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "surgery":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "imaging":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const filteredRecords = medicalRecords
    .filter((record) => {
      // Filter by tab
      if (activeTab !== "all" && record.type !== activeTab) return false;

      // Filter by search query
      if (
        searchQuery &&
        !record.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !record.facility.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by record type
      if (
        filterOptions.recordType !== "all" &&
        record.type !== filterOptions.recordType
      )
        return false;

      // Filter by date range
      if (filterOptions.dateRange !== "all") {
        const recordDate = new Date(record.date);
        const today = new Date();

        if (filterOptions.dateRange === "last-month") {
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);
          if (recordDate < lastMonth) return false;
        } else if (filterOptions.dateRange === "last-year") {
          const lastYear = new Date();
          lastYear.setFullYear(today.getFullYear() - 1);
          if (recordDate < lastYear) return false;
        } else if (filterOptions.dateRange === "last-3-years") {
          const lastThreeYears = new Date();
          lastThreeYears.setFullYear(today.getFullYear() - 3);
          if (recordDate < lastThreeYears) return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by selected option
      if (filterOptions.sortBy === "date-asc") {
        return new Date(a.date) - new Date(b.date);
      } else if (filterOptions.sortBy === "date-desc") {
        return new Date(b.date) - new Date(a.date);
      } else if (filterOptions.sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else {
        return 0;
      }
    });

  // Sample health metrics data for charts
  const healthMetrics = {
    bloodPressure: [
      { date: "2023-01-15", systolic: 120, diastolic: 80 },
      { date: "2023-02-15", systolic: 118, diastolic: 78 },
      { date: "2023-03-15", systolic: 122, diastolic: 82 },
      { date: "2023-04-15", systolic: 124, diastolic: 84 },
      { date: "2023-05-15", systolic: 120, diastolic: 80 },
    ],
    weight: [
      { date: "2023-01-15", value: 165 },
      { date: "2023-02-15", value: 164 },
      { date: "2023-03-15", value: 163 },
      { date: "2023-04-15", value: 162 },
      { date: "2023-05-15", value: 165 },
    ],
    cholesterol: [
      { date: "2022-05-15", total: 190, hdl: 55, ldl: 120 },
      { date: "2022-11-15", total: 185, hdl: 58, ldl: 115 },
      { date: "2023-05-15", total: 180, hdl: 60, ldl: 110 },
    ],
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              View and manage your complete medical history
            </p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <Upload className="w-5 h-5" />
            Upload Record
          </button>
        </div>

        {/* Health Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Blood Pressure
              </h3>
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                120/80
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                mmHg
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">Normal</span>
            </div>
            <div className="mt-4 h-12 flex items-end">
              {healthMetrics.bloodPressure.map((reading, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center space-x-1">
                    <div
                      className="w-2 bg-red-400 dark:bg-red-500 rounded-t"
                      style={{ height: `${reading.systolic / 2}px` }}
                    ></div>
                    <div
                      className="w-2 bg-blue-400 dark:bg-blue-500 rounded-t"
                      style={{ height: `${reading.diastolic / 2}px` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(reading.date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Weight
              </h3>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                165
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                lbs
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">Stable</span>
            </div>
            <div className="mt-4 h-12 flex items-end">
              {healthMetrics.weight.map((reading, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-4 bg-blue-400 dark:bg-blue-500 rounded-t"
                    style={{ height: `${(reading.value - 160) * 3}px` }}
                  ></div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(reading.date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Cholesterol
              </h3>
              <Droplet className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                180
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                mg/dL
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">Improving</span>
            </div>
            <div className="mt-4 h-12 flex items-end">
              {healthMetrics.cholesterol.map((reading, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center space-x-1">
                    <div
                      className="w-2 bg-purple-400 dark:bg-purple-500 rounded-t"
                      style={{ height: `${reading.total / 15}px` }}
                    ></div>
                    <div
                      className="w-2 bg-green-400 dark:bg-green-500 rounded-t"
                      style={{ height: `${reading.hdl / 5}px` }}
                    ></div>
                    <div
                      className="w-2 bg-red-400 dark:bg-red-500 rounded-t"
                      style={{ height: `${reading.ldl / 10}px` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(reading.date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              } transition-colors duration-200`}
            >
              All Records
            </button>
            <button
              onClick={() => setActiveTab("visit")}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === "visit"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              } transition-colors duration-200`}
            >
              Visits
            </button>
            <button
              onClick={() => setActiveTab("test")}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === "test"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              } transition-colors duration-200`}
            >
              Tests
            </button>
            <button
              onClick={() => setActiveTab("prescription")}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === "prescription"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              } transition-colors duration-200`}
            >
              Prescriptions
            </button>
            <button
              onClick={() => setActiveTab("immunization")}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === "immunization"
                  ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              } transition-colors duration-200`}
            >
              Immunizations
            </button>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>

            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Filter
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Record Type
                    </label>
                    <select
                      value={filterOptions.recordType}
                      onChange={(e) =>
                        setFilterOptions({
                          ...filterOptions,
                          recordType: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <option value="all">All Types</option>
                      <option value="visit">Visits</option>
                      <option value="test">Tests</option>
                      <option value="prescription">Prescriptions</option>
                      <option value="immunization">Immunizations</option>
                      <option value="allergy">Allergies</option>
                      <option value="surgery">Surgeries</option>
                      <option value="imaging">Imaging</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date Range
                    </label>
                    <select
                      value={filterOptions.dateRange}
                      onChange={(e) =>
                        setFilterOptions({
                          ...filterOptions,
                          dateRange: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <option value="all">All Time</option>
                      <option value="last-month">Last Month</option>
                      <option value="last-year">Last Year</option>
                      <option value="last-3-years">Last 3 Years</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filterOptions.sortBy}
                      onChange={(e) =>
                        setFilterOptions({
                          ...filterOptions,
                          sortBy: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <option value="date-desc">Date (Newest First)</option>
                      <option value="date-asc">Date (Oldest First)</option>
                      <option value="title">Title</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setFilterOptions({
                          recordType: "all",
                          dateRange: "all",
                          sortBy: "date-desc",
                        });
                      }}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Reset Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Records List */}
        {filteredRecords.length > 0 ? (
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Record type and date */}
                  <div className="p-4 md:p-6 flex flex-col justify-center items-center md:w-1/5 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                    <div
                      className={`p-3 rounded-full ${getRecordTypeColor(
                        record.type
                      )} mb-3`}
                    >
                      {getRecordTypeIcon(record.type)}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {formatDate(record.date)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-1">
                        {record.type}
                      </p>
                    </div>
                  </div>

                  {/* Middle - Record details */}
                  <div className="p-4 md:p-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                          {record.title}
                          {record.sensitive && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              <Lock className="w-3 h-3 mr-1" />
                              Sensitive
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <User className="w-4 h-4 mr-1" />
                          {record.doctor}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {record.facility}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      {record.description}
                    </p>
                  </div>

                  {/* Right - Actions */}
                  <div className="p-4 md:p-6 flex flex-row md:flex-col justify-between items-center md:items-end md:w-1/6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleOpenDetails(record)}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-20                    rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 rounded-lg transition-colors duration-200 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No records found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              {searchQuery
                ? "No records match your search criteria. Try adjusting your filters or search terms."
                : "You don't have any medical records in this category yet."}
            </p>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto">
              <Upload className="w-4 h-4" />
              Upload New Record
            </button>
          </div>
        )}
      </div>

      {/* Record Details Modal */}
      {isDetailsOpen && selectedRecord && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && handleCloseDetails()}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div
                className={`h-16 ${getRecordTypeColor(selectedRecord.type)}`}
              ></div>
              <div className="absolute top-4 left-6 flex items-center">
                <div className={`p-2 rounded-full bg-white dark:bg-gray-800`}>
                  {getRecordTypeIcon(selectedRecord.type)}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedRecord.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={handleCloseDetails}
                className="absolute top-3 right-3 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 bg-white/80 dark:bg-gray-800/80 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-full p-1 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Date
                    </h4>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {formatDate(selectedRecord.date)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Provider
                    </h4>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {selectedRecord.doctor}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Facility
                    </h4>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {selectedRecord.facility}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Record Type
                    </h4>
                    <div className="flex items-center gap-2">
                      {getRecordTypeIcon(selectedRecord.type)}
                      <span className="text-gray-900 dark:text-white font-medium capitalize">
                        {selectedRecord.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Description
                </h4>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedRecord.description}
                  </p>
                </div>
              </div>

              {/* Details Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Details
                  </h4>

                  {selectedRecord.sensitive && (
                    <button
                      onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                      className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      {showSensitiveInfo ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Hide Sensitive Info
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Show Sensitive Info
                        </>
                      )}
                    </button>
                  )}
                </div>

                {selectedRecord.sensitive && !showSensitiveInfo ? (
                  <div className="p-8 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex flex-col items-center justify-center">
                    <Lock className="w-8 h-8 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      This record contains sensitive information.
                    </p>
                    <button
                      onClick={() => setShowSensitiveInfo(true)}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Show Information
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    {selectedRecord.type === "visit" && (
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Symptoms
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.symptoms}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Diagnosis
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.diagnosis}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Recommendations
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.recommendations}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Vitals
                          </h5>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Blood Pressure
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {selectedRecord.details.vitals.bloodPressure}
                              </p>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Heart Rate
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {selectedRecord.details.vitals.heartRate}
                              </p>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Temperature
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {selectedRecord.details.vitals.temperature}
                              </p>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Respiratory Rate
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {selectedRecord.details.vitals.respiratoryRate}
                              </p>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Weight
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {selectedRecord.details.vitals.weight}
                              </p>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Height
                              </p>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {selectedRecord.details.vitals.height}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedRecord.type === "test" && (
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                          Test Results
                        </h5>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                  Test
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                  Result
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                  Unit
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                  Reference Range
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {selectedRecord.details.results.map(
                                (result, index) => (
                                  <tr
                                    key={index}
                                    className={
                                      index % 2 === 0
                                        ? "bg-white dark:bg-gray-800"
                                        : "bg-gray-50 dark:bg-gray-700/30"
                                    }
                                  >
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                      {result.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                      {result.value}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                      {result.unit}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                      {result.range}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          result.status === "normal"
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                        }`}
                                      >
                                        {result.status}
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-4">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Summary
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.summary}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedRecord.type === "prescription" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Medication
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.medication}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Dosage
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.dosage}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Frequency
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.frequency}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Duration
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.duration}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Refills
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.refills}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Instructions
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.instructions}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedRecord.type === "immunization" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Vaccine
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.vaccine}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Manufacturer
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.manufacturer}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Lot Number
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.lotNumber}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Site
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.site}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Next Dose
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.nextDose}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedRecord.type === "allergy" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Allergen
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.allergen}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Reaction
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.reaction}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Severity
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.severity}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Notes
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.notes}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedRecord.type === "surgery" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Procedure
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.procedure}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Duration
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.duration}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Anesthesia
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.anesthesia}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              Complications
                            </h5>
                            <p className="text-gray-700 dark:text-gray-300">
                              {selectedRecord.details.complications}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Recovery
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.recovery}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Follow-up
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.followUp}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedRecord.type === "imaging" && (
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Findings
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.findings}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Impression
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.impression}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                            Recommendations
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300">
                            {selectedRecord.details.recommendations}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-end gap-3 mt-8">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={handleCloseDetails}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecord;
