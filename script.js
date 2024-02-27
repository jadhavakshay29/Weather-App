
const getWeather = document.getElementById('get-weather-btn');
const tempDiv = document.getElementById('temp-div');
const weatherInfoDiv = document.getElementById('weather-info');
const hourlyForecastDiv = document.getElementById('hourly-forecast');
const weatherIcon = document.getElementById('weather-icon');

const apiKey = 'ca8a087bb6b726a73cf7de5c48db2636';

getWeather.addEventListener("click",()=>{
    const city = document.getElementById('city').value;
    // console.log(city);

    if(!city){
        alert('Please Enter the city');
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherURL)
         .then(response => response.json())
         .then(data=>{
            // console.log(data);
             displayWeather(data)
            })
         .catch(error=>{
            console.error("Error fetching current weather data:", error);
            alert("Error fetching current weather data. Please try again");
         });

    fetch(forecastURL)
        .then(response => response.json())
        .then(data=> displayHourlyForecast(data.list))
        .catch(error=>{
        console.error("Error fetching current hourly forecast data:", error);
        alert("Error fetching current hourly forecast data. Please try again");
        });     
});

function displayWeather(data){
    //to clear the prevoius data from page
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDiv.innerHTML = '';

    if(data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }else{
         const cityName = data.name;
         const temp = Math.round(data.main.temp-273.15);
         const description = data.weather[0].description;
         const iconCode = data.weather[0].icon;
         const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

         const tempHTML = `<p>${temp}°C</p>`;
         const weatherHTML = `
                <p>${cityName}</p>
                <p>${description}</p>`;
        
        tempDiv.innerHTML = tempHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconURL;
        weatherIcon.alt = description;

        showImage();
    }
}

function  displayHourlyForecast(hourlyData){
    const next24Hours = hourlyData.slice(0,8);
    // console.log(hourlyData);

    next24Hours.forEach(item=>{
    //    console.log(item);
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temp = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyHTML = `
              <div class="hourly-item">
                   <span>${hour}:00</span>
                   <img src="${iconURL}" alt="Hourly Weather Icon"/>
                   <span>${temp}°C</span>
              </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyHTML;
    });
}

function showImage(){
    weatherIcon.style.display = 'block';
}
