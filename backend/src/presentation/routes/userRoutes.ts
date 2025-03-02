import express from 'express'
import upload from "../../infrastructure/storage/cloudinaryStorage"; // Cloudinary storage
import multer from "multer";
import {getOtpController,verifyOtp,refreshToken,signUp} from '../controllers/userController'
import { authenticateUser } from '../middlewares/authenticateUser';
const router = express.Router();

// auth
router.post('/auth/get-otp',getOtpController)
router.post('/auth/verify-otp',verifyOtp)
router.post("/auth/refresh", refreshToken);
router.post('/auth/signup',upload.single("profilePic"),signUp)





export default router;