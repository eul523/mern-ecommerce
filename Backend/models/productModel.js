import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        default: []
    },
    images: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }],
        default: []
    },
    description: String,
    rating: Number,
    numReviews: Number
})

const Product = mongoose.model("Product", productSchema);

export default Product;