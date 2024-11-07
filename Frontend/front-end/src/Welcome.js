import "./App.css"
import React  from 'react';
import { Input } from "@mui/material";
import './Welcome.css';

function Welcome (){
    return (
        <div>
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src="" alt=""/>
                    <input type="email"/>
                </div>
                <div className="input">
                    <img src="" alt=""/>
                    <input type="text"/>
                </div>
                <div className="input">
                    <img src="" alt=""/>
                    <input type="password"/>
                </div>
                </div> 
                <div className="forgot password">
                    Lost Password ?<span>click here!</span>
                </div>
                <div className="submit-container">
                    <div className="submit">Sign Up</div>
                    <div className="submit">Login</div>
                </div>
        </div>
        )
}
export default Welcome;