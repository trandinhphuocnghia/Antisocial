export const isEmail = (email:string) => {

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const checklegthpass = (password:any) => {
    if(password.length < 6) return true
    return false
}

export const isMatch = (password:any,repassword:any) => {
    if(password === repassword) return true
    return false
}

export const isEmpty = (input:string) => {
    if(input === '') return true;
    return false;
}