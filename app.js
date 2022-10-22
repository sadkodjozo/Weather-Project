const { render } = require('ejs');
const express = require('express');
const app = express();
const https = require('https');
// const api = require(__dirname + "/api.js");

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

let weatherData;
let temp;
let weather_des;
let iconCode;
let iconurl;
let icon;
let units;
let unit;
const apiKey = "9dea9d7afa497c6d5d3f6ba3d829d449" //WEATHER_API_KEY; 
let url;

var query;


app.set("view engine", "ejs");

app.get('/', function (req, res) {

    // res.sendFile(__dirname + "/index.html");

    res.render("weather");
});

app.post("/", function (req, res) {

    query = req.body.cityName;

    units = req.body.unit;
    unit = (units == "metric") ? "Celsius" : "Fahrenheit";
    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=' + units + '&appid=' + apiKey;


    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on('data', function (data) {
            weatherData = JSON.parse(data);
            temp = weatherData.main.temp;
            weather_des = weatherData.weather[0].description;
            iconCode = weatherData.weather[0].icon;
            iconurl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            // icon = '<img src=' + iconurl + '>';
            // res.write('<html>');
            // res.write("<h1>The temparature in " +query + " is "+ temp + "&deg" + unit+"</h1>");
            // res.write("<h3>It is " + weather_des +"</h3>");
            // res.write(icon);

            // res.send();

            res.redirect('/result');
        })
    });
});

app.get('/result', function (req, res) {
    res.render("result", { city: query, TEMP: temp, UNIT: unit, DESCRIPTION: weather_des, iconURL: iconurl });
});


// Listen

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});