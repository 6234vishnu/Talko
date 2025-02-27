import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import userRouter from './presentation/routes/userRoutes'
import adminRoutes from './presentation/routes/adminRoutes'

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.set("strictPopulate", false);


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.options(
  "*",
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Prevent Caching
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});
app.use('/user',userRouter)
app.use('/admin',adminRoutes)
app.use(express.static(path.join(__dirname, "public")));

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
