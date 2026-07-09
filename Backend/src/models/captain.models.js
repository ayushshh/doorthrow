import mongoose from "mongoose";
import { email, minLength, required, trim } from "zod/mini";

const captainSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "Name must be at least 3 characters long"],
            maxLength: [50, "Name must be at most 50 characters long"],
          },
          lastName: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "Name must be at least 3 characters long"],
            maxLength: [50, "Name must be at most 50 characters long"],
          }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minLength: [8, "Password must be at least 8 characters long"],
        maxLength: [50, "Password must be at most 50 characters long"],
    },
    socketId : {
        type: String,
        trim : true,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vechile: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ]
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

const Captain = mongoose.model("Captain", captainSchema);
export default Captain;