import googleOAuth from "passport-google-oauth20";
import { UserModel } from "../database/User";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) =>{
    passport.use(
        new GoogleStrategy({
            clientID : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
            callbackURL : "http://localhost:3000/auth/google/callback"
        },
        
        async (accessToken, refreshToken, profile, done)=>{
        const newUser = {
            // creating a new user
            fullname : profile.displayName,
            email : profile.emails[0],
            profilePic : profile.photos[0].value,
        };
        try {
            // check whether user exists or not
            const user = await UserModel.findOne({email : newUser.email});
        
            if(user)
            {   // generating jwt token
                const token = user.generateJwtToken();
                //create new user
                done(null, {user,token});
            }
            else{
               const user = await UserModel.create(newUser);
               // generating jwt token
               const token = user.generateJwtToken();
               // return new user
               done (null,{user,token});
            }
        } catch (error) {
            done(error,null);
        }
        }
        )
    );
    passport.serializeUser((userData, done) => done(null,{...userData}));
    passport.deserializeUser((id,done)=> done(null,id));
}