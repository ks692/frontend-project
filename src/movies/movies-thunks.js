import {createAsyncThunk} from "@reduxjs/toolkit";
import {findAllMovies, createMovie, deleteMovie, findTopMovies, findLikedMovies} from "./movies-service";
import {findAllLikesByUser} from "../likes/likes-service";

export const createMoviesThunk = createAsyncThunk(
    'createMovie',
    (newMovie) => createMovie(newMovie)
)

export const findAllMoviesThunk = createAsyncThunk(
    'findAllMovies',
    () => findAllMovies()
)

export const  findTopMoviesThunk = createAsyncThunk(
    'findTopMovies',
    () => findTopMovies()
)

export const updateMovieThunk = {}
export const deleteMovieThunk = createAsyncThunk(
    'deleteMovie',
    (mid) => deleteMovie(mid)
)

export const findLikedMoviesThunk = createAsyncThunk(
    'findLikedMovies',
    (uid) => findAllLikesByUser(uid)
)