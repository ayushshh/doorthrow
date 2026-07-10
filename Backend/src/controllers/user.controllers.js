import expressAsyncHandler from "express-async-handler";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

const options = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
    sameSite: "None",
}

const signInValidator = z.object({
    email: z.string().email().trim().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(8).max(50).trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
}).strict();

const signupValidator = z.object({
    name: z.object({
        firstName: z.string().min(3).max(50).trim().regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
        lastName: z.string().min(3).max(50).trim().regex(/^[a-zA-Z]+$/, "Last name must contain only letters").optional(),
    }),
    email: z.string().email().trim().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(8).max(50).trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
}).strict();

export const signupUser = expressAsyncHandler(async (req, res) => {
    const { name: { firstName, lastName }, email, password } = req.body;
    const isValid = signupValidator.safeParse({ name: { firstName, lastName }, email, password });
    if (!isValid.success) {
        return res.status(400).json({ message: isValid.error.message });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });
    const id = newUser._id.toString();
    const token = createToken(id);
    return res.status(201).cookie("token", token, options).json({ message: "User created successfully", user: newUser });
});

const signinValidator = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const isValid = signInValidator.safeParse({ email, password });
    if (!isValid.success) {
        return res.status(400).json({ message: isValid.error.message });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const id = user._id.toString();
    const token = createToken(id);
    return res.status(200).cookie("token", token, options).json({ message: "User signed in successfully", user: user });
});

const geMeValidator = expressAsyncHandler(async (req, res) => {
    return res.status(200).json(req.user);
})

//want to work on seperately on logoutvalidator on referesh token + short lived token
const logOutValidator = expressAsyncHandler(async (req, res) => {
    return res.status(200).clearCookie("token", options).json({ message: "logout successfully!!" })
})

export { signupUser, signinValidator, geMeValidator, logOutValidator };  