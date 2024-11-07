import React from 'react';
import "./App.css";
import HeaderCstmr from './HeaderCstmr';
import CstomerMainpage from './CstmerMainpage';


function Cstomerpage() {
    return (
      <div className='thestylezone'>
        <HeaderCstmr/>
        <CstomerMainpage/>
        {/* <Footer/> */}
      </div>
    );
  }
export default Cstomerpage;