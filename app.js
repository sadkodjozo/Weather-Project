const express = require('express');
const app = express();
const https = require('https');

app.use(express.urlencoded({extended:true}));
// app.use(express.json());


app.get('/', function (req, res) {

    res.sendFile(__dirname + "/index.html");
    
});

app.post("/", function(req,res){
    
    const query  = req.body.cityName; 
    
    const apiKey  = "9dea9d7afa497c6d5d3f6ba3d829d449"//WEATHER_API_KEY; 
    const units = req.body.unit;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=' +units + '&appid='+apiKey;

    const unit = (units == "metric")? "Celsius" : "Fahrenheit";
    https.get(url, function (response) {
        // console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weather_des = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon;
            const iconurl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            const icon = '<img src=' + iconurl + '>';
            res.write('<html>');
            res.write("<h1>The temparature in " +query + " is "+ temp + " degrees " + unit+"</h1>");
            res.write("<h3>It is " + weather_des +"</h3>");
            res.write(icon);
            
            res.send();
        })
    });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);