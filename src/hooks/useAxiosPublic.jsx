import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // https://advance-healthcare-sourav246.vercel.app
});

const useAxiosPublic = () => {
  return axiosInstance;
};

export default useAxiosPublic;
