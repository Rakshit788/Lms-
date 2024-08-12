import asynchandler from "../utils/asynchandler.js";
import ApiError from "../utils/Api.error.js";
import ApiResponse from "../utils/Api.response.js";
import { instance } from "../app.js";
import Payment from "../models/payment.moodel.js";

const checkoutPayment = asynchandler(async (req, res) => {
    const { amount } = req.body; // Adjusted to destructure `amount` from `req.body`

    var options = {
        amount: amount * 100, // Convert to smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    try {
        const order = await instance.orders.create(options);
        if (!order) {
            throw new ApiError(400, "Unable to create an order");
        }
        const payment = new Payment({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            status: 'created',
        });
    
        await payment.save();
        res.status(201).json(new ApiResponse(200 , order , "created sucessfully" , true));
    } catch (err) {
        console.error(err);
        res.status(500).json(new ApiError(500, "Internal Server Error", err.message));
    }
});

const verifypayment = asynchandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = 'YOUR_RAZORPAY_SECRET'; // Replace with your Razorpay secret

    // Verify the signature
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = shasum.digest('hex');

    const isValidSignature = (generatedSignature === razorpay_signature);

    if (isValidSignature) {
        // Payment verification successful, update database or trigger actions
        const payment = await Payment.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { status: 'paid', paymentId: razorpay_payment_id },
            { new: true }
        );
        if (!payment) {
            res.status(404).json(new ApiError(404, "Payment record not found"));
        } else {
            res.status(200).json(new ApiResponse(200, payment, 'Payment verified successfully', true));
        }
    } else {
        res.status(400).json(new ApiError(400, 'Invalid payment verification'));
    }
});

export  {checkoutPayment , verifypayment};
