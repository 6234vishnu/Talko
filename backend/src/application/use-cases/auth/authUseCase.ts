import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../infrastructure/services/jwtServices"
import { saveRefreshToken, getUserByRefreshToken } from "../../../infrastructure/repositories/authRepository";

export const loginUser = async (userId: string) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    // Store refresh token in DB
    await saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
    try {
        const decoded: any = verifyRefreshToken(refreshToken);
        const user:any|string = await getUserByRefreshToken(refreshToken);
        if (!user) throw new Error("Invalid refresh token");

        const newAccessToken = generateAccessToken(user._id);
        return newAccessToken;
    } catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
};
