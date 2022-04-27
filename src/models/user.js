import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    user_image: {
        type: String,
        required: true,
    },
    birth_date:{
        type:Date,
        require:true
    },
    is_user_active:{
        type:Boolean,
        require:true,
        default:true
    },
    user_doj:{
        type:Date,
        require:true
    },
    client_id:{
        type:Number,
        default:null
    }
}, {
 collection: 'user' 
});
export  default  new mongoose.model('user', userSchema)