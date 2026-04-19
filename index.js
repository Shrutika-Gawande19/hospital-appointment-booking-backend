import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import doctorRoutes from "./routes/doctor.js";
import appointmentRoutes from "./routes/appointment.js";

env.config();

const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

async function connectdb() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("connection established");
    } catch (err) {
        console.log("error in connection", err);
    }
}

connectdb();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", doctorRoutes);
app.use("/api", appointmentRoutes);


app.get("/", (req, res) => {
    res.json({ status: "server okay" });
});


app.listen(PORT, () => {
    console.log(`App is listening`);
});