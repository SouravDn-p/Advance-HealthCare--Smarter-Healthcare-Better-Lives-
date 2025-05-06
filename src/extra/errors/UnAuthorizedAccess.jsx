import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import animationData from "../../assets/unAuthorize.json";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const UnAuthorizedAccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center border border-gray-200 dark:border-gray-700">
          <div className="w-full flex items-center justify-center mb-6">
            <Lottie
              loop
              animationData={animationData}
              play
              className="w-full max-w-xs"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-2"
          >
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
              Unauthorized Access
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg font-semibold mb-4 text-center text-red-500"
          >
            401 Error
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-center mb-6 text-gray-600 dark:text-gray-300"
          >
            This page is restricted to administrators only. Please contact
            support if you believe this is an error.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full flex justify-center"
          >
            <Link
              to="/"
              className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorizedAccess;
