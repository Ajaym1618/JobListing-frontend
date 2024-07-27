import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const QualificationSlice = createSlice({
    name:'qualify',
    initialState,
    reducers:{
        setQualifyData: (state, action) =>{
            return action.payload
        }
    }
})

export const {setQualifyData} = QualificationSlice.actions;
export default QualificationSlice.reducer;