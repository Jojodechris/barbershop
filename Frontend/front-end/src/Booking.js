// Booking.js

import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Alert, AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Button";
import ImageSelected from "./ImageSelected";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { useLocation } from "react-router-dom";
// import StyleContext from "./StyleContext";
import { useStyle } from "./StyleContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isWeekend } from "date-fns";

// strategies

// when the user selects a barber
// go to the database of this barber and render his disabled shedule(disabled dates and disabled times)
// return those disabled schedule to the front end
// then the front end will render the  calendar based on the barber schedule

// what happens when the user finish selecting a date and a time slots
// add this date to the database of disabled schedule
// then send the updated list of disable schedule to the front end
// then the front end will render the updated list of disable dates to the user

function Booking() {
  const disabledDates = [new Date(2024, 0, 1), new Date(2024, 11, 25)];
  const [startDate, setStartDate] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  // const { selectedHairstyle, selectedBarber } = useContext(StyleContext);
  const { selectedHairstyle, selectedBarber } = useStyle();
  const [selectDate, setSelectDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [details, setDetails] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  // const clientDate = startDate.format("YYYY-MM-DD");
  const location = useLocation();
  const barber_id = selectedBarber.id;
  // const selectedStyle = location.state?.style;

  // const [selectedHairstyle, setSelectedHairstyle] = useState(selectedHairstyle);

  const formattedDate = value ? value.format("YYYY-MM-DD") : "No date selected";

  const ChosenTime = selectedTime
    ? selectedTime.format("hh:mm A")
    : "No time selected";

  const handleDateChange = (newValue) => {
    // Check if the selected date is '2024-10-20'
    if (newValue && newValue.format("YYYY-MM-DD") === "2024-10-20") {
      return; // Do not update the state if it's the restricted date
    }
    setValue(newValue);
  };

  const handleSelectDate = () => {
    setSelectDate(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSelectDate(false);
  };

  // const removeTime = () => {
  //   console.log("selectedBarber.time", selectedBarber.time);
  //   const BarberTime = selectedBarber.time;
  //   BarberTime.filter((t) => t !== ChosenTime);
  // };

  

  const handleConfirmAppointment = async () => {
    try {
      // Send data to the backend
      const response = await fetch("http://localhost:3001/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to book appointment.");
      }

      // On success
      setSuccessMessage("Appointment confirmed!");
      console.log("Appointment details:", result);

      // Redirect or update the UI
      // navigate('/success-page'); // Example: React Router
    } catch (error) {
      console.error("Error confirming appointment:", error);
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  const displayTime = () => {
    console.log("details", details);
    setShowTime(true);
  };

  const displayMessage = () => {
    setShowMessage(true);
    // loop through selectbarber.time array , and remove time inside the array selectbarber so that the user cannot be able to select it
  };

  const allowedTimes = selectedBarber.time.map((barberTime) =>
    dayjs().set("hour", barberTime).set("minute", 0)
  );

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log("Selected time:", time.format("hh:mm A"));
    console.log("selectedBarber.time", selectedBarber.time);
    console.log("startDate", startDate);
    const date = format(startDate, "EEEE, MMMM d, yyyy");
    setDetails({
      date: date,
      time: time.format("hh:mm A"),
      barberId: selectedBarber.id,
    });
  };

  return (
    // if the user doesn't click on confirm do this
    <div>
      {value && value.format("YYYY-MM-DD") === "2024-10-26" ? (
        <Alert severity="warning">
          <AlertTitle>This date is not available for booking.</AlertTitle>
        </Alert>
      ) : (
        <div>
          {!showTime && (
            // show user calendar
            <Snackbar
              selectDate={setSelectDate}
              autoHideDuration={1000}
              onClose={() => setSelectDate(false)}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            ></Snackbar>
          )}
          <div className="calendar">
            {/* display barber picture */}
            <img className="circle" src={selectedBarber.link} alt="name" />
            <h2>{selectedBarber.name}</h2>
            <p className="hrstyle"> Hairstyle: {selectedHairstyle}</p>
            <p className="hrstyle">Enter a date </p>
            {selectedTime && (
              <div>
                <Button
                  className="book"
                  // remove time chosen time from the array of time
                  onClick={handleConfirmAppointment}
                >
                  {" "}
                  Book appointment in {format(
                    startDate,
                    "EEEE, MMMM d, yyyy"
                  )}{" "}
                  at{ChosenTime}
                </Button>
              </div>
            )}

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              filterDate={(date) =>
                // if the barber doesn't work during the weekend do this
                !isWeekend(date) &&
                // if the barber doesn't work during the holidays do this
                // !isHoliday(date) &&
                !disabledDates.some((d) => d.getTime() === date.getTime())
              }
            />
            <br />

            {/* <p className="selecteddate">Selected date: {formattedDate}</p> */}
            <div className="datebutton">
              <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={displayTime}
                style={{ display: selectedTime ? "none" : "block" }}
              >
                Select Date
              </Button>
            </div>
          </div>

          {showTime && (
            // show time only

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DigitalClock"]}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <DemoItem label="Custom Digital Clock">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "10px",
                      }}
                    >
                      {allowedTimes.map((time) => (
                        <div
                          className="hour"
                          style={{ width: "calc(50% - 10px)" }}
                        >
                          <Button
                            key={time.format()}
                            variant={
                              selectedTime &&
                              selectedTime.hour() === time.hour() &&
                              selectedTime.minute() === time.minute()
                                ? "contained"
                                : "outlined"
                            }
                            color={
                              selectedTime &&
                              selectedTime.hour() === time.hour() &&
                              selectedTime.minute() === time.minute()
                                ? "primary"
                                : "default"
                            }
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time.format("hh:mm A")}
                          </Button>
                        </div>
                      ))}
                      {selectedTime && (
                        <div>
                          <Button className="book">Book</Button>
                        </div>
                      )}
                      {showMessage && (
                        <p>your appointment has been booked successfuly at</p>
                      )}
                    </div>
                  </DemoItem>
                </div>
              </DemoContainer>
            </LocalizationProvider>
          )}
        </div>
      )}
    </div>
  );
}

export default Booking;
