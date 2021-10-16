import express from "express";
import bcrypt from "bcryptjs";     // for hashing and salting password
import jwt from "jsonwebtoken";    // for authentication of users

const Router = express.Router();
import {UserModel} from "../../database/User";

/* 
Route         /signup
Descrip       Signup with email and password
Params        None
Access        Public 
Method        POST 
*/

Router.post("/signup", async(req,res) => {
  try {
    //const { email, phoneNumber} = req.body.credentials;

    await UserModel.findEmailAndPhone(req.body.credentials);
    
   /* // hashing and salting
   const bcryptSalt = await bcrypt.genSalt(8);

   const hashedPassword = await bcrypt.hash(password, bcryptSalt);  */

   // database
  const newUser= await UserModel.create(
     //...req.body.credentials,
     //password: hashedPassword
     req.body.credentials
   );
   
  /*  // JWT Auth token
   const token = jwt.sign({user: {fullname, email}}, "ZomatoApp"); */

   const token = newUser.generateJwtToken();
   return res.status(200).json({token});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }  
});

/* 
Route         /signup
Descrip       Signin with email and password
Params        None
Access        Public 
Method        POST 
*/

Router.post("/signin", async(req,res) => {
  try {
    const user = await UserModel.findByEmailAndPassword(
      req.body.credentials
    )
   const token = user.generateJwtToken();
   return res.status(200).json({token, status: "success"});

  } catch (error) {
    return res.status(500).json({error: error.message});
  }  
});

/* 
Route         /google
Descrip       google signin
Params        None
Access        Public 
Method        get
*/
Router.get("/google",passport.authenticate("google", {
scope: [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
],
})
);

/* 
Route         /google/callback
Descrip       google signin callback
Params        None
Access        Public 
Method        get
*/
Router.get("/google/callback",passport.authenticate("google",{failureRedirect: "/"}),
(req,res) =>{
  return res.json({token: req.session.passport.user,token});
}
  );

export default Router;
