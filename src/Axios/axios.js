import axios from "axios";

const axiosInstance = axios.create({
    baseURL:process.env.APP_BASE_URL_SIGNIN,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
      },
    withCredentials: false,
    
})

 export  default axiosInstance