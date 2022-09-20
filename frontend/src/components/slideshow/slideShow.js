import React, { useState } from "react";
import Draggable from 'react-draggable';
import "./slideShow.css"
import axios from 'axios';
import { faMapMarker, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
// import image1 from "../../Component/images/download.jpg";
// import image2 from "../../Component/images/img2.jpg";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import ReactPlayer from 'react-player'
import { useEffect } from 'react/cjs/react.development';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../dragCord/Drag.css';

const SlideImages = (props) => {
    // const [x_axis, setXA] = useState('');
    // const [y_axis, setYA] = useState('');
    
    const [x_axis, setXA] = useState('');
    const [y_axis, setYA] = useState('');
    const [deltaPosition, setDeltaPosition] = useState({ x: '', y: '' });
    const handleDrag = (e) => {
        setDeltaPosition({
            x: Math.floor(e.screenX / e.view.screen.availWidth * 100),
            y: Math.floor(e.screenY / e.view.screen.availHeight * 100)
        });
    };
    const slideImages = [
        {
            urlImg: props.img[0],
            caption: 'Slide 1'
        },
        {
            urlImg: props.img[1],
            caption: 'Slide 2'
        },
    ];
    
    
    useEffect(async (event) => {
        let h = window.screen.availHeight;
        let w = window.screen.availWidth;
        let x = Math.floor((w * props.position.x) / 100) - 6;
        let y = Math.floor((h * props.position.y) / 100) - 80;
        setXA(`${x}px`);
        setYA(`${y}px`);
    }, [])

    let count = 1;

    async function hlo() {
        let data = { _id: props._id, position: deltaPosition }
        await axios.post('http://localhost:9002/setposition', data)
    }


    return (
        <Draggable  handle="strong" onDrag={handleDrag} onStop={event => hlo()}>
            <div
                className='draggableDiv slideshow-dragBox'
                style={{ top: y_axis, left: x_axis }}
            >
                <div>
                    <strong className='drag-cursor'>
                        <FontAwesomeIcon icon={faArrowsAlt} />
                    </strong>
                    <div className="slideBox">
                        <Slide autoplay={false}>
                            {slideImages.map((slideImage, index) => (
                                <div className="each-slide" key={index}>
                                    <div className="main-div" style={{ 'backgroundImage': `url('${slideImage.urlImg}')`,"background-size":"cover" }}>
                                        
                                        <ReactPlayer
                                            url={count++ == 1 ? '': slideImage.urlImg}
                                            controls
                                            playbackRate={1}
                                            // width="896px"
                                            // height="504px"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Slide>

                    </div>
                </div>
            </div>    
        </Draggable>
    )
}
export default SlideImages