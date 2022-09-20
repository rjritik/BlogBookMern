import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../homepage/Home/nav/Nav";
import axios from "axios";
const AddWidget = () => {
    const [zip, setzip] = useState();
    const [z, setz] = useState();
    const changeHandler = (e) => {
        // setz(e.target.value);
    }
    const getData = () => {
        // setzip(z);
    }
    return (
        <>
            <Navbar />
            <div className="createPost">
                <h1>Create A New Widget</h1>
                <input
                    value={zip}
                    onChange={changeHandler()}
                    placeholder="Please enter a valid zip code..."></input>
                <button className="post" onClick={getData()}>Add Widget</button>
            </div>
        </>

    )
}
export default AddWidget;