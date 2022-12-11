import {createSlice} from "@reduxjs/toolkit";
import {findMovieBySearchTerm} from "./omdb-service";
import {findMovieByImdbIdThunk, findMovieBySearchTermThunk} from "./omdb-thunks";

const initialState = {
    movies: [],
    loadDetails: true,
    details: {}
}

const omdbReducer = createSlice({
    name: 'omdb',
    initialState,
    extraReducers: {
        [findMovieBySearchTermThunk.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.movies = action.payload
        },
        [findMovieByImdbIdThunk.pending]: (state, action) => {
            state.loadDetails=true;
        },
        [findMovieByImdbIdThunk.fulfilled]: (state, action) => {
            state.loadDetails=false;
            state.details = action.payload

        }
    }
})

export default omdbReducer.reducer