import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../models/userModel.js';

dotenv.config();

export const protectRoute = async (req, res, next) => {
    let token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Not authorized, no token"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }catch(err){
        return res.status(401).json({message: "Not authorized, token failed"});
    }
}

export const adminOnly = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        return res.status(403).json({message: "Admin access only"});
    }
}