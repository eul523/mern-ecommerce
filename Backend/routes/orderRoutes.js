import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import { protectRoute, adminOnly } from "../middlewares/authMiddleware.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = Router();


// Create new order
router.post('/', protectRoute, asyncHandler(async (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId) {
        res.status(400);
        throw new Error('Session ID is required');
    }
    const orderExists = await Order.findOne({ sessionId });
    if (orderExists) {
        res.status(400);
        throw new Error('Order already exists for this session');
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if(session.payment_status !== 'paid'){
        res.status(400);
        throw new Error('Payment not completed');
    }
    const prods = JSON.parse(session.metadata.products);
    const order = new Order({
        userId: req.user._id,
        products: prods.map(item => ({
            productId: item.id,
            quantity: item.qty,
        })),
        sessionId,
        total: session.amount_total / 100,
        status: 'Shipped',
    })
    await order.save();
    res.status(201).json(order);
}));

router.get('/', protectRoute, asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).populate('products.productId', 'name price image');
    res.json(orders);
}))

export default router;