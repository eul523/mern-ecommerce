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
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    images: {
        type: [{
            type: String
        }],
        default: []
    },
    description: String,
    rating: Number,
    numReviews: Number
})

productSchema.index({ name: 'text', description: 'text' }); // For search
productSchema.index({ gender: 1 }); // For gender filter
productSchema.index({ category: 1 }); // For category filter
productSchema.index({ price: 1 }); // For price range filter
productSchema.index({ gender: 1, category: 1 }); // Compound index for combined filtering

const Product = mongoose.model("Product", productSchema);

export default Product;