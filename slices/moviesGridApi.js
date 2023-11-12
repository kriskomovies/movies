import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const moviesGridApi = createApi({
    reducerPath: 'moviesGridApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api/'}),
    endpoints: (builder) => ({
        getMoviesByType: builder.query({
            query: (args) => {
                const {type, page} = args;
                return `movies/types/?type=${type}&page=${page}`
            },

        }),
        getMoviesByGenre: builder.query({
            query: (args) => {
                const {genreId, page} = args;
                return `movies/genres/?genreId=${genreId}&page=${page}`
            },

        }),
        getMoviesBySearch: builder.query({
            query: (searchString) => {
                console.log("searchString", searchString)
                return `movies?searchString=${searchString}`
            },

        }),
    }),
})

export const {useGetMoviesByTypeQuery, useGetMoviesByGenreQuery, useGetMoviesBySearchQuery} = moviesGridApi