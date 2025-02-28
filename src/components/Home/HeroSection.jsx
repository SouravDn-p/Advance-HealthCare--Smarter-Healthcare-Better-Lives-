import handshake from "../../assets/handshake.png";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/2 max-w-[400px]">
          <img
            src={handshake}
            alt="Digital healthcare illustration showing doctor and patient interaction"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif">
            <span className="text-[#8B4513]">Welcome to </span>
            <span className="text-[#483D8B] font-semibold">
              Advance Health Service
            </span>
          </h1>

          <p className="text-gray-700 text-lg md:text-xl italic">
            - Your trusted digital healthcare platform for secure, fast, and smart
            medical solutions. Book appointments, access prescriptions, and
            monitor your health anytime, anywhere! 🚀
          </p>

          <div className="space-y-2">
            <p className="text-xl md:text-2xl">
              <span className="text-green-600">
                Health at your fingertips,{" "}
              </span>
              <span className="text-gray-800">quick and </span>
              <span className="text-purple-800">bright,</span>
            </p>
            <p className="text-xl md:text-2xl">
              <span className="text-green-600">Advance Health Service, </span>
              <span className="text-purple-800">day and night!</span>
            </p>
          </div>

          <button className="mt-6 px-8 py-3 bg-[#ff4d4d] hover:bg-[#ff3333] text-white rounded-full font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
