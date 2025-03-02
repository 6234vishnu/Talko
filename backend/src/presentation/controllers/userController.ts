import { Request, Response } from "express";
import User from "../../domain/models/user.model";
import { generateOtp } from "../../application/use-cases/auth/getOtpUseCase";
import { sendOtp } from "../../infrastructure/services/smsServices";
import {
  loginUser,
  refreshAccessToken,
} from "../../application/use-cases/auth/authUseCase";
import cloudinary from "../../config/cloudinary";
import { generateQRCode } from "../../infrastructure/qr/qrServices";
import { ObjectId } from "mongoose";

export const getOtpController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { phone } = req.body;
    if (!phone || phone.toString().length !== 10) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid phone number" });
    }

    const findUser = await User.findOne({ phone: phone });
    if (!findUser) {
      return res
        .status(200)
        .json({
          success: false,
          message: "if you dont have an accout Sign Up first",
        });
    }
    const otp = generateOtp();
    console.log("otp : ", otp);

    if (!otp) {
      return res
        .status(200)
        .json({ success: false, message: "error occured try again later " });
    }
    const sendOtpToUser = sendOtp(phone, otp);
    if (!sendOtpToUser) {
      return res
        .status(200)
        .json({
          success: false,
          message: "error occured while sending otp try again later ",
        });
    }

    res.json({
      success: true,
      otp,
      userId: findUser._id,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { enteredOtp, realOtp, userId } = req.body;

    if (!enteredOtp || !realOtp || !userId) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid request data" });
    }

    if (enteredOtp !== realOtp) {
      return res.status(200).json({ success: false, message: "Invalid OTP" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }

    const { accessToken, refreshToken } = await loginUser(userId);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(200)
      .json({
        success: true,
        message: "OTP verified successfully",
        accessToken,
      });
  } catch (error) {
    console.log("error in verifyOtp", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error try again later" });
  }
};

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(200).json({ message: "Unauthorized" });

    const newAccessToken = await refreshAccessToken(refreshToken);
    return res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid refresh token" });
  }
};

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('body',req.body);
    
    const { phone, username, about, } = req.body;


    if (!phone || !username) {
      return res
        .status(200)
        .json({ success: false, message: "please provide all inputs" });
    }


    let profilePicUrl = req.file?.path 

    const newUser = new User({
      name: username,
      phone: phone,
      about: about,
      profilePicture:profilePicUrl
    });

    const saveUser = await newUser.save();
    if (!saveUser) {
      return res
        .status(200)
        .json({ success: false, message: "couldint signUp try again later" });
    }
    const qrCodeUrl = await generateQRCode(saveUser?._id as string | ObjectId);
    if (!qrCodeUrl) {
      return res
        .status(200)
        .json({ success: false, message: "couldint signUp try again later" });
    }
    saveUser.qrCode = qrCodeUrl;
    await saveUser.save();

    const userId = (saveUser._id as ObjectId).toString();

    const { accessToken, refreshToken } = await loginUser(userId);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(200)
      .json({
        success: true,
        message: "signUp successfull",
        accessToken,
      });

  } catch (error) {
    console.log("error in signUp", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error try again later" });
  }
};
