import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./config/connectToDb.js";
import sampleRoute from "./routes/sampleRoute.js";
import AdminRoute from "./routes/adminRoute.js";
import CabangRoute from "./routes/cabangRoute.js";
import guruRoute from "./routes/guruRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

//Connecting to database
connectToDB();

//Middleware
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/sample", sampleRoute);
app.use("/auth", AdminRoute);
app.use("/cabang", CabangRoute);
app.use("/guru", guruRoute);

app.listen(PORT, () => {
  console.log("Server Running on port " + PORT);
});
