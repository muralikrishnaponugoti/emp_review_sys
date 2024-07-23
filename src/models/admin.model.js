import {employeModel} from '../schemas/employeeSchema.js';
import { reviewModel } from '../schemas/reviewsSchema.js';
import { ObjectId } from 'mongodb';
export default class adminModel{
    static async getAdminDetails(admId){
        try{
            let result=await employeModel.findById(admId);
            if(result){
                result=result.save();
                return result;
            }
        } 
        catch(err){
            console.log('error occured at getAdminDetails method in adimin.model.js');
            console.log(err);
        }
    }

    static async getEmployes(admId){
        try{
            const result=await employeModel.find({_id:{$ne:admId}});
            if(result)
                return result;
        } 
        catch(err){
            console.log('error occured at getEmployes method in adimin.model.js');
            console.log(err);
        }
    }

    static async getFeedBacks(admId){
        try{
            let feedBacks=[];
            const result=await employeModel.findById(admId).select('-password').populate({
                path:'performance',
                populate:{
                    path:'reviewerId'
                }
            });
            console.log(result);
            return feedBacks
        } 
        catch(err){
            console.log('error occured at getFeedBacks method in adimin.model.js');
            console.log(err);
        }
    }

    static async assignReview(content){
        try{
            let existed;
            const reviewer=await employeModel.findById(content.reviewerId);
            if(reviewer){
                reviewer.toReview.forEach((id)=>{
                    if(id==content.revieweeId)
                        existed=1;
                })
                if(existed)
                    return 2;
                reviewer.toReview.push(content.revieweeId)
                const savedReviewer=await reviewer.save();
                if(savedReviewer)
                    return 1;
            }
        }
        catch(err){
            console.log('error occured at assignReview method in adimin.model.js');
            console.log(err);
        }
    }

    static async getFeedBacks(admId){
        let feedbacks=[];
        const result=await employeModel.findById(admId).populate({
            path:'performance',
            populate:{
                path:'reviewerId'
            }
        })
        if(result){
            if(result.performance.length>0){
                result.performance.forEach((review)=>{
                    feedbacks.push({name:review.reviewerId.name,email:review.reviewerId.email,role:'Employe',text:review.text});
                })
            }
        }
        return feedbacks;
    }
}