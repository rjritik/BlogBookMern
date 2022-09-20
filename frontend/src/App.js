import './App.css'
import Home from "./components/homepage/Home/Home"
import Login from "./components/login/login"
import Register from "./components/register/register"
import Wid from './components/widgets/wid';
//import DragCord from './components/dragCord/DragCord';
import CreatePost  from './components/homepage/createPost/createpost'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import DragCord from './components/dragCord/DragCord';
import AddWidget from './components/addWidget/addwidget'
import SlideShow from './components/slideshow/slideShow';

function App() {
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

  const [ user, setLoginUser] = useState({})
  return (
    <div >
      <Router>
        <Switch>
          <Route exact path="/">
            {
              (email || password) ? <Home setLoginUser={setLoginUser} user = {user} /> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/posts">
            <CreatePost/>
          </Route>
          <Route path="/widget">
            <Wid/>
          </Route>
          <Route path="/dragCord">
           <DragCord/>
          </Route>
          <Route path="/addWidget">
           <AddWidget/>
          </Route>
          <Route path="/slideShow">
           <SlideShow/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
