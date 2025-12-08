const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

// POST /enroll
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;

    if (!name || !email || !phone || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEnrollment = new Enrollment({ name, email, phone, course });
    await newEnrollment.save();

    res.status(200).json({ success: true, message: "Enrollment successful!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
