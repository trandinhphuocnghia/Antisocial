import Actions from "../actions";

const token = '';

const tokenReducer = (state = token,action : any) => {

    switch (action.type){
        case Actions.GET_TOKEN:
            return action.payload.access_token;
        default:
            return state;
    }
}

export default tokenReducer;