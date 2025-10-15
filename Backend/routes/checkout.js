import { Router } from "express";
import Stripe from "stripe";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-session', protectRoute, asyncHandler(async (req, res) => {
    const { items } = req.body;
    if(!items || !Array.isArray(items) || items.length === 0){
        return res.status(400).json({ message: 'No items provided for checkout' });
    }
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
        metadata: {
            products: JSON.stringify(items.map(i => ({id: i._id, qty: i.quantity}))),
            userId: req.user._id.toString(),
        }
    });
    res.status(200).json({ url: session.url});
}));

export default router;