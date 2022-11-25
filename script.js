const http = require("http");
const fs = require("fs");
const fetch = require('node-fetch');
var url = "http://api.openweathermap.org/data/2.5/weather?q=charkhi%20dadri&appid=74fa0133e3aa49a60919183ebb2fc453"
var data=fs.readFileSync("index.html","utf-8");

var jsonData;
const request = async () => {
    const response = await fetch(url);
    const json = await response.json();
    data = data.replace("{%loc%}", json.name);
    data = data.replace("{%temp%}", Math.round((json.main.temp - 273)*100)/100);
    data = data.replace("{%mintemp%}", Math.round(100*(json.main.temp_min - 273))/100);
    data = data.replace("{%maxtemp%}", Math.round((json.main.temp_max - 273)*100)/100);
    console.log(json, data);

    if (json.weather[0].main == "Rain") {
        data = data.replace("{%mossam%}", "cloud-rain");
    }else if (json.weather[0].main == "Sun") {
        data = data.replace("{%mossam%}", "sun");
    } else if (json.weather[0].main == "Cloud") {
        data = data.replace("{%mossam%}", "cloud");
    }


    const server = http.createServer((req, resp) => {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.end(data);
    })
    server.listen(8000, "127.0.0.1");
}

request();

