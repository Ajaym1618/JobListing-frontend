import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

const UserDataSlice = createSlice({
    name:"UserData",
    initialState,
    reducers:{
        setUserData: (state, action) => {
            return {...state, ...action.payload}
        }
    }
})

export const {setUserData} = UserDataSlice.actions;
export default UserDataSlice.reducer;