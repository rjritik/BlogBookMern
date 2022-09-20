import React, { useState } from 'react';
import './Drag.css';
import Draggable from 'react-draggable';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';
import weatherIcon from './../../images/weather-icon.png';
import dragIcon from './../../images/drag-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

const DragCord = (props) => {
    const [x_axis, setXA] = useState('');
    const [y_axis, setYA] = useState('');
    const [d, setd] = useState();
    const [deltaPosition, setDeltaPosition] = useState({ x:20, y: 20 });
    const handleDrag = (e) => {
        // const { x, y } = deltaPosition;
        setDeltaPosition({
            x: Math.floor(e.screenX / e.view.screen.availWidth * 100),
            y: Math.floor(e.screenY / e.view.screen.availHeight * 100)
            // x: x + ui.deltaX,
            // y: y + ui.deltaY,
        });
    };
    useEffect(async (event) => {
        let h = window.screen.availHeight;
        let w = window.screen.availWidth;
        let x = Math.floor((w * props.position.x) / 100) - 6;
        let y = Math.floor((h * props.position.y) / 100) - 80;
        setXA(`${x}px`);
        setYA(`${y}px`);
    }, [])

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.cityName}&appid=63f2b064563fe7cd536261a08e1b9351`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data) {
                    setd(data);
                }
                else {
                    alert("your city name is not found");
                }

            })
            .catch(error => console.error(error))
    }, [])
    async function setPosition(event) {
        let data = { _id: props._id, position: deltaPosition }
        await axios.post('http://localhost:9002/setposition', data)
    }
    return (
        <Draggable handle="strong" onDrag={handleDrag} onStop={(event) => setPosition(event)}>
            <div
                className='draggableDiv'
                style={{ top: y_axis, left: x_axis }}
            >
                <div className="weather-box"
                    // style={{ marginTop: y_axis, marginLeft: x_axis }}
                >
                    <strong className='drag-cursor'>
                        <FontAwesomeIcon icon={faArrowsAlt} />
                    </strong>
                    <figure>
                        <img src={weatherIcon} />
                    </figure>
                    <figcaption>
                        <h1 className='temp'>{d ? Number.parseInt(d.main.temp)-273 : ''}<sup>°C</sup></h1>
                        <h5 className='temp-desc'>{d ? d.weather[0].description : ''}</h5>
                        <h5 className='temp-location'>
                            <FontAwesomeIcon icon={faMapMarker} />
                            {d ? d.name : ''}
                        </h5>
                    </figcaption>
                </div>
            </div>
        </Draggable>
    )
}

export default DragCord;