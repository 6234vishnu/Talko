import React, { useState, useRef } from "react";
import "../../../styles/user/GetStartedPageModal.css";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import SignupModal from "./signUp";

const GetStartedPageModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [step, setStep] = useState<"qr" | "otp" | "phone">("qr");
  const [phone, setPhone] = useState<null | any>(null);
  const [realOtp, setRealOtp] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const [userId, setuserId] = useState<any>();
  const [showSignup, setShowSignup] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    setError(value.length === 10 ? "" : "Enter a valid 10-digit phone number");
  };

  const handleOtpChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    const newOtp = [...otp];

    if (value === "") {
      newOtp[index] = "";
    } else {
      newOtp[index] = value.slice(-1);
      if (index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }

    setOtp(newOtp);
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const getOtp = async () => {
    try {
      const response = await api.post(`/user/auth/get-otp`, { phone });
      if (response.data.success) {
        setRealOtp(response.data.otp);
        setStep("otp");
        setuserId(response.data.userId);
      }
      console.log(response.data.message);

      setError(response.data.message);
    } catch (error) {
      setError("error occured try again later");
    }
  };

  const checkOtp = async () => {
    if (!realOtp) {
      console.log("No OTP received. Please request OTP again.");
      return;
    }

    const enteredOtp = otp.join("");

    if (enteredOtp === realOtp) {
      try {
        const response = await api.post(`/user/auth/verify-otp`, {
          enteredOtp,
          realOtp,
          userId,
        });
        if (response.data.success) {
          localStorage.setItem("accessToken", response.data.accessToken);
          navigate("/Home");
        }
        setError(response.data.message);
      } catch (error) {
        setError("server error try again later");
        console.log(error);
      }
      setError("Incorrect OTP, please try again.");
    } else {
      console.log("Incorrect OTP, please try again.");
    }
  };

  return (
    <div className="GetStartedPageModal-overlay">
      <div className="GetStartedPageModal-container">
        <button className="GetStartedPageModal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Login or sign up to continue</h2>
        <p>Scan QR code or enter phone number to login</p>
        <div className="GetStartedPageModal-content">
          {step === "qr" && (
            <>
              <img
                className="GetStartedPageModal-qr"
                src="/path/to/qr-image.png"
                alt="QR Code"
              />
              <p>Use Camera App to Scan QR</p>
              <button onClick={() => setStep("phone")}>Use Phone Number</button>
            </>
          )}

          {step === "phone" && (
            <>
              <input
                type="number"
                placeholder="Enter mobile number"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={10}
                required
              />

              {error ? (
                <>
                  <p style={{ color: "red" }} className="error-text">
                    {error}
                  </p>
                  <button
                    onClick={() => {
                      setShowSignup(true);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button disabled={!phone} onClick={getOtp}>
                  Get OTP
                </button>
              )}

              {showSignup && (
                <SignupModal onClose={() => setShowSignup(false)} />
              )}
            </>
          )}

          {step === "otp" && (
            <>
              <p>Enter OTP sent to +91{phone}</p>
              <div className="GetStartedPageModal-otp">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    ref={(el: any) => (otpRefs.current[index] = el)}
                  />
                ))}
              </div>
              <button onClick={checkOtp} disabled={otp.includes("")}>
                Verify OTP
              </button>
              <p>
                Resend OTP in <span>00:27</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStartedPageModal;
