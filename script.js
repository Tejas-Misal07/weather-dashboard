// =========================
// API KEY
// =========================

const API_KEY = "your_api_key";

// =========================
// SELECT ELEMENTS
// =========================

const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");

const cityNameDate = document.getElementById("city-name-date");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherCondition = document.getElementById("weather-condition");

const forecastContainer = document.getElementById("forecast-container");

// =========================
// FETCH WEATHER
// =========================

async function fetchWeather(city) {
  try {

    // CURRENT WEATHER API
    const currentWeatherURL =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${"Your_api_key_Enter_here"}`;

    const response = await fetch(currentWeatherURL);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    displayCurrentWeather(data);

    // FORECAST API
    fetchForecast(city);

  } catch (error) {
    alert(error.message);
  }
}

// =========================
// DISPLAY CURRENT WEATHER
// =========================

function displayCurrentWeather(data) {

  const date = new Date().toLocaleDateString();

  cityNameDate.textContent =
    `${data.name} (${date})`;

  temperature.textContent =
    `Temperature: ${data.main.temp} °C`;

  humidity.textContent =
    `Humidity: ${data.main.humidity}%`;

  windSpeed.textContent =
    `Wind Speed: ${data.wind.speed} m/s`;

  weatherCondition.textContent =
    `Condition: ${data.weather[0].main}`;
}

// =========================
// FETCH FORECAST
// =========================

async function fetchForecast(city) {

  try {

    const forecastURL =
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(forecastURL);

    const data = await response.json();

    displayForecast(data.list);

  } catch (error) {
    console.log(error);
  }
}

// =========================
// DISPLAY FORECAST
// =========================

function displayForecast(forecastList) {

  forecastContainer.innerHTML = "";

  // Every 8th item = next day
  const dailyForecast = forecastList.filter((item, index) => index % 8 === 0);

  dailyForecast.forEach((forecast) => {

    const card = document.createElement("div");

    card.classList.add("forecast-card");

    const date = new Date(forecast.dt_txt)
      .toLocaleDateString();

    card.innerHTML = `
      <h3>${date}</h3>
      <p>🌡 ${forecast.main.temp} °C</p>
      <p>💧 ${forecast.main.humidity}%</p>
      <p>🌥 ${forecast.weather[0].main}</p>
    `;

    forecastContainer.appendChild(card);
  });
}

// =========================
// FORM SUBMIT
// =========================

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const city = cityInput.value.trim();

  if (city !== "") {
    fetchWeather(city);
  }
});
