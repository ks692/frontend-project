import {createSlice} from "@reduxjs/toolkit";
import {findAllUserLikesThunk, userLikesMovieThunk} from "./likes-thunks";
import {findAllLikesByUser} from "./likes-service";

const initialState = {
    likes: [],
    loadLikes: true
}

export const likesReducer = createSlice({
    name: 'likes',
    initialState,
    extraReducers: {
        [userLikesMovieThunk.fulfilled]: (state, action) => {
            state.likes.push(action.payload)
        },
        [findAllUserLikesThunk.fulfilled]: (state, action) => {
            state.likes=action.payload
            console.log(state.likes)
            state.loadLikes=false;
        },
        [findAllUserLikesThunk.pending]: (state, action) => {
            state.loadLikes=true;
        }

    }
})

export default likesReducer.reducer