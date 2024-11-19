import logo from "./logo.svg";
import React from "react";
import "./App.css";
import "./home.css";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import SignupForm from "./Signupform";
import LoginForm from "./LoginForm";
import Registration from "./Registration";
import Presentation from "./Presentation";
import Barberinfo from "./Barberinfo";
import axios from "axios";
import Customerpage from "./Customerpage";
import Barber from "./Barber";
import Booking from "./Booking";
// import Welcome from './Welcome';
import { StyleContextProvider } from "./StyleContext";

// axios.defaults.withCredentials = true

const App = () => {
  return (
    <div className="App">
      <StyleContextProvider>
        {/* this style context provider is a bag that has the value of select hairstyle and selectbarber */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/customer" element={<Customerpage />} />
            <Route exact path="/select" element={<Barber />} />
            <Route exact path="/booking" element={<Booking />} />
            {/* <Route exact path = "/booking" render={(props) => <Booking {...props} />} /> */}
            {/* <Route exact path = "/login" element={<LoginForm/>} /> */}
            {/* <Route exact path = "*" element={<NotFound/>} /> */}
          </Routes>
        </BrowserRouter>
      </StyleContextProvider>
    </div>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
