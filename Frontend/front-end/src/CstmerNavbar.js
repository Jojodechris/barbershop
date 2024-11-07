import React from 'react';
import "./App.css";


function CstmerNavbar() {
    return (
      <div className='topnav'>
        <a class="active" href="#home">Browsing services</a>
        <a href="#news">Appointment</a>
        <a href="#contact">Reviews/Rating</a>
        <a href="#about">Profile</a>
      </div>
    );
  }
export default CstmerNavbar;