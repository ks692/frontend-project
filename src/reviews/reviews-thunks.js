import {createAsyncThunk} from "@reduxjs/toolkit";
import {createReview, deleteReview, findReviewsByAuthor, findReviewsByMovie} from "./reviews-service";

export const createReviewThunk = createAsyncThunk(
    'createReview',
    async (review) => createReview(review)
)
export const findReviewsByMovieThunk = createAsyncThunk(
    'findReviewsByMovieThunk',
    async (imdbID) => findReviewsByMovie(imdbID)

)
export const findReviewsByAuthorThunk = createAsyncThunk(
    'findReviewsByAuthorThunk',
    async (author) => findReviewsByAuthor(author)
)

export const deleteReviewThunk = createAsyncThunk(
    'deleteThunk',
    async (obj) => deleteReview(obj)
)
