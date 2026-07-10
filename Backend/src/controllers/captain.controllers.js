import expressAsyncHandler from "express-async-handler";
import Captain from "../models/captain.models.js";
import { z } from "zod"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const signupValidator = z.object({
    name: z.object({
        firstName: z.string().min(3).max(50).trim().regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
        lastName: z.string().min(3).max(50).trim().regex(/^[a-zA-Z]+$/, "Last name must contain only letters").optional(),
    }),
    email: z.string().email().trim().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
    password: z.string().min(8).max(50).trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    socketId: z.string().trim().optional(),
    status: z.enum(["active", "inactive"]).optional(),
    vechile: z.object({
        color: z.string().min(3).max(50).trim().regex(/^[a-zA-Z]+$/, "Color must contain only letters"),
        plate: z.string().min(3).max(50).trim().regex(/^[a-zA-Z]+$/, "Plate must contain only letters"),
        capacity: z.number().min(1).max(100),
        vehicleType: z.enum(["car", "bike", "auto"]),
    })
}).strict();

const signInValidator = z.object({
    email: z.string().email().trim().regex(/^[\s@]+@[\s@]+\.[\s@]+$/, "Invalid email address"),
    password: z.string().min(8).max(50).trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
}).strict();

const options = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000,
    sameSite: "None",
}

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export const signupCaptain = expressAsyncHandler(async (req, res) => {
    const { name: { firstName, lastName }, email, password, vechile: { color, plate, capacity, vehicleType } } = req.body;
    const isValid = signupValidator.safeParse({ name: { firstName, lastName }, email, password, vechile: { color, plate, capacity, vehicleType } });
    if (!isValid.success) {
        return res.status(400).json({ message: isValid.error.message });
    }
    const captain = await Captain.findOne({ email });
    if (captain) {
        return res.status(400).json({ message: "Captain already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCaptain = await Captain.create({ name: { firstName, lastName }, email, password: hashedPassword, vechile: { color, plate, capacity, vehicleType } });
    const id = newCaptain._id.toString();
    const token = createToken(id);
    return res.status(201).cookie("token", token, options).json({ message: "Captain created successfully", captain: newCaptain });
})

const signinCaptain = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const isValid = signInValidator.safeParse({ email, password });
    if (!isValid.success) {
        return res.status(400).json({ message: isValid.error.message });
    }
    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, captain.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const id = captain._id.toString();
    const token = createToken(id);
    return res.status(200).cookie("token", token, options).json({ message: "Captain signed in successfully", user: captain });
})

const logoutCaptain = expressAsyncHandler(async (req, res) => {
    return res.status(200).clearCookie("token", options).json({ message: "logout successfully!!" });
})

const getMyProfile = expressAsyncHandler(async (req, res) => {
    return res.status(200).json(req.captain);
})

const getProfileById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const captain = await Captain.findById(id);
    if (!captain) {
        return res.status(404).json({ message: "Captain not found" });
    }
    return res.status(200).json(captain);
})

export { signupCaptain, signinCaptain, logoutCaptain, getMyProfile, getProfileById };