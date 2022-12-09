import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "./users-thunk";
import {Navigate, useNavigate} from "react-router";
import {Link} from "react-router-dom";

const Login = () => {
    const {users,loading,currentUser,publicProfile} = useSelector((state) => state.users)
    const [username, setUsername] = useState('alice')
    const [password, setPassword] = useState('alice1234')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginBtn = () => {
        try {
            dispatch(loginThunk({username, password}))
            // navigate('/profile')
        } catch (e) {

        }
    }
    if (currentUser) {
        return (<Navigate to={'/profile'}/>)
    }
    return(
        <>
            <div className="container card col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-4 mt-5 p-5 wd-blueBG">
                <form>
                    <h3 className="wd-whiteFont">Welcome</h3>

                    <div className="form-group">
                        <label className="wd-fontBold" >Username</label>
                        <input type="text" className="form-control" placeholder="Enter Username" onChange={event =>
                            setUsername(event.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label className="wd-fontBold" >Password</label>
                        <input type="password" className="form-control border" placeholder="Enter password" onChange={event =>
                            setPassword(event.target.value)}/>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary btn-block wd-fontBold" onClick={handleLoginBtn}>Login</button>
                    <br></br>
                    <label>New User? <Link to={{pathname: `/register`}}>Click here to Register as new User</Link>
                    </label>
                </form>
            </div>
        </>
    )
}
export default Login