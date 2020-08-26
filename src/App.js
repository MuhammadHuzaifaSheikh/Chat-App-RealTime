import React, {useState} from 'react';
import Chat from "./componenets/Chat/Chat";
import Join from "./componenets/join/Join";
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect

} from "react-router-dom";
function App() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');


    function takeName(name,room) {
        setName(name)
        setRoom(room)
    }
    return (
        <div>
            <Router>

                    <Switch>
                        <Route  path="/chat" render={() => {
                            return name&&room ? <Chat room={room} name={name}/> : <Redirect to={'/'}/>
                        }}>
                        </Route>
                        <Route exact path="/" render={() => {
                            return name&&room ?  <Redirect to={'/chat'}/> :<Join  onTakeName={takeName}/>
                        }}>
                        </Route>

                    </Switch>

            </Router>
        </div>
    );
}

export default App;
