import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import {auth} from '../middlewares/auth.middleware.js';
import logInOutController from '../controllers/log_in_out.controller.js';
import adminController from '../controllers/admin.controller.js';
import employeController from '../controllers/employe.controller.js';
export const router=express();
// the below method parses the incoming request bodies with URL-encoded data (typically from HTML forms) and makes the payload available under req.body.
router.use(express.urlencoded({ extended: true }));
router.use(ejsLayouts);
router.set('view engine', 'ejs');
router.set('views',path.join(path.resolve(),'src', 'views'));
router.use(express.static(path.join(path.resolve(),'public')));



router.get('/',logInOutController.getLogin);
router.get('/register',logInOutController.getRegister);
router.post('/register',logInOutController.postRegister);
router.post('/login',logInOutController.postLogin);
router.get('/logout',auth,logInOutController.logout);
router.get('/admin/:admId',auth,adminController.getAdminPage);
router.get('/admin/:admId/myPerformance',auth,adminController.getMypeformence);
router.get('/admin/:admId/assignReview',auth,adminController.assignReview)
router.get('/admin/:admId/addemploye',auth,adminController.addEmploye);
router.post('/admin/:admId/addemploye',auth,adminController.postAddEmployee);
router.get('/admin/:admId/update',auth,adminController.updateEmploye);
router.post('/admin/:admId/update',auth,adminController.postUpdateEmploye);
router.get('/admin/:admId/delete',auth,adminController.deleteEmploye);
router.get('/employe/:empId',auth,employeController.getEmployePage);
router.get('/employe/:empId/assignedWork',auth,employeController.getAssignedWorks);
router.post('/employe/:empId/assignedWork',auth,employeController.addReview);