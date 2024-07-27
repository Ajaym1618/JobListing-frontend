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
export const bookmark = (payload) => API.post('/bookmark',payload);
export const getBookMark = () => API.get('/getbookmark');
export const deletedBookMark = (id) => API.delete(`/bookmark/${id}`);
export const contactInfo = (payload) => API.put('/contact-info', payload, {
  headers:{"Content-Type": "multipart/form-data"}
});
export const contactInfoData = () => API.get('/contact-data');
export const applyJob = (payload) => API.post('/applied',payload);
export const qualifyInfo = (payload) => API.put('/qualification', payload);
export const qualifyGetData = (id) => API.get('/getQualify')

// for employer

export const employerSignUpAPICall = (payload) => axios.post('https://joblisting-backend-qfli.onrender.com/employersignup', payload);
export const employerLoginAPICall = (payload) => axios.post('https://joblisting-backend-qfli.onrender.com/employerlogin', payload);
export const getEmployData = () => API.get('/employdata');
export const jobPost = (payload) => API.post('/jobpost', payload);
export const getJobData = () => API.get("/postedjob");
export const getDataJob = () => API.get('/posted');
export const getApplyData = () =>API.get('/applied-data');