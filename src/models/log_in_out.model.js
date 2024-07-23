import {employeModel} from '../schemas/employeeSchema.js';
export default class logInOutModel{
    static async addEmploye(content){
        try{
            const newEmploye=await new employeModel(content);
            const savedEmploye=await newEmploye.save();
            if(savedEmploye)
                return savedEmploye;   
        }
        catch(err){
            console.log('error occured at addEmployee method in log_in_out.model');
            console.log(err);
        }
    }

    static async findByMail(email){
        try{
            const result=employeModel.findOne({email:email});
            if(result)
                return result;
        }
        catch(err){
            console.log('error occured at findByMail method in log_in_out.model');
            console.log(err);
        }
    }

    static async updateEmploye(content){
        try{
            const employe=await employeModel.findById(content.empId);
            if(employe){
                employe.name=content.name;
                employe.email=content.email;
                employe.role=content.role;
                if(content.password)
                    employe.password=content.password;
                const savedEmploye=await employe.save();
                if(savedEmploye)
                    return savedEmploye;
            }
        }
        catch(err){
            console.log('error occured at updateEmploye method in log_in_out.model');
            console.log(err);
        }
    }
}