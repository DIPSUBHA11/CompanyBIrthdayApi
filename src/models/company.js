import mongoose from "mongoose";

const companySchema=mongoose.Schema({
    company_name :{
        type:String,
        required:true,
    },
    company_logo:{
        type:String,
        required:true,
    }
},{
    collection:'company'
});
export default new mongoose.model('company',companySchema)