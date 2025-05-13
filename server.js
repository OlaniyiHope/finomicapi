const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const MongoStore = require("connect-mongo");

const authRoute = require("./routes/authRoute");
const aiRoute = require("./routes/aiRoute");
dotenv.config();
console.log("DATABASE_URL from .env:", process.env.DATABASE_URL);
const app = express();

// app.use(express.json());
app.use(express.json({ limit: "50gb" }));
app.use(express.urlencoded({ extended: true, limit: "50gb" }));

// Configure CORS
const corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:5173",
    "https://dreamsimu.vercel.app",
    "https://www.lifemirror.org",
    "https://lifemirror.org",
    "https://lifemirrordashboard.vercel.app",
    "https://dashboard.lifemirror.org",
    "https://admin.lifemirror.org",
  ], // specify your client's URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key", "X-Api-Key"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://blog.zarichtravels.com");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use("/api/auth", authRoute);
app.use("/api/ai", aiRoute);

// Use commonRouter with specific routes requiring authentication

// app.use("/api/", commonRoute(s3));

// app.use("/api/", commonRoute(s3));
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
