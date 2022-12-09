import {useDispatch, useSelector} from "react-redux";
import {logoutThunk, updateThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {nativeSelectClasses, Paper, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import TabPanel from '@mui/lab/TabPanel';
import {TabContext} from "@mui/lab";




const EditProfile = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)
    let [oldProfile, setOldProfile] = useState(currentUser);
    const dispatch = useDispatch()
    const handleSaveBtn = () => {
        dispatch(updateThunk(oldProfile))
        navigate("/profile")
    }
    return(
        <>
            <h4>Edit Profile</h4>
            {
                currentUser && <h6>Welcome <b>{currentUser.username}</b></h6>
            }
            <div className="col-4 ps-2">
                <button
                    className="btn btn-warning"
                    onClick={() => navigate("/profile")}>
                    Exit
                </button>
                <span> </span>
                <button
                    className="btn btn-primary"
                    onClick={handleSaveBtn}>
                    Save
                </button>
            </div>


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

                        <div className="card mt-2 row">
                            <div className="form-group">
                                <label className="wd-fontBold">First name</label>
                                <input type="text" defaultValue={oldProfile.firstName} className="form-control border pl-2"  onChange={event =>
                                    setOldProfile({...oldProfile,firstName:event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label className="wd-fontBold">Last name</label>
                                <input type="text" defaultValue={oldProfile.lastName} className="form-control border pl-2"  onChange={event =>
                                    setOldProfile({...oldProfile,lastName:event.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label className="wd-fontBold">Email</label>
                                <input type="email" defaultValue={oldProfile.email} className="form-control border pl-2"  onChange={event =>
                                    setOldProfile({...oldProfile,email:event.target.value})}/>
                            </div>
                            <br></br>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
export default EditProfile