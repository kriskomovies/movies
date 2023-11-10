import { createSlice } from '@reduxjs/toolkit';
import {EMPTY_STRING} from "@/lib/helpers";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchString: EMPTY_STRING
    },
    reducers: {
        setSearchString: (state, action) => {
            state.searchString = action.payload;
        }
    },
});

export const { setSearchString } = searchSlice.actions;

export const selectSearchString = (state) => state.search.searchString;

export default searchSlice.reducer;