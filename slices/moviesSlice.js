import {createSlice} from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: []
    },
    reducers: {
        addMovies: (state, action) => {
            state.movies = [...state.movies, ...action.payload]
        },
        clearMovies: (state, action) => {
            state.searchString = [];
        },
    },
});

export const { addMovies } = moviesSlice.actions;

export const selectMovies = (state) => state.movies.movies;

export default moviesSlice.reducer;