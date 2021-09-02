import User from '../Model/User'
import express, {Request,Response,NextFunction} from 'express'
import brcypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import  {sendEmail} from '../Controller/sendMail'

const {CLIENT_URL} = process.env
export const UserCtr = {

    
    //register 
    register: async(req: Request,res: Response) => {
        
        try{
            const {name,email,password} = req.body;
            

            if(!name || !email || !password) return res.status(400).json({msg:"Fill in all infomation fields"})
            
            //check validate email
            if(!validateEmail(email)) return res.status(400).json({msg : "Invalid email" }) 

            const user = await User.findOne({email})
            if(!user) {
                if( password.length < 6) return res.status(400).json({msg: "Password must be at least 6 characters."})

                const hashpassword = await brcypt.hash(password,12)

                const newUser = {name,email,password:hashpassword}
                
                //create activation token send to client ( and send the email to new user)
                const activation_token = createActivationToken(newUser)

                //set token in email , then get verify this
                const url = `${CLIENT_URL}/user/activate/${activation_token}`
                
                sendEmail (email,url,"Verify your email address")

                res.json({msg: "Register Success! Please activate your email to start."})

            }

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },

    //activateEmail , after post register the client will send the token to activate and then save the new User.
    activateEmail : async(req: Request,res: Response) => {
        try{
            const {activate_token} = req.body;
            const user:any = jwt.verify(activate_token,process.env.ACTIVATION_TOKEN_SECRET || "")

            const {name,email,password} = user

            const check = await User.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists"})

            const newUser = new User({
                name,email,password
            })

            await newUser.save()
            res.json({msg:"Accout has been activated"})

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },



    //login with email & password
  login : async(req:any,res:any)=>{

        try{
            const {email,password} = req.body;
            const user = await User.findOne({email});

            if(!user) return res.status(400).json({msg:"This email doesn't exist."})
            
            if(user){
            const isMatch = await brcypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

           const refresh_token = createRefreshToken({id:user._id}) 
            res.cookie('refreshtoken',refresh_token,{
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*100 //7 days

            }) 
            res.json({msg : "Login success"})
            }  
        }
        catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
  
  AccessToken : (req:any,res:any) => {
    try {

        const token = req.cookies.refreshtoken
        if(!token) return res.status(400).json({msg:"Please Login!!!"})
    
        jwt.verify(token,process.env.REFRESH_TOKEN_SECRET || '', (err:any,user:any) => {
    
            if(err) return res.status(400).json({msg:"Please Login!!!"})
    
            const access_token = createAccessToken({id: user.id})
    
            res.json({access_token})
        })
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
    } },

    logout : async (req:any,res:any) => {

        try{

            res.clearCookie('refreshtoken',{path:'/user/refresh_token'})

            return res.json({msg:'Logged out!!'})
        }catch(err){

            return res.status(500).json({msg:err.message})
        }
    }


}

const createRefreshToken = (payload:any) =>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET || "",{expiresIn:'7d'})
}

const createAccessToken = (payload:any) =>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET || "",{expiresIn:'15m'})
}

const createActivationToken = (payload:any) =>{
    return jwt.sign(payload,process.env.ACTIVATION_TOKEN_SECRET || "",{expiresIn:'5m'})
}
const validateEmail = (email:any) =>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
