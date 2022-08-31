import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface VaccineInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  dose: number;
  mandatory: boolean;
  image: string;
}

export interface VaccineDocument extends VaccineInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const vaccineSchema = new mongoose.Schema(
  {
    vaccineId: {
      type: String,
      required: true,
      unique: true,
      default: () => `vaccine_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dose: { type: Number, required: true },
    mandatory: { type: Boolean, required: true},
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const VaccineModel = mongoose.model<VaccineDocument>("Vaccine", vaccineSchema);

export default VaccineModel;
