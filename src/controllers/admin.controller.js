import adminModel from "../models/admin.model.js";
import bcrypt from 'bcrypt';
import logInOutModel from "../models/log_in_out.model.js";
import EmployeModel from "../models/employe.model.js";
export default class adminController{
    static async getAdminPage(req,res,next){
        const admId=req.params.admId;
        const employefound=await adminModel.getAdminDetails(admId);
        if(employefound){
            const employes=await adminModel.getEmployes(employefound._id);
            if(employes.length>0){
                return res.status(200).render('admin',{role:1,employeId:employefound._id,employeName:employefound.name,employes:employes});
            }
            else
                return res.status(200).render('admin',{role:1,employeId:employefound._id,employeName:employefound.name});
        }
        else
            return res.status(400).send('some thing went wrong');

    }
    
    static async addEmploye(req,res,next){
        const admId=req.params.admId;
        return res.status(200).render('addEmploye',{errorMessage:null,employeId:admId,role:1,employeName:req.cookies.employeName});
    }

    static async postAddEmployee(req,res,next){
        const {name,email,password,role}=req.body;
        const admId=req.params.admId;
        //make validations later
        if(role!=1 && role!=2)
            return res.render('addEmploye',{errorMessage:'please select the role',employeId:admId,role:1,employeName:req.cookies.employeName});
        else{
            const hashPassword= await bcrypt.hash(password,12);
            const savedEmployee=await logInOutModel.addEmploye({name:name.trim(),email:email.trim(),password:hashPassword,role:role});
            if(savedEmployee)
                return res.status(200).redirect(`/admin/${admId}`);
            else
                return res.render('addEmploye',{
                errorMessage:'user with this mailid allready existed try with another email',
                employeId:admId,
                role:1,
                employeName:req.cookies.employeName});
        }
    }

    static async getMypeformence(req,res,next){
        const admId=req.params.admId;
        const feedBacks=await adminModel.getFeedBacks(admId);
        if(feedBacks){
            if(feedBacks.length>0)
                return res.status(200).render('myPerformance',{role:1,employeId:admId,employeName:req.cookies.employeName,feedbacks:feedBacks});
            else
                return res.status(200).render('myPerformance',{role:1,employeId:admId,employeName:req.cookies.employeName,});
        }
        else{
            return res.status(409).send(`
                <!DOCTYPE html>
                <html>
                    <body>
                        <h2>some error occurd at server side</h2>
                        </h3><a href="/admin/${admId}"> redirect to admin page</a></h3>
                    </body>
                </html>
            `);
        }
    }

    static async updateEmploye(req,res,next){
        const admId=req.params.admId;
        const empId=req.query.empId;
        const empDetails=await EmployeModel.getEmpDetails(empId);
        if(empDetails)
            return res.status(200).render('updateForm',{errorMessage:null,employeId:admId,role:1,employeName:req.cookies.employeName,employe:empDetails});
        else
            return res.status(400).send('some error occur at server side');
    }
    
    static async postUpdateEmploye(req,res,next){
        const admId=req.params.admId;
        const empId=req.query.empId
        const {name,email,password,role}=req.body;
        const empDetails={name,email,password,role,empId};
        //make validations later
            let hashPassword
            if(password){
                hashPassword=await bcrypt.hash(password,12);
            }
            const savedEmployee=await logInOutModel.updateEmploye({name:name.trim(),email:email.trim(),password:hashPassword,role:role,empId:empId});
            if(savedEmployee)
                return res.redirect(`/admin/${admId}`);
            else
                return res.render('updateForm',{
            errorMessage:'user with this mailid allready existed try login or try register with another email',
            employeId:admId,
            role:1,
            employeName:req.cookies.employeName,
            employe:empDetails
            });
    }

    static async assignReview(req,res,next){
        const revieweeId=req.query.revieweeId;
        const reviewerId=req.query.reviewerId;
        const admId=req.params.admId;
        const result=await adminModel.assignReview({revieweeId,reviewerId});
        if(result){
            if(result==2){
                return res.status(409).send(`
                    <!DOCTYPE html>
                    <html>
                        <body>
                            <h2>review assignment is allready added</h2>
                            </h3><a href="/admin/${admId}"> redirect to admin page</a></h3>
                        </body>
                    </html>
                `);
            }
            else{
                return res.status(409).send(`
                    <!DOCTYPE html>
                    <html>
                        <body>
                            <h2>review assignment is added sucessflly</h2>
                            </h3><a href="/admin/${admId}"> redirect to admin page</a></h3>
                        </body>
                    </html>
                `);
            }
        }
        else
            return res.status(400).send('something went wrong check your details and try and again');
    }

    static async deleteEmploye(req,res,next){
        const empId=req.query.empId;
        const admId=req.params.admId;
        const result=await EmployeModel.deleteEmploye(empId); 
        if(result){
            return res.status(200).redirect(`/admin/${admId}`) 
        }
        else
            return res.status(400).send('something went wrong in the server');
    }

}