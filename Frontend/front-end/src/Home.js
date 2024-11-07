import "./App.css"
import React from 'react';
import Page from "./Page";
import Presentation from "./Presentation";
import Registration from "./Registration";
import Barberinfo from "./Barberinfo";
import Services from "./Services";
import Header from "./Header";
import './App.css';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';


function Home (){
    return (
        <div className="firstpage">
            <Header/>
            <Presentation />
            <br/>
            <br/>
            {/* <Services/> */}
            <div className='footer'>
            <Registration/>
            </div>
            
    </div>
        
        
        )
}
export default Home;