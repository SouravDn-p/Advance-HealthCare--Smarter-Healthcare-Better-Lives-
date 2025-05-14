import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

export default function ReportSummary({ data }) {
  // This would use actual data from the API
  const summary = data?.summary || {
    patientInfo: {
      name: "John Doe",
      age: 45,
      gender: "Male",
      date: "2023-05-10",
    },
    overallStatus: "normal", // could be "normal", "attention", "critical"
    summary:
      "The report indicates generally healthy results with a few minor abnormalities that should be monitored. Blood pressure and cholesterol levels are within normal ranges. Glucose levels are slightly elevated, suggesting pre-diabetic tendencies that should be addressed through lifestyle modifications.",
    keyMetrics: [
      { name: "Blood Pressure", value: "120/80 mmHg", status: "normal" },
      { name: "Cholesterol", value: "185 mg/dL", status: "normal" },
      { name: "Glucose", value: "110 mg/dL", status: "attention" },
      { name: "Vitamin D", value: "18 ng/mL", status: "attention" },
    ],
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "normal":
        return (
          <span className="badge badge-success gap-1">
            <FaCheckCircle /> Normal
          </span>
        );
      case "attention":
        return (
          <span className="badge badge-warning gap-1">
            <FaExclamationTriangle /> Needs Attention
          </span>
        );
      case "critical":
        return (
          <span className="badge badge-error gap-1">
            <FaExclamationTriangle /> Critical
          </span>
        );
      default:
        return (
          <span className="badge badge-info gap-1">
            <FaInfoCircle /> Unknown
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">Report Summary</h3>
          <p className="text-sm text-gray-500">
            AI-generated summary of key findings and metrics
          </p>
        </div>
        {getStatusBadge(summary.overallStatus)}
      </div>

      <div className="divider"></div>

      {/* Patient Information */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Patient</p>
          <p className="font-medium">{summary.patientInfo.name}</p>
        </div>
        <div>
          <p className="text-gray-500">Age</p>
          <p className="font-medium">{summary.patientInfo.age}</p>
        </div>
        <div>
          <p className="text-gray-500">Gender</p>
          <p className="font-medium">{summary.patientInfo.gender}</p>
        </div>
        <div>
          <p className="text-gray-500">Report Date</p>
          <p className="font-medium">{summary.patientInfo.date}</p>
        </div>
      </div>

      {/* Summary Text */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Executive Summary</h4>
        <p className="text-gray-700">{summary.summary}</p>
      </div>

      {/* Key Metrics */}
      <div>
        <h4 className="font-semibold mb-3">Key Metrics</h4>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {summary.keyMetrics.map((metric, index) => (
                <tr key={index}>
                  <td>{metric.name}</td>
                  <td className="font-medium">{metric.value}</td>
                  <td>{getStatusBadge(metric.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
