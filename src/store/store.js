import { configureStore } from "@reduxjs/toolkit";
import userSignUpReducer from "./UserSlices/signUpSlice";
import employSignUpReducer from "./EmploySlices/signUpSlice";
import userDataReducer from "./UserSlices/dataSlice";
import employDataReducer from "./EmploySlices/dataSlice";
import getPostedDataReducer from "./UserSlices/postedJobDataSlice";
import savedReducer from "./UserSlices/savedSlice";
import contactReducer from './UserSlices/contactInfoSlice';
import qualifyReducer from './UserSlices/qualificationSlice';
import applyReducer from './UserSlices/applySlice';

const store = configureStore({
  reducer: {
    userSignUp: userSignUpReducer,
    employSignUp: employSignUpReducer,
    getData: userDataReducer,
    employData: employDataReducer,
    jobPost: getPostedDataReducer,
    bookmark: savedReducer,
    contactInfo: contactReducer,
    qualify: qualifyReducer,
    apply: applyReducer,
  },
});

export default store;
