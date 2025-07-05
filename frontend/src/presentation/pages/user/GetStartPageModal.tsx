import React, { useState, useRef } from "react";
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
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
    <button
      className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-black"
      onClick={onClose}
    >
      &times;
    </button>

    <h2 className="text-xl md:text-2xl font-semibold text-center mb-2">
      Login or sign up to continue
    </h2>
    <p className="text-sm md:text-base text-gray-600 text-center mb-4">
      Scan QR code or enter phone number to login
    </p>

    <div className="flex flex-col gap-4 items-center">
      {step === "qr" && (
        <>
          <img
            className="w-40 h-40 object-contain"
            src="/path/to/qr-image.png"
            alt="QR Code"
          />
          <p className="text-gray-600">Use Camera App to Scan QR</p>
          <button
            onClick={() => setStep("phone")}
            className="text-black-600 hover:underline"
          >
            Use Phone Number
          </button>
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
      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
    />

    {/* Always show Sign Up option */}
    <div className="flex justify-between w-full">
      <p
        className="text-sm text-blue-600 hover:underline cursor-pointer"
        onClick={() => setShowSignup(true)}
      >
        New here? Sign Up
      </p>
    </div>

    {/* Show error if any */}
    {error && (
      <p className="text-red-500 text-sm w-full text-center">{error}</p>
    )}

    <button
      disabled={!phone || phone.length !== 10}
      onClick={getOtp}
      className=" text-white px-4 py-2 rounded w-full disabled:opacity-50 bg-black"
    >
      Get OTP
    </button>

    {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
  </>
)}


      {step === "otp" && (
        <>
          <p className="text-center text-gray-700">
            Enter OTP sent to +91{phone}
          </p>
          <div className="flex gap-2 justify-center mt-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                ref={(el: any) => (otpRefs.current[index] = el)}
                className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            ))}
          </div>
          <button
            onClick={checkOtp}
            disabled={otp.includes("")}
            className="bg-green-600 text-white px-4 py-2 rounded w-full mt-3 disabled:opacity-50"
          >
            Verify OTP
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Resend OTP in <span className="font-semibold">00:27</span>
          </p>
        </>
      )}
    </div>
  </div>
</div>

  );
};

export default GetStartedPageModal;
