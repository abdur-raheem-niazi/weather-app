const form = document.querySelector(".form-input");
const input = document.querySelector("#enter");
const weatherDisplay = document.querySelector("#weather-info");

async function getWeather(city) {
  const key = "G9j5KTceWkfaFlPotE1HeoRCLEU9wrGh";
  const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log("Error fetching weather data:", error);
    return null;
  }
}

async function getCurrCondition(locationKey) {
  const apikey = "G9j5KTceWkfaFlPotE1HeoRCLEU9wrGh";
  const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apikey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.log("Error fetching weather data:", error);
    return null;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = input.value.trim();

  if (!city) {
    weatherDisplay.innerHTML =
      '<p class="text-danger">Please enter a city name</p>';
    return;
  }

  weatherDisplay.innerHTML = '<p class="text-info">Loading...</p>';

  const locationData = await getWeather(city);
  if (!locationData) {
    weatherDisplay.innerHTML = '<p class="text-danger">City not found</p>';
    return;
  }

  const weatherData = await getCurrCondition(locationData.Key);
  if (!weatherData) {
    weatherDisplay.innerHTML =
      '<p class="text-danger">Unable to fetch weather data</p>';
    return;
  }

  weatherDisplay.innerHTML = `
    <div class="card bg-dark text-light p-3 mt-4">
      <h3>${locationData.LocalizedName}, ${locationData.Country.LocalizedName}</h3>
      <p class="h4">${weatherData.Temperature.Metric.Value}°C</p>
      <p class="h5">${weatherData.WeatherText}</p>
    </div>
  `;

  input.value = "";
});
