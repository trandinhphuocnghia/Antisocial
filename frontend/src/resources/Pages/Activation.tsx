import { useState,useEffect } from "react";
import axios from 'axios';
import { ShowErrMsg,ShowSuccessMsg } from "../Component/utils/notification";
import { useParams } from "react-router";

export const Activation = () => {

    const {activation_token}:any = useParams();

    const [err,setErr] = useState('');
    const [success,setSuccess] = useState('');

    useEffect( () => {

        if(activation_token) {

            const activationemail = async () =>{

                try {

                    const response = await axios.post('http://localhost:4000/user/activation',{activation_token})

                    setSuccess(response.data.msg)
                }catch(err){
                    err.response.data.msg && setErr(err.reponse.data.msg)
                }
            }
            activationemail()
        }
        
    },[activation_token])
    
    return (
        <div className="loginpage">
            <div className="form">
               
               {err && ShowErrMsg(err)}
               {success && ShowSuccessMsg(success)}

            </div>
        </div>
    )
}