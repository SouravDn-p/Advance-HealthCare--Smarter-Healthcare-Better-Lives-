import { useEffect } from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import axios from "axios";
import HowItWorks from "./HowItWorks";
import MeetOurExperts from "./MeetOurExperts";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { doctors, setDoctors, loader, setLoader } = useAuth();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/doctors").then((res) => setDoctors(res.data));
    setLoader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors, setDoctors]);

  return (
    <>
      <div>
        <HeroSection />
        <ServicesSection />
        <HowItWorks />
        <MeetOurExperts />
      </div>
    </>
  );
};

export default Home;
