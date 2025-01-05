import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        firstName: { type: String },
        lastName: { type: String },
        dateOfBirth: { type: Date },
        phoneNumber: { type: String },
        address: { type: String },
        avatar: {
            type: String,
            default:
                "https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg?fbclid=IwY2xjawHFTmBleHRuA2FlbQIxMAABHa5SDm64IKSbbEmqhAG-PemXSUcbNxvVx7AD_9Qshz4XP73gSFfKmOfXXA_aem_Rz9cJD1d5qoi6ZqV5P28LA",
        },
        gender: { type: String, enum: ["Male", "Female", "Other"] },
        isAdmin: { type: Boolean, default: false },
        role: {
            type: String,
            enum: ["Admin", "PremiumUser", "User"],
            default: "User",
        },
        lastLogin: { type: Date, default: Date.now },
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        verificationTokenExpiry: { type: Date },
        resetPasswordToken: { type: String },
        resetPasswordTokenExpiry: { type: Date },
        savedPosts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        numberReports: { type: Number, default: 0 },
    },
    { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
