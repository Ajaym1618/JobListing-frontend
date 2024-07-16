import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employerSignName: "",
  employerSignCompanyName: "",
  designation: "",
  noOfEmployees: "",
  employerSignEmail: "",
  employerSignPassword: "",
  employerSignConfirmPassword: "",
  employerSignMobileNo: "",
};

const EmploySignUpSlice = createSlice({
    name:"employSignUp",
    initialState,
    reducers:{
        setEmploySignUpData: (state, action)=>{
            return{...state, ...action.payload}
        },
        clearSetEmploySignUpData: ()=> initialState,
    }
});

export const {setEmploySignUpData, clearSetEmploySignUpData} = EmploySignUpSlice.actions;
export default EmploySignUpSlice.reducer;