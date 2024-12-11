"use strict";
let allWeather = document.querySelector(".all-weather");
let inputSearch = document.querySelector(".search");
let locationNow = document.querySelector(".location-now");
let currentTime = document.querySelector(".time-now");
let spanCity = document.createElement("span");
let BgBlackWhite = "bg-black";
let curTime = document.createElement("p");
let ampm = document.createElement("span");
ampm.classList.add("fs-6", "text-danger");
spanCity.classList.add("fs-6", "location-city");
curTime.classList.add("fs-4", "location-city", "m-0", "fw-bold");

async function getCureentDay(country) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ce4eaaa35464411ba45185155241112&q=${country}=07112&days=7`
  );
  let data = await response.json();
  dispalyDataWeather(data);
}
function transformFirstChar(str) {
  let nameCountry = str.charAt(0).toUpperCase() + str.slice(1, str.length);
  return nameCountry;
}

getCureentDay(transformFirstChar("cairo"));

function dispalyDataWeather(obj) {
  allWeather.innerHTML = "";
  const apiDate = obj.location.localtime;
  const date = new Date(apiDate);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfMonth = date.getDate();
  const dayName = days[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const latValue = obj.location.lat;
  const lonValue = obj.location.lon;
  const northSouth = latValue >= 0 ? "North" : "South";
  const eastWest = lonValue >= 0 ? "East" : "West";
  const gistKph = obj.current.gust_kph;

  let currentDayWeather = `<div class="col-md-12 col-lg-3 data-current-day flex-grow-1">
              <div class="card bg-dark text-white  p-2">
                <div class="title-weather d-flex justify-content-between align-items-center p-2">
                  <h5 class="day-current text-capitalize" id="day-current">${dayName}</h5>
                  <h6 class="date-day text-capitalize "><span class="text-white pe-1 fs-5">${dayOfMonth}</span>december
                  </h6>
                </div>
                <div class="card-body bg-black p-3">
                  <h3 class="text-warning">${obj.location.name}</h3>
                  <div class="data-temp d-flex justify-content-between align-items-center">
                    <h4 class="Temperature fs-1">${obj.current.temp_c}<sup class="text-white px-1">o</sup>C</h4>
                    <div class="image-temperature">
                      <img src="${obj.current.condition.icon}" class="w-100" alt="">
                    </div>
                  </div>
                  <h5 class="text-primary">${obj.current.condition.text}</h5>
                  <div class="Percentage-of-heat | pt-4 d-flex align-items-center text justify-content-between flex-wrap ">
                    <article class="d-flex justify-content-center align-items-start gap-1 ">
                      <img src="https://routeweather.netlify.app/images/icon-umberella.png" alt="">
                      <h6>${obj.current.cloud}%</h6>
                    </article>
                    <article class="d-flex justify-content-center align-items-start gap-1 ">
                      <img src="https://routeweather.netlify.app/images/icon-wind.png" alt="">
                      <h6>${gistKph}km/h</h6>
                    </article>
                    <article class="d-flex justify-content-center align-items-start gap-1 ">
                      <img src="https://routeweather.netlify.app/images/icon-compass.png" alt="">
                      <h6 class="fs-6">${northSouth},${eastWest}</h6>
                    </article>
                  </div>
                </div>
              </div>
            </div>`;
  allWeather.innerHTML += currentDayWeather;

  for (let i = 1; i <= 6; i++) {
    const date = new Date(obj.forecast.forecastday[i].date); // Your input date
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    let cardForcastday = `<div class="col-md-6 col-lg-auto text-center flex-grow-1 ">
              <div class="card bg-dark text-white  p-2">
                <div class="title-weather p-2">
                  <h5 class="day-current text-capitalize text-breake fs-6">${dayName}</h5>
                </div>
                <div class="card-body bg-black p-2">
                  <div class="data-temp">
                    <div class="image-temperature mb-3">
                      <img src="${obj.forecast.forecastday[i].day.condition.icon}" class="w-auto" alt="">
                    </div>
                    <h4 class="maxtemp mb-2 fs-5">${obj.forecast.forecastday[i].day.maxtemp_c}<sup class="text-danger fs-6 px-1">o</sup>C</h4>
                    <h5 class="min-temp h6 mb-4">${obj.forecast.forecastday[i].day.mintemp_c}<sup class="ps-1 text-warning fs-6">o</sup></h5>
                  </div>
                  <h5 class="text-primary fs-5 text-brake">${obj.forecast.forecastday[i].day.condition.text}</h5>
                </div> 
              </div>
            </div>`;
    allWeather.innerHTML += cardForcastday;
  }
  spanCity.textContent = `${obj.location.country}, ${obj.location.region}`;
  curTime.textContent = `${hours}:${minutes}`;
  ampm.textContent = `${hours <= 12 ? "am" : "pm"}`.toUpperCase();
  locationNow.appendChild(spanCity);
  currentTime.prepend(curTime);
  curTime.append(ampm);
}

inputSearch.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getCureentDay(transformFirstChar(inputSearch.value || "cairo"));
    inputSearch.value = "";
    e.preventDefault();
  }
});
inputSearch.addEventListener("input", function () {
  getCureentDay(transformFirstChar(inputSearch.value || "cairo"));
});
