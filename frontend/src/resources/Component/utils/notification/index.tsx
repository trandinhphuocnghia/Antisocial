import React from "react";


//create message 

//Error message
export const ShowErrMsg = (msg:string) => {
    return (
        <div className = "errMsg">
            {msg}
        </div>
    )
}

//Susscess message
export const ShowSuccessMsg = (msg:string) => {

    return (
        <div className="successMsg">
            {msg}
        </div>
    )
}

