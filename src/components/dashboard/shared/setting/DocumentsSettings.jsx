"use client";

import { useState } from "react";
import {
  FileText,
  Upload,
  Trash2,
  Download,
  Eye,
  Clock,
  Filter,
  Search,
  AlertCircle,
  Check,
  FileIcon as FilePdf,
  FileImage,
  FileSpreadsheet,
  FileIcon as FileWord,
} from "lucide-react";

const DocumentsSettings = ({ onSave }) => {
  // Mock documents data
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Medical History.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedDate: "Apr 15, 2025",
      category: "Medical Records",
      shared: false,
    },
    {
      id: 2,
      name: "Insurance Card.jpg",
      type: "image",
      size: "1.2 MB",
      uploadedDate: "Apr 10, 2025",
      category: "Insurance",
      shared: true,
    },
    {
      id: 3,
      name: "Prescription Details.docx",
      type: "document",
      size: "0.8 MB",
      uploadedDate: "Apr 5, 2025",
      category: "Prescriptions",
      shared: false,
    },
    {
      id: 4,
      name: "Lab Results.pdf",
      type: "pdf",
      size: "3.1 MB",
      uploadedDate: "Mar 28, 2025",
      category: "Lab Results",
      shared: true,
    },
    {
      id: 5,
      name: "Vaccination Record.xlsx",
      type: "spreadsheet",
      size: "1.5 MB",
      uploadedDate: "Mar 20, 2025",
      category: "Vaccinations",
      shared: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [storageUsed, setStorageUsed] = useState(9.0); // in MB
  const [storageLimit, setStorageLimit] = useState(100); // in MB
  const [autoDeleteOld, setAutoDeleteOld] = useState(false);
  const [defaultPrivacy, setDefaultPrivacy] = useState("private");

  // Categories for filtering
  const categories = [
    "All",
    "Medical Records",
    "Insurance",
    "Prescriptions",
    "Lab Results",
    "Vaccinations",
    "Other",
  ];

  // Get file icon based on type
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="w-6 h-6 text-red-500" />;
      case "image":
        return <FileImage className="w-6 h-6 text-blue-500" />;
      case "document":
        return <FileWord className="w-6 h-6 text-blue-600" />;
      case "spreadsheet":
        return <FileSpreadsheet className="w-6 h-6 text-green-600" />;
      default:
        return <FileText className="w-6 h-6 text-gray-500" />;
    }
  };

  // Filter documents based on search and category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle document deletion
  const handleDeleteDocument = (docId) => {
    const docToDelete = documents.find((doc) => doc.id === docId);
    const docSize = Number.parseFloat(docToDelete.size);

    setDocuments(documents.filter((doc) => doc.id !== docId));
    setStorageUsed((prev) => Math.max(0, prev - docSize));
    setConfirmDelete(null);
  };

  // Handle document sharing toggle
  const toggleDocumentSharing = (docId) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === docId ? { ...doc, shared: !doc.shared } : doc
      )
    );
  };

  // Calculate storage percentage used
  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Documents & Files
      </h2>

      {/* Storage usage indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Storage Usage
          </h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {storageUsed.toFixed(1)} MB of {storageLimit} MB used
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              storagePercentage < 70
                ? "bg-blue-600"
                : storagePercentage < 90
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${storagePercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload button */}
      <div className="mb-6">
        <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Upload className="w-5 h-5 mr-2" />
          Upload New Document
        </button>
      </div>

      {/* Documents list */}
      {filteredDocuments.length > 0 ? (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{getFileIcon(doc.type)}</div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {doc.name}
                    </h4>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{doc.size}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Uploaded on {doc.uploadedDate}</span>
                      <span className="mx-2">•</span>
                      <span>{doc.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
                    title="View document"
                  >
                    <Eye className="w-5 h-5" />
                  </button>

                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
                    title="Download document"
                  >
                    <Download className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => toggleDocumentSharing(doc.id)}
                    className={`p-2 rounded-full ${
                      doc.shared
                        ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                    title={
                      doc.shared ? "Document is shared" : "Document is private"
                    }
                  >
                    {doc.shared ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => setConfirmDelete(doc.id)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-900/20 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    title="Delete document"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Delete confirmation */}
              {confirmDelete === doc.id && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Are you sure you want to delete this document? This action
                    cannot be undone.
                  </p>
                  <div className="mt-2 flex space-x-3">
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Document status */}
              <div className="mt-3">
                <span
                  className={`text-xs py-0.5 px-2 rounded-full ${
                    doc.shared
                      ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {doc.shared ? "Shared" : "Private"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <FileText className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            No documents found
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {searchTerm || selectedCategory !== "All"
              ? "Try adjusting your search or filter"
              : "Upload documents to see them here"}
          </p>
        </div>
      )}

      {/* Document Settings */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          Document Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                Default privacy setting
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose the default privacy setting for newly uploaded documents
              </p>
            </div>
            <div>
              <select
                value={defaultPrivacy}
                onChange={(e) => setDefaultPrivacy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="private">Private</option>
                <option value="shared">Shared with doctors</option>
                <option value="public">Public</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300">
                Auto-delete old documents
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically delete documents older than 1 year
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={autoDeleteOld}
                onChange={() => setAutoDeleteOld(!autoDeleteOld)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Document Management Tips
            </h4>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside space-y-1">
              <li>Keep your medical records up to date</li>
              <li>Share important documents with your healthcare providers</li>
              <li>Download and backup your documents regularly</li>
              <li>Use descriptive names for easy searching</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Document Settings
        </button>
      </div>
    </div>
  );
};

export default DocumentsSettings;
