import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        required: [true,'Email is required!'],
        unique: [true,'Email already exists!']
    },
    username:{
        type: String,
        required: [true,'Username is required!'],
        unique: [true,'Username already exists!'],
        match: [
            /^[a-zA-Z][a-zA-Z0-9@_]{4,19}$/,
            'Username must be 5-20 characters long, start with an alphabet, and can only contain letters, numbers, "@" and "_".'
        ]
    },
    image: {
        type: String,
        default: '/default.jpg'
    }

})

const User = models.User || model('User',userSchema);

export default User; 