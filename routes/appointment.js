import express from "express";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";


const router = express.Router();


// 📌 Book Appointment
router.post("/book", async (req, res) => {
    try {
        const { patientId, doctorId, date, time } = req.body;

        // 🔹 Find doctor
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // 🔹 Get day from date
        const day = new Date(date).toLocaleString("en-US", { weekday: "long" });

        // ❗ Check if doctor is available that day
        if (!doctor.availableDays.includes(day)) {
            return res.status(400).json({
                message: `Doctor not available on ${day}`
            });
        }

        // ❗ Check time range
        if (time < doctor.startTime || time > doctor.endTime) {
            return res.status(400).json({
                message: "Time outside doctor's working hours"
            });
        }

        // ❗ Check duplicate booking
        const existing = await Appointment.findOne({
            doctorId,
            date,
            time
        });

        if (existing) {
            return res.status(400).json({
                message: "This time slot is already booked"
            });
        }

        // ✅ Save appointment
        const appointment = new Appointment({
            patientId,
            doctorId,
            date,
            time
        });

        await appointment.save();

        res.json({ message: "Appointment booked successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📋 Get appointments of a patient
router.get("/patient/:id", async (req, res) => {
    try {
        const appointments = await Appointment.find({
            patientId: req.params.id
        }).populate("doctorId");

        res.json(appointments);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

// ❌ Cancel Appointment
router.delete("/cancel/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment cancelled successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});