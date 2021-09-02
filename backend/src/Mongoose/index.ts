import mongoose from "mongoose"

export const connectdb = async () =>{
    try {

        await mongoose.connect("mongodb://127.0.0.1:27017/Antisocial"),{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        console.log('connect to db susscessfully')
    
    } catch (error){
        console.log('connect failed!!')
    }

}