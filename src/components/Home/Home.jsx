import { useEffect } from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import axios from "axios";
import HowItWorks from "./HowItWorks";
import MeetOurExperts from "./MeetOurExperts";

const Home = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/users", {
        withCredentials: true,
      })
      .then((res) => console.log(res.data));
  }, []);

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
