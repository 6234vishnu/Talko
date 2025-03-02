import { ObjectId } from "mongoose";
import QRCode from "qrcode";

const backendUri = process.env.BACKEND_URL;

export const generateQRCode = async (userId: ObjectId | string): Promise<string | null> => {
  if (!backendUri) {
    console.error("BACKEND_URL is not defined in environment variables.");
    return null;
  }

  const url = `${backendUri}/user/${userId}`;
  try {
    const qrCodeDataURL = await QRCode.toDataURL(url);
    return qrCodeDataURL; 
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};
