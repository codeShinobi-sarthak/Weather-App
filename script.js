// // array for favicon or image [FOR METHOD 3]
// const icon = document.querySelector(".icon-div");
// const iconArray = [
//   `<span class="material-symbols-outlined"> clear_day </span>`,
//   `<span class="material-symbols-outlined">
//   cloud
//   </span>`,
//   `<span class="material-symbols-outlined">
//   rainy
//   </span>`,
//   `<span class="material-symbols-outlined">
//   mist
//   </span>`

// ];



const place = document.getElementById("location");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity-percent");
const windSpeed = document.getElementById("wind-speed");
const weatherFavicon = document.getElementById("favicon");
const weatherDescription = document.getElementById("weather-description");
const feelsLike = document.getElementById("feels-like-temp");

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");


// updating icon funtion
const icon = document.querySelector('#icon')
function updateIcon(data) {
  // METHOD 1: using open weather icon but icons are small and unclear
  const iconCode = data.weather[0].icon;
  icon.setAttribute('src', ` https://openweathermap.org/img/wn/${iconCode}@2x.png`)
  
  // // METHOD 2: Using downloaded images
  // if (data.weather[0].main == "Clear") {
  //   icon.setAttribute("src", "images/clear.png");
  // } else if (data.weather[0].main == "Clouds") {
  //   icon.setAttribute("src", "images/clouds.png");
  // } else if (data.weather[0].main == "Rain") {
  //   icon.setAttribute("src", "images/rain.png");
  // } else if (data.weather[0].main == "Drizzle") {
  //   icon.setAttribute("src", "images/drizzle.png");
  // } else if (data.weather[0].main == "Mist") {
  //   icon.setAttribute("src", "images/mist.png");
  // }

  // METHOD 3: using google icons
   // NOTE :- in this we make an array with elements links from google icons and then change the inner text 
}

// updting data function
function updateData(data) {
  place.innerText = data.name;
  temperature.innerText = data.main.temp + " °C";
  feelsLike.innerText = data.main.feels_like + " °C";
  weatherDescription.innerText = data.weather[0].main;
  humidity.innerText = data.main.humidity + " %";
  windSpeed.innerText = data.wind.speed + " m/s";
}

// weather api
async function weather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=51b773c5774c0c330a2f003893cae5ba&units=metric`
    );

    if (response.status == 404) {
      document.querySelector("#error").style.display = "block";
      document.querySelector(".weather-info").style.display = "none";
    } else {
      document.querySelector("#error").style.display = "none";
      document.querySelector(".weather-info").style.display = "block";
      const data = await response.json();
      console.log(data);
      updateData(data);
      updateIcon(data);
    }
  } catch (error) {
    alert("Invalid or Incorrect Input");
  }
}

// button click event
searchBtn.addEventListener("click", () => {
  const searchLocation = searchInput.value;
  if (searchLocation == "") {
    alert("Please Enter Location");
  } else {
    weather(searchLocation);
    searchInput.value = '';
  }
});
