import mongoose from "mongoose";
const employeeSchema=new mongoose.Schema({
    name:{type:String,requried:true},
    email:{type:String,unique:true,requried:true},
    password:{type:String,requried:true},
    role:{type:Number,requried:true,enum:[1,2]},
    performance:[{type:mongoose.Schema.Types.ObjectId,ref:'reviewes'}],
    toReview:[{type:mongoose.Schema.Types.ObjectId,ref:'employees'}]
});
export const employeModel=new mongoose.model('employees',employeeSchema);