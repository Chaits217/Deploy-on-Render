import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Job", "Carrer", "Business", "Other"],
      default: "Job",
    },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    income: { type: Number, required: true, min: 0 },
    growth: { type: Number, required: true, min: 0, max: 100 },
    stress: { type: Number, required: true, min: 0, max: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("Option", optionSchema);
