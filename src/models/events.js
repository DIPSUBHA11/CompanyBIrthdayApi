import { ObjectId, Timestamp } from 'mongodb';
import mongoose from 'mongoose';

const event_schema= mongoose.Schema({
    event_category_id:{
        type: mongoose.Schema.Types.ObjectId,ref:'event_category',
    },
    event_user_ids:[
        {
            type:mongoose.Schema.Types.ObjectId,ref:'user'
        }
    ],
    event_description:{
        type: String
    },
    event_start_date:{
        type: Date
    },
    event_end_date:{
        type: Date
    },
    created_at:{
        type : Date, 
        default: Date.now
    },
    updated_at:{
        type: String,
        default: null
    },
    deleted_at:{
        type: String,
        default: null
    }
},{
    collection: 'event'
})

export default new mongoose.model('event',event_schema)