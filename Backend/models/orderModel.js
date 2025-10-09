import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true,'User id requied']
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product ID is required'],
        },
        qty: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity cannot be less than 1'],
            default: 1,
        },
    }, ],

    status: {
        type: String,
        required: [true, 'Status requied']
    },
    total: {
        type: Number,
        required: [true, "Total required"],
    },
})


const Order = mongoose.model('Order', orderSchema);

export default Order;