import mongoose from "mongoose";
import { trim } from "zod";

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [50, "Name must be at most 50 characters long"],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [50, "Name must be at most 50 characters long"],
    }
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      // validate: {
      //     validator: function(v) {
      //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      //     },
      // }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      minLength: [8, "Password must be at least 8 characters long"],
      maxLength: [50, "Password must be at most 50 characters long"],
    },
    socketId: {
      type: String,
      default: null,
      trim: true
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
