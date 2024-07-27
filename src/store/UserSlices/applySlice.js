import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ApplySlice = createSlice({
    name:'apply',
    initialState,
    reducers:{
        setApplyData: (state, action) =>{
            return action.payload
        }
    }
})

export const {setApplyData} = ApplySlice.actions;
export default ApplySlice.reducer;