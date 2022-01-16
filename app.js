const express = require("express");
const ejs = require("ejs");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/dbconfig");
require("dotenv").config();
const blogRoute = require("./routes/blogRoutes");

const app = express();

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// blog routes
app.use("/blogs", blogRoute);

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// // 404 page - page does not exist
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
