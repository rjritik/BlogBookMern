import './wid.css';
import Draggable from 'react-draggable'; // The default
import { useEffect, useState } from 'react';
function Wid() {
    const [d, setd] = useState();
    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=63f2b064563fe7cd536261a08e1b9351')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setd(data);
            })
            .catch(error => console.error(error))
    }, [])
    const my = () => {
    
    }

    return (
        <div className="App">
            <h1>Draggable DIV Element</h1>
            <Draggable onStop={my()}>
                <div id = 'mydiv'>
                    <div>{ d?d.main.temp:''}</div>
                    <p>{d?d.name: ''}</p>
                    <p>{d?d.weather[0].description: ''}</p>
                </div>
            </Draggable>
        </div>
    );
}

export default Wid;





