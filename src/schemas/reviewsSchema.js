import mongoose from "mongoose";
const reviewSchema=new mongoose.Schema({
    reviewerId:{type:mongoose.Schema.Types.ObjectId,ref:'employees',requried:true},
    revieweeId:{type:mongoose.Schema.Types.ObjectId,ref:'employees',requried:true},
    text:{type:String,requried:true}
})
export const reviewModel=new mongoose.model('reviewes',reviewSchema);