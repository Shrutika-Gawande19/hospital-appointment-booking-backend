import express from "express";
import Doctor from "../models/Doctor.js";

const router = express.Router();


// ➕ Add Doctor (temporary API for now)
router.post("/add-doctor", async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.json({ message: "Doctor added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// 📋 Get All Doctors
router.get("/doctors", async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;


