import React from 'react';
import "./App.css";
import HeaderCstmr from './HeaderCstmr';
import Allbarber from './Allbarber';

function Barber() {
    return (
      <div className='thebarberzone'>
        <HeaderCstmr/>
        <Allbarber/>
      </div>
    );
  }
export default Barber;