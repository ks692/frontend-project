import {createAsyncThunk} from "@reduxjs/toolkit";
import {findAllLikesByUser, userLikesMovie} from "./likes-service";

export const userLikesMovieThunk = createAsyncThunk(
    'userLikesMovie',
    async (like) => {
        return await userLikesMovie(like.uid, like.mid,like.movie)
    }
)

export const findAllUserLikesThunk = createAsyncThunk(
    'userLikes',
    async (uid) => {

        return await findAllLikesByUser(uid)
    }
)