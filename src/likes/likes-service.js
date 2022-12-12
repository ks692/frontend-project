import axios from "axios";

const USERS_URL = 'http://localhost:4000/users'
const CREATE_MOVIE_URL='http://localhost:4000/movies'
const LIKES_URL = 'http://localhost:4000/users/:uid/likes'

export const userLikesMovie = async (uid, mid,movie) => {
    const movieCreation= await  axios.post(`${CREATE_MOVIE_URL}`,movie)
    const response = await axios.post(`${USERS_URL}/${uid}/likes/${mid}`)
    return response.data
}

export const findAllLikesByUser = async (uid) => {
    const response = await axios.get(`${USERS_URL}/${uid}/likes/`)
    console.log(response.data)
    return response.data
}