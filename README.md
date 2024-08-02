employe review system......................
this project consists the following features
  1.Admin features
    a. admin can add employes
    b. admin can assign feedback work to an employe about another employe
    c. admin can register another admin
    d. admin can also check feedbacks of employes about him
    e. admin can remove an employe from the list(organaisation)
    f. admin can update details of an employe and admin have access to make an employe to admin
    g. admin can logout from the application if admin wish to do that
  2.employe features
    a. employe can check feedbacks from other employes about him
    b. employe can give feedbacks to the employes which is a work assigned by the admin
    c. employe can logout from the application if employe wish to that

the below statments will tell you which code located in which files
  1. the main file is index.js file located in main directory
  2. the code related to routing is present in router.js file which is present user routes directory which is present under src directory
  3. when admin/employe register a session will create and it will send as res to the user.the code for authontication is  present in auth.middleware.js file under middlewares directory
  4. all viewes present in view directory
  5. the code related to admin controlling operations is present in admin.controller.js file under controller directory
  6. the code related to employe controlling operation is present in employe.controller.js file under controller directory
  7. the code related to user(employe/admin) sigin/signout operations is present in login_in_out_controller.js file under controller directory
  9. this project consists only two kind of schemas one is for user(employe/admin),the code for this schema is presented in employeeSchema.js under schemas and another is for review ,the code for this schema is presented in reviewesSchema.js under schemas
  10. the code related to database connection is present mongooseConnect.js file under dbConfig
execution process
  1.inorder to execute the we have to install the dependencies by using npm install comand
  2. after that we have to execute the index.js file by using node index.js command
before starting execution this project consists enviroment file that consists the variables are dbUrl,hashValue,sessionKey
in this project in place of environment variable you have to put your values.
