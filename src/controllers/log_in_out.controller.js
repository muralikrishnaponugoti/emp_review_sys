import bcrypt from 'bcrypt';
import logInOutModel from '../models/log_in_out.model.js';
export default class logInOutController{
    static async getRegister(req,res,next){
        res.status(200).render('register',{errorMessage:null})
    }

    static async postRegister(req,res,next){
        const {name,email,password,role}=req.body;
        //make validations later
        if(role!=1 && role!=2)
            return res.status(400).render('register',{errorMessage:'please select the role'});
        else{
            const hashPassword=await bcrypt.hash(password,12);
            const savedEmployee=await logInOutModel.addEmploye({name:name.trim(),email:email.trim(),password:hashPassword,role:role});
            if(savedEmployee)
                return res.status(200).render('login',{errorMessage:null});
            else
                return res.status(409).render('register',{errorMessage:'user with this mailid allready existed try login or try register with another email'});
        }
    }

    static async getLogin(req,res,next){
        res.status(200).render('login',{errorMessage:null})
    }

    static async postLogin(req,res,next){
        const {email,password}=req.body;
        const employeFound=await logInOutModel.findByMail(email);
        if(employeFound){
            const validEmploye=await bcrypt.compare(password,employeFound.password);
            if(validEmploye){
                req.session.employeEmail=employeFound.email;
                res.cookie('employeName',employeFound.name);
                if(employeFound.role==1)
                    return res.status(200).redirect(`/admin/${employeFound._id}`);
                else
                    return res.status(200).redirect(`/employe/${employeFound._id}`);
            }
            else
             return res.status(400).render('login',{errorMessage:'incorrect password'});
        }
        else
            return res.status(404).render('login',{errorMessage:'employee with this mail is not found'});
    }

    static async logout(req,res,next){
        req.session.destroy((err) => {
            if (err) {
              res.send('error occured while destroying the session');
            } else {
              res.redirect('/');
            }
          });
          res.clearCookie('employeName');
    }
}