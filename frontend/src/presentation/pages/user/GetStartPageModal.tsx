import React, { useState } from "react";
import "../../../styles/user/GetStartedPageModal.css";


const GetStartedPageModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<"qr" | "otp" | "phone">("qr");

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
              <input type="text" placeholder="Enter mobile number" />
              <button onClick={() => setStep("otp")}>Get OTP</button>
            </>
          )}

          {step === "otp" && (
            <>
              <p>Enter OTP sent to +91XXXXXXXXXX</p>
              <div className="GetStartedPageModal-otp">
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
                <input type="text" maxLength={1} />
              </div>
              <button>Verify OTP</button>
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

export default GetStartedPageModal