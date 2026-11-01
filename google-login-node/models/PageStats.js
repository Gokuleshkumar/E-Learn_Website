const mongoose = require("mongoose");

const pageStatsSchema = new mongoose.Schema(
  {
    pageKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    count: {
      type: Number,
      required: true,
      default: 593
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("PageStats", pageStatsSchema);
