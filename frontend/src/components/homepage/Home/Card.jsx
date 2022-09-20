import React from "react";
import "./home.css";
import { useHistory } from "react-router-dom";
import CreatePost from "../createPost/createpost";

const Card = (props) => {


    const history = useHistory();

    

    return (
        <>

            <section>
                <div className='rightHome'>
                    <img className='imgaes' src={props.image ? props.image : "https://picsum.photos/200/300?random=1"} alt="" />
                </div>
                <div className='leftHome'>
                    <h2>{props.title}</h2>
                    <p>
                        {props.content}
                    </p>

                    <div>

                        <button className='allbtns' onClick={() => { props.onDelete(props._id) }}>Delete</button>
                        <button className='allbtns' onClick={() => { props.update(props._id , props.title , props.content , props.onDelete) }}>Update</button>
                    </div>
                </div>
            </section>
        </>

    )
}
export default Card;