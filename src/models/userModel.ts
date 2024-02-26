import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog', // Reference to the Blog model
        }
    ],
    verifyToken: {type: String},
    verifyTokenExpiry: {type: Date},
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
