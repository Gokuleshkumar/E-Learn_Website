const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");


// ==========================================================
// POST /enroll
// Create a new course enrollment
// ==========================================================

router.post("/", async (req, res) => {

    try {

        // Get data from frontend
        const {
            name,
            email,
            mobile,
            course
        } = req.body;


        // ==================================================
        // VALIDATION
        // ==================================================

        if (!name || !email || !mobile || !course) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, email, mobile and course are required."

            });

        }


        // ==================================================
        // CHECK WHETHER USER ALREADY HAS PENDING ENROLLMENT
        // ==================================================

        const existingEnrollment =
            await Enrollment.findOne({

                email: email,

                course: course,

                paymentStatus: "PENDING"

            });


        if (existingEnrollment) {

            return res.status(200).json({

                success: true,

                message:
                    "You already have a pending enrollment. Please continue to payment.",

                enrollmentId:
                    existingEnrollment._id

            });

        }


        // ==================================================
        // CREATE ENROLLMENT
        // ==================================================

        const newEnrollment =
            new Enrollment({

                name: name,

                email: email,

                mobile: mobile,

                course: course,

                paymentStatus:
                    "PENDING",

                razorpayOrderId:
                    null,

                razorpayPaymentId:
                    null,

                razorpaySignature:
                    null,

                paidAt:
                    null

            });


        // ==================================================
        // SAVE TO MONGODB
        // ==================================================

        await newEnrollment.save();


        console.log(
            "✅ Enrollment saved successfully:"
        );

        console.log(
            newEnrollment
        );


        // ==================================================
        // RESPONSE
        // ==================================================

        return res.status(200).json({

            success: true,

            message:
                "Enrollment successful! Proceed to payment.",

            enrollmentId:
                newEnrollment._id

        });


    } catch (error) {

        console.error(
            "🔥 Enrollment error:"
        );

        console.error(
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Server error while saving enrollment.",

            error:
                error.message

        });

    }

});


// ==========================================================
// EXPORT ROUTER
// ==========================================================

module.exports = router;