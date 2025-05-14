import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  FaPills,
  FaRobot,
  FaStethoscope,
  FaPlay,
  FaPause,
} from "react-icons/fa";

const ReportScanner = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [voiceResponse, setVoiceResponse] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speech, setSpeech] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("text", data.description);
    formData.append("file", data.pdf[0]);

    try {
      const res = await axios.post("http://localhost:5000/convert", formData);
      setVoiceResponse(res.data.message);
      alert("Report processed successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  const toggleSpeech = () => {
    if (!voiceResponse) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const newSpeech = new SpeechSynthesisUtterance(voiceResponse);
      newSpeech.lang = "en-US";
      newSpeech.volume = 1;
      newSpeech.rate = 1;
      newSpeech.pitch = 1;
      newSpeech.onend = () => setIsSpeaking(false);
      setSpeech(newSpeech);
      window.speechSynthesis.speak(newSpeech);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    return () => {
      if (speech) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speech]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg p-8 md:p-12 rounded-2xl shadow-2xl max-w-2xl w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center flex items-center justify-center gap-3">
          <FaRobot className="text-blue-500" /> AI Medical Assistant
        </h2>
        <p className="text-center text-gray-600 mb-8 font-medium">
          Share your symptoms or upload a report, and let our AI guide you to
          the best treatment and specialists.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full h-36 p-4 rounded-lg border-2 ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:border-blue-500 focus:outline-none transition-colors resize-none`}
              placeholder="Describe your symptoms (e.g., headache, fever, sore throat)..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center cursor-pointer">
              <input
                type="file"
                accept="application/pdf"
                {...register("pdf", { required: "PDF file is required" })}
                className="hidden"
              />
              <div
                className={`flex items-center gap-2 p-3 rounded-lg bg-gray-100 border-2 ${
                  errors.pdf ? "border-red-500" : "border-gray-300"
                } hover:bg-gray-200 transition-colors`}
              >
                <FaStethoscope className="text-blue-500" />
                <span className="text-gray-700 font-medium">
                  {errors.pdf
                    ? "Please upload a PDF"
                    : "Upload Medical Report (PDF)"}
                </span>
              </div>
            </label>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              <FaPills /> Analyze Report
            </button>
            {voiceResponse && (
              <button
                type="button"
                onClick={toggleSpeech}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isSpeaking
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isSpeaking ? <FaPause /> : <FaPlay />}
                {isSpeaking ? "Pause Voice" : "Play Voice"}
              </button>
            )}
          </div>
        </form>

        {voiceResponse && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-gray-700">
            <p className="font-medium">AI Response:</p>
            <p>{voiceResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportScanner;
