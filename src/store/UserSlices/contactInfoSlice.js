import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

const ContactInfo = createSlice({
    name:"contactInfo",
    initialState,
    reducers:{
        setContactInfo: (state, action) => {
            return action.payload
        }
    }
})

export const {setContactInfo} = ContactInfo.actions;
export default ContactInfo.reducer;