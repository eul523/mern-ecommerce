import mongoose from "mongoose";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();
const connectDb = async (uri) => {
    mongoose.connection.on("connected", () => console.log("connected to db."));
    mongoose.connection.on("disconnected", () => console.log("db disconnected."));
    let retry = 3;
    while (retry > 0) {
        try {
            console.log("connecting to db")
            await mongoose.connect(uri);
            break;
        } catch (err) {
            console.log(err);
            retry--;
        }
    }
}

const generateToken = (user) => {
    const token = jwt.sign({
            id: user._id
        },
        process.env.JWT_SECRET, {
            expiresIn: "3d"
        }
    )
    return token;
}


export {
    connectDb,
    generateToken
};