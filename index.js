let now = new Date();
console.log(now);
let time = document.querySelector("p.time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = days[now.getDay()];
time.innerHTML = `Last updated: ${day} ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-sm-12">
    <div class="weather-forecast-date">
      ${formatDay(forecastDay.dt)}
    
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="40"
      />
      <span class="weather-forecast-temperature-max"> ${Math.round(
        forecastDay.temp.max
      )}° </span>
      <span class="weather-forecast-temperature-min"> ${Math.round(
        forecastDay.temp.min
      )}° </span>
    </div>
  </div> `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h3 = document.querySelector("h3");
  h3.innerHTML = ` ${searchInput.value} `;
  let apiKey = "a23d851849871199f2c9de1d2c17b86e";
  let city = ` ${searchInput.value} `;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function getForecast(coordinates) {
  let apiKey = "a23d851849871199f2c9de1d2c17b86e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let h3 = document.querySelector("h3");
  let city2 = document.querySelector("#search-input").value;
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${city2} ${temperature}°`;
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a23d851849871199f2c9de1d2c17b86e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather2);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showWeather2(response) {
  let h3 = document.querySelector("h3");
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${response.data.name} ${temperature}°  `;
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

getCurrentPosition();
getForecast();
