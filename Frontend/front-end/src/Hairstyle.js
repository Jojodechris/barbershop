// Hairstyle.js

import "./App.css";
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import AlertTitle from '@mui/material/AlertTitle';
import  Snackbar from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import ImageSelected from "./ImageSelected";
import Booking from "./Booking";
import Barber from "./Barber";
import StyleContext from "./StyleContext";
import Allbarber from "./Allbarber";

const Hairstyle = () => {
  const [selectedBarber, setSelectedBarber] = useState(null);
  // Array of barbers with image, name, and description
  

  // const style= useContext(StyleContext);
  const barbers = [
    {
      link: "https://media.11alive.com/assets/WXIA/images/bdfb4c2d-9146-4be2-a61d-297df2f3f787/bdfb4c2d-9146-4be2-a61d-297df2f3f787_1140x641.jpg",
      firstname: "Johnson Jones",
      description: "Experienced barber specializing in fades and classic cuts.",
      availability:"Monday to  Friday 8am -8pm ",
      time:[8,9,10,11,12,13,14,15,16,17,18,19,20]
    },
    {
      link: "https://cst.brightspotcdn.com/dims4/default/ff4766f/2147483647/strip/true/crop/6631x4421+0+0/resize/840x560!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FBQpjWgbghtXvoIoTpSQdo1ULxhs%3D%2F0x0%3A6631x4421%2F6631x4421%2Ffilters%3Afocal%283316x2211%3A3317x2212%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24588105%2Fmerlin_112753756.jpg",
      firstname: "Bryan Smith",
      description: "Creative barber known for unique and custom hair designs.",
      availability:"Saturday to Sunday 8am -8pm ",
      time:[10,12,13,14,15,16,17,18,19,20]
    },
    {
      link: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/1070489/biz_photo/4f784945f5b84924bec0d301d6d20f-mexthebarber-biz-photo-1ade0a5cd08e4e258867c336332728-booksy.jpeg?size=640x427",
      firstname: "Carlos Perez",
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
      link: "https://d2zdpiztbgorvt.cloudfront.net/region1/us/63690/biz_photo/594cbcbad6d8413898d57e46d7a591-lucho-the-barbers-factory-biz-photo-e9a49a1b2d0e4afb86451f231765f9-booksy.jpeg?size=640x427",
      firstname: "Sarah Lee",
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

  // const [currentIndex, setCurrentIndex] = useState(0);

  // const previousImage = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? barbers.length - 1 : prevIndex - 1
  //   );
  // };

  // const nextImage = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === barbers.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

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
  
  const urls = [
    {
      url:"https://wellgroomedgentleman.com/wp-content/uploads/Refined-Edge-Mastery-of-the-Taper-Fade-Haircut-1024x1005.jpg",
      name:"Fade"
     },
     {
      url:"https://content.latest-hairstyles.com/wp-content/uploads/man-bun-fade-with-a-bald-fade.jpg",
      name:"man bun"
     },
      {
        url:"https://djn2oq6v2lacp.cloudfront.net/wp-content/uploads/2023/01/6-Braids-hair-966.jpg",
        name:"Dreadlucks"
        },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = createTheme({
    palette: {
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });

  const previousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? urls.length - 1 : prevIndex - 1
    );
  };




  const [select, setSelect] = useState(false);
  const [selectedHairstyle, setSelectedHairstyle] = useState('');
  const [confirmStyle,setConfirmStyle] = useState(false)
  
  const navigate = useNavigate();
  
  const handleClick= () => {
    setSelect(true);
    setSelectedHairstyle(urls[currentIndex].name);
    }

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const guidetoBarberchoice = () => {
    setConfirmStyle(true);
}

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSelect(false);
  };

  return (
    <div>
      {
        confirmStyle && (
          <StyleContext.Provider value = {{selectedHairstyle,selectedBarber}}>
            {/* <Allbarber /> */}
            <div className="barber-container">
      {selectedBarber ? (  
      <Booking/>
      ) : (
        <div>
          <div className="picture-box">
          {/* <button className="arrow left-arrow" onClick={previousImage}>
        &#10094;
      </button> */}
          {barbers.map((barber, index) => (
            <div key={index}>
              <img className="picture" src={barber.link} alt="name" />
              {/* <button className="arrow right-arrow" onClick={nextImage}>
        &#10095;
      </button> */}
              <h3>{barber.firstname}</h3>
              <p>{barber.description}</p>r
              <p>{barber.availability}</p>
              <button className="arrow right-arrow" onClick={() => selectBarber(barber)}>Select Barber</button>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>

          </StyleContext.Provider>
        )
      }
                {select && (
                    <Snackbar
                    select={setSelect}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  >
                    
          <Alert severity="success" onClose={handleClose}>
          <AlertTitle>{urls[currentIndex].name} selected </AlertTitle>
          <Button  variant="contained" color="inherit" size="small" onClick={guidetoBarberchoice}>
              confirm 
          </Button>
        </Alert>
        </Snackbar>

        )}
        
        {/* <div>
        </div> */}
         {!confirmStyle && (
        <div className="picture-box image">
          {/* <button className="arrow left-arrow" onClick={previousImage}>
            &#10094;
          </button> */}
          <img className="picture" src={urls[currentIndex].url} alt="Hairstyle" />
          <button className="arrow left-arrow" onClick={previousImage}>
            &#10094;
          </button>
          <button className="arrow right-arrow" onClick={nextImage}>
            &#10095;
          </button>
   

          <br /><br />

          <Stack sx={{ width: '100%' }} spacing={2}>
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="inherit" size="small" onClick={handleClick}>
                Select hairstyle
              </Button>
            </ThemeProvider>
            Click to select the current hairstyle.
          </Stack>
        </div>
      )}
    </div>
  );
};
export default Hairstyle;