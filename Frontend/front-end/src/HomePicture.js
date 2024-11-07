import "./App.css";
import React from 'react';
import Circle from "./Circle";
import Registration from "./Registration";

const HomePicture = () => {
  const urls = [
    "https://images.pexels.com/photos/2014809/pexels-photo-2014809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2521978/pexels-photo-2521978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2068672/pexels-photo-2068672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  ];

  return (
    <div className="home-picture">
      {urls.map((url, index) => <Circle key={index} url={url} />)}
    </div>
  );
}

export default HomePicture;
