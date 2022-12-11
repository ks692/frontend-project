import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "./users-thunk";
import {current} from "@reduxjs/toolkit";
import {Navigate, useNavigate} from "react-router";
import './users.css';
import {Link} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const {users,loading,currentUser,publicProfile}= useSelector((state) => state.users)
    console.log(currentUser)
    const [firstName, setfirstname] = useState('');
    const [lastName, setlastname] = useState('');
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setemail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().slice(0,10));
    const [role, setRole] = useState('ADMIN');
    let dateJoined = new Date().toISOString().slice(0,10);
    const dispatch = useDispatch()
    const handleRegisterBtn = () => {
        if(username===""){
            alert("fill username")
            return
        }
        else if(password===""){
            alert("fill password")
            return
        }
        else if(firstName===""){
            alert("fill firstname")
            return
        }
        else if(lastName===""){
            alert("fill lastname")
            return
        }
        else if(role===''){
            alert("Select role")
            return;
        }
        dispatch(registerThunk({username, password,email,firstName,lastName,dateOfBirth,role}))
        navigate('/login')
    }

    if(currentUser) {
        return (<Navigate to={'/profile'}/>)
    }

    return(
        <>
            <div className="container card mt-5 p-5 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-4 wd-blueBG">

                <h3>Register</h3>
                <form>
                    <div className="form-group">
                        <label className="wd-fontBold">First name</label>
                        <input type="text" className="form-control border pl-2" placeholder="First name" onChange={event =>
                            setfirstname(event.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label className="wd-fontBold">Last name</label>
                        <input type="text" className="form-control border" placeholder="Last name" onChange={event =>
                            setlastname(event.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label className="wd-fontBold">User name</label>
                        <input type="text" className="form-control border" placeholder="Username" onChange={event =>
                            setusername(event.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label className="wd-fontBold">Email address</label>
                        <input type="email" className="form-control border wd-px" placeholder="Enter email" onChange={event =>
                            setemail(event.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="wd-fontBold" >Password</label>
                        <input type="password" className="form-control wd-px" placeholder="Enter password" onChange={event =>
                            setPassword(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className="wd-fontBold" >Date Of Birth</label>
                        <input type="date" className="form-control wd-px" placeholder="Enter DOB" onChange={event =>
                            setDateOfBirth(event.target.value)}/>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label className="wd-fontBold" >Role</label>
                        <select defaultValue={"ADMIN"} onChange={event => setRole(event.target.value)}>
                            <option value="ADMIN">ADMIN</option>
                            <option value="MODERATOR">MODERATOR</option>
                            <option value="USER">USER</option>
                        </select>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary btn-block" onClick={handleRegisterBtn}>Register</button>

                    <p className="forgot-password text-right">
                        Already registered as user? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </>
    )
}
export default Register