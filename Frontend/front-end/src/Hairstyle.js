// Hairstyle.js

// send a call to the back end , tell the backend to provide all data about the barbers in the database
// select * all barbers in db
// barber data= select * from barbers
// renders data of the barbers here
// front end will display i

import "./App.css";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ImageSelected from "./ImageSelected";
import Booking from "./Booking";
import Barber from "./Barber";
import { Navigate } from "react-router-dom";
// import StyleContext from "./StyleContext";
import { useStyle, StyleContextProvider } from "./StyleContext";
import Allbarber from "./Allbarber";

const Hairstyle = () => {
  // const [selectedBarber, setSelectedBarber] = useState(null);
  const {
    selectedHairstyle,
    setSelectedHairstyle,
    selectedBarber,
    setSelectedBarber,
  } = useStyle();
  const [barbers, setBarbers] = useState([1]);
  const [choice,setChoice]=useState(false)

  const selectBarber = (barber) => {
    setChoice(true)
    setSelectedBarber(barber);
    
    alert(`Barber ${barber.name} has been selected successfuly`);
    console.log("barber", barber);
    {choice && (
      <Alert severity="success" onClose={handleClose}>
      <AlertTitle style>
        Barber ${barber.name} has been selected successfuly
      </AlertTitle>
    </Alert>
)
}

    // navigate("/booking",{barber:barber})
  };

  const urls = [
    {
      url: "https://wellgroomedgentleman.com/wp-content/uploads/Refined-Edge-Mastery-of-the-Taper-Fade-Haircut-1024x1005.jpg",
      name: "Fade",
    },
    {
      url: "https://content.latest-hairstyles.com/wp-content/uploads/man-bun-fade-with-a-bald-fade.jpg",
      name: "man bun",
    },
    {
      url: "https://djn2oq6v2lacp.cloudfront.net/wp-content/uploads/2023/01/6-Braids-hair-966.jpg",
      name: "Dreadlucks",
    },
  ];

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await fetch("http://localhost:3001/barbers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data);
        setBarbers(data.barbers);
        console.log("barbers", barbers);
      } catch (error) {
        console.error(`Error! ${error}`);
      }
    };

    fetchBarbers();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = createTheme({
    palette: {
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });

  const previousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? urls.length - 1 : prevIndex - 1
    );
  };

  const [select, setSelect] = useState(false);

  const [confirmStyle, setConfirmStyle] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setSelect(true);
    setSelectedHairstyle(urls[currentIndex].name);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const guidetoBarberchoice = () => {
    setConfirmStyle(true);
    // navigate("/select");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSelect(false);
  };

  return (
    <div>
            {choice && (
                    <Alert severity="success" onClose={handleClose}>
                    <AlertTitle style>
                      Barber ${selectBarber.name} has been selected successfuly
                    </AlertTitle>
                  </Alert>
      )
      }
      {confirmStyle && (
        // <StyleContext.Provider value={{ selectedHairstyle, selectedBarber }}>
        
        <div className="barber-container">
          {selectedBarber ? (
            <Booking />
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
                    <h3>{barber.name}</h3>
                    <p>{barber.description}</p>
                    <p>{barber.availability}</p>
                    <button
                      className="arrow right-arrow"
                      onClick={() => selectBarber(barber)}
                      //
                    >
                      Select Barber
                    </button>
                    
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        // </StyleContext.Provider>
      )}
      
      {select && (
        <Snackbar
          select={setSelect}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert style={{ display: confirmStyle ? "none" : "block" }} severity="success" onClose={handleClose}>
              <AlertTitle style={{ display: confirmStyle ? "none" : "block" }}>
                {urls[currentIndex].name} selected{" "}
              </AlertTitle>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={guidetoBarberchoice}
                style={{ display: confirmStyle ? "none" : "block" }}
              >
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
          <img
            className="picture"
            src={urls[currentIndex].url}
            alt="Hairstyle"
          />
          <button className="arrow left-arrow" onClick={previousImage}>
            &#10094;
          </button>
          <button className="arrow right-arrow" onClick={nextImage}>
            &#10095;
          </button>

          <br />
          <br />

          <Stack sx={{ width: "100%" }} spacing={2}>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={handleClick}
              >
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
