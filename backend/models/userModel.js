import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String },
    address: { type: String },
    avatar: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ['Admin', 'PremiumUser', 'User'], default: 'User' },
}, { timestamps: true});

const User = mongoose.models.User || mongoose.model('User', userSchema);    
export default User;