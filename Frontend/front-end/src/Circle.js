import React from 'react';
import "./App.css";
import Registration from "./Registration";

function Circle({ url }) {
    return (
      <div
        className="circle"
        style={{
          backgroundImage: `url(${url})`,
        }}
      >
      </div>
    );
  }
export default Circle;