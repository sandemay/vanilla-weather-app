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
time.innerHTML = ` ${day} ${hour}:${minutes}`;

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

function showWeather(response) {
  let h3 = document.querySelector("h3");
  let city2 = document.querySelector("#search-input").value;
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${city2} ${temperature}°`;
  let descriptionElement = document.querySelector("#description");

  let iconElement = document.querySelector("#icon");
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
