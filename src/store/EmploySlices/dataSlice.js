import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const EmployDataSlice = createSlice({
    name:"EmployData",
    initialState,
    reducers:{
        setEmployData: (state, action) => {
            return {...state, ...action.payload}
        }
    }
})

export const {setEmployData} = EmployDataSlice.actions;
export default EmployDataSlice.reducer;