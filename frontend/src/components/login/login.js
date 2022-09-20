import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = ({ setLoginUser }) => {

    const history = useHistory()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login =async () => {
        let res =await axios.post("http://localhost:9002/login", user);
        if(res.data.message === "Invalid password" || res.data.message === "User not found" ){
            alert("Invalid User, Please check email or password");
        }else{
            setLoginUser(res.data.user)
                localStorage.setItem("email", user.email);
                localStorage.setItem("password", user.password);
                history.push("/")
        }
            // .then(res => {
            //     // alert(res.data.message)
            //     setLoginUser(res.data.user)
            //     localStorage.setItem("email", user.email);
            //     localStorage.setItem("password", user.password);
            //     history.push("/")
            // })
    }

    return (
        <div className="App">
            <div className="login">
                <h1>Login</h1>
                <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
                <div className="button" onClick={login}>Login</div>
                <div>or</div>
                <div className="button" onClick={() => history.push("/register")}>Register</div>
            </div>
        </div>
    )
}

export default Login