"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Edit,
  Save,
  X,
  Camera,
} from "react-feather";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../extra/loaders/LoadingSpinner";

const DoctorProfile = () => {
  const { user, dbUser, isDarkMode } = useAuth();
  // State for doctor profile data
  const [profile, setProfile] = useState({
    id: "d123",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "+1 (555) 123-4567",
    specialty: "Cardiologist",
    qualifications: [
      { degree: "MD", institution: "Harvard Medical School", year: "2010" },
      {
        degree: "Cardiology Fellowship",
        institution: "Mayo Clinic",
        year: "2015",
      },
      {
        degree: "Board Certification",
        institution: "American Board of Internal Medicine",
        year: "2016",
      },
    ],
    experience: [
      {
        position: "Senior Cardiologist",
        hospital: "City Medical Center",
        duration: "2016 - Present",
      },
      {
        position: "Cardiology Fellow",
        hospital: "Mayo Clinic",
        duration: "2013 - 2015",
      },
      {
        position: "Resident Physician",
        hospital: "Massachusetts General Hospital",
        duration: "2010 - 2013",
      },
    ],
    address: "123 Medical Plaza, Suite 456, Boston, MA 02115",
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology, heart failure management, and cardiac imaging. Dr. Johnson is committed to providing compassionate, patient-centered care and staying at the forefront of cardiovascular medicine.",
    workingHours: {
      monday: { start: "9:00 AM", end: "5:00 PM" },
      tuesday: { start: "9:00 AM", end: "5:00 PM" },
      wednesday: { start: "9:00 AM", end: "5:00 PM" },
      thursday: { start: "9:00 AM", end: "5:00 PM" },
      friday: { start: "9:00 AM", end: "3:00 PM" },
      saturday: { start: "10:00 AM", end: "1:00 PM" },
      sunday: { start: "", end: "" },
    },
    image: user?.photoURL,
    coverImage: user?.photoURL,
  });

  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialize edited profile when entering edit mode
  useEffect(() => {
    if (editMode) {
      setEditedProfile({ ...profile });
    }
  }, [editMode, profile]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  // Handle working hours changes
  const handleHoursChange = (day, field, value) => {
    setEditedProfile({
      ...editedProfile,
      workingHours: {
        ...editedProfile.workingHours,
        [day]: {
          ...editedProfile.workingHours[day],
          [field]: value,
        },
      },
    });
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // await axios.put(`/api/doctors/${profile.id}`, editedProfile);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update profile state with edited values
      setProfile(editedProfile);
      setEditMode(false);

      // Show success message
      document.getElementById("success-toast").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("success-toast").classList.add("hidden");
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Show error message
      document.getElementById("error-toast").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("error-toast").classList.add("hidden");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedProfile({});
  };

  if (!user) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Toast */}
      <div id="success-toast" className="toast toast-top toast-end hidden">
        <div className="alert alert-success">
          <span>Profile updated successfully!</span>
        </div>
      </div>

      {/* Error Toast */}
      <div id="error-toast" className="toast toast-top toast-end hidden">
        <div className="alert alert-error">
          <span>Error updating profile. Please try again.</span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 w-full mb-16 md:mb-24 rounded-xl overflow-hidden">
        <img
          src={user?.photoURL || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-base-100 overflow-hidden">
          <img
            src={user?.photoURL || "/placeholder.svg"}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          {editMode && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <label htmlFor="profile-image" className="cursor-pointer">
                <Camera className="text-white" />
              </label>
              <input id="profile-image" type="file" className="hidden" />
            </div>
          )}
        </div>

        {/* Edit Button */}
        <div className="absolute top-4 right-4">
          {!editMode ? (
            <button
              className="btn btn-primary btn-sm md:btn-md"
              onClick={() => setEditMode(true)}
            >
              <Edit size={18} className="mr-2" /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="btn btn-error btn-sm md:btn-md"
                onClick={handleCancelEdit}
                disabled={loading}
              >
                <X size={18} className="mr-2" /> Cancel
              </button>
              <button
                className="btn btn-success btn-sm md:btn-md"
                onClick={handleSaveProfile}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <Save size={18} className="mr-2" />
                )}
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Personal Information</h2>

              {!editMode ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="text-primary" />
                    <div>
                      <p className="text-sm text-base-content/70">Full Name</p>
                      <p className="font-medium">{profile.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="text-primary" />
                    <div>
                      <p className="text-sm text-base-content/70">Email</p>
                      <p className="font-medium">{profile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="text-primary" />
                    <div>
                      <p className="text-sm text-base-content/70">Phone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1" />
                    <div>
                      <p className="text-sm text-base-content/70">Address</p>
                      <p className="font-medium">{profile.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="text-primary" />
                    <div>
                      <p className="text-sm text-base-content/70">Specialty</p>
                      <p className="font-medium">{profile.specialty}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editedProfile.name || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editedProfile.phone || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <textarea
                      name="address"
                      value={editedProfile.address || ""}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered w-full"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Specialty</span>
                    </label>
                    <input
                      type="text"
                      name="specialty"
                      value={editedProfile.specialty || ""}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Working Hours */}
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h2 className="card-title text-xl mb-4">Working Hours</h2>

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Start</th>
                      <th>End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(
                      editMode
                        ? editedProfile.workingHours || {}
                        : profile.workingHours || {}
                    ).map(([day, hours]) => (
                      <tr key={day}>
                        <td className="capitalize">{day}</td>
                        {!editMode ? (
                          <>
                            <td>{hours.start || "Closed"}</td>
                            <td>{hours.end || "Closed"}</td>
                          </>
                        ) : (
                          <>
                            <td>
                              <input
                                type="text"
                                value={hours.start || ""}
                                onChange={(e) =>
                                  handleHoursChange(
                                    day,
                                    "start",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g. 9:00 AM"
                                className="input input-bordered input-sm w-full"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={hours.end || ""}
                                onChange={(e) =>
                                  handleHoursChange(day, "end", e.target.value)
                                }
                                placeholder="e.g. 5:00 PM"
                                className="input input-bordered input-sm w-full"
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Bio, Qualifications, Experience */}
        <div className="lg:col-span-2">
          {/* Bio */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Biography</h2>

              {!editMode ? (
                <p className="text-base-content/80 whitespace-pre-line">
                  {profile.bio}
                </p>
              ) : (
                <div className="form-control">
                  <textarea
                    name="bio"
                    value={editedProfile.bio || ""}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-40"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Qualifications */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Qualifications</h2>

              {!editMode ? (
                <ul className="space-y-4">
                  {profile.qualifications.map((qual, index) => (
                    <li
                      key={index}
                      className="border-l-4 border-primary pl-4 py-1"
                    >
                      <p className="font-bold">{qual.degree}</p>
                      <p className="text-base-content/70">{qual.institution}</p>
                      <p className="text-sm text-base-content/60">
                        {qual.year}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  {editedProfile.qualifications?.map((qual, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-2 border-l-4 border-primary pl-4 py-2"
                    >
                      <input
                        type="text"
                        value={qual.degree || ""}
                        onChange={(e) => {
                          const updated = [...editedProfile.qualifications];
                          updated[index].degree = e.target.value;
                          setEditedProfile({
                            ...editedProfile,
                            qualifications: updated,
                          });
                        }}
                        placeholder="Degree"
                        className="input input-bordered input-sm w-full"
                      />
                      <input
                        type="text"
                        value={qual.institution || ""}
                        onChange={(e) => {
                          const updated = [...editedProfile.qualifications];
                          updated[index].institution = e.target.value;
                          setEditedProfile({
                            ...editedProfile,
                            qualifications: updated,
                          });
                        }}
                        placeholder="Institution"
                        className="input input-bordered input-sm w-full"
                      />
                      <input
                        type="text"
                        value={qual.year || ""}
                        onChange={(e) => {
                          const updated = [...editedProfile.qualifications];
                          updated[index].year = e.target.value;
                          setEditedProfile({
                            ...editedProfile,
                            qualifications: updated,
                          });
                        }}
                        placeholder="Year"
                        className="input input-bordered input-sm w-full"
                      />
                    </div>
                  ))}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      const updated = [
                        ...(editedProfile.qualifications || []),
                        { degree: "", institution: "", year: "" },
                      ];
                      setEditedProfile({
                        ...editedProfile,
                        qualifications: updated,
                      });
                    }}
                  >
                    Add Qualification
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Experience</h2>

              {!editMode ? (
                <ul className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <li
                      key={index}
                      className="border-l-4 border-secondary pl-4 py-1"
                    >
                      <p className="font-bold">{exp.position}</p>
                      <p className="text-base-content/70">{exp.hospital}</p>
                      <p className="text-sm text-base-content/60">
                        {exp.duration}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  {editedProfile.experience?.map((exp, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-2 border-l-4 border-secondary pl-4 py-2"
                    >
                      <input
                        type="text"
                        value={exp.position || ""}
                        onChange={(e) => {
                          const updated = [...editedProfile.experience];
                          updated[index].position = e.target.value;
                          setEditedProfile({
                            ...editedProfile,
                            experience: updated,
                          });
                        }}
                        placeholder="Position"
                        className="input input-bordered input-sm w-full"
                      />
                      <input
                        type="text"
                        value={exp.hospital || ""}
                        onChange={(e) => {
                          const updated = [...editedProfile.experience];
                          updated[index].hospital = e.target.value;
                          setEditedProfile({
                            ...editedProfile,
                            experience: updated,
                          });
                        }}
                        placeholder="Hospital"
                        className="input input-bordered input-sm w-full"
                      />
                      <input
                        type="text"
                        value={exp.duration || ""}
                        onChange={(e) => {
                          const updated = [...editedProfile.experience];
                          updated[index].duration = e.target.value;
                          setEditedProfile({
                            ...editedProfile,
                            experience: updated,
                          });
                        }}
                        placeholder="Duration"
                        className="input input-bordered input-sm w-full"
                      />
                    </div>
                  ))}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      const updated = [
                        ...(editedProfile.experience || []),
                        { position: "", hospital: "", duration: "" },
                      ];
                      setEditedProfile({
                        ...editedProfile,
                        experience: updated,
                      });
                    }}
                  >
                    Add Experience
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
