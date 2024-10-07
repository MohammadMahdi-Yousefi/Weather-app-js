const inputElem = document.querySelector("input");

let apiData = {
  url: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "6dc55ea61d9b5c080d738d047414fab4",
};

function fetchData() {
  let countryValue = inputElem.value;

  fetch(`${apiData.url}${countryValue}&&appid=${apiData.key}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        inputElem.value = "";
        document.querySelector(".err").style.display = "block";
        document.querySelector("main").style.display = "none";
        setTimeout(() => {
          document.querySelector(".err").style.display = "none";
        }, 3000);
      } else {
        document.querySelector(".err").style.display = "none";
        showData(data);
      }
    });
}

function showData(data) {
     inputElem.value = "";
  let cityElem = document.querySelector(".city");
  cityElem.innerHTML = `${data.name}, ${data.sys.country}`;

  let dateElem = document.querySelector(".date");
  dateElem.innerHTML = showDate();

  let tempElem = document.querySelector(".temp");
  tempElem.innerHTML = `${Math.floor(data.main.temp - 273.15)}°c`;

  let weatherElem = document.querySelector(".weather");
  weatherElem.innerHTML = `${data.weather[0].main}`;

  let tempsElem = document.querySelector(".hi-low");
  tempsElem.innerHTML = `${Math.floor(
    data.main.temp_min - 273.15
  )}°c / ${Math.floor(data.main.temp_max - 273.15)}°c`;
  document.querySelector("main").style.display = "block";
}

function showDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();

  return `${day} ${date} ${month} ${year}`;
}

inputElem.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchData();
  }
});
