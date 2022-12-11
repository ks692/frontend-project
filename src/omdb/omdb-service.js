import axios from "axios";

const SEARCH_URL = 'https://graphql.anilist.co/'
const DETAILS_URL = 'https://omdbapi.com/?apikey=852159f0&i='


const query = `
      query ($page: Int, $perPage: Int, $search: String) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
    }
    media(search: $search, type: ANIME, sort: FAVOURITES) {
      id
      coverImage {
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



export const findMovieBySearchTerm = async (term) => {
    let variables={
        search: term,
        page: 1,
        perPage: 25000,
    };
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
    console.log(response.data.data.Page.media);
    return response.data.data.Page.media
}

export const findMovieByImdbId = async (imdbID) => {
    const response = await axios.get(`${DETAILS_URL}${imdbID}`)
    return response.data
}