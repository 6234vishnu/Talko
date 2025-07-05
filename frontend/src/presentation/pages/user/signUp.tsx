import React, { useState } from "react";

import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const SignupModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<"phone" | "details" | "picture">("phone");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    setError(value.length === 10 ? "" : "Enter a valid 10-digit phone number");
  };

  const handleNext = () => {
    if (step === "phone" && phone.length === 10) {
      setStep("details");
    } else if (step === "details" && username.trim() !== "") {
      setStep("picture");
    } else {
      setError("Please fill in the required fields.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ||null;
    if (file) {
      console.log('fl1',file);
      
      setProfilePic(file);
      
      setPreview(URL.createObjectURL(file));
    }
  };

  const formData = new FormData();
  formData.append("phone", phone);
  formData.append("username", username);
  formData.append("about", about);

  if (profilePic) {
    formData.append("profilePic", profilePic); // Send as file
  }

  const handleSignup = async () => {
    console.log(formData);
    try {

      const response = await api.post("/user/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },});
      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.accessToken);
        onClose();
        navigate("/Home");
      }
      setError(response.data.message);
    } catch (error) {
      setError("server error try agian later");
    }
  };

  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg text-center relative">
    <button
      onClick={onClose}
      className="absolute top-3 right-4 text-2xl text-gray-600 hover:text-black"
    >
      &times;
    </button>

    <h2 className="text-xl font-bold mb-4">Sign Up</h2>

    {/* Step 1: Phone Input */}
    {step === "phone" && (
      <>
        <p className="text-base text-gray-700 mb-2">Enter your phone number</p>
        <input
          type="text"
          placeholder="Enter mobile number"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm mb-3"
        />
        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}
        <button
          className="w-full bg-black  text-white py-2 rounded text-base mt-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={phone.length !== 10}
          onClick={handleNext}
        >
          Next
        </button>
      </>
    )}

    {/* Step 2: Username & About */}
    {step === "details" && (
      <>
        <p className="text-base text-gray-700 mb-2">Enter your details</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm mb-3"
        />
        <input
          type="text"
          placeholder="Enter about (optional)"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm mb-3"
        />
        <div className="flex justify-between gap-3 mt-4">
          <button
            className="w-1/2 bg-white text-black py-2 rounded text-base border border-black"
            onClick={() => setStep("phone")}
          >
            Back
          </button>
          <button
            className="w-1/2 bg-black text-white py-2 rounded text-base"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </>
    )}

    {/* Step 3: Profile Picture */}
    {step === "picture" && (
      <>
        <p className="text-base text-gray-700 mb-2">Upload Profile Picture</p>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm mb-3"
        />
        <div className="flex justify-between gap-3 mt-4">
          <button
            className="w-1/2 bg-white text-black py-2 rounded text-base border border-black "
            onClick={() => setStep("details")}
          >
            Back
          </button>
          <button
            className="w-1/2 bg-black text-white py-2 rounded text-base"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>
      </>
    )}
  </div>
</div>

  );
};

export default SignupModal;
