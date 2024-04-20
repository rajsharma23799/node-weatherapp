const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    author: "Raj Sharma",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    author: "Raj Sharma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "What help you need?",
    help: "We are here to serve you :)",
    author: "Raj Sharma",
  });
});

app.get("/weather", (req, res) => {
  //console.log(req.query);
  let address = req.query.location;
  if (!address) {
    return res.send({
      error: "Please provide address",
    });
  }

  geocode(address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send({ err });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });

  // res.send([
  //   {
  //     location: "Kanpur",
  //     forecast:
  //       "It is sunny throught the day!! And current temperature is 36 degrees and feels like 35.6 degrees.",
  //     address,
  //   },
  // ]);
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "OOPS!!!",
    msg: "Article not found.",
    author: "Raj Sharma",
  });
});

//why it need to come last, when req come to node it look for match from top to bottom
app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    msg: "Page not Found !!!",
    author: "Raj Sharma",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
