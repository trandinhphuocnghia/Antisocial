import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
export const auth = (req:Request,res:Response,next: NextFunction) => {
    try{

        const token = req.header("Authorization")

        if(!token) return res.status(400).json({msg:"Invalid Authentication"})

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg: "Invalid Authentication."})

            req.user = user
            next()
        })
    }
    catch(err){
        return res.status(500).json({msg:err.message})

    }
}