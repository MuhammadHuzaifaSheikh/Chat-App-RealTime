import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './join.css';

export default function Join(props) {
    const [name, setName] = useState('');

    function handle(e) {
        setName(e.target.value)

    }

    function passName() {

        if (name!=='') {
         props.onTakeName(name)
            setName('')
        }
        else {
            alert('Please type your name for joined the chat')
        }

    }



    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input value={name} placeholder="Name" className="joinInput" type="text" onChange={handle}  />
                </div>

                    <button onClick={passName} className={'button mt-20'}>Sign In</button>

            </div>
        </div>
    );
}