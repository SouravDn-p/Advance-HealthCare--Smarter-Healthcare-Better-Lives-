"use client";

import { useState, useEffect, useRef } from "react";
import {
  Ambulance,
  MapPin,
  Phone,
  Clock,
  AlertTriangle,
  Navigation,
  Heart,
  Info,
  ChevronRight,
  Search,
  X,
  Check,
  Loader2,
  Hospital,
  Star,
  ArrowRight,
  PhoneCall,
  AlertCircle,
  FileText,
  Calendar,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const EmergencyServices = () => {
  const { user, theme } = useAuth();
  const [activeTab, setActiveTab] = useState("hospitals");
  const [location, setLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isBookingAmbulance, setIsBookingAmbulance] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    symptoms: "",
    urgency: "medium",
    notes: "",
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Sample hospital data
  const sampleHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Medical Center Blvd, City Center",
      distance: 1.2,
      eta: 7,
      phone: "555-123-4567",
      emergency: true,
      rating: 4.5,
      waitTime: "15-20 min",
      specialties: ["Emergency Care", "Trauma Center", "Cardiac Care"],
      coordinates: { lat: 40.712776, lng: -74.005974 },
    },
    {
      id: 2,
      name: "Community Medical Center",
      address: "456 Health Parkway, Westside",
      distance: 2.8,
      eta: 12,
      phone: "555-987-6543",
      emergency: true,
      rating: 4.2,
      waitTime: "25-30 min",
      specialties: ["Emergency Care", "Pediatrics", "Orthopedics"],
      coordinates: { lat: 40.714776, lng: -74.003974 },
    },
    {
      id: 3,
      name: "University Hospital",
      address: "789 Academic Drive, Eastside",
      distance: 3.5,
      eta: 15,
      phone: "555-456-7890",
      emergency: true,
      rating: 4.7,
      waitTime: "10-15 min",
      specialties: ["Level I Trauma Center", "Neurology", "Burn Unit"],
      coordinates: { lat: 40.710776, lng: -74.007974 },
    },
    {
      id: 4,
      name: "Riverside Health Clinic",
      address: "321 Waterfront Way, Riverside",
      distance: 4.1,
      eta: 18,
      phone: "555-789-0123",
      emergency: false,
      rating: 3.9,
      waitTime: "35-40 min",
      specialties: ["Urgent Care", "Family Medicine", "Internal Medicine"],
      coordinates: { lat: 40.716776, lng: -74.001974 },
    },
    {
      id: 5,
      name: "Northside Medical Plaza",
      address: "555 Northern Boulevard, Northside",
      distance: 5.3,
      eta: 22,
      phone: "555-234-5678",
      emergency: true,
      rating: 4.0,
      waitTime: "20-25 min",
      specialties: ["Emergency Care", "Cardiology", "Radiology"],
      coordinates: { lat: 40.718776, lng: -74.009974 },
    },
  ];

  // Initialize Google Maps
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !mapInstanceRef.current &&
      mapRef.current
    ) {
      // This would normally load the actual Google Maps API
      // For demo purposes, we're simulating the map initialization
      console.log("Initializing map...");

      // Simulate map initialization
      mapInstanceRef.current = {
        setCenter: (coords) => console.log("Map center set to:", coords),
        setZoom: (zoom) => console.log("Map zoom set to:", zoom),
      };

      // Load nearby hospitals
      setNearbyHospitals(sampleHospitals);
    }
  }, [mapRef.current]);

  // Get user location
  const getUserLocation = () => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);

          // Update map center
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(userLocation);
            mapInstanceRef.current.setZoom(13);
          }

          // In a real app, we would fetch nearby hospitals based on location
          // For demo, we'll use our sample data
          setNearbyHospitals(sampleHospitals);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          // Use default location for demo
          const defaultLocation = { lat: 40.712776, lng: -74.005974 };
          setLocation(defaultLocation);
          setNearbyHospitals(sampleHospitals);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
      // Use default location for demo
      const defaultLocation = { lat: 40.712776, lng: -74.005974 };
      setLocation(defaultLocation);
      setNearbyHospitals(sampleHospitals);
    }
  };

  // Filter hospitals based on search query
  const filteredHospitals = nearbyHospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle hospital selection
  const handleSelectHospital = (hospital) => {
    setSelectedHospital(hospital);

    // In a real app, we would center the map on the selected hospital
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(hospital.coordinates);
      mapInstanceRef.current.setZoom(15);
    }
  };

  // Start ambulance booking process
  const handleBookAmbulance = () => {
    setIsBookingAmbulance(true);
    setBookingStep(1);
    setBookingConfirmed(false);
  };

  // Handle booking form changes
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Navigate booking steps
  const handleNextStep = () => {
    setBookingStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setBookingStep((prev) => prev - 1);
  };

  // Confirm ambulance booking
  const handleConfirmBooking = () => {
    // In a real app, we would submit the booking to an API
    console.log("Booking confirmed:", bookingDetails);

    // Simulate booking confirmation
    setTimeout(() => {
      setBookingConfirmed(true);
    }, 1500);
  };

  // Close booking modal
  const handleCloseBooking = () => {
    setIsBookingAmbulance(false);
    setBookingStep(1);
    setBookingConfirmed(false);
  };

  // Format ETA time
  const formatETA = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours} hr ${mins} min`;
    }
  };

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Get urgency label
  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case "high":
        return "Critical - Life Threatening";
      case "medium":
        return "Urgent - Requires Prompt Attention";
      case "low":
        return "Non-urgent - Can Wait for Care";
      default:
        return "Unknown Urgency";
    }
  };

  // Get wait time color
  const getWaitTimeColor = (waitTime) => {
    const minutes = Number.parseInt(waitTime.split("-")[0]);
    if (minutes < 15) {
      return "text-green-600 dark:text-green-400";
    } else if (minutes < 30) {
      return "text-yellow-600 dark:text-yellow-400";
    } else {
      return "text-red-600 dark:text-red-400";
    }
  };

  // Initialize location on component mount
  useEffect(() => {
    getUserLocation();
  }, []);

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
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              <Ambulance className="w-8 h-8 mr-3 text-red-600 dark:text-red-500" />
              Emergency Services
            </h1>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Find nearby hospitals and emergency services or book an ambulance
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleBookAmbulance}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Ambulance className="w-5 h-5" />
              Book Ambulance
            </button>
            <button
              onClick={getUserLocation}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Update Location
            </button>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800 dark:text-red-300 mb-1">
              Emergency? Call 911 Immediately
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm">
              If you're experiencing a life-threatening emergency, call
              emergency services immediately. Don't wait for an ambulance
              booking confirmation.
            </p>
            <div className="mt-2">
              <a
                href="tel:911"
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call 911 Now
              </a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 mb-6">
          <button
            onClick={() => setActiveTab("hospitals")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "hospitals"
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            } transition-colors duration-200 flex items-center`}
          >
            <Hospital className="w-4 h-4 mr-2" />
            Nearby Hospitals
          </button>
          <button
            onClick={() => setActiveTab("ambulance")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === "ambulance"
                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            } transition-colors duration-200 flex items-center`}
          >
            <Ambulance className="w-4 h-4 mr-2" />
            Ambulance Services
          </button>
        </div>

        {activeTab === "hospitals" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hospital List */}
            <div
              className={`lg:col-span-${
                selectedHospital ? "1" : "3"
              } bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              } overflow-hidden flex flex-col h-[600px]`}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <Hospital className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                    Nearby Hospitals
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {isLoadingLocation ? (
                      <span className="flex items-center">
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                        Getting location...
                      </span>
                    ) : location ? (
                      <span>Current location</span>
                    ) : (
                      <span>Location not available</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search hospitals by name or address"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoadingLocation ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Finding nearby hospitals...
                    </p>
                  </div>
                ) : filteredHospitals.length > 0 ? (
                  filteredHospitals.map((hospital) => (
                    <div
                      key={hospital.id}
                      onClick={() => handleSelectHospital(hospital)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedHospital?.id === hospital.id
                          ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                            {hospital.name}
                            {hospital.emergency && (
                              <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full text-xs font-medium">
                                ER
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {hospital.address}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Navigation className="w-4 h-4 mr-1" />
                            {hospital.distance.toFixed(1)} mi
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatETA(hospital.eta)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">
                              {hospital.rating}
                            </span>
                          </div>
                          <span className="mx-2 text-gray-300 dark:text-gray-600">
                            |
                          </span>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span
                              className={`ml-1 text-sm ${getWaitTimeColor(
                                hospital.waitTime
                              )}`}
                            >
                              {hospital.waitTime} wait
                            </span>
                          </div>
                        </div>
                        <a
                          href={`tel:${hospital.phone}`}
                          className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </a>
                      </div>

                      {selectedHospital?.id !== hospital.id && (
                        <div className="mt-2 text-blue-600 dark:text-blue-400 text-sm flex items-center">
                          <span>View details</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                      <Search className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      No hospitals found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      {searchQuery
                        ? `No results for "${searchQuery}". Try a different search term.`
                        : "We couldn't find any hospitals near your location."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Hospital Details & Map */}
            {selectedHospital && (
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[600px]">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-gray-900 dark:text-white flex items-center">
                      <Hospital className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                      Hospital Details
                    </h2>
                    <button
                      onClick={() => setSelectedHospital(null)}
                      className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {/* Map */}
                  <div
                    className={`relative ${
                      isMapExpanded ? "h-96" : "h-48"
                    } bg-gray-200 dark:bg-gray-700 transition-all duration-300`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* This would be replaced with an actual Google Map in a real application */}
                      <div
                        ref={mapRef}
                        className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                      >
                        <img
                          src="/placeholder.svg?height=400&width=800"
                          alt="Map"
                          className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="w-8 h-8 text-red-600 dark:text-red-500 mx-auto mb-2" />
                            <p className="text-gray-700 dark:text-gray-300 font-medium">
                              Google Maps would display here
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMapExpanded(!isMapExpanded)}
                      className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md z-10"
                    >
                      {isMapExpanded ? (
                        <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      )}
                    </button>
                  </div>

                  {/* Hospital Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                          {selectedHospital.name}
                          {selectedHospital.emergency && (
                            <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full text-xs font-medium">
                              Emergency Room
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {selectedHospital.address}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span className="ml-1 font-medium text-gray-700 dark:text-gray-300">
                            {selectedHospital.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Navigation className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                          <h4 className="font-medium text-blue-800 dark:text-blue-300">
                            Distance
                          </h4>
                        </div>
                        <p className="text-blue-700 dark:text-blue-300 text-lg font-semibold">
                          {selectedHospital.distance.toFixed(1)} miles
                        </p>
                        <p className="text-blue-600 dark:text-blue-400 text-sm">
                          About {formatETA(selectedHospital.eta)} by car
                        </p>
                      </div>

                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Clock className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                          <h4 className="font-medium text-green-800 dark:text-green-300">
                            Wait Time
                          </h4>
                        </div>
                        <p className="text-green-700 dark:text-green-300 text-lg font-semibold">
                          {selectedHospital.waitTime}
                        </p>
                        <p className="text-green-600 dark:text-green-400 text-sm">
                          Estimated emergency wait
                        </p>
                      </div>

                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
                          <h4 className="font-medium text-purple-800 dark:text-purple-300">
                            Contact
                          </h4>
                        </div>
                        <p className="text-purple-700 dark:text-purple-300 text-lg font-semibold">
                          {selectedHospital.phone}
                        </p>
                        <a
                          href={`tel:${selectedHospital.phone}`}
                          className="text-purple-600 dark:text-purple-400 text-sm hover:underline inline-flex items-center"
                        >
                          Call now <PhoneCall className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedHospital.specialties.map(
                          (specialty, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.coordinates.lat},${selectedHospital.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-5 h-5" />
                        Get Directions
                      </a>
                      <button
                        onClick={handleBookAmbulance}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Ambulance className="w-5 h-5" />
                        Book Ambulance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "ambulance" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Ambulance Services
                  </h2>

                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full mr-3">
                          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Emergency Ambulance
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            For life-threatening emergencies
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Immediate response with advanced life support equipment
                        and paramedics for critical situations.
                      </p>
                      <button
                        onClick={handleBookAmbulance}
                        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Ambulance className="w-5 h-5" />
                        Book Emergency Ambulance
                      </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mr-3">
                          <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Non-Emergency Transport
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            For scheduled medical appointments
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Pre-booked transportation with basic medical support for
                        non-urgent medical appointments.
                      </p>
                      <button
                        onClick={handleBookAmbulance}
                        className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Transport
                      </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Insurance Information
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Coverage details for ambulance services
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Learn about insurance coverage for ambulance services
                        and potential out-of-pocket costs.
                      </p>
                      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        <Info className="w-5 h-5" />
                        View Insurance Details
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Important Information
                  </h2>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                          When to Call an Ambulance
                        </h3>
                        <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 text-sm space-y-1">
                          <li>Chest pain or difficulty breathing</li>
                          <li>Severe bleeding or burns</li>
                          <li>Suspected stroke or heart attack</li>
                          <li>Serious injuries from accidents</li>
                          <li>Unconsciousness or seizures</li>
                          <li>Severe allergic reactions</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                          Preparing for Ambulance Arrival
                        </h3>
                        <ul className="list-disc pl-5 text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
                          <li>Secure pets away from the area</li>
                          <li>Turn on outside lights if it's dark</li>
                          <li>Have a list of current medications ready</li>
                          <li>Have medical history information available</li>
                          <li>Clear a path for stretcher access</li>
                          <li>Have someone meet the ambulance if possible</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                      Average Response Times
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Urban Areas
                          </span>
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            8-10 minutes
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Suburban Areas
                          </span>
                          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                            12-15 minutes
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                          <div
                            className="h-full bg-yellow-500 rounded-full"
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            Rural Areas
                          </span>
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">
                            20+ minutes
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                          <div
                            className="h-full bg-red-500 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ambulance Booking Modal */}
        {isBookingAmbulance && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <Ambulance className="w-5 h-5 mr-2 text-red-600 dark:text-red-500" />
                  {bookingConfirmed
                    ? "Ambulance Confirmed"
                    : "Book an Ambulance"}
                </h2>
                <button
                  onClick={handleCloseBooking}
                  className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 max-h-[calc(90vh-60px)]">
                {bookingConfirmed ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Ambulance is on the way!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                      Your ambulance has been dispatched and is en route to your
                      location. Estimated arrival time is{" "}
                      <span className="font-medium text-gray-900 dark:text-white">
                        8-12 minutes
                      </span>
                      .
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-left">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                            Ambulance Details
                          </h4>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Unit #: <span className="font-medium">A-245</span>
                            <br />
                            Tracking ID:{" "}
                            <span className="font-medium">EMT-78912</span>
                            <br />
                            Service Level:{" "}
                            <span className="font-medium">
                              Advanced Life Support
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={handleCloseBooking}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Close
                      </button>
                      <a
                        href="tel:911"
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        Emergency Call
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Booking Steps */}
                    <div className="mb-6">
                      <div className="flex items-center">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            bookingStep >= 1
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          1
                        </div>
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            bookingStep >= 2
                              ? "bg-blue-600"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        ></div>
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            bookingStep >= 2
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          2
                        </div>
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            bookingStep >= 3
                              ? "bg-blue-600"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        ></div>
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            bookingStep >= 3
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          3
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>Patient Info</span>
                        <span>Location</span>
                        <span>Confirm</span>
                      </div>
                    </div>

                    {bookingStep === 1 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Patient Information
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Patient Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={bookingDetails.name}
                              onChange={handleBookingChange}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              placeholder="Full name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={bookingDetails.phone}
                              onChange={handleBookingChange}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              placeholder="Contact number"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Symptoms or Condition
                            </label>
                            <textarea
                              name="symptoms"
                              value={bookingDetails.symptoms}
                              onChange={handleBookingChange}
                              rows={3}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              placeholder="Describe the symptoms or medical condition"
                            ></textarea>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Urgency Level
                            </label>
                            <select
                              name="urgency"
                              value={bookingDetails.urgency}
                              onChange={handleBookingChange}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                              <option value="high">
                                Critical - Life Threatening
                              </option>
                              <option value="medium">
                                Urgent - Requires Prompt Attention
                              </option>
                              <option value="low">
                                Non-urgent - Can Wait for Care
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={handleNextStep}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Pickup Location
                        </h3>

                        <div className="mb-4">
                          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 relative">
                            {/* This would be replaced with an actual Google Map in a real application */}
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <img
                                src="/placeholder.svg?height=200&width=600"
                                alt="Map"
                                className="w-full h-full object-cover opacity-50"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <MapPin className="w-8 h-8 text-red-600 dark:text-red-500 mx-auto mb-2" />
                                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                                    Location Map
                                  </p>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={getUserLocation}
                              className="absolute bottom-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
                            >
                              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Pickup Address
                            </label>
                            <textarea
                              name="address"
                              value={bookingDetails.address}
                              onChange={handleBookingChange}
                              rows={2}
                              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              placeholder="Full address with landmarks"
                            ></textarea>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Additional Notes
                          </label>
                          <textarea
                            name="notes"
                            value={bookingDetails.notes}
                            onChange={handleBookingChange}
                            rows={2}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="Any additional information for the ambulance team"
                          ></textarea>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <button
                            onClick={handlePrevStep}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleNextStep}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}

                    {bookingStep === 3 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Confirm Booking
                        </h3>

                        <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-6">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                            Booking Summary
                          </h4>

                          <div className="space-y-3">
                            <div className="flex">
                              <span className="w-1/3 text-gray-600 dark:text-gray-400">
                                Patient:
                              </span>
                              <span className="w-2/3 text-gray-900 dark:text-white font-medium">
                                {bookingDetails.name}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="w-1/3 text-gray-600 dark:text-gray-400">
                                Phone:
                              </span>
                              <span className="w-2/3 text-gray-900 dark:text-white font-medium">
                                {bookingDetails.phone}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="w-1/3 text-gray-600 dark:text-gray-400">
                                Address:
                              </span>
                              <span className="w-2/3 text-gray-900 dark:text-white font-medium">
                                {bookingDetails.address || "Current location"}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="w-1/3 text-gray-600 dark:text-gray-400">
                                Symptoms:
                              </span>
                              <span className="w-2/3 text-gray-900 dark:text-white font-medium">
                                {bookingDetails.symptoms}
                              </span>
                            </div>
                            <div className="flex">
                              <span className="w-1/3 text-gray-600 dark:text-gray-400">
                                Urgency:
                              </span>
                              <span
                                className={`w-2/3 font-medium px-2 py-0.5 rounded-full text-sm inline-flex items-center ${getUrgencyColor(
                                  bookingDetails.urgency
                                )}`}
                              >
                                {getUrgencyLabel(bookingDetails.urgency)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                                Important Notice
                              </h4>
                              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                                By confirming this booking, you agree to pay any
                                applicable fees not covered by insurance. For
                                life-threatening emergencies, please call 911
                                directly.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-between">
                          <button
                            onClick={handlePrevStep}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors duration-200"
                          >
                            Back
                          </button>
                          <button
                            onClick={handleConfirmBooking}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                          >
                            <Ambulance className="w-5 h-5" />
                            Confirm & Dispatch Ambulance
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Emergency Resources */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Emergency Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  CPR Instructions
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Step-by-step guide for performing CPR in emergency situations.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  First Aid Guide
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Essential first aid techniques for common emergency situations.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Emergency Contacts
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Important phone numbers and contacts for various emergency
                services.
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 text-sm flex items-center hover:underline"
              >
                View contacts <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Need help?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                If you're experiencing a medical emergency, please call
                emergency services immediately. For questions about our
                emergency services, contact our support team.
              </p>
              <div className="mt-3">
                <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;
