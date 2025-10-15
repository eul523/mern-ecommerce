import { Router } from "express";
import Stripe from "stripe";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-sessiion', protectRoute, asyncHandler(async (req, res) => {
    const { items } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    metadata: {
                        _id: item._id
                    }
                },
                unit_amount: item.price * 100,
            },
            quantity: item.qty,
        })),
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });
    res.status(200).json({ id: session.id });
}));

export default router;