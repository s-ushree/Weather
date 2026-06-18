import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, location } = req.body;
  
  // Check if user exists
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  
  // Create user
  const user = await User.create({
    username,
    email,
    password,
    location
  });
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      location: user.location,
      preferences: user.preferences,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Check for user email
  const user = await User.findOne({ email });
  
  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      location: user.location,
      preferences: user.preferences,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      location: user.location,
      preferences: user.preferences
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.preferences = req.body.preferences || user.preferences;
    
    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }
    
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      location: updatedUser.location,
      preferences: updatedUser.preferences,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user location
// @route   PUT /api/users/location
// @access  Private
export const updateUserLocation = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (user) {
    user.location = req.body.location || user.location;
    
    const updatedUser = await user.save();
    
    res.json({
      location: updatedUser.location
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
