import { useNavigate } from "react-router";
import axiosInstance from "../../Axios/axios";
import * as jwt_decode from 'jwt-decode';




const setToken = (token)=>{
    localStorage.setItem('token',token);
}
const getToken = (token)=>{
    localStorage.getItem('token');
    if(token){
        return token;
    }
    return null
}

const login=(credentials)=>{
    return axiosInstance.post(`${process.env.REACT_APP_SIGIN}`,credentials)
}

const getUserEmail = ()=>{
    const token = getToken();
    if(token){
        const payLoad = jwt_decode(token);
        return payLoad?.email; 
    }
    return null
}
const getUserRole = ()=>{
    const token = getToken();
    if(token){
        const payLoad = jwt_decode(token);
        return payLoad?.authorities; 
    }
    return null
}


const isLoggedIn = ()=>{
    const token = getToken();
    if(token){
        const payLoad = jwt_decode(token);
        const isLogin  = Date.now() < payLoad.exp * 1000;
        return isLogin
    }
    return false
}

const logOut = () => {
  localStorage.clear();
}



export default {getToken,setToken,login,getUserEmail,getUserRole,isLoggedIn,logOut}