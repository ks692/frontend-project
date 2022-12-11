import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findAllUsersThunk, findUserByIdThunk} from "./users-thunk";
import {useParams} from "react-router";
import {findUserById} from "./users-service";
import {TabContext} from "@mui/lab";
import {Tab, Tabs} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

const ProfilePersonal = () => {
    const {uid} = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        console.log("called")
        dispatch(findUserByIdThunk(uid))
    }, [])
    const {users,loading,currentUser,publicProfile}= useSelector((state) => state.users)
    const [value, setValue] = useState('1');

    return(
        <>
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
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
                </div>
                </div>
            }
        </>
    )
}

export default ProfilePersonal