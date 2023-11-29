import axios from "axios";

const axiosInstance = axios.create({
    baseURL:process.env.APP_BASE_URL_SIGNIN,
    headers : {Authorization :`Bearer ${process.env.REACT_APP_TOKEN}}`,
    'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    withCredentials: false,
    
})

 export  default axiosInstance