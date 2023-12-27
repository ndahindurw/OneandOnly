import axios from "axios";

const axiosInstance = axios.create({
    baseURL:process.env.APP_BASE_URL_SIGNIN,
    timeout: 5000, 
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
      },
    withCredentials: false,
    
})

 export  default axiosInstance