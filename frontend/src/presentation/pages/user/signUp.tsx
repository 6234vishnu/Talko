import React, { useState } from "react";
import "../../../styles/user/signUp.css";
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
    <div className="signUpPage-modal-overlay">
      <div className="signUpPage-modal">
        <button className="signUpPage-close-btn" onClick={onClose}>
          &times;
        </button>

        <h2 className="signUpPage-title">Sign Up</h2>

        {/* Step 1: Phone Input */}
        {step === "phone" && (
          <>
            <p className="signUpPage-text">Enter your phone number</p>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
              className="signUpPage-input"
            />
            {error && (
              <p style={{ color: "red" }} className="signUpPage-error-text">
                {error}
              </p>
            )}
            <button
              className="signUpPage-button"
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
            <p className="signUpPage-text">Enter your details</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="signUpPage-input"
            />
            <input
              type="text"
              placeholder="Enter about (optional)"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="signUpPage-input"
            />
            <div className="signUpPage-buttons">
              <button
                className="signUpPage-button"
                onClick={() => setStep("phone")}
              >
                Back
              </button>
              <button className="signUpPage-button" onClick={handleNext}>
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3: Profile Picture */}
        {step === "picture" && (
          <>
            <p className="signUpPage-text">Upload Profile Picture</p>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="signUpPage-profile-preview"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="signUpPage-file-input"
            />
            <div className="signUpPage-buttons">
              <button
                className="signUpPage-button"
                onClick={() => setStep("details")}
              >
                Back
              </button>
              <button className="signUpPage-button" onClick={handleSignup}>
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
