import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id requied']
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product ID is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity cannot be less than 1'],
            default: 1,
        },
    }],
    sessionId: {
        type: String,
        required: [true, 'Session ID is required'],
    },
    status: {
        type: String,
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    total: {
        type: Number,
        required: [true, "Total required"],
    },
})


const Order = mongoose.model('Order', orderSchema);

export default Order;