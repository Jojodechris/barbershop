import "./App.css"
import React  from 'react';

function Registration (){
    return (
        <div className="registration">
            {/* <Logsign/> */}
            <a href="/signup" class="btn btn-danger btn-block">signup</a>
            <a href="/login" class="btn btn-danger btn-block">Login</a>
            {/* <button type="button">Login me <a href="/login" ></a></button> */}
        </div>
        )
}
export default Registration;


