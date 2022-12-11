import axios from "axios";

const REVIEW_API = 'http://localhost:4000/api/reviews'
const MOVIE_REVIEWS_API = 'http://localhost:4000/api/movies'
const AUTHOR_REVIEWS_API = 'http://localhost:4000/api/users'

const api = axios.create({withCredentials: true});

export const createReview = async (review) => {
    const response = await api.post(REVIEW_API, review)
    return response.data
}

export const findReviewsByMovie = async (imdbID) => {
    const response = await api.get(`${MOVIE_REVIEWS_API}/${imdbID}/reviews`)
    return response.data
}

export const deleteReview = async (obj) => {
    console.log(obj)
    const response = await api.delete(`${MOVIE_REVIEWS_API}/${obj.imdbID}/${obj.reviewId}`)
    return response.data
}

export const findReviewsByAuthor = async (author) => {
    const response = await api.get(`${AUTHOR_REVIEWS_API}/${author}/reviews`)
    return response.data
}
