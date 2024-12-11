import mongoose from 'mongoose';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
import Plan from '../models/planModel.js';
import { deletePostAndRelated } from './postController.js';

// Controller to create a new user or sign up
const createUser = async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body;

        if (!username || !email || !password || !repeatPassword) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password !== repeatPassword) {
            return res.status(401).json({ message: 'Passwords do not match.' });
        }

        if (await User.findOne({ username })) {
            return res.status(404).json({ message: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ message: 'Account created successfully.' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error. Could not create user.' });
    }
};

// Controller to login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );
        res.status(200).json({ token, message: 'Login successful.' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error. Could not login.' });
    }
};

// Controller to logout
const logoutUser = async (req, res) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(400).json({ message: 'No token provided.' });
        }

        res.status(200).json({ 
            success: true,
            message: 'Logout successful.' 
        });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ message: 'Server error. Could not logout.' });
    }
};

// Controller to change password
const changePassword = async (req, res) => {
    try {
        const { username, oldPassword, repeatPassword, newPassword } = req.body;

        if (!username || !oldPassword || !repeatPassword || !newPassword) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (newPassword !== repeatPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }
        
        if (newPassword === oldPassword) {
            return res.status(400).json({ message: 'New password cannot be the same as the old password.' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Old password is incorrect.' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Server error. Could not change password.' });
    }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Delete all comments by the user
            await Comment.deleteMany({ username: id }, { session });

            // Find all posts by the user and delete them with related data
            const userPosts = await Post.find({ author: id });
            for (const post of userPosts) {
                await deletePostAndRelated(post._id, session);
            }

            // Delete all plans by the user
            await Plan.deleteMany({ user: id }, { session });

            // Finally delete the user
            const deletedUser = await User.findByIdAndDelete(id).session(session);
            
            if (!deletedUser) {
                throw new Error('User not found');
            }

            await session.commitTransaction();
            res.status(200).json({ message: 'User and related data deleted successfully!' });
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error. Could not delete user.' });
    }
};

// Controller to edit a user

export { 
    createUser, 
    loginUser,
    logoutUser,
    changePassword,
    deleteUser 
};