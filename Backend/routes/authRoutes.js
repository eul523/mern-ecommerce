import {
    Router
} from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from '../models/userModel.js';
import {generateToken} from '../utils.js';
import dotenv from 'dotenv';
import { OAuth2Client } from "google-auth-library";
import { protectRoute } from "../middlewares/authMiddleware.js";

dotenv.config();

const router = Router();

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.BACKEND_URL}/api/auth/google/callback`
);

router.get("/google", (req, res) => {
  const url = googleClient.generateAuthUrl({
    scope: ["openid", "email"],
    redirect_uri: `${process.env.BACKEND_URL}/api/auth/google/callback`,
  });
  res.json({url});
});

// Google OAuth Callback
router.get("/google/callback", async (req, res) => {
  try {
    const {
      code
    } = req.query;
    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=Missing%20authorization%20code`);
    }

    const {
      tokens
    } = await googleClient.getToken(code);
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const {
      sub: googleId,
      email,
      name,
    } = payload;


    let user = await User.findOne({
      $or: [{
        googleId
      }, {
        email
      }]
    });

    if (!user) {
      user = new User({
        email,
        name: name || email.split('@')[0],
        googleId,
      });
      await user.save();
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict"
    });
    res.redirect(`${process.env.FRONTEND_URL}/`);
  } catch (err) {
    console.error("Google callback error:", err);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=Google%20authentication%20failed`);
  }
});


router.post('/register', asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    if (!email || !password || !name) return res.status(400).json({
        msg: 'Provide necessary fields.'
    });
    const user = await User.find({
        email
    });
    if (user) return res.status(409).json({
        msg: 'User already exists with this email.'
    });
    const newUser = new User({
        name,
        email,
        password
    });
    await newUser.save();
    const token = generateToken(newUser);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict"
    });

    return res.json({
        msg: 'Registered succesfully.',
        user: { name: newUser.name, email: newUser.email, _id: newUser._id}
    })
}))

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)return res.status(400).json({msg: 'Provide necessary information.'});
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({msg: 'User not found.'});
    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(401).json({msg: 'Invalid credentials.'});
    const token = generateToken(user);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict"
    });
    return res.json({msg: 'Logged in successfully.', user: { name: user.name, _id: user._id}});
}))

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict"
    });
    res.json({msg: 'Logged out successfully.'});
})

router.get('/me',protectRoute, asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password -googleId');
    if(!user) return res.status(404).json({msg: 'User not found.'});
    return res.json({user});
}))

export default router;