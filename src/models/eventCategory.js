import mongoose from 'mongoose';

const event_category_schema = mongoose.Schema({
    event_templates: [
        {
            template_id: {
                type: Number,
                required:true
            },
            template_bg:{
                type:String,
                required:true
            },
            template_fg:{
                type:String,
                required:true
            },
            template_placeholder:{
                type:String,
                required:true
            }
        }
    ],
    event_category: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        collection: 'event_category'
    })

export default new mongoose.model('event_category', event_category_schema)