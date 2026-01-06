import { Schema, model, models } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    age: {
        type: Number,
        required: true,
    },
    occupation: {
        type: String,
        enum: ["student", "professional"],
        required: true,
    },
},
    { timestamps: true });
export  const User = models.User || model('User', userSchema);