require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/users.js");
const statementRoutes = require("./routes/statements.js");

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

app.set("trust proxy", 1);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://main--machakath.netlify.app",
  })
);
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/statements", statementRoutes);

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to db");
    app.listen(port, () => {
      console.log("listening to port " + port);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database: " + error);
  });
