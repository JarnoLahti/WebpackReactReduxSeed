const defaultState = {
    user: {
        email:""
    },
    fetching:false,
    error:""
}

export default function(state:any = defaultState, action:{type:string, payload:any}) {
    switch(action.type){
        case "FETCH_PENDING":
            return {...state, fetching: true}
        case "FETCH_FULFILLED":
            return {...state, user: action.payload.data, fetching: false}
        case "FETCH_REJECTED":
            return {...state, error: action.payload, fetching: false}
        default:
            return state;
    }
}