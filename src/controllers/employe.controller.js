import EmployeModel from "../models/employe.model.js";
export default class employeController{
    static async getEmployePage(req,res,next){
        const empId=req.params.empId;
        const feedbacks=await EmployeModel.getFeedbacks(empId);
            return res.status(200).render('employe',{role:2,employeId:empId,employeName:req.cookies.employeName,feedbacks:feedbacks});
    }

    static async addReview(req,res,next){
        const reviewerId=req.params.empId;
        const revieweeId=req.query.revieweeId;
        const {text}=req.body;
        const review=await EmployeModel.addReview({reviewerId,revieweeId,text});
        if(review){
            const reviewee=await EmployeModel.addIdToReviewee({reviewId:review._id,revieweeId:revieweeId});
            if(reviewee){
                const reviewer=await EmployeModel.removeId({reviewerId,revieweeId});
                if(reviewer)
                    return res.status(200).redirect(`/employe/${reviewerId}/assignedWork`);
                else
                    return res.status(400).send('some error occured form the server side'); 
            }
            else
                return res.status(400).send('some error occured form the server side');
        }
        else
            return res.status(400).send('some error occured form the server side');
    }

    static async getAssignedWorks(req,res,next){
        const empId=req.params.empId;
        const toReviewList=await EmployeModel.getAssignedWorks(empId);
        if(toReviewList){
            if(toReviewList.length>0){
                return res.status(200).render('assignedWorks',{role:2,employeId:empId,employeName:req.cookies.employeName,toReviewList:toReviewList});
            }
            else
                return res.status(404).render('assignedWorks',{role:2,employeId:empId,employeName:req.cookies.employeName});
        }
        else{
            return res.status(404).send('some error occured at server side please check your details and try again');
        }
    }
}