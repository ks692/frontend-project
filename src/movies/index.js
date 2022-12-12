import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    findLikedMoviesThunk,
    findTopMoviesThunk
} from "./movies-thunks";
import Carousel from "react-elastic-carousel";
import {Link} from "react-router-dom";
import {findAllLikesByUser} from "../likes/likes-service";


const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2},
    {width: 768, itemsToShow: 3},
    {width: 1200, itemsToShow: 4},
];
const Movies = () => {
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state) => state.users)
    useEffect(() => {

        if(currentUser){
            dispatch(findLikedMoviesThunk(currentUser._id))
        }
        dispatch(findTopMoviesThunk())
    }, [])

    console.log(currentUser)
    const {movies,myMovies,loading} = useSelector((state) => state.movies)
    console.log(movies)

    return (
        <>
            <br/>
            {
                currentUser &&
                <h4>Welcome {currentUser.username} </h4>
            }
            {
                !currentUser && !loading && movies &&
                <div>
                    <h4>Anime 2021</h4>
                    <Carousel breakPoints={breakPoints}>
                        {movies && movies.Anime2021.media.map((movie) =>
                            <Link to={`/details/${movie.id}`} className="col-5 ">
                            <div className="col">
                            <img className="row" src={movie.coverImage.large} className="w-100 h-100"/>
                            <p className="row bottom-0">{movie.title.romaji}</p>
                            </div>
                            </Link>
                            )
                        }
                    </Carousel>
                    <br></br>
                    <h4>Anime 2022</h4>
                    <Carousel breakPoints={breakPoints}>
                        {movies && movies.Anime2022.media.map((movie) =>
                            <Link to={`/details/${movie.id}`} className="col-5 ">
                                <div className="col">
                                    <img className="row" src={movie.coverImage.large} className="w-100 h-100"/>
                                    <p className="row bottom-0">{movie.title.romaji}</p>
                                </div>
                            </Link>
                        )
                        }
                    </Carousel>
                </div>
            }

            {
                currentUser && !loading && myMovies &&
                <div>
                    <h4>My Anime</h4>
                    <Carousel breakPoints={breakPoints}>
                        {myMovies && myMovies.map((movie) =>
                            <Link to={`/details/${movie.movie.id}`} className="col-5 ">
                                <div className="col">
                                    <img className="row" src={movie.movie.image} className="w-100 h-100"/>
                                    <p className="row bottom-0">{movie.movie.title}</p>
                                </div>
                            </Link>
                        )
                        }
                    </Carousel>

                </div>
            }



        </>
    )
}

export default Movies;