const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    code: {
      type: String,
      required: true
    },
    purpose: {
      type: String,
      enum: ["SIGNUP", "LOGIN", "RESET_PASSWORD"],
      default: "SIGNUP"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL auto-expiry
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Otp", otpSchema);
