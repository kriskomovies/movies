import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";

import searchReducer from '@/slices/searchSlice';
import {moviesGridApi} from "@/slices/moviesGridApi";

const store = configureStore({
    reducer: {
        search: searchReducer,
        [moviesGridApi.reducerPath]: moviesGridApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(moviesGridApi.middleware),
});

setupListeners(store.dispatch)
export default store;