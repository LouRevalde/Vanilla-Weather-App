
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

 function submitCity(event) {
    event.preventDefault();
    let cityselected = citysearch.value.trim();
    callWeatherApi(cityselected);
    console.log(cityselected);
}

function addAttribution(){
    const newlink = document.createElement("a");
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
        if(key === weathericon){
            document.getElementById("main-icon").src=`src/images/weathericons/${Icons[key].icon}`;
            console.log(Icons[key].href);
            document.getElementById("attribution").setAttribute('href', Icons[key].href);
            document.getElementById("attribution").setAtrribute('title', Icons[key].title);
            document.querySelector("#attribution").textContent= Icons[key].innerHTML;
            /*have to create function to create link*/
        }
    }
}

function updateDisplay(){
    let city = document.querySelector("#city")
    let maintemp1 = document.querySelector("#temp");
    let pressure1 = document.querySelector("#pressure");
    let humidity1 = document.querySelector("#humidity");
    let wind1 = document.querySelector("#wind");
    let weathercond1 = document.querySelector(".cond");
    
    city.innerHTML = `${cityname}`
    maintemp1.innerHTML = `${maintemp}°`;
    pressure1.innerHTML = `Pressure: ${pressure}`;
    humidity1.innerHTML = `Humidity: ${humidity}`;
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
    wind = response.data.wind.speed;
    weathercond = response.data.weather[0].description;
    weathericon = response.data.weather[0].main;
    
    updateDisplay();
}

 //api call
now = new Date();
console.log(now.getMinutes()); 
console.log(now.getHours());
console.log(now.getMonth());
console.log(now.getDay());
console.log(now.getFullYear());


let citysearch = document.querySelector("#search-box");
let submit = document.querySelector("#search-form");
submit.addEventListener("submit", submitCity);
let cityname;
let maintemp;
let tempMax;
let tempMin;
let pressure;
let humidity;
let wind;
let weathercond;
let weathericon;

 
/*
 function City(city) {
    return {
        city: city,
    }
 }*/