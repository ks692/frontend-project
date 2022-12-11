import {useDispatch, useSelector} from "react-redux";
import {findUserByIdThunk, logoutThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {Paper, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";
import TabPanel from '@mui/lab/TabPanel';
import {TabContext} from "@mui/lab";
import {findFollowersThunk, findFollowingThunk, followUserThunk} from "../follows/follows-thunks";
import {findReviewsByAuthorThunk} from "../reviews/reviews-thunks";




const Profile = () => {
    const navigate = useNavigate()
    const {users,loading,currentUser,publicProfile} = useSelector((state) => state.users)
    const {state}=useSelector((state)=>state)
    const [value, setValue] = useState('1');
    console.log(currentUser)
    const dispatch = useDispatch()
    const handleLogoutBtn = () => {
        dispatch(logoutThunk())
        navigate('/login')
    }
    const uid=currentUser._id
    useEffect(() => {
        dispatch(findUserByIdThunk(uid))
        dispatch(findReviewsByAuthorThunk(uid))
        dispatch(findFollowersThunk(uid))
        dispatch(findFollowingThunk(uid))
    }, [])
    const {reviews} = useSelector((state) => state.reviews)
    const {followers, following} = useSelector((state) => state.follows)

    return(
        <>
            <h4>Profile</h4>
            {
                currentUser && <h6>Welcome <b>{currentUser.username}</b></h6>
            }

            <button
                className="btn btn-danger"
                onClick={handleLogoutBtn}>
                Logout
            </button>

            <div>
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
                            <div className="float-end ">
                                <button type="button" className="btn-primary rounded-pill wd-right border-secondary mt-2"
                                        onClick={() => navigate("/edit-profile")}>Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="card mt-2 row ">
                            <form>

                            </form>
                            <span>First Name: <b>{currentUser.firstName}</b></span>
                            <span>Last Name: <b>{currentUser.lastName}</b></span>
                            <span>Email: <b>{currentUser.email}</b></span>
                            <span>Username: <b>@{currentUser.username}</b></span>
                            <span>Date of Birth: <b>{currentUser.dateOfBirth}</b></span>
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
            </div>

        </>
    )
}
export default Profile