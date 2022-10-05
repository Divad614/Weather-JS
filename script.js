let citySearch = true;
let weather = {
  "apiKey": "05d86e89b093790b151f7dab283e625a",
  "units": "metric",
  fetchWeather_byCity: function (city) {

    // The fetch() method in JavaScript is used to request to the server and load the information on the webpages. The request can be of any APIs that return the data of the format JSON or XML. This method returns a promise.

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
      + city
      + "&units="
      + this.units
      + "&appid="
      + this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather_byCity(data))
      .catch(() => alert("Error! City not found."))
  },
  displayWeather_byCity: function (data) {
    // Storing data from database to variables
    const name = data.name;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    console.log(name, icon, description, humidity, temp, windSpeed)

    // Displaying to the html

    document.querySelector(".location").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"
      + icon
      + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + windSpeed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
  },
  search_byCity: function (){
    this.fetchWeather_byCity(document.querySelector("#city-bar").value);
  },

  fetchWeather_byCoords: function (Latitude, Longitude) {

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat="
      + Latitude
      + "&lon="
      + Longitude
      + "&units="
      + this.units
      + "&appid="
      + this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather_byCoord(data))
      .catch((error) => { return alert("Error! Location not found.") })
  },

  displayWeather_byCoord: function (data) {
    // Storing data from database to variables
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    console.log(lat, lon, icon, description, humidity, temp, windSpeed)

    // Displaying to the html

    document.querySelector(".location").innerText = "Weather at Lat: " + lat + "°, Long: " + lon + "°";
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"
      + icon
      + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + windSpeed + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + "Nature" + "')"
  },

  search_byCoord: function () {
    this.fetchWeather_byCoords(document.querySelector("#lat-bar").value, document.querySelector("#lon-bar").value);
  }
  
}




document.querySelector("#search-btn").addEventListener("click", function (){
  console.log(citySearch)
  if (citySearch == true){
    weather.search_byCity();
  }
  else{
    weather.search_byCoord();
  }
  
})

document.querySelector("input").addEventListener("keyup", function (event){
  if (event.key == "Enter"){
    console.log("Enter")
    if (citySearch == true) {
      weather.search_byCity();
    }
    else {
      weather.search_byCoord();
    }
  }
})

document.querySelector("#location-btn").addEventListener("click", function(){
  citySearch = false;
  document.querySelector(".search-bar-div").innerHTML = `
  <div class="coord-search">
  <input type="text" id="lat-bar" class="search-bar" placeholder="Latitude">
  <input type="text" id="lon-bar" class="search-bar" placeholder="Longitude">
  </div>
  `;
})

document.querySelector("#city-btn").addEventListener("click", function(){
  citySearch = true;
  document.querySelector(".search-bar-div").innerHTML = `
  <input type ="text" id="city-bar" class="search-bar" placeholder = "Search">
  `;
})



weather.fetchWeather_byCity("Cape Town");

function CheckError(response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    throw Error(response.statusText);
  }
}