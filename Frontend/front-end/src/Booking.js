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
import StyleContext from "./StyleContext";

function Booking() {
  const [value, setValue] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const { selectedHairstyle, selectedBarber } = useContext(StyleContext);
  const [selectDate, setSelectDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const location = useLocation();
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

  const removeTime = () => {
    console.log("selectedBarber.time",selectedBarber.time)
    const BarberTime =selectedBarber.time
    BarberTime.filter(t => t !== ChosenTime);
  }

  const displayTime = () => {
    setShowTime(true);
  };

  const displayMessage = () => {
    setShowMessage(true);
    // loop through selectbarber.time array , and remove time inside the array selectbarber so that the user cannot be able to select it
  };

  const allowedTimes = selectedBarber.time.map((barberTime) =>
    dayjs().set("hour", barberTime).set("minute", 0)
  );

  //   dayjs().set('hour', 9).set('minute', 0),
  //   dayjs().set('hour', 12).set('minute', 0),
  //   dayjs().set('hour', 15).set('minute', 0),
  // ];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log("Selected time:", time.format("hh:mm A"));
    console.log("selectedBarber.time",selectedBarber.time);
  };

  return (
    // if the user doesn't click on confirm do this
    <div>
      {value && value.format("YYYY-MM-DD") === "2024-10-26" ? (
        <Alert severity="warning">
          <AlertTitle>This date is not av\'///ailable for booking.</AlertTitle>
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
            <h2>{selectedBarber.firstname}</h2>
            <p className="hrstyle"> Hairstyle: {selectedHairstyle}</p>
            {selectedTime && (
              <div>
                <Button className="book"
                // remove time chosen time from the array of time
                onClick={removeTime}
                > Book appointment in {formattedDate} at{ChosenTime}
                </Button>
              </div>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]}>
                <DemoItem label="Controlled calendar">
                  <DateCalendar value={value} onChange={handleDateChange} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
            {/* <p className="selecteddate">Selected date: {formattedDate}</p> */}
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

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                          <div className="hour">
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
                        {showMessage && (
                          <p>your appointment has been booked successfuly at</p>
                        )}
                      </div>
                    </DemoItem>
                  </div>
                </DemoContainer>
              </LocalizationProvider> */}
        </div>
      )}
    </div>
  );
}

export default Booking;
