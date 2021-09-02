import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { dispatchLogin } from "../../Redux/actions/authAction";
import { Iconlogin } from "../Component/Logo/Icon.style";
import { ShowErrMsg, ShowSuccessMsg } from "../Component/utils/notification";
import facebook from "C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\public\\facebook.svg"
import google from "C:\\Users\\Mysterious\\Antisocial\\frontend\\src\\public\\google.svg"

//set initialState 
const inintialState = {

    email: '',
    password: '',
    err: '',
    success: ''
}

const Loginpage = () => {

    //state, hook
    const [user,setUser] = useState(inintialState);
    const dispatch = useDispatch(); //add actions.
    const history = useHistory(); // hook of react-router 

    const {email,password,err,success} = user;


    const handleChangeInput = (e:any) => {
        //name & value is setted on form input
        const {name,value} = e.target;
       //get all value of name (if its have the same).
        setUser({...user,[name]:value,err:'',success:''})
    }

    const handleSubmit = async(e:any) => {
       e.preventDefault();
       try {

        const response  = await axios.post("http://localhost:4000/user/login",{email,password})

        setUser({...user,err:'',success:response.data.msg})

        localStorage.setItem('firstLogin','firstLogin');

        dispatch(dispatchLogin())
        history.push('/')

        
       }catch(err){
        err.response.data.msg && 
        setUser({...user, err: err.response.data.msg, success: ''})
       }
    }




    return (
        <div className = "loginpage">
            <div className = "form">
           
            <div className="loginform">
            <div className="description">
                <div className="avt"></div>
                <div className="nameofform">
                    <h3>Login form</h3>
                </div>
            </div>
           
            <form className="form-group" onSubmit={handleSubmit}>
                
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                
               
                <input type = "email" placeholder = "Type your Email" className = "inputfiled" id="email" name="email" value={email} onChange={handleChangeInput}></input>
                <input type = "password" placeholder = "Password" className = "inputfiled" id="password" name="password" value={password} onChange={handleChangeInput}></input>
                <button type ="submit" className ="btn">LOGIN</button>
                <p >Login with:</p>
                <div className="loginanother">
                <Iconlogin src= {facebook}/>
                <Iconlogin src ={google}/>
                </div>

                <Link to='/register' className="registerlink"><h3>Join with us</h3></Link>
            </form>
            </div>
           

            <div className="banner">
            <img className = "imgbanner" src ="https://cdn.dribbble.com/users/1644453/screenshots/11441710/media/dd8401d34c519c89c8691ec731ad4e27.png"></img>
            </div>
            </div>

            
        </div>
    )
}

export default Loginpage;
