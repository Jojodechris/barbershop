import "./App.css";
import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Booking from "./Booking";
import StyleContext from "./StyleContext";



const Allbarber = () => {
  const navigate = useNavigate();
  const [selectedBarber, setSelectedBarber] = useState(null);
  // Array of barbers with image, name, and description
  

  // const style= useContext(StyleContext);
  const barbers = [
    {
      url: "https://media.11alive.com/assets/WXIA/images/bdfb4c2d-9146-4be2-a61d-297df2f3f787/bdfb4c2d-9146-4be2-a61d-297df2f3f787_1140x641.jpg",
      name: "Johnson Jones",
      description: "Experienced barber specializing in fades and classic cuts.",
      availability:"Monday to  Friday 8am -8pm ",
      time:[8,9,10,11,12,13,14,15,16,17,18,19,20]
    },
    {
      url: "https://cst.brightspotcdn.com/dims4/default/ff4766f/2147483647/strip/true/crop/6631x4421+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FBQpjWgbghtXvoIoTpSQdo1ULxhs%3D%2F0x0%3A6631x4421%2F6631x4421%2Ffilters%3Afocal%283316x2211%3A3317x2212%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24588105%2Fmerlin_112753756.jpg",
      name: "Bryan Smith",
      description: "Creative barber known for unique and custom hair designs.",
      availability:"Saturday to Sunday 8am -8pm ",
      time:[8,9,10,11,12,13,14,15,16,17,18,19,20]
    },
    {
      url: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/1070489/biz_photo/4f784945f5b84924bec0d301d6d20f-mexthebarber-biz-photo-1ade0a5cd08e4e258867c336332728-booksy.jpeg?size=640x427",
      name: "Carlos Perez",
      description: "Master barber with over 10 years of experience.",
      availability:"Monday to  Friday 8am -8pm ",
      time:[8,9,10,11,12,13,14,15,16,17,18,19,20]
    },
    // {
    //   url: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/553493/biz_photo/4f3d98e98a14472b97eb1e4aaec93c-ricky-time-biz-photo-aaa68f36bb90426f9e856ab5aeb5c7-booksy.jpeg?size=640x427",
    //   name: "Ricky Time",
    //   description: "Top-rated barber with a talent for precision cuts."
    // },
    {
      url: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/63690/biz_photo/594cbcbad6d8413898d57e46d7a591-lucho-the-barbers-factory-biz-photo-e9a49a1b2d0e4afb86451f231765f9-booksy.jpeg?size=640x427",
      name: "Sarah Lee",
      description: "Specialist in modern styles and trends.",
      availability:"Saturday to Sunday 8am -8pm ",
      time:[8,9,10,11,12,13,14,15,16,17,18,19,20]
    },
    // {
    //   url: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/1162070/biz_photo/7d84a074f8cc48368c71ad15974b19-chimbala-barber-shop-biz-photo-82cba90bce0f46dd804e3a4cf1420d-booksy.jpeg?size=640x427",
    //   name: "Chris Johnson",
    //   description: "Highly skilled barber with a focus on beard grooming."
    // }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const previousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? barbers.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === barbers.length - 1 ? 0 : prevIndex + 1
    );
  };

  // const savesstyle = () => {
  //   alert (`Barber ${barbers[currentIndex].name} has been selected successfuly`);
  //   navigate("/booking");
  // };


  const selectBarber = (barber) => {
    setSelectedBarber(barber);
    alert (`Barber ${barber.name} has been selected successfuly`);
    console.log("barber",barber);
    
    // navigate("/booking",{barber:barber})
  };

  

  return (
    <div className="barber-container">
      {selectedBarber ? (  
      <Booking barber={selectedBarber}/>
      ) : (
        <div>
          <div className="picture-box">
          {/* <button className="arrow left-arrow" onClick={previousImage}>
        &#10094;
      </button> */}
          {barbers.map((barber, index) => (
            <div key={index}>
              <img className="picture" src={barber.url} alt="name" />
              {/* <button className="arrow right-arrow" onClick={nextImage}>
        &#10095;
      </button> */}
              <h3>{barber.name}</h3>
              <p>{barber.description}</p>
              <p>{barber.availability}</p>
              <button className="arrow right-arrow" onClick={() => selectBarber(barber)}>Select Barber</button>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Allbarber;
