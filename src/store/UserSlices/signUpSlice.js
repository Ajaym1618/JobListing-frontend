import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSignFullName: "",
    userSignEmail: "",
    userSignPassword: "",
    userSignConfirmPassword: "",
    userSignMobileNo: "",
}

const UserSignUpSlice = createSlice({
    name: "userSignUp",
    initialState,
    reducers:{
        setUserSignUpData: (state, action) =>{
            return {...state, ...action.payload}
        },
        clearSetUserSignUpData: ()=> initialState
    }
})

export const {setUserSignUpData, clearSetUserSignUpData} = UserSignUpSlice.actions;
export default UserSignUpSlice.reducer;