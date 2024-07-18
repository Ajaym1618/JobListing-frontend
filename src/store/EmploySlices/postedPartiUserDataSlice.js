import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const GetPostedPartiUserData = createSlice({
    name:"GetPostedData",
    initialState,
    reducers:{
        setGetPartiPostedJobs:(state, action) =>{
            return action.payload
        }
    }
})

export const {setGetPartiPostedJobs} = GetPostedPartiUserData.actions;

export default GetPostedPartiUserData.reducer;