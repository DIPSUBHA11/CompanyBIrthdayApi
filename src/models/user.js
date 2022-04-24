import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value'
        }
    },
    user_name: {
        type: String,
        required: true,
    },
    user_image: {
        type: String,
        required: true,
    }
}, {
 collection: 'user' 
});
export  default  new mongoose.model('user', userSchema)