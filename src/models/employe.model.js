import {employeModel} from '../schemas/employeeSchema.js';
import { reviewModel } from '../schemas/reviewsSchema.js';
import { ObjectId } from 'mongodb';
export default class EmployeModel{
    static async getFeedbacks(empId){
        let feedbacks=[];
        const result=await employeModel.findById(empId).populate({
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


    static async getAssignedWorks(empId){
        try{
            let toReviewList=[];
            const result=await employeModel.findById(empId).populate('toReview');
            if(result){
                if(result.toReview.length>0){
                    result.toReview.forEach((emp)=>{
                        toReviewList.push({id:emp._id,name:emp.name,email:emp.email,role:emp.role==1?'Admin':'Employe'})
                    })
                }
            }
            return toReviewList;
        }
        catch(err){
            console.log('error occured at getAssignedWorks method in employe.model.js');
            console.log(err);
        }
    }
    //creating new review with reviewrId,revieweeId,text
    static async addReview(content){
        try{
            const review=await new reviewModel(content);
            const savedReview=await review.save();
            if(savedReview){
                return savedReview;
            }
            else
                return 0;
        }
        catch(err){
            console.log('error occured at addReview method in employe.model.js');
            console.log(err);
        }
    }

    //adding review id to the perfomance of the riveweeId
    static async addIdToReviewee(content){
        try{
            const reviewee=await employeModel.findById(content.revieweeId);
            if(reviewee){
                reviewee.performance.push(content.reviewId);
                const savedReview=await reviewee.save();
                if(savedReview)
                    return savedReview; 
                else
                    return 0;
            }
            else
                return 0;
        }
        catch(err){
            console.log('error occured at addReviewIdToReviewee method in employe.model.js');
            console.log(err);
        } 
    }

    //removing the revieweeId from the toReview array of the reviewer
    static async removeId(content){
        try{
            const reviewer=await employeModel.findById(content.reviewerId);
            if(reviewer){
                //removing the revieweeId from the toReview array of the reviewer
                await reviewer.toReview.pull(content.revieweeId);
                const savedReviewer=await reviewer.save();
                if(savedReviewer)
                    return reviewer;
                else
                    return 0;

            }
            else
                return 0;
        }
        catch(err){
            console.log('error occured at removeId method in employe.model.js');
            console.log(err);
        }
    }

    static async deleteEmploye(empId){
        try{
            const result=await employeModel.deleteOne({_id:empId});
            if(result.deletedCount==1)
                return result;
        }
        catch(err){
            console.log('error occured at deleteEmploye method in employe.model.js');
            console.log(err);
        }
    }

    static async getEmpDetails(empId){
        try{
            const result=await employeModel.findById(empId).select('-password');
            if(result)
                return result;
        }
        catch(err){
            console.log('error occured at getEmpDetails method in employe.model.js');
            console.log(err);
        }
    }
}