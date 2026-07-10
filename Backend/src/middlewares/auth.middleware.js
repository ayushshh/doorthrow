import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import Captain from "../models/captain.models.js";

const protectUser = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    message: "Invalid token"
                })
            }
            return next();
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message: "Invalid token"
            })
        }
    } else {
        return res.status(404).json({
            message: "No token Provided!"
        })
    }
})

const protectCaptain = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.captain = await Captain.findById(decoded._id).select('-password');

            if (!req.captain) {
                return res.status(401).json({
                    message: "Invalid token"
                })
            }
            return next();
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message: "Invalid token"
            })
        }
    } else {
        return res.status(404).json({
            message: "No token Provided!"
        })
    }
})

export default { protectUser, protectCaptain };