import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://advance-healthcare-sourav246.vercel.app",
  // http://localhost:3000
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
