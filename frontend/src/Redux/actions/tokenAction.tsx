import  Actions  from "./index";
import axios from "axios";

export const dispatchToken = (res:any) => {
    return {
        type: Actions.GET_TOKEN,
        payload : {
            access_token : res.data.access_token
        }
    }

   
}

export const GetToken = async () => {
    const response  = await axios.post("http://localhost/4000/user/refresh_token",null);

    return response;
}

