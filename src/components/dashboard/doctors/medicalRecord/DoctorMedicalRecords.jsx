"use client";

import { useState, useEffect } from "react";
import { Search, Download, Eye, FileText, FilePlus, X } from "react-feather";

const DoctorMedicalRecords = () => {
  // State for medical records
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [recordTypes, setRecordTypes] = useState([]);
  const [newRecord, setNewRecord] = useState({
    patientId: "",
    patientName: "",
    type: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    notes: "",
    file: null,
  });

  // Fetch medical records
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, these would be actual API calls
        // const recordsResponse = await axios.get('/api/medical-records');
        // const patientsResponse = await axios.get('/api/patients');

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock medical records
        const mockRecords = [
          {
            id: "rec1",
            patientId: "p1",
            patientName: "John Smith",
            date: "2023-06-15",
            type: "Lab Results",
            doctor: "Dr. Sarah Johnson",
            description: "Complete Blood Count (CBC)",
            notes:
              "Patient's blood work shows normal values across all parameters. No concerns at this time.",
            results: {
              wbc: "7.5 x10^9/L",
              rbc: "5.0 x10^12/L",
              hemoglobin: "14.2 g/dL",
              hematocrit: "42%",
              platelets: "250 x10^9/L",
            },
            fileUrl: "#",
          },
          {
            id: "rec2",
            patientId: "p1",
            patientName: "John Smith",
            date: "2023-05-20",
            type: "Imaging",
            doctor: "Dr. Robert Chen",
            description: "Chest X-Ray",
            notes:
              "X-ray performed to rule out pneumonia. Images show clear lung fields with no evidence of consolidation or effusion.",
            findings:
              "No abnormalities detected. Heart and lungs appear normal.",
            fileUrl: "#",
          },
          {
            id: "rec3",
            patientId: "p1",
            patientName: "John Smith",
            date: "2023-04-10",
            type: "Lab Results",
            doctor: "Dr. Sarah Johnson",
            description: "Lipid Panel",
            notes:
              "Patient's cholesterol levels are slightly elevated. Recommended dietary changes and follow-up in 3 months.",
            results: {
              totalCholesterol: "195 mg/dL",
              ldl: "120 mg/dL",
              hdl: "45 mg/dL",
              triglycerides: "150 mg/dL",
            },
            fileUrl: "#",
          },
          {
            id: "rec4",
            patientId: "p2",
            patientName: "Emily Davis",
            date: "2023-07-05",
            type: "Consultation",
            doctor: "Dr. Mark Benson",
            description: "Neurology Consultation",
            notes:
              "Patient reports frequent migraines, 2-3 times per week. Prescribed sumatriptan and recommended keeping a headache diary.",
            fileUrl: "#",
          },
          {
            id: "rec5",
            patientId: "p3",
            patientName: "Michael Johnson",
            date: "2023-08-12",
            type: "Procedure",
            doctor: "Dr. Sarah Johnson",
            description: "Cardiac Catheterization",
            notes:
              "Procedure performed to evaluate coronary artery disease. Patient tolerated procedure well with no complications.",
            findings:
              "70% stenosis in LAD, 50% stenosis in RCA. Recommended medical management with follow-up in 1 month.",
            fileUrl: "#",
          },
          {
            id: "rec6",
            patientId: "p4",
            patientName: "Sarah Wilson",
            date: "2023-09-18",
            type: "Vaccination",
            doctor: "Dr. Emily Carter",
            description: "Influenza Vaccine",
            notes:
              "Annual flu vaccine administered. No adverse reactions observed during 15-minute monitoring period.",
            fileUrl: "#",
          },
          {
            id: "rec7",
            patientId: "p5",
            patientName: "Robert Brown",
            date: "2023-10-05",
            type: "Prescription",
            doctor: "Dr. Sarah Johnson",
            description: "Medication Renewal",
            notes:
              "Renewed prescriptions for atorvastatin 20mg daily and lisinopril 10mg daily for 12 months.",
            fileUrl: "#",
          },
        ];

        // Mock patients
        const mockPatients = [
          { id: "p1", name: "John Smith" },
          { id: "p2", name: "Emily Davis" },
          { id: "p3", name: "Michael Johnson" },
          { id: "p4", name: "Sarah Wilson" },
          { id: "p5", name: "Robert Brown" },
        ];

        // Extract unique record types
        const types = [...new Set(mockRecords.map((record) => record.type))];

        setRecords(mockRecords);
        setPatients(mockPatients);
        setRecordTypes(types);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter records based on search term and filters
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPatient =
      selectedPatient === "" || record.patientId === selectedPatient;
    const matchesType = selectedType === "" || record.type === selectedType;

    return matchesSearch && matchesPatient && matchesType;
  });

  // Handle record selection
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setShowRecordModal(true);
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewRecord({
        ...newRecord,
        file: e.target.files[0],
      });
    }
  };

  // Handle new record form changes
  const handleRecordFormChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({
      ...newRecord,
      [name]: value,
    });
  };

  // Handle patient selection for new record
  const handlePatientChange = (e) => {
    const patientId = e.target.value;
    const patient = patients.find((p) => p.id === patientId);

    setNewRecord({
      ...newRecord,
      patientId: patientId,
      patientName: patient ? patient.name : "",
    });
  };

  // Handle record upload
  const handleUploadRecord = async () => {
    try {
      // In a real app, this would be an API call with FormData
      // const formData = new FormData();
      // Object.keys(newRecord).forEach(key => {
      //   formData.append(key, newRecord[key]);
      // });
      // await axios.post('/api/medical-records', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a new ID (in a real app, this would come from the backend)
      const newId = `rec${records.length + 1}`;

      // Create new record object
      const createdRecord = {
        id: newId,
        patientId: newRecord.patientId,
        patientName: newRecord.patientName,
        date: newRecord.date,
        type: newRecord.type,
        doctor: "Dr. Sarah Johnson", // Hardcoded for demo
        description: newRecord.description,
        notes: newRecord.notes,
        fileUrl: newRecord.file ? URL.createObjectURL(newRecord.file) : "#",
      };

      // Update state
      setRecords([...records, createdRecord]);

      // Reset form and close modal
      setNewRecord({
        patientId: "",
        patientName: "",
        type: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        notes: "",
        file: null,
      });
      setShowUploadModal(false);

      // Show success message
      document.getElementById("success-toast").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("success-toast").classList.add("hidden");
      }, 3000);
    } catch (error) {
      console.error("Error uploading record:", error);
      // Show error message
      document.getElementById("error-toast").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("error-toast").classList.add("hidden");
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Toast */}
      <div id="success-toast" className="toast toast-top toast-end hidden">
        <div className="alert alert-success">
          <span>Medical record uploaded successfully!</span>
        </div>
      </div>

      {/* Error Toast */}
      <div id="error-toast" className="toast toast-top toast-end hidden">
        <div className="alert alert-error">
          <span>Error uploading record. Please try again.</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Medical Records</h1>

        <button
          className="btn btn-primary mt-4 md:mt-0"
          onClick={() => setShowUploadModal(true)}
        >
          <FilePlus size={18} className="mr-2" />
          Upload New Record
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control flex-1">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search records..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square">
                  <Search size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="form-control">
                <select
                  className="select select-bordered w-full"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                >
                  <option value="">All Patients</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <select
                  className="select select-bordered w-full"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">All Record Types</option>
                  {recordTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No medical records found matching your criteria.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Patient</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Doctor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{formatDate(record.date)}</td>
                      <td>{record.patientName}</td>
                      <td>{record.type}</td>
                      <td>{record.description}</td>
                      <td>{record.doctor}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => handleViewRecord(record)}
                          >
                            <Eye size={16} />
                          </button>
                          <button className="btn btn-sm btn-ghost">
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Record Detail Modal */}
      {showRecordModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-box max-w-3xl">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowRecordModal(false)}
            >
              <X size={18} />
            </button>

            <h3 className="font-bold text-lg mb-4">
              {selectedRecord.description}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-base-content/70">Patient</p>
                <p className="font-medium">{selectedRecord.patientName}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/70">Date</p>
                <p className="font-medium">{formatDate(selectedRecord.date)}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/70">Record Type</p>
                <p className="font-medium">{selectedRecord.type}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/70">Doctor</p>
                <p className="font-medium">{selectedRecord.doctor}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-base-content/70">Notes</p>
              <p className="bg-base-200 p-3 rounded-lg">
                {selectedRecord.notes}
              </p>
            </div>

            {selectedRecord.results && (
              <div className="mb-4">
                <p className="text-sm text-base-content/70 mb-2">Results</p>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Test</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(selectedRecord.results).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td className="capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </td>
                            <td>{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedRecord.findings && (
              <div className="mb-4">
                <p className="text-sm text-base-content/70">Findings</p>
                <p className="bg-base-200 p-3 rounded-lg">
                  {selectedRecord.findings}
                </p>
              </div>
            )}

            <div className="modal-action">
              <button className="btn btn-outline">
                <Download size={18} className="mr-2" />
                Download
              </button>
              <button className="btn" onClick={() => setShowRecordModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Record Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-box max-w-2xl">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowUploadModal(false)}
            >
              <X size={18} />
            </button>

            <h3 className="font-bold text-lg mb-4">Upload Medical Record</h3>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Patient</span>
              </label>
              <select
                name="patientId"
                className="select select-bordered w-full"
                value={newRecord.patientId}
                onChange={handlePatientChange}
                required
              >
                <option value="" disabled>
                  Select Patient
                </option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Record Type</span>
                </label>
                <select
                  name="type"
                  className="select select-bordered w-full"
                  value={newRecord.type}
                  onChange={handleRecordFormChange}
                  required
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {recordTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered"
                  value={newRecord.date}
                  onChange={handleRecordFormChange}
                  required
                />
              </div>
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                name="description"
                className="input input-bordered"
                value={newRecord.description}
                onChange={handleRecordFormChange}
                placeholder="e.g. Complete Blood Count, X-Ray, etc."
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Notes</span>
              </label>
              <textarea
                name="notes"
                className="textarea textarea-bordered"
                value={newRecord.notes}
                onChange={handleRecordFormChange}
                placeholder="Add notes about this medical record..."
                rows={3}
              ></textarea>
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Upload File</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
              />
              <label className="label">
                <span className="label-text-alt">
                  Supported formats: PDF, JPG, PNG (max 10MB)
                </span>
              </label>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUploadRecord}
                disabled={
                  !newRecord.patientId ||
                  !newRecord.type ||
                  !newRecord.description
                }
              >
                <FileText size={18} className="mr-2" />
                Upload Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorMedicalRecords;
