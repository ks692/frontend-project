import axios from "axios";
const MOVIE_API_URL = 'http://localhost:4000/movies'
const SEARCH_URL = 'https://graphql.anilist.co/'

const query = `
{
  Anime2022: Page(page: 1, perPage: 100) {
    pageInfo {
      total
      perPage
    }
    media(seasonYear: 2022, type: ANIME, sort: FAVOURITES) {
      id
      coverImage {
        large
        medium
        color
      }
      title {
        romaji
        english
        native
      }
      episodes
      season
      status
      type
      genres
    }
  }
  Anime2021: Page(page: 1, perPage: 100) {
    pageInfo {
      total
      perPage
    }
    media(seasonYear: 2021, type: ANIME, sort: FAVOURITES) {
      id
      coverImage {
        large
        medium
        color
      }
      title {
        romaji
        english
        native
      }
      episodes
      season
      status
      type
      genres
    }
  }
}
`;

export const createMovie = async (newMovie) => {
    const response = await axios.post(MOVIE_API_URL, newMovie)
    const actualMovie = response.data
    return actualMovie
}
export const findAllMovies = async () => {
    const response = await axios.get(MOVIE_API_URL)
    const movies = response.data
    return movies
}

export const findTopMovies = async () => {
    console.log("entered")
    let variables={}
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":"EBat8x9gFf2wTdr7hZdJarIK9GeJKMMrHahG2qfo"
    };
    const response = await axios.post(SEARCH_URL,{
        query,
        variables,
        headers
    })
    console.log(response.data.data);
    return response.data.data
}

export const updateMovie = async () => {}


export const findLikedMovies = async (uid) => {
    let variables={
        page: 1,
        perPage: 2455,
    };
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":"EBat8x9gFf2wTdr7hZdJarIK9GeJKMMrHahG2qfo"
    };
    const response = await axios.get(`${MOVIE_API_URL}/${uid}/likes`,{
        variables,
        headers
    })
    return response.data;
}
export const deleteMovie = async (mid) => {
    const response = await axios.delete(`${MOVIE_API_URL}/${mid}`)
    const status = response.data
    return mid;
}