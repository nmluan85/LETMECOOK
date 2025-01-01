import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import crypto from 'crypto';
import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
import Plan from '../models/planModel.js';
import { deletePostAndRelated } from './postController.js';
import { generateCode, generateCookie } from '../utils/generateCode.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../config/emails.js';

// Controller to create a new user or sign up
const createUser = async (req, res) => {
    try {
        const { username, email, password, repeatPassword } = req.body;

        if (!username || !email || !password || !repeatPassword) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required.' 
            });
        }

        let { role } = req.body;
        if (!role) {
            role = 'User';
        }

        if (password !== repeatPassword) {
            return res.status(401).json({ 
                success: false,
                message: 'Passwords do not match.' 
            });
        }

        if (await User.findOne({ email })) {
            return res.status(404).json({ 
                success: false,
                message: 'Email already exists.' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateCode();

        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword, 
            role,
            verificationToken: verificationCode,
            verificationTokenExpiry: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
        });
        await newUser.save();

        generateCookie(res, newUser._id);

        await sendVerificationEmail(newUser.email, verificationCode);

        res.status(200).json({ 
            success: true,
            message: 'Account created successfully.',
            user: newUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Could not create user.' 
        });
    }
};  

// Controller to verify email
const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await User.findOne({ 
            verificationToken: code,
            verificationTokenExpiry: { $gt: new Date() }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Invalid verification code.' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.username);

        res.status(200).json({ 
            success: true, 
            message: 'Email verified successfully.',
            user: user 
        });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error. Could not verify email.' 
        });
    }
};

// Controller to login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required.' 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found.' 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid password.' 
            });
        }

        generateCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({ 
            success: true,
            message: 'Login successful.',
            user: user,
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Could not login.' 
        });
    }
};

// Controller to logout
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');

        res.status(200).json({ 
            success: true,
            message: 'Logout successful.' 
        });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Could not logout.' 
        });
    }
};

// Controller to forget password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false,
                message: 'Email is required.' 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found.' 
            });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordTokenExpiry = resetTokenExpiresAt;

		await user.save();

		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });

    } catch (error) {
        console.error('Error forgetting password:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Could not forget password.' 
        });
    }
}

// Controller to reset password
const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}
        
		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpiry = undefined;

		await user.save();
		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Controller to change password
const changePassword = async (req, res) => {
    try {
        const { username, oldPassword, repeatPassword, newPassword } = req.body;

        if (!username || !oldPassword || !repeatPassword || !newPassword) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required.' 
            });
        }

        if (newPassword !== repeatPassword) {
            return res.status(400).json({ 
                success: false,
                message: 'Passwords do not match.' 
            });
        }
        
        if (newPassword === oldPassword) {
            return res.status(400).json({ 
                success: false,
                message: 'New password cannot be the same as the old password.' 
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found.' 
            });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: 'Old password is incorrect.' 
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ 
            success: true,
            message: 'Password changed successfully.' 
        });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Could not change password.' 
        });
    }
};

// Controller to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Could not fetch users.'
        });
    }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ 
                success: false,
                message: 'User ID is required.' 
            });
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
            res.status(200).json({ 
                success: true,
                message: 'User and related data deleted successfully!' 
            });
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error. Could not delete user.' 
        });
    }
};

// Controller to check if the user is authenticated
const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found 1" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const savePostToUser = async (req, res) => {
    try {
        const { postId } = req.body; // Post ID sent in the request
        const userId = req.userId;

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required.' });
        }

        // Find the user and add the post to `savedPosts`
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { savedPosts: postId } }, // Add to savedPosts if not already present
            { new: true } // Return the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({savedPosts: user.savedPosts});
    } catch (error) {
        console.error('Error saving post to user:', error);
        res.status(500).json({ message: 'Server error. Could not save post.' });
    }
}

const deleteSavedPost = async (req, res) => {
    try {
        const { postId } = req.body; // Post ID sent in the request
        const userId = req.userId;  // Extracted from the verified token in middleware

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required.' });
        }

        // Find the user and remove the post from `savedPosts`
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { savedPosts: postId } }, // Remove the postId from savedPosts
            { new: true } // Return the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'Post removed successfully.', savedPosts: user.savedPosts });
    } catch (error) {
        console.error('Error removing post from user:', error);
        res.status(500).json({ message: 'Server error. Could not remove post.' });
    }
};

const getSavedPosts = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from the token in middleware
        const user = await User.findById(userId)
                            .select('savedPosts')
                            .populate('savedPosts'); // Assuming savedPosts stores Post IDs;

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        res.status(200).json({ success: true, savedPosts: user.savedPosts });
    } catch (error) {
        console.error('Error fetching saved posts:', error);
        res.status(500).json({ success: false, message: 'Server error. Could not fetch saved posts.' });
    }
};

export { 
    createUser, 
    verifyEmail,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    changePassword,
    getAllUsers,
    deleteUser,
    checkAuth,
    savePostToUser,
    deleteSavedPost,
    getSavedPosts
};