import React from 'react';
import "./App.css";
import CstmerNavbar from './CstmerNavbar';

function HeaderCstmr() {
    return (
      <div className='home'>
            <h1>Jordan's barber shop</h1>
            <p>Welcome to Jordan's barber shop</p>
            <CstmerNavbar />
      </div>
    );
  }
export default HeaderCstmr;