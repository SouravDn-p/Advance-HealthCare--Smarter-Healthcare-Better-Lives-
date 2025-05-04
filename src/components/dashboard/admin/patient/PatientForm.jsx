"use client";

import { useState, useEffect } from "react";

const PatientForm = ({ patient, onSubmit, onCancel }) => {
  const initialFormState = {
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    address: "",
    bloodType: "O+",
    medicalHistory: [],
    lastVisit: "",
    upcomingAppointment: "",
    insuranceProvider: "",
    insuranceNumber: "",
    emergencyContact: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [medicalCondition, setMedicalCondition] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addMedicalCondition = () => {
    if (medicalCondition.trim()) {
      setFormData({
        ...formData,
        medicalHistory: [...formData.medicalHistory, medicalCondition.trim()],
      });
      setMedicalCondition("");
    }
  };

  const removeMedicalCondition = (index) => {
    const updatedHistory = [...formData.medicalHistory];
    updatedHistory.splice(index, 1);
    setFormData({
      ...formData,
      medicalHistory: updatedHistory,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (formData.age && (isNaN(formData.age) || formData.age <= 0)) {
      newErrors.age = "Age must be a positive number";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
          />
          {errors.name && (
            <span className="text-error text-sm mt-1">{errors.name}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.age ? "input-error" : ""
            }`}
          />
          {errors.age && (
            <span className="text-error text-sm mt-1">{errors.age}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Gender</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Blood Type</span>
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.phone ? "input-error" : ""
            }`}
          />
          {errors.phone && (
            <span className="text-error text-sm mt-1">{errors.phone}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.email ? "input-error" : ""
            }`}
          />
          {errors.email && (
            <span className="text-error text-sm mt-1">{errors.email}</span>
          )}
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="2"
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Last Visit Date</span>
          </label>
          <input
            type="date"
            name="lastVisit"
            value={formData.lastVisit}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Upcoming Appointment</span>
          </label>
          <input
            type="date"
            name="upcomingAppointment"
            value={formData.upcomingAppointment}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Insurance Provider</span>
          </label>
          <input
            type="text"
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Insurance Number</span>
          </label>
          <input
            type="text"
            name="insuranceNumber"
            value={formData.insuranceNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Emergency Contact</span>
          </label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Name (Relation) - Phone Number"
          />
        </div>

        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Medical History</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={medicalCondition}
              onChange={(e) => setMedicalCondition(e.target.value)}
              className="input input-bordered flex-1"
              placeholder="Add medical condition"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={addMedicalCondition}
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.medicalHistory.map((condition, index) => (
              <div key={index} className="badge badge-lg gap-2">
                {condition}
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={() => removeMedicalCondition(index)}
                >
                  ✕
                </button>
              </div>
            ))}
            {formData.medicalHistory.length === 0 && (
              <span className="text-gray-500 text-sm">
                No medical conditions added
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="modal-action">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {patient ? "Update Patient" : "Add Patient"}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
