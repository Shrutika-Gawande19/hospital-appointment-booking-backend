import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    availableDays: [String], // ["Monday", "Wednesday"]
    startTime: String,       // "10:00"
    endTime: String          // "14:00"
});

export default mongoose.model("Doctor", doctorSchema);