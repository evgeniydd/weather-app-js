
document.getElementById('search').addEventListener('click', getData);
const weather_container = document.getElementById('weather-container');
const city = document.getElementById('search-city');





function getData() {
    let key = 'a76c35515f929aa00f8fb2fce95fa555';
    let cityID = city.value;
    city.value = '';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID + '&units=metric&appid=' + key)
        .then(resp => resp.json())
        .then(data => {
            searchCity(data)
        })

}



function searchCity(city) {
    const general_weather = city.weather[0].main;

    if (general_weather === 'Clear') {
        document.body.style.background = 'linear-gradient(to left, #00c9ff, #92fe9d)';

    } else if (general_weather === 'Clouds') {
        document.body.style.background = 'linear-gradient(to left, #bdc3c7, #2c3e50)';
    } else if (general_weather === 'Rain') {
        document.body.style.background = 'linear-gradient(to left, #43cea2, #185a9d)';
    } else if (general_weather === 'Snow') {
        document.body.style.background = 'linear-gradient(to left, #70e1f5, #ffd194)';
    } else document.body.style.background = 'linear-gradient(to bottom, #de6161, #2657eb)';



    const newInnerHTML = `
    
    
   
    <div class="result">
      <div class="result-column">
        <p class="city">${city.name}, ${city.sys.country}</p>
        <p class="temperature">${Math.round(city.main.temp)}°C</p>
        ${getIcon()}
      </div>
      <div class="result-row">
        <p class="details-info"><span>Humidity:</span> ${city.main.humidity}%</p>
        <p class="details-info"><span>Pressure:</span> ${city.main.pressure} mBar</p>
        <p class="details-info"><span>Wind:</span> ${city.wind.speed}m/s</p>
      </div>
    </div>
  
    
    `;

    function getIcon() {

        if (general_weather === 'Clear') {
            return `<p class="general"><i class="fas fa-sun"></i> ${city.weather[0].main}</p>`
        } else if (general_weather === 'Clouds') {
            return `<p class="general"><i class="fas fa-cloud"></i> ${city.weather[0].main}</p>`

        }
        else if (general_weather === 'Rain') {
            return `<p class="general"><i class="fas fa-cloud-rain"></i> ${city.weather[0].main}</p>`

        }
        else if (general_weather === 'Snow') {
            return `<p class="general"><i class="far fa-snowflake"></i> ${city.weather[0].main}</p>`

        } else return general_weather;
    }


    weather_container.innerHTML = newInnerHTML;





}




// Trigger a Button Click on Enter

city.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        return getData();
    }

});