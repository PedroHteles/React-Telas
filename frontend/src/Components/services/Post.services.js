import Axios from "axios";

export async function getPosts (){
    return Axios
        .get('http://127.0.0.1:5000/teste')
        .then(res => res.data)
}