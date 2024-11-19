// backend app.js

const express = require("express");
const app = express();

const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const router = express.Router();

// parse body
const bodyparser = require("body-parser");
// cookie body
const cookieParser = require("cookie-parser");
// create session to keep user log in
const session = require("express-session");
const nodemon = require("nodemon");
const supabase = require("./supabaseClient");

app.use(bodyparser.json());
app.use(express.json());
app.use(
  cors({
    AccessControlAllowOrigin: [
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    origin: "http://localhost:3000",
    methods: ("GET", "POST", "PUT", "DELETE"),
    credentials: true,
  })
);

app.use(cookieParser());
// app.use(express.urlencoded({extended: true}));
app.use(express.json()); //
app.use(bodyparser.urlencoded({ extended: true }));
app.set("trust proxy", true);
app.use(bodyparser());
// app.set('trust proxy', true)
app.use(
  session({
    // store: new RedisStore({ client: redisClient }),
    key: "user",
    secret: "secret",
    resave: true,
    // what works loacally
    // saveUninitialized: true,
    // secure:false,
    saveUninitialized: true,
    cookie: {
      // secure:true,
      secure: false, // Ensure cookies are only sent over HTTPS in production
      // sameSite: "none", // Prevents CSRF attacks; use 'strict' in production
      // or lax
      // httpOnly: true, // Helps prevent XSS attacks by not allowing client-side JavaScript to access the cookie
      // secure: true,
      expires: 1000 * 60 * 60 * 24,
    },
  })
);

app.post("/signup", async (request, response) => {
  const { username, password, type } = request.body;
  console.log("Username:", username); // Log username separately

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
      .from("users")
      .insert([{ username: username, password: hashedPassword, type: type }])
      .select()
      .single();
    console.log("ERROR", error);
    console.error("error", error);
    if (data) {
      // Check if data exists
      console.log(data);
      request.session.user = data; // Assign the session
      response.json({ success: true, message: "User signed up successfully" });
    } else {
      // Handle potential insertion errors
      response.status(400).json({ success: false, message: error });
    }
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.get("/login", (request, response) => {
  if (!request.session.user) {
    response.send({ loggedIn: true, user: request.session.user });
  } else {
    response.send({ loggedIn: false });
  }
});

app.get("/barbers", async (req, res) => {
  try {
    // Fetch data from the barbers table
    const { data: barbers, error } = await supabase.from("barbers").select("*");

    if (error) {
      console.error("Supabase error:", error.message, error.hint);
      return res
        .status(500)
        .json({ success: false, message: "Failed to fetch barbers." });
    }

    // Return the data as a response
    res.json({ success: true, barbers: barbers || [] });
  } catch (error) {
    console.error("Internal server error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/book-appointment", async (req, res) => {
  const { barberId, date, time } = req.body;

  try {
    // Check if the slot is already booked
    const { data: existingAppointment, error: checkError } = await supabase
      .from("appointments")
      .select("*")
      .eq("barber_id", barberId)
      .eq("date", date)
      .eq("time", time);

    if (checkError) {
      console.error("Error checking appointment:", checkError);
      return res
        .status(500)
        .json({ message: "Error checking appointment availability." });
    }

    if (existingAppointment && existingAppointment.length > 0) {
      return res
        .status(400)
        .json({ message: "This time slot is already booked." });
    }

    // Save the appointment
    const { error: insertError } = await supabase
      .from("appointments")
      .insert([{ barber_id: barberId, date: date, time: time }]);

    if (insertError) {
      console.error("Error inserting appointment:", insertError);
      return res.status(500).json({ message: "Error booking appointment." });
    }

    res.status(200).json({ message: "Appointment booked successfully!" });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/login", async (request, response) => {
  const { username, password, type } = request.body;
  console.log("Username:", username);

  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single(); // Expecting only one user

    if (error) {
      response.status(400).json({ success: false, message: "User not found" });
      return;
    }

    const user = data;
    const passwordMatch = await bcrypt.compare(password, user.password);
    const userTypeMatch = user.type === type;

    if (passwordMatch && userTypeMatch) {
      request.session.user = user;
      request.session.save();

      if (user.type === "customer") {
        response.json({
          success: true,
          message: "Login successful as a customer",
        });
      } else if (user.type === "barber") {
        response.json({
          success: true,
          message: "Login successful as a barber",
        });
      }
    } else {
      response
        .status(401)
        .json({ success: false, message: "Invalid credentials or user type" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
