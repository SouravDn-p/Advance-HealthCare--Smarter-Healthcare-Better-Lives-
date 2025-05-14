// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import {
//   FaFileUpload,
//   FaSearch,
//   FaChartBar,
//   FaFilePdf,
//   FaFileAlt,
//   FaDownload,
// } from "react-icons/fa";
// import ReportSummary from "./ReportSummary";
// import AnalysisChart from "./AnalysisChart";

// export default function ReportScanner() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [isLoading, setIsLoading] = useState(false);
//   const [reportData, setReportData] = useState(null);
//   const [activeTab, setActiveTab] = useState("summary");

//   const onSubmit = async (data) => {
//     setIsLoading(true);

//     const formData = new FormData();
//     formData.append("text", data.description || "");
//     formData.append("file", data.report[0]);

//     try {
//       // Replace with your actual API endpoint
//       const res = await axios.post(
//         "http://localhost:5000/analyze-report",
//         formData
//       );
//       setReportData(res.data);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to analyze report. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-bold text-primary mb-2">Report Scanner</h1>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Upload medical reports and get AI-powered analysis and summaries to
//           help understand complex medical information.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Upload Section */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl shadow-lg p-6">
//             <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//               <FaFileUpload className="text-primary" /> Upload Report
//             </h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Report File (PDF)</span>
//                 </label>
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   {...register("report", {
//                     required: "Report file is required",
//                   })}
//                   className="file-input file-input-bordered w-full"
//                 />
//                 {errors.report && (
//                   <p className="text-error text-sm mt-1">
//                     {errors.report.message}
//                   </p>
//                 )}
//               </div>

//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">
//                     Additional Notes (Optional)
//                   </span>
//                 </label>
//                 <textarea
//                   {...register("description")}
//                   className="textarea textarea-bordered w-full h-24"
//                   placeholder="Add any specific concerns or questions about the report..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-primary w-full"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="loading loading-spinner"></span>
//                     Analyzing...
//                   </>
//                 ) : (
//                   <>
//                     <FaSearch className="mr-2" /> Scan & Analyze Report
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* Quick Actions */}
//           {reportData && (
//             <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
//               <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 <button className="btn btn-outline btn-sm">
//                   <FaDownload className="mr-2" /> Save Analysis
//                 </button>
//                 <button className="btn btn-outline btn-sm">
//                   <FaFileAlt className="mr-2" /> Print Report
//                 </button>
//                 <button className="btn btn-outline btn-sm">
//                   <FaFilePdf className="mr-2" /> View Original
//                 </button>
//                 <button className="btn btn-outline btn-sm">
//                   <FaChartBar className="mr-2" /> Compare Data
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Section */}
//         <div className="lg:col-span-2">
//           {!reportData ? (
//             <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
//               <img
//                 src="/placeholder.svg?height=200&width=200"
//                 alt="Upload a report"
//                 className="w-40 h-40 mb-4 opacity-50"
//               />
//               <h3 className="text-xl font-semibold text-gray-500">
//                 Upload a medical report to see analysis
//               </h3>
//               <p className="text-gray-400 text-center mt-2">
//                 The AI will extract key information, provide a summary, and
//                 highlight important findings.
//               </p>
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               {/* Tabs */}
//               <div className="tabs tabs-boxed bg-gray-100 p-2">
//                 <button
//                   className={`tab ${
//                     activeTab === "summary" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("summary")}
//                 >
//                   Summary
//                 </button>
//                 <button
//                   className={`tab ${
//                     activeTab === "analysis" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("analysis")}
//                 >
//                   Detailed Analysis
//                 </button>
//                 <button
//                   className={`tab ${
//                     activeTab === "charts" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("charts")}
//                 >
//                   Visualizations
//                 </button>
//               </div>

//               {/* Tab Content */}
//               <div className="p-6">
//                 {activeTab === "summary" && <ReportSummary data={reportData} />}

//                 {activeTab === "analysis" && (
//                   <div className="space-y-4">
//                     <h3 className="text-xl font-bold">Detailed Analysis</h3>
//                     <div className="divider"></div>

//                     {/* This would be populated with actual data from the API */}
//                     <div className="space-y-4">
//                       <div>
//                         <h4 className="font-semibold">Key Findings</h4>
//                         <p className="text-gray-700">
//                           {reportData.keyFindings ||
//                             "The report shows normal results across most parameters with a few minor abnormalities that require attention."}
//                         </p>
//                       </div>

//                       <div>
//                         <h4 className="font-semibold">Abnormal Values</h4>
//                         <ul className="list-disc pl-5 text-gray-700">
//                           {(
//                             reportData.abnormalValues || [
//                               "Slightly elevated glucose levels (110 mg/dL)",
//                               "Low vitamin D (18 ng/mL)",
//                             ]
//                           ).map((item, index) => (
//                             <li key={index}>{item}</li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div>
//                         <h4 className="font-semibold">Recommendations</h4>
//                         <ul className="list-disc pl-5 text-gray-700">
//                           {(
//                             reportData.recommendations || [
//                               "Follow up with primary care physician",
//                               "Consider dietary changes to address glucose levels",
//                               "Vitamin D supplementation recommended",
//                             ]
//                           ).map((item, index) => (
//                             <li key={index}>{item}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "charts" && <AnalysisChart data={reportData} />}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
