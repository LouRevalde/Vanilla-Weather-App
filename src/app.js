
async function callWeatherApi(city){
    let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric";

  let apiKey = "fed03514983638a54735d70b1ce10759";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayData);
}
 
function Temperature(temp) {
    return {temperature: temp,
            unit: "metric",
           convertF: function() {
            this.unit = "imperial"; 
        return ((this.temperature * 9) / 5 + 32);},
            convertC: function (){
                this.unit = "metric";
                return this.temperature;
            }}
 }

function Windspeed(wind, windvar) {
    return {windspeed: wind,
        unit: "metric",
        windvar: "0",
        convertMi: function() {
            this.unit = "imperial";
            this.windvar = Math.round((this.windspeed /1.609344));
            return (`${windvar} mph`);},
        convertKm: function() {
            this.unit = "metric";
            return (`${(this.windspeed)} m/s`);
        }}
}


 function submitCity(event) {
    event.preventDefault();
    let cityselected = citysearch.value.trim();
    callWeatherApi(cityselected);
    console.log(cityselected);
}


let Icons = {
    
        Clear: {
            icon: 'sun.gif',
            href: "https://www.flaticon.com/free-animated-icons/sun",
            title: "sun animated icons",
            innerhtml: "Sun animated icons created by Freepik - Flaticon"},
     
        Thunderstorm: {
            icon: 'storm.gif',
            href: "https://www.flaticon.com/free-animated-icons/weather",
            title: "weather animated icons",
            innerhtml: "Weather animated icons created by Freepik - Flaticon"},

        Drizzle: {
            icon:'drizzle.gif',
            href: "https://www.flaticon.com/free-animated-icons/rain",
            title: "rain animated icons",
            innerhtml: "Rain animated icons created by Freepik - Flaticon"},

        Rain: {
            icon: 'rain.gif',
            href: "https://www.flaticon.com/free-animated-icons/rain",
            title: "rain animated icons",
            innerhtml: "Rain animated icons created by Freepik - Flaticon"},
    
        Snow: {
            icon: 'snowflake.gif',
            href: "https://www.flaticon.com/free-animated-icons/snow",
            title: "snow animated icons",
            innerhtml: "Snow animated icons created by Freepik - Flaticon"},
    
        Tornado: {
            icon: 'whirlwind.gif',
            href: "https://www.flaticon.com/free-animated-icons/tornado",
            title: "tornado animated icons",
            innerhtml: "Tornado animated icons created by Freepik - Flaticon"},
    
        Clouds: {
            icon: 'clouds.gif',
            href: "https://www.flaticon.com/free-animated-icons/weather",
            title: "weather animated icons",
            innerhtml: "Weather animated icons created by Freepik - Flaticon"},
    
        Other: {
            icon: 'foggy.gif',
            href: "https://www.flaticon.com/free-animated-icons/weather",
            title: "weather animated icons",
            innerhtml: "Weather animated icons created by Freepik - Flaticon"}
    }


function updateIcon(){
 
    for(const key in Icons){
        let x = document.getElementById("attribution");
        if(key === weathericon){
            document.getElementById("main-icon").src=`src/images/weathericons/${Icons[key].icon}`;
            /*console.log(Icons[key].href);*/
            x.href= Icons[key].href;
            x.title= Icons[key].title;
            x.innerHTML= Icons[key].innerhtml;
        }
    }
}

function updateDisplay(temp, wind){
    let city = document.querySelector("#city")
    let maintemp1 = document.querySelector("#temp");
    let pressure1 = document.querySelector("#pressure");
    let humidity1 = document.querySelector("#humidity");
    let wind1 = document.querySelector("#wind");
    let weathercond1 = document.querySelector(".cond");
    
    city.innerHTML = `${cityname}`
    maintemp1.innerHTML = `${temp}°`;
    pressure1.innerHTML = `Pressure: ${pressure} hPa`;
    humidity1.innerHTML = `Humidity: ${humidity} %`;
    wind1.innerHTML = `Wind: ${wind}`;
    weathercond1.innerHTML = `${weathercond}`;

    updateIcon();
}

function displayData(response) {
    console.log(response.data);
    cityname = response.data.name;
    temp = new Temperature(Math.round(response.data.main.temp));
    maintemp = temp.temperature;
    let tempMx = new Temperature(Math.round(response.data.main.temp_max));
    tempMax = tempMx.temperature;
    let tempMn = new Temperature(Math.round(response.data.main.temp_min));
    tempMin = tempMn.temperature;
    pressure = response.data.main.pressure;
    humidity = response.data.main.humidity;
    wind = new Windspeed(Math.round(response.data.wind.speed));
    windsp = wind.convertKm(); 
    weathercond = response.data.weather[0].description;
    weathericon = response.data.weather[0].main;
    
    updateDisplay(maintemp, windsp);
}

function getCurrentDate() {
    
    let now = new Date();
    //let min = now.getMinutes();
    //let hour = now.getHours();
    let day = now.getDay();
    let month = now.getMonth();
    let date = now.getDate();
    let year = now.getFullYear();

    let datenow = document.querySelector(".date");
    let time = document.querySelector(".time");

    //datenow.innerHTML = `${day} ${date}/${month}/${year}`;
    const event = new Date(Date.UTC(year, month, date, day, 0, 0));
    const options = {weekday: "short", year: 'numeric', month: 'short', day: 'numeric'};
    
    datenow.innerHTML = `${event.toLocaleDateString(undefined, options)}`;
    time.innerHTML = `${event.toLocaleTimeString()}`
}

function displayTime() {
    let getCurrentTime = document.querySelector(".time");
    let current = new Date();
    timestr = current.toLocaleTimeString();
    getCurrentTime.innerHTML = `${timestr}`;
}

function convertUnit(){
    convert()

}




function toDegrees(){
        let tempC = new Temperature(maintemp);
        let windC = new Windspeed(windsp);
        updateDisplay(tempC.convertC, windC);
    }

function toImperial(){
        updateDisplay(temp.convertF, wind.convertMi);
    }


 //api call
now = new Date();
console.log(now.getMinutes()); 
console.log(now.getHours());
console.log(now.getMonth());
console.log(now.getDay());
console.log(now.getFullYear());


getCurrentDate();
setInterval(displayTime, 1000);
callWeatherApi("Sydney");

let citysearch = document.querySelector("#search-box");
let submit = document.querySelector("#search-form");
submit.addEventListener("submit", submitCity);
let cityname;
let maintemp;
let tempMax;
let tempMin;
let pressure;
let humidity;
let weathercond;
let weathericon;
let windsp;

let cels = document.querySelector("#deg");
//cels.addEventListener("click", toDegrees);
let fahrnht = document.querySelector("#fahr");
//fahrnht.addEventListener("click", toImperial);


/*
function displayDatetime() {
    /*let datenow = document.querySelector(".date");
    let time = document.querySelector(".time")
    datenow.innerHTML = `${date}/${month}/${year}`;
    time.innerHTML = `${hour}:${min}`
}


function formatDate() {
    

}

function formatTime() {

} 
*/