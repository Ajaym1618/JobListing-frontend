import axios from "axios";

let API;

export const InitializeApi = () => {
  const token = localStorage.getItem("token");
  const defaultOptions = {
    baseURL: "http://localhost:5000",
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
export const userSignUpAPICall = (payload) => axios.post('http://localhost:5000/signup',payload);
export const userLoginAPICall = (payload) => axios.post('http://localhost:5000/login',payload);
export const getUserData = () => API.get('/userdata');


// for employer

export const employerSignUpAPICall = (payload) => axios.post('http://localhost:5000/employersignup', payload);
export const employerLoginAPICall = (payload) => axios.post('http://localhost:5000/employerlogin', payload);
export const getEmployData = () => API.get('/employdata');