import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtp = async (phone: string, otp: string): Promise<boolean> => {
  try {
    const message = await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: `+91${phone}`, 
    });

    console.log("OTP sent successfully:", message.sid);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};
