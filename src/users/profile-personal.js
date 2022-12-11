import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findAllUsersThunk, findUserByIdThunk} from "./users-thunk";
import {useParams} from "react-router";
import {findUserById} from "./users-service";
import {TabContext} from "@mui/lab";
import {Tab, Tabs} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import {findFollowersThunk, findFollowingThunk, followUserThunk} from "../follows/follows-thunks";
import {findReviewsByAuthorThunk} from "../reviews/reviews-thunks";
import {Link} from "react-router-dom";

const ProfilePersonal = () => {
    const {uid} = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
        dispatch(findReviewsByAuthorThunk(uid))
        dispatch(findFollowersThunk(uid))
        dispatch(findFollowingThunk(uid))
    }, [])
    const {users,loading,currentUser,publicProfile}= useSelector((state) => state.users)
    const {reviews} = useSelector((state) => state.reviews)
    const {followers, following} = useSelector((state) => state.follows)
    const handleFollowBtn = () => {
        dispatch(followUserThunk({
            followed: uid
        }))
    }
    //console.log(followers)
    //console.log(currentUser._id)
    const k=followers.length>0 && (followers.filter(p=>(p.follower._id===currentUser._id)))
    //console.log(k)
    let test=k.length>0
    //console.log(test)
    const [value, setValue] = useState('1');
    const user=currentUser &&(currentUser._id===uid)
    return(
        <>
            {
            currentUser && !user && !test &&
                <button onClick={handleFollowBtn}
                    className="btn btn-success float-end">
                    Follow
                </button>
            }
            {
                loading &&
                <li className="list-group-item">
                    Loading...
                </li>
            }

            {
                !loading &&
                <div className="row mt-2 ">
                <div>
                <img
                src="https://wallpapercave.com/wp/wp10897327.jpg"
                className="w-100 h-50"
                style={{
                position: "relative",
            }}
                alt=""
                />
                <div className="container">
                <img
                src="https://media.istockphoto.com/vectors/user-icon-human-person-symbol-social-profile-icon-avatar-login-sign-vector-id1316420668?k=20&m=1316420668&s=612x612&w=0&h=Z2cc0HZXkovLCVmoJ8LCIG5eWMetgOX9oLe-lF0OWJM="
                width='150px'
                height='150px'
                className='rounded-circle border border-dark'
                style={{
                position: "relative",
                marginTop: "-75px",
                marginLeft: "10px",
            }}
                alt=""
                />
                </div>

                <div className="card mt-2 row ">
                <span>Username: <b>@{publicProfile.username}</b></span>
                </div>
                <br></br>
                <TabContext value={value}>
                <Tabs className="card"
                value={value}
                textColor="secondary"
                indicatorColor="primary"
                onChange={(event, newValue) => {
                setValue(newValue);
            }}
                >
                <Tab label="Following" value="1"/>
                <Tab label="Followed By" value="2"/>
                <Tab label="Reviews" value="3"/>
                </Tabs>
                <TabPanel value="1"><div className="list-group">
                    {
                        following && following.map((follow) =>
                            <Link to={`/profile/${follow.followed._id}`} className="list-group-item">
                                {follow.followed.username}
                            </Link>
                        )
                    }
                </div></TabPanel>
                <TabPanel value="2"><div className="list-group">
                    {
                        followers && followers.map((follow) =>
                            <Link to={`/profile/${follow.follower._id}`} className="list-group-item">
                                {follow.follower.username}
                            </Link>
                        )
                    }
                </div></TabPanel>
                <TabPanel value="3"><ul>
                    {
                        reviews && reviews.map((review) =>
                            <li>
                                <Link to={`/details/${review.imdbID}`}>
                                    {review.review} {review.imdbID}
                                </Link>
                            </li>
                        )
                    }
                </ul></TabPanel>
                </TabContext>
                </div>
                </div>
            }
        </>
    )
}

export default ProfilePersonal