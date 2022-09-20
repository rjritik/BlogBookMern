import React from 'react';
import { NavLink } from 'react-router-dom';
import "./nav.css";
import { useHistory } from "react-router-dom"

const Navbar = ({ setLoginUser, user }) => {
    const history = useHistory()
//   const [active, setActive] = useState("Home");
  return (
    <>
      <div className="Navbar">
        <h1 className="navTitle">Blog Book </h1>
        <div className="btns">
          <NavLink to='/' className="homebtn">Home</NavLink>
          <NavLink to='/login' className="loginbtn">LogIn/Register</NavLink>
          <NavLink to='/posts' className="loginbtn">Create Post</NavLink>
          {/* <NavLink to='/widget' className="loginbtn">Widgets</NavLink>
          <NavLink to='/addWidget' className="loginbtn">Add Widget</NavLink>
          <NavLink to='/dragCord' className="loginbtn">Drag Cord</NavLink> */}
          <div className="homebtn" onClick={() => history.push('/login')} >Logout</div>
          {/* <div>Hello <span className = "userName">{user.name}</span></div> */}
        </div>
      </div>


    </>
  );
}

export default Navbar;
