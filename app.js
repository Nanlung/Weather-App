const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
  console.log(req.body.cityName)


  const query = req.body.cityName;
  const apiKey = "9aabee55b2634c47f9bd790f995ad89c";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "#";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>Today's temperature in "+ query +" is " + temperature + " Degrees Celsius</h1>")
      res.write("<p>The weather is currently " + weatherDescription + "</p>")
      res.write("<img src=" + imageURL + ">");
      res.send()
    })
  })

})

app.listen(PORT, () => console.log("Server is running on Port " + PORT));