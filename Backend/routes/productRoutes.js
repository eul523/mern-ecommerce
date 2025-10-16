import {
    Router
} from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import upload from "../configs/multer.js";
import mongoose from "mongoose";
import {
    protectRoute,
    adminOnly
} from "../middlewares/authMiddleware.js";
import Image from "../models/imageModel.js";

const router = Router();

// Get products route
router.get('/', asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const men = await Product.find({
        gender: "men",
        age: 'adult'
    }).skip((page - 1) * limit).limit(limit);
    const women = await Product.find({
        gender: "women",
        age: 'adult'
    }).skip((page - 1) * limit).limit(limit);
    const children = await Product.find({
        age: "children"
    }).skip((page - 1) * limit).limit(limit);
    const latest = await Product.find().limit(8);
    return res.json({
        products: {
            men,
            women,
            children,
            latest
        }
    });
}))

//Add Product for admin only
router.post('/', protectRoute, adminOnly, upload.array('images', 4), asyncHandler(async (req, res) => {
    const {
        name,
        price,
        gender,
        age,
        category,
        description,
        rating,
        numReviews
    } = req.body;
    const images = req.files;
    if (!name || !price || !gender || !age || !category) {
        return res.status(400).json({
            msg: 'Provide necessary information.'
        })
    }
    if (!images || images.length < 4) return res.status(400).json({
        msg: '4 images required.'
    })
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const product = new Product({
            name,
            price,
            age,
            gender,
            category
        })
        if (description) product.description = description;
        if (numReviews) product.numReviews = numReviews;
        if (rating) product.rating = rating;

        const savedImages = await Promise.all(
            images.map(async (i) => {
                const image = new Image({
                    data: i.buffer,
                    filename: i.originalname,
                    contentType: i.mimetype
                })
                await image.save(session);
                return image._id;
            })
        )
        product.images = savedImages.map(i => `images/${i}`);
        await product.save(session);
        await session.commitTransaction();
        return res.json({
            msg: 'Product added.'
        })
    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    } finally {
        session.endSession();
    }
}))

//Get specific product
router.get('/:id', asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({
        msg: 'Invalid id.'
    });
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({
        msg: 'No product found.'
    })
    return res.json(product);
}))

router.get('/category/:category', asyncHandler(async (req, res) => {
    const { category } = req.params;
    const { sort = 'relevance', age } = req.query;

    // Validate category
    const validCategories = ['men', 'women', 'children'];
    if (!validCategories.includes(category.toLowerCase())) {
        return res.status(400).json({ msg: 'Invalid category. Must be men, women, or children.' });
    }

    // Base filter
    let filter = {};
    if (category === 'men') filter = { gender: 'men', age: 'adult' };
    else if (category === 'women') filter = { gender: 'women', age: 'adult' };
    else if (category === 'children') {
        // Allow boys/girls filter for children
        if (age && ['men', 'women'].includes(age.toLowerCase())) {
            filter = { age: 'children', gender: age }; // 'boys' -> 'boy', 'girls' -> 'girl'
        } else {
            filter = { age: 'children' };
        }
    }

    // Sorting logic
    let sortOption = {};
    switch (sort) {
        case 'price-low':
            sortOption = { price: 1 };
            break;
        case 'price-high':
            sortOption = { price: -1 };
            break;
        case 'latest':
            sortOption = { createdAt: -1 };
            break;
        default:
            sortOption = {}; 
    }

    const products = await Product.find(filter).sort(sortOption);

    res.json({
        category,
        sort,
        filterApplied: { ...filter },
        products
    });
}));


export default router;