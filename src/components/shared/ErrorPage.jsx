import { Link } from "react-router-dom";
import { Home, ArrowLeft, HelpCircle, MessageCircle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="mb-8 relative">
          <svg
            className="w-48 h-48 mx-auto text-indigo-600 dark:text-indigo-400 animate-float"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15h8M9.5 9h.01M14.5 9h.01" />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-6xl font-bold text-gray-900 dark:text-white animate-pulse">
              404
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Oops! Page Not Found
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            The page you're looking for seems to have wandered off. Don't worry,
            these things happen to the best of us.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Here's what you can do:
            </h3>
            <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2">
              <li className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Go back to the previous page
              </li>
              <li className="flex items-center gap-2">
                <Home className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Return to our homepage
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Check our help center
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          <div className="mt-8 text-gray-600 dark:text-gray-300">
            <p>
              Need help?{" "}
              <Link
                to="/contact"
                className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <MessageCircle className="w-4 h-4" />
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
