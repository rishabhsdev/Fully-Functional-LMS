const path = require("path");
const fs = require("fs");
const express = require("express");
const { DateTime } = require("luxon");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  // const today = new Date();
  // const dayOfWeek = today.getDay();
  // const weekdays = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // const currentWeekday = weekdays[dayOfWeek].toUpperCase();
  const timeZone = "Asia/Kolkata";

  // Get the current date in the specified timezone
  const currentDateTime = DateTime.now().setZone(timeZone);

  // Get the name of the current day of the week
  const currentWeekday = currentDateTime.toFormat("cccc").toUpperCase();

  res.render("index", { currentWeekday });
});

app.get("/download-book", function (req, res) {
  const file = "resource/Your-Resources.zip";
  res.download(file); // Set disposition and send it.
  const log = `File "${file}" downloaded by ${
    req.ip
  } at ${new Date().toLocaleString()}\n`;
  fs.appendFile("downloads.txt", log, (err) => {
    if (err) {
      console.error("Error appending to log file:", err);
    }
  });
});

app.get("/payment-success-3377321", function (req, res) {
  const currentWeekday = "wed";
  res.render("payment-success", { currentWeekday });
});
app.listen(3000);
