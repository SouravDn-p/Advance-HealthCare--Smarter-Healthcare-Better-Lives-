import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://advance-healthcare-sourav246.vercel.app",
  // https://advance-healthcare-sourav246.vercel.app
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosInstance;
};

export default useAxiosSecure;
