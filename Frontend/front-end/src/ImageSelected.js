// ImageSelected.js

import React from 'react';
import "./App.css";

function ImageSelected({url,name}) {
    return (
      <div className="image-selected">
      <img
      className="avatar"
      src={url}
      alt={name}
      />
    <div>
      <h2>{name}</h2>
    </div>
    </div>
    );
  }
export default ImageSelected;

// return (
//   <div>
//     <StyleSelected
//       url={url}
//       name={name}/>
//     </div>
// )