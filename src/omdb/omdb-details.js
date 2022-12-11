import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findMovieByImdbIdThunk} from "./omdb-thunks";
import {createReviewThunk, deleteReviewThunk, findReviewsByMovieThunk} from "../reviews/reviews-thunks";
import {Link} from "react-router-dom";
import { FaThumbsUp,FaTrash } from 'react-icons/fa';
import {findAllUserLikesThunk, userLikesMovieThunk} from "../likes/likes-thunks";

const OmdbDetails = () => {
    const {imdbID} = useParams()
    const [review, setReview] = useState('')
    const {reviews} = useSelector((state) => state.reviews)
    const {movies,loadDetails,details} = useSelector((state) => state.omdb)
    const {likes,loadLikes}=useSelector((state)=>state.likes)
    const {users,loading,currentUser,publicProfile} = useSelector((state) => state.users)
    //console.log(currentUser)
    const dispatch = useDispatch()
    useEffect(() => {
        if(currentUser) {
            dispatch(findAllUserLikesThunk(currentUser._id))
        }
        dispatch(findMovieByImdbIdThunk(imdbID))
        dispatch(findReviewsByMovieThunk(imdbID))
    },[])
    //console.log(likes)
    //console.log(imdbID)
    //console.log(typeof(imdbID))
    const k=(likes.filter(p=>(p.movie._id===Number(imdbID))))
    const test=k.length>0
    //console.log(test)
    const handlePostReviewBtn = () => {
        dispatch(createReviewThunk({
            review,
            imdbID
        }))
    }
    const checkForAdmin=currentUser && (currentUser.role==="ADMIN"|| currentUser.role==="MODERATOR")
    //console.log(checkForAdmin)

    return(
        <>
            {
                loadDetails && loadLikes &&
                <li className="list-group-item">
                    Loading...
                </li>
            }
            {
                !loadDetails && ((currentUser && !loadLikes) || (!currentUser)) &&
                <div>
                    <h4>{details.title.romaji}</h4>
                    <div className="row">
                        <div className="col-5">
                            <ul className="list-group">
                                <li className="list-group-item">Native Title: {details.title.native}</li>
                                <li className="list-group-item">Start Date: {details.startDate.day}-{details.startDate.month}-{details.startDate.year}</li>
                                <li className="list-group-item">End Date: {details.endDate.day}-{details.endDate.month}-{details.endDate.year}</li>
                                <li className="list-group-item">Episodes: {details.episodes}</li>
                                <li className="list-group-item">Season: {details.season}</li>
                                <li className="list-group-item">Season year: {details.seasonYear}</li>
                                    <li className="list-group-item">Genres: {details.genres}</li>
                                <li className="list-group-item">Source: {details.source}</li>
                                <li className="list-group-item">Average Score: {details.averageScore}</li>
                                <li className="list-group-item">Status: {details.status}</li>
                            </ul>
                        </div>
                        <div className="col-3">

                        </div>
                        <div className="col-3">
                            <img className="w-100 h-100 " src={details.coverImage.large}/>
                        </div>
                        {
                            currentUser && !test &&
                            <div className="col-1">
                                <button  className="btn btn-primary rounded"onClick={()=>dispatch(userLikesMovieThunk({uid:currentUser._id,mid:details.id,movie:details}))}>
                                <FaThumbsUp></FaThumbsUp>
                                </button>
                            </div>
                        }
                    </div>
                    <br></br>
                    {
                        currentUser &&
                        <div>
                            <textarea onChange={(e) => setReview(e.target.value)} className="form-control"></textarea>
                            <button onClick={handlePostReviewBtn}>Post Review</button>
                        </div>
                    }
                    <ul className="list-group">
                        {
                            reviews.map((review) =>
                                <li className="list-group-item">
                                    <div className="card">
                                        <div className="row">
                                            <span>
                                                Review By Author:<Link to={`/profile/${review.author._id}`}>
                                                    @{review.author.username}
                                                </Link>
                                            </span>
                                            <br></br>
                                            <div>
                                                {review.review}
                                            </div>
                                            <br></br>

                                            <br></br>
                                            {
                                                checkForAdmin &&
                                                <div className="col-2">
                                                    <button className="btn btn-danger" onClick={()=>dispatch(deleteReviewThunk({imdbID:imdbID,reviewId:review._id}))}>Delete</button>
                                                </div>
                                            }
                                            </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>

                </div>

            }

        </>
    )

}
export default OmdbDetails