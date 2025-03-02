import axios from "axios";
import { refreshAccessToken } from "../api/authServiceJwt";

const backenduri = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: backenduri,
});

api.defaults.withCredentials = true;

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");

    const allowedRoutes = [
      "/user/userlogin",
      "/admin/adminLogin",
      "/user/auth/signup",
      "/user/auth/get-otp",
      "user/auth/refresh",
      "/user/auth/google/callback",
      "/user/auth/google-login/callback",
      "/user/auth/verify-otp",
      "/user/forgot-email",
      "/user/resend-otp",
      "/user/verfy-otp-forgot",
      "/user/password-register",
      "/user/logout",
    ];

    if (config.url && allowedRoutes.includes(config.url)) {
      return config;
    }

    if (!token) {
      const currentRoute = window.location.pathname;

      if (currentRoute.includes("/admin")) {
        window.location.href = "/admin/login";
      } else if (currentRoute.includes("/user")) {
        window.location.href = "/login";
      }

      return Promise.reject(new Error("No token available, redirecting to login."));
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

//  Interceptor to refresh token on 401 error
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
