import axios from "axios";

let API;

export const InitializeApi = () => {
  const token = localStorage.getItem("token");
  const defaultOptions = {
    baseURL: "https://joblisting-backend-qfli.onrender.com",
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log("token", token);

  if(token !== null){
    defaultOptions.headers.Authorization = `Bearer ${token}`;

  }

  API = axios.create(defaultOptions);
};



// for user
export const userSignUpAPICall = (payload) => axios.post('https://joblisting-backend-qfli.onrender.com/signup',payload);
export const userLoginAPICall = (payload) => axios.post('https://joblisting-backend-qfli.onrender.com/login',payload);
export const getUserData = () => API.get('/userdata');


// for employer

export const employerSignUpAPICall = (payload) => axios.post('https://joblisting-backend-qfli.onrender.com/employersignup', payload);
export const employerLoginAPICall = (payload) => axios.post('https://joblisting-backend-qfli.onrender.com/employerlogin', payload);
export const getEmployData = () => API.get('/employdata');