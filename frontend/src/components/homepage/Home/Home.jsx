// import logo from './logo.png';
import React from "react";
import logo from "./logo.png"
import "./home.css";
import Navbar from "./nav/Nav";
import axios from "axios";
import { useState, useEffect } from "react/cjs/react.development";
import { useHistory } from "react-router-dom"
import Card from "./Card";
import DragCord from '../../dragCord/DragCord'
import SlideShow from '../../slideshow/slideShow'

const Home = ({ setLoginUser, user }) => {
    const history = useHistory();
    const [dta, setdta] = useState([]);
    const [widgets, setWidgets] = useState([]);

    useEffect(async () => {
        await axios.get("http://localhost:9002/getposts").then(res => {
            // console.log(res);
            setdta(res.data);
        }).catch((err) => {
            console.log(err);
        })
        // console.log(dta);
    }, [dta])
    useEffect(async () => {
        let data = { email: localStorage.getItem('email') };
        await axios.post("http://localhost:9002/getwidgets", data).then(res => {
            console.log(res);
            if (!res.message) {
                setWidgets(res.data)
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const onDelete = async (e) => {
        console.log(e);
        try {
            await axios.delete(`http://localhost:9002/posts/${e}`)
                .then(res => {
                    // console.log(res);
                    // alert(res.data.message)
                    history.push('/');

                })
        }
        catch (err) {
            console.log(err);
        }
    }


    const update = (id, title, content,image) => {


        history.push({
            pathname: '/posts',
            state: {
                id,
                title,
                content,
                
            }
        });

    }



    return (
        <>

            <div >
                <Navbar user={user} setLoginUser={setLoginUser} />
                <section>
                    <div className="leftHome">
                        <h1 className="Heading">Tell your story to the world</h1>
                        <p>Join with us! Login or Register. Write your story and share !!</p>
                    </div>
                    <div className="rightHome">
                        <img className="logoImg" src={logo} alt="Logo" />
                    </div>
                </section>

                {
                    dta.map((elm, index) => {
                        return (
                            <Card
                                title={elm.title}
                                content={elm.content}
                                image ={elm.image}
                                onDelete={onDelete}
                                _id={elm._id}
                                update={update}
                            />

                        )
                    })
                }
                {/* {
                    (widgets ? (widgets.map((elm) => {
                        
                        return (elm.name == 'weatherWidget' ?
                            (<DragCord
                                name={elm.name}
                                cityName={elm.cityName}
                                position={elm.position}
                                userEmail={elm.userEmail}
                                _id={elm._id}
                            />)
                            : (elm.name == 'slideWidget' ?
                                <SlideShow
                                    name={elm.name}
                                    img={elm.img}
                                    position={elm.position}
                                    userEmail={elm.userEmail}
                                    _id={elm._id}
                                />
                                : ''))
                    })) : '')
                } */}

            </div>
        </>
    )
}
export default Home