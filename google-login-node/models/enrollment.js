const mongoose = require("mongoose");


const enrollmentSchema = new mongoose.Schema({

    // ==========================================
    // STUDENT NAME
    // ==========================================

    name: {

        type: String,

        required: true,

        trim: true

    },


    // ==========================================
    // EMAIL
    // ==========================================

    email: {

        type: String,

        required: true,

        trim: true,

        lowercase: true

    },


    // ==========================================
    // MOBILE
    // ==========================================

    mobile: {

        type: String,

        required: true,

        trim: true

    },


    // ==========================================
    // COURSE
    // ==========================================

    course: {

        type: String,

        required: true

    },


    // ==========================================
    // PAYMENT STATUS
    // ==========================================

    paymentStatus: {

        type: String,

        enum: [
            "PENDING",
            "PAID",
            "FAILED"
        ],

        default: "PENDING"

    },


    // ==========================================
    // RAZORPAY ORDER ID
    // ==========================================

    razorpayOrderId: {

        type: String,

        default: null

    },


    // ==========================================
    // RAZORPAY PAYMENT ID
    // ==========================================

    razorpayPaymentId: {

        type: String,

        default: null

    },


    // ==========================================
    // RAZORPAY SIGNATURE
    // ==========================================

    razorpaySignature: {

        type: String,

        default: null

    },


    // ==========================================
    // PAYMENT DATE
    // ==========================================

    paidAt: {

        type: Date,

        default: null

    }

}, {

    timestamps: true

});


module.exports =
    mongoose.model(
        "Enrollment",
        enrollmentSchema
    );