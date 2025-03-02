import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET as string
const REFRESH_SECRET = process.env.REFRESH_SECRET as string

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" }); // Short expiry
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" }); // Longer expiry
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_SECRET);
};
