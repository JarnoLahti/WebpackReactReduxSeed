import axios from 'axios';

export function fetchData(){
    return {
            type:"FETCH",
            payload: axios.get(API_URL + "users")
    }
}


