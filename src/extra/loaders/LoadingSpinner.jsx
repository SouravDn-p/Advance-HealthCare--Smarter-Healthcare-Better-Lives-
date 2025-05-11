import useAuth from "../../hooks/useAuth";

const LoadingSpinner = () => {
  const { isDarkMode } = useAuth();
  return (
    <div
      className={`flex items-center justify-center h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
