import mongoose from "mongoose";

const clientSchema = mongoose.Schema({

    client_name:{
        type:String,
        required:true
    },
    company_id:{
        type:mongoose.Schema.Types.ObjectId,ref:'company'
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    }

},{
    collection:'client'
});

export default new mongoose.model('client',clientSchema)