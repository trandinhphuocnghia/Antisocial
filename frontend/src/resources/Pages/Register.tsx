import axios from "axios";
import { useState } from "react";
import camera from "../../public/camera.svg"
import { isEmail, isEmpty, isMatch } from "../Component/utils/Check/check";
import { ShowErrMsg, ShowSuccessMsg } from "../Component/utils/notification";
//set initialState
const initialState = {
    name : '',
    email:'',
    password: '',
    repassword: '',
    err: '',
    success : '',
}

const Registerpage = () => {

    //hook
    const [registeruser,setRegisterUser] = useState(initialState)

    const {name,email,password,repassword,err,success} = registeruser;

    const handleChangeInput = (e:any) => {
        const {name,value} = e.target;
        
        setRegisterUser({...registeruser,[name]:value,err:'',success:''})
    }

    //submit (post) to server.
    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if(isEmpty(name) || isEmpty(password)) return setRegisterUser({...registeruser,err: "Please fill in all fields",success : ""})

        if(!isEmail(email)) return setRegisterUser({...registeruser,err:'Invalid emails',success:''})
        
        if(!isMatch(password,repassword)) return setRegisterUser({...registeruser,err: "Password did not match.", success: ''}) 

        try{
            const res = await axios.post('http://localhost:4000/user/register',{
                name,email,password
            })
        
            setRegisterUser({...registeruser,err:'',success:res.data.msg})

        }catch(err:any){
            err.response.data.msg && setRegisterUser({...registeruser,err:err.response.data.msg,success:''})
        }

    }

    return (

        <div className="loginpage">
            <div className="form2">
                
               

                <h2 style={{color:'rgb(252, 245, 245)', marginTop: 10, }}>Let's to be one of us</h2>

                <div className="avatar">
                    <img src={camera} className="camera"/>
                </div>
                
                <form className ="form-group" onSubmit={handleSubmit}>
                {err && ShowErrMsg(err)}
                {success && ShowSuccessMsg(success)}
                <input type = "text" placeholder = " Your user's name" className = "inputfiled" id="name" name="name" value={name} onChange={handleChangeInput} ></input>    
                <input type = "email" placeholder = "Type your Email" className = "inputfiled" id="email" name="email" value={email} onChange={handleChangeInput}></input>
                <input type = "password" placeholder = "Password" className = "inputfiled" id="password" name="password" value={password} onChange={handleChangeInput}></input>
                <input type = "password" placeholder = "Again Password" className = "inputfiled" id="repassword" name="repassword" value={repassword} onChange={handleChangeInput}></input>

                <button type ="submit" className ="btn">REGISTER</button>
                </form>

                

            </div>
        </div>
    )

}

export default Registerpage;