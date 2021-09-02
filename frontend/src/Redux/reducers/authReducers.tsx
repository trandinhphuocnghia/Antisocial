import Actions from "../actions/index";

const initialState = {
    user: [],
    isLogged : false,
    isAdmin : false
}

//func
const authReducer = (state = initialState ,action:any) => {
    switch(action.type){

        case Actions.LOGIN:
            return {
                ...state,
                isLogged : true
            }
        default:
            return state
    }
}

export  default authReducer;

