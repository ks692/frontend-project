import {createSlice} from "@reduxjs/toolkit";
import {
    createMoviesThunk,
    deleteMovieThunk,
    findAllMoviesThunk,
    findLikedMoviesThunk,
    findTopMoviesThunk
} from "./movies-thunks";

const initialState = {
    movies: [],
    myMovies:[],
    loading: true
}

const moviesReducer = createSlice({
    name: 'movies',
    initialState: initialState,
    extraReducers: {
        [findAllMoviesThunk.fulfilled]: (state, action) => {
            state.movies = action.payload
        },
        [findTopMoviesThunk.fulfilled]: (state, action) => {
            state.loading=false
            state.movies = action.payload
        },
        [findTopMoviesThunk.pending]: (state, action) => {
            state.loading=true
        },
        [createMoviesThunk.fulfilled]: (state, action) => {
            state.movies.push(action.payload)
        },
        [deleteMovieThunk.fulfilled]: (state, action) => {
            state.movies = state.movies.filter(m => {
                return m._id !== action.payload
            })
        },
        [findLikedMoviesThunk.fulfilled]: (state, action) => {
            state.loading=false
            state.myMovies = action.payload
        },
        [findLikedMoviesThunk.pending]: (state, action) => {
            state.loading=true
        },
    }
})

export default moviesReducer.reducer;