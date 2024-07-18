import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const GetPostedData = createSlice({
    name:"GetPostedData",
    initialState,
    reducers:{
        setGetPostedJobs:(state, action) =>{
            return action.payload
        }
    }
})

export const {setGetPostedJobs} = GetPostedData.actions;

export default GetPostedData.reducer;