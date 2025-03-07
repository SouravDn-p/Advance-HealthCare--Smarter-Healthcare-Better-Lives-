import { useEffect } from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import HowItWorks from "./HowItWorks";
import MeetOurExperts from "./MeetOurExperts";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { setDoctors, setLoader } = useAuth();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/doctors").then((res) => setDoctors(res.data));
    setLoader(false);
  }, []);

  return (
    <>
      <div >
        <HeroSection />
        <ServicesSection />
        <HowItWorks />
        <MeetOurExperts />
      </div>
    </>
  );
};

export default Home;
