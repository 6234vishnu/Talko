import User from "../../domain/models/user.model";

export const saveRefreshToken = async (userId: string, refreshToken: string) => {
    await User.findByIdAndUpdate(userId, { refreshToken });
};

export const getUserByRefreshToken = async (refreshToken: string) => {
    return await User.findOne({ refreshToken });
};
