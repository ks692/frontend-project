import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteThunk, findAllUsersThunk, updateThunk} from "./users-thunk";
import {useNavigate} from "react-router";
import {deleteUser} from "./users-service";

const Users = () => {
    useEffect(() => {
        dispatch(findAllUsersThunk())
    }, [])
    const {users,loading,currentUser,publicProfile}  = useSelector((state) => state.users)
    const navigate = useNavigate()
    const myStyle={
        cursor:"pointer",
        color:"#42bcf5"
    }
    const dispatch = useDispatch()
    const handleDeleteBtn = (user) => {
        dispatch(deleteThunk(user))
    }
    let currentUserto=currentUser
    return(
        <>
            <h3>Total Users in our Anime Forum: {users.length}</h3>
            <ul className="list-group">
                {
                    users.map((user) =>
                    <li key={user._id} className="list-group-item">
                        <div className="row">
                            <div className="col-4">
                                <span style={myStyle}  onClick={() => navigate("/profile/"+user._id)}>User_id: {user._id}</span>
                            </div>
                            <div className="col-4">
                                <span>Username: {user.username}</span>
                            </div>

                            <div className="col-4">
                                {currentUser.role=="ADMIN" && user._id!=currentUser._id &&(
                                    <button type="button" onClick={() => handleDeleteBtn(user)} className="btn btn-outline-danger">
                                        Delete
                                    </button>)}
                            </div>
                        </div>
                    </li>
                    )
                }
            </ul>
        </>
    )
}

export default Users