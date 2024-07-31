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


export const timeAgo = (date) => {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} weeks ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;

  const years = Math.floor(days / 365);
  return `${years} years ago`;
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
export const contactInfoData = () => API.get('/contact-data')
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
export const putApplyData = (id,payload) => API.put(`/prefer/${id}`,payload);
export const putNotifyApplyData = (id,payload) => API.put(`/viewed/${id}`,payload);
export const putJobPostData = (id,payload) => API.put(`/jobEdit/${id}`,payload);