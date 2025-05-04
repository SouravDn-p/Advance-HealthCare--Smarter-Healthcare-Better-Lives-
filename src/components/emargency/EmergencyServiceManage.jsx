// Continuing from the previous implementation...

import { useState } from "react";
import { FaExclamationTriangle, FaHeartbeat, FaHospital, FaIdCard, FaInfoCircle, FaPhone, FaUserMd, FaVideo } from "react-icons/fa";

// Additional components and features for the EmergencyServiceManage component

// First Aid Guides Section
const FirstAidGuides = ({ isDarkMode }) => {
  const guides = [
    {
      id: 1,
      title: "CPR Basics",
      category: "Life-Saving",
      icon: "heartbeat",
      description:
        "Learn the basic steps of CPR for adults, children, and infants.",
      videoUrl: "https://www.youtube.com/embed/example1",
    },
    {
      id: 2,
      title: "Choking Response",
      category: "Life-Saving",
      icon: "lungs",
      description:
        "How to help someone who is choking using the Heimlich maneuver.",
      videoUrl: "https://www.youtube.com/embed/example2",
    },
    {
      id: 3,
      title: "Bleeding Control",
      category: "Injury",
      icon: "band-aid",
      description: "Steps to control severe bleeding and prevent shock.",
      videoUrl: "https://www.youtube.com/embed/example3",
    },
    {
      id: 4,
      title: "Stroke Recognition",
      category: "Medical",
      icon: "brain",
      description:
        "How to recognize the signs of stroke using the FAST method.",
      videoUrl: "https://www.youtube.com/embed/example4",
    },
    {
      id: 5,
      title: "Heart Attack Response",
      category: "Medical",
      icon: "heart",
      description:
        "Recognizing heart attack symptoms and immediate actions to take.",
      videoUrl: "https://www.youtube.com/embed/example5",
    },
    {
      id: 6,
      title: "Seizure First Aid",
      category: "Medical",
      icon: "bolt",
      description: "How to safely help someone experiencing a seizure.",
      videoUrl: "https://www.youtube.com/embed/example6",
    },
  ];

  const [selectedGuide, setSelectedGuide] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredGuides =
    filterCategory === "all"
      ? guides
      : guides.filter((guide) => guide.category === filterCategory);

  return (
    <div
      className={`card shadow-xl mb-8 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="card-body">
        <h2 className="card-title flex items-center">
          <FaHeartbeat className="mr-2 text-red-500" />
          Emergency First Aid Guides
        </h2>

        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          <button
            className={`btn btn-sm ${
              filterCategory === "all" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilterCategory("all")}
          >
            All Guides
          </button>
          <button
            className={`btn btn-sm ${
              filterCategory === "Life-Saving" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilterCategory("Life-Saving")}
          >
            Life-Saving
          </button>
          <button
            className={`btn btn-sm ${
              filterCategory === "Medical" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilterCategory("Medical")}
          >
            Medical
          </button>
          <button
            className={`btn btn-sm ${
              filterCategory === "Injury" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setFilterCategory("Injury")}
          >
            Injury
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className={`card ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-base-100 hover:bg-gray-50"
              } shadow-md cursor-pointer transition-colors`}
              onClick={() => setSelectedGuide(guide)}
            >
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-full ${
                      isDarkMode ? "bg-gray-800" : "bg-red-100"
                    }`}
                  >
                    <FaHeartbeat className="text-red-500" />
                  </div>
                  <div>
                    <h3 className="card-title text-lg">{guide.title}</h3>
                    <span className="badge badge-sm">{guide.category}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm">{guide.description}</p>
                <div className="card-actions justify-end mt-2">
                  <button className="btn btn-sm btn-outline">View Guide</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* First Aid Guide Modal */}
      {selectedGuide && (
        <div
          className={`modal modal-open ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          <div
            className={`modal-box max-w-4xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="font-bold text-xl">{selectedGuide.title}</h3>
            <span className="badge badge-sm mt-1">
              {selectedGuide.category}
            </span>

            <div className="py-4">
              <div className="aspect-video w-full bg-black rounded-lg mb-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src={selectedGuide.videoUrl}
                  title={selectedGuide.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <h4 className="font-semibold mb-2">Important Steps:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Check for responsiveness and call for emergency help
                    immediately.
                  </li>
                  <li>Ensure the scene is safe before providing assistance.</li>
                  <li>
                    Follow the specific steps for{" "}
                    {selectedGuide.title.toLowerCase()} as shown in the video.
                  </li>
                  <li>Stay with the person until professional help arrives.</li>
                  <li>
                    Provide emergency responders with all relevant information.
                  </li>
                </ul>
              </div>

              <div className="alert alert-warning mt-4">
                <div>
                  <FaExclamationTriangle />
                  <span>
                    This guide is for informational purposes only. Always call
                    emergency services in a real emergency.
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedGuide(null)}>
                Close
              </button>
              <button className="btn btn-primary">Download PDF Guide</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Medical Profile for Emergency Section
const MedicalProfileEmergency = ({ isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Asthma", "Hypertension"],
    medications: ["Lisinopril 10mg", "Albuterol inhaler"],
    emergencyContacts: [
      { name: "Jane Doe", relation: "Spouse", phone: "555-123-4567" },
      {
        name: "Dr. Smith",
        relation: "Primary Physician",
        phone: "555-987-6543",
      },
    ],
    dnr: false,
    organDonor: true,
    additionalInfo: "I have a pacemaker.",
  });

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...profile[field]];
    newArray[index] = value;
    setProfile({
      ...profile,
      [field]: newArray,
    });
  };

  const handleAddItem = (field) => {
    setProfile({
      ...profile,
      [field]: [...profile[field], ""],
    });
  };

  const handleRemoveItem = (field, index) => {
    const newArray = [...profile[field]];
    newArray.splice(index, 1);
    setProfile({
      ...profile,
      [field]: newArray,
    });
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...profile.emergencyContacts];
    newContacts[index] = {
      ...newContacts[index],
      [field]: value,
    };
    setProfile({
      ...profile,
      emergencyContacts: newContacts,
    });
  };

  const handleAddContact = () => {
    setProfile({
      ...profile,
      emergencyContacts: [
        ...profile.emergencyContacts,
        { name: "", relation: "", phone: "" },
      ],
    });
  };

  const handleRemoveContact = (index) => {
    const newContacts = [...profile.emergencyContacts];
    newContacts.splice(index, 1);
    setProfile({
      ...profile,
      emergencyContacts: newContacts,
    });
  };

  const handleSaveProfile = () => {
    // In a real app, you would save to the backend here
    // axios.put('/api/medical-profile', profile);
    setIsEditing(false);
  };

  return (
    <div
      className={`card shadow-xl mb-8 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title flex items-center">
            <FaUserMd className="mr-2 text-blue-500" />
            Emergency Medical Profile
          </h2>
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            ) : (
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="alert alert-info mt-4">
          <div>
            <FaInfoCircle />
            <span>
              This information will be shared with emergency responders when you
              request emergency services.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Left Column */}
          <div>
            {/* Blood Type */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Blood Type</h3>
              {isEditing ? (
                <select
                  name="bloodType"
                  value={profile.bloodType}
                  onChange={handleProfileChange}
                  className={`select select-bordered w-full ${
                    isDarkMode ? "bg-gray-700" : ""
                  }`}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="Unknown">Unknown</option>
                </select>
              ) : (
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <span className="text-xl font-bold">{profile.bloodType}</span>
                </div>
              )}
            </div>

            {/* Allergies */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Allergies</h3>
              {isEditing ? (
                <div className="space-y-2">
                  {profile.allergies.map((allergy, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={allergy}
                        onChange={(e) =>
                          handleArrayChange("allergies", index, e.target.value)
                        }
                        className={`input input-bordered w-full ${
                          isDarkMode ? "bg-gray-700" : ""
                        }`}
                        placeholder="Enter allergy"
                      />
                      <button
                        className="btn btn-square btn-sm btn-error"
                        onClick={() => handleRemoveItem("allergies", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-sm btn-outline w-full"
                    onClick={() => handleAddItem("allergies")}
                  >
                    + Add Allergy
                  </button>
                </div>
              ) : (
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {profile.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="badge badge-error badge-lg"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>No known allergies</p>
                  )}
                </div>
              )}
            </div>

            {/* Medical Conditions */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Medical Conditions</h3>
              {isEditing ? (
                <div className="space-y-2">
                  {profile.conditions.map((condition, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={condition}
                        onChange={(e) =>
                          handleArrayChange("conditions", index, e.target.value)
                        }
                        className={`input input-bordered w-full ${
                          isDarkMode ? "bg-gray-700" : ""
                        }`}
                        placeholder="Enter medical condition"
                      />
                      <button
                        className="btn btn-square btn-sm btn-error"
                        onClick={() => handleRemoveItem("conditions", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-sm btn-outline w-full"
                    onClick={() => handleAddItem("conditions")}
                  >
                    + Add Condition
                  </button>
                </div>
              ) : (
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {profile.conditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.conditions.map((condition, index) => (
                        <span
                          key={index}
                          className="badge badge-warning badge-lg"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>No medical conditions</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Current Medications */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Current Medications
              </h3>
              {isEditing ? (
                <div className="space-y-2">
                  {profile.medications.map((medication, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={medication}
                        onChange={(e) =>
                          handleArrayChange(
                            "medications",
                            index,
                            e.target.value
                          )
                        }
                        className={`input input-bordered w-full ${
                          isDarkMode ? "bg-gray-700" : ""
                        }`}
                        placeholder="Enter medication and dosage"
                      />
                      <button
                        className="btn btn-square btn-sm btn-error"
                        onClick={() => handleRemoveItem("medications", index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-sm btn-outline w-full"
                    onClick={() => handleAddItem("medications")}
                  >
                    + Add Medication
                  </button>
                </div>
              ) : (
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {profile.medications.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {profile.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No current medications</p>
                  )}
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Additional Information
              </h3>
              {isEditing ? (
                <textarea
                  name="additionalInfo"
                  value={profile.additionalInfo}
                  onChange={handleProfileChange}
                  className={`textarea textarea-bordered w-full h-24 ${
                    isDarkMode ? "bg-gray-700" : ""
                  }`}
                  placeholder="Enter any additional medical information that emergency responders should know"
                ></textarea>
              ) : (
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <p>
                    {profile.additionalInfo ||
                      "No additional information provided."}
                  </p>
                </div>
              )}
            </div>

            {/* Advanced Directives */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Advanced Directives
              </h3>
              {isEditing ? (
                <div className="space-y-2">
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        name="dnr"
                        checked={profile.dnr}
                        onChange={handleProfileChange}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">
                        Do Not Resuscitate (DNR) Order
                      </span>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        name="organDonor"
                        checked={profile.organDonor}
                        onChange={handleProfileChange}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">Organ Donor</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`badge ${
                          profile.dnr ? "badge-error" : "badge-ghost"
                        }`}
                      >
                        DNR: {profile.dnr ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`badge ${
                          profile.organDonor ? "badge-success" : "badge-ghost"
                        }`}
                      >
                        Organ Donor: {profile.organDonor ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-2">
          <h3 className="text-lg font-semibold mb-2">Emergency Contacts</h3>
          {isEditing ? (
            <div className="space-y-4">
              {profile.emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Contact #{index + 1}</h4>
                    <button
                      className="btn btn-sm btn-circle btn-error"
                      onClick={() => handleRemoveContact(index)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) =>
                          handleContactChange(index, "name", e.target.value)
                        }
                        className={`input input-bordered ${
                          isDarkMode ? "bg-gray-700" : ""
                        }`}
                        placeholder="Contact name"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Relationship</span>
                      </label>
                      <input
                        type="text"
                        value={contact.relation}
                        onChange={(e) =>
                          handleContactChange(index, "relation", e.target.value)
                        }
                        className={`input input-bordered ${
                          isDarkMode ? "bg-gray-700" : ""
                        }`}
                        placeholder="Relationship"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone</span>
                      </label>
                      <input
                        type="text"
                        value={contact.phone}
                        onChange={(e) =>
                          handleContactChange(index, "phone", e.target.value)
                        }
                        className={`input input-bordered ${
                          isDarkMode ? "bg-gray-700" : ""
                        }`}
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-sm btn-outline w-full"
                onClick={handleAddContact}
              >
                + Add Emergency Contact
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm opacity-70">{contact.relation}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="btn btn-sm btn-primary"
                    >
                      <FaPhone className="mr-1" />
                      {contact.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Medical ID Card */}
        {!isEditing && (
          <div className="mt-6">
            <button className="btn btn-primary gap-2">
              <FaIdCard className="mr-1" />
              Download Medical ID Card
            </button>
            <p className="text-sm mt-2 opacity-70">
              Download your emergency medical ID card to keep in your wallet or
              share with family members.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Hospital Emergency Wait Times Section
const EmergencyWaitTimes = ({ isDarkMode }) => {
  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Main Street, City Center",
      waitTime: 35,
      distance: "2.3 miles",
      openBeds: 12,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Westside Medical Center",
      address: "456 West Avenue, Westside",
      waitTime: 15,
      distance: "4.1 miles",
      openBeds: 8,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Eastside Emergency Clinic",
      address: "321 East Street, Eastside",
      waitTime: 45,
      distance: "3.5 miles",
      openBeds: 5,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      name: "Northside Hospital",
      address: "567 North Road, Northside",
      waitTime: 25,
      distance: "5.7 miles",
      openBeds: 15,
      image: "https://via.placeholder.com/300",
    },
  ];

  const getWaitTimeColor = (minutes) => {
    if (minutes <= 15) return "text-green-500";
    if (minutes <= 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div
      className={`card shadow-xl mb-8 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="card-body">
        <h2 className="card-title flex items-center">
          <FaHospital className="mr-2 text-blue-500" />
          Emergency Room Wait Times
        </h2>
        <p className="text-sm opacity-70">
          Real-time estimated wait times for emergency rooms near you. Wait
          times are approximate and subject to change.
        </p>

        <div className="overflow-x-auto mt-4">
          <table className="table w-full">
            <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-100"}>
              <tr>
                <th>Hospital</th>
                <th>Wait Time</th>
                <th>Open Beds</th>
                <th>Distance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr
                  key={hospital.id}
                  className={
                    isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }
                >
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={hospital.image || "/placeholder.svg"}
                            alt={hospital.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{hospital.name}</div>
                        <div className="text-sm opacity-70">
                          {hospital.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`text-lg font-bold ${getWaitTimeColor(
                        hospital.waitTime
                      )}`}
                    >
                      {hospital.waitTime} mins
                    </span>
                  </td>
                  <td>{hospital.openBeds} beds</td>
                  <td>{hospital.distance}</td>
                  <td>
                    <div className="flex space-x-2">
                      <button className="btn btn-sm btn-primary">
                        Check In
                      </button>
                      <button className="btn btn-sm btn-outline">
                        Directions
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm opacity-70">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
          <button className="btn btn-sm btn-ghost">Refresh Data</button>
        </div>
      </div>
    </div>
  );
};

// Telemedicine Emergency Options Section
const TelemedicineEmergency = ({ isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Emergency Medicine",
      experience: "15 years",
      availability: "Available Now",
      image: "https://via.placeholder.com/300",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Dr. Mark Benson",
      specialty: "Urgent Care",
      experience: "10 years",
      availability: "Available in 15 min",
      image: "https://via.placeholder.com/300",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Dr. Emily Carter",
      specialty: "Emergency Medicine",
      experience: "8 years",
      availability: "Available Now",
      image: "https://via.placeholder.com/300",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Trauma Care",
      experience: "12 years",
      availability: "Available in 30 min",
      image: "https://via.placeholder.com/300",
      rating: 4.9,
    },
  ];

  return (
    <div
      className={`card shadow-xl mb-8 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="card-body">
        <h2 className="card-title flex items-center">
          <FaVideo className="mr-2 text-green-500" />
          Emergency Telemedicine
        </h2>
        <p className="text-sm opacity-70">
          Connect with emergency medicine specialists via video call for urgent
          but non-life-threatening conditions.
        </p>

        <div className="alert alert-warning mt-4">
          <div>
            <FaExclamationTriangle />
            <span>
              Telemedicine is not suitable for life-threatening emergencies.
              Call 911 or go to the nearest ER for severe conditions.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`card ${
                isDarkMode ? "bg-gray-700" : "bg-base-100"
              } shadow-md`}
            >
              <figure className="px-4 pt-4">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="rounded-xl h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-lg">{doctor.name}</h3>
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  <span>★</span>
                  <span>{doctor.rating}</span>
                </div>
                <p className="text-sm">{doctor.specialty}</p>
                <p className="text-xs opacity-70">
                  {doctor.experience} experience
                </p>
                <div className="mt-2">
                  <span
                    className={`badge ${
                      doctor.availability.includes("Now")
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {doctor.availability}
                  </span>
                </div>
                <div className="card-actions justify-end mt-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Connect Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Telemedicine Modal */}
        {isModalOpen && (
          <div
            className={`modal modal-open ${
              isDarkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            <div
              className={`modal-box max-w-3xl ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="font-bold text-lg">
                Start Emergency Telemedicine Session
              </h3>

              <div className="py-4">
                <div className="alert alert-info mb-4">
                  <div>
                    <FaInfoCircle />
                    <span>
                      You'll be connected with the next available emergency
                      medicine specialist. The consultation fee is $75 and may
                      be covered by your insurance.
                    </span>
                  </div>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Describe your emergency</span>
                  </label>
                  <textarea
                    className={`textarea textarea-bordered h-24 ${
                      isDarkMode ? "bg-gray-700" : ""
                    }`}
                    placeholder="Please describe your symptoms or concern in detail"
                  ></textarea>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">
                      Upload relevant images (optional)
                    </span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    accept="image/*"
                  />
                  <p className="text-xs mt-1 opacity-70">
                    You can upload images of visible symptoms, injuries, or
                    previous medical records.
                  </p>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">
                      Share my medical profile with the doctor
                    </span>
                  </label>
                </div>
              </div>

              <div className="modal-action">
                <button className="btn btn-primary gap-2">
                  <FaVideo />
                  Start Emergency Consultation
                </button>
                <button className="btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component update
const EmergencyServiceManage = ({ isDarkMode, toggleDarkMode }) => {
  // ... [previous code remains the same]

  // Add these components to the return statement, after the existing components
  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Previous components remain the same */}

        {/* Add the new components here */}
        <FirstAidGuides isDarkMode={isDarkMode} />
        <MedicalProfileEmergency isDarkMode={isDarkMode} />
        <EmergencyWaitTimes isDarkMode={isDarkMode} />
        <TelemedicineEmergency isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default EmergencyServiceManage;
