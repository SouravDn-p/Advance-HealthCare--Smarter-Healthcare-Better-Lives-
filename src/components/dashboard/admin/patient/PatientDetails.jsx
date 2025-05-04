"use client";

import {
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaUserMd,
  FaExclamationTriangle,
} from "react-icons/fa";

const PatientDetails = ({ patient, onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
              <span className="text-3xl">{patient.name.charAt(0)}</span>
            </div>
          </div>
          <h2 className="text-xl font-bold mt-4">{patient.name}</h2>
          <p className="text-gray-600">
            {patient.age} years old, {patient.gender}
          </p>
          <div className="mt-2">
            <span className="badge badge-lg">{patient.bloodType}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Patient since</p>
            <p className="font-medium">{patient.registrationDate}</p>
          </div>
        </div>

        <div className="md:w-2/3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <FaPhone className="text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{patient.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FaEnvelope className="text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{patient.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{patient.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FaCalendarAlt className="text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Last Visit</p>
                <p className="font-medium">{patient.lastVisit}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FaCalendarAlt className="text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Upcoming Appointment</p>
                <p className="font-medium">
                  {patient.upcomingAppointment || "None scheduled"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <FaIdCard className="text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Insurance</p>
                <p className="font-medium">{patient.insuranceProvider}</p>
                <p className="text-sm">{patient.insuranceNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FaUserMd className="mr-2" /> Medical History
          </h3>
          <div className="bg-base-200 p-4 rounded-lg">
            {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
              <ul className="space-y-2">
                {patient.medicalHistory.map((condition, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    {condition}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No medical conditions recorded</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FaExclamationTriangle className="mr-2" /> Emergency Contact
          </h3>
          <div className="bg-base-200 p-4 rounded-lg">
            <p>{patient.emergencyContact || "No emergency contact recorded"}</p>
          </div>
        </div>
      </div>

      <div className="modal-action">
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
