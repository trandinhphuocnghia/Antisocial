import passport from "passport"
import express from "express"
import {connectdb} from "../src/Mongoose/index"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.json());
app.use(cors());


//build start app.
const port = process.env.PORT||4000;
app.listen(port , () => {
    console.log(`Started the web at: http://localhost:${port}`)
})

//connect to Mongooes db.
connectdb() 

//set up Route
app.use('/user',require('./Routes/UsersRoutes'))
