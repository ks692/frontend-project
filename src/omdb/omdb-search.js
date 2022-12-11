import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findMovieBySearchTermThunk} from "./omdb-thunks";
import {userLikesMovieThunk} from "../likes/likes-thunks";
import {Link} from "react-router-dom";

const OmdbSearch = () => {
    const [searchTerm, setSearchTerm] = useState('Avatar')
    const {movies, loading} = useSelector((state) => state.omdb)
    console.log(movies)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findMovieBySearchTermThunk(searchTerm))
    }, [])
    return (
        <>
            <h4>Anime Search</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <button
                        className="btn btn-primary float-end"
                        onClick={() => {
                            dispatch(findMovieBySearchTermThunk(searchTerm))
                        }}>Search
                    </button>
                    <input
                        className="form-control w-75"
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}
                        value={searchTerm}/>
                </li>
                <br></br>
                <li className="list-group ">
                    <div className="row">
                        <div className="col-1 border text-center">
                            ID
                        </div>
                        <div className="col-2 border text-center">
                            <span>Image</span>
                        </div>
                        <div className="col-3 border text-center">
                            <span>Name</span>
                        </div>
                        <div className="col-2 border text-center">
                            <span>Native Name</span>
                        </div>
                        <div className="col-2 border text-center">
                            <span>Episodes</span>
                        </div>
                        <div className="col-2 border text-center">
                            <span>Status</span>
                        </div>
                    </div>
                </li>
                {
                    movies && movies.map((movie) =>
                        <li key={movie.id} className="list-group-item">
                            <div className="row">
                                <div className="col-1 border text-center">
                                    <Link to={`/details/${movie.id}`}>
                                        {movie.id}
                                    </Link>
                                </div>
                                <div className="col-2 border text-center">
                                    <img src={movie.coverImage.medium} className="w-10 h-10"/>
                                </div>
                                <div className="col-3 border text-center">
                                        {movie.title.romaji}
                                </div>
                                <div className="col-2 border text-center">
                                    {movie.title.native}
                                </div>
                                <div className="col-2 border text-center">
                                    {movie.episodes}
                                </div>
                                <div className="col-2 border text-center">
                                    {movie.status}
                                </div>
                            </div>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

export default OmdbSearch