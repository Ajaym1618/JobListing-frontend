import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const Saved = createSlice({
    name: "bookmark",
    initialState,
    reducers: {
        setBookData: (state, action) => {
            return action.payload;
        },
        addSaved: (state, action) => {
            state.push(action.payload);
        },
        removeSaved: (state, action) => {
            const idToRemove = action.payload;
            return state.filter(item => item.bookmarkId !== idToRemove);
        },
    }
});

export const { setBookData, addSaved, removeSaved } = Saved.actions;

export default Saved.reducer;
