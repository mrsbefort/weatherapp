const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('timezone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = 'b560802e22d3b5c9a667a84cd007a9bd';

setInterval(() => {
const time = new Date();
const month = time.getMonth();
const date = time.getDate();
const day = time.getDay();
const hour = time.getHours();
const hoursIn12HrFormat = hour >=13 ? hour %12: hour
const minutes = time.getMinutes();
const ampm = hours >=12 ? 'PM' : 'AM'

timeEl.innerHTML = (hoursIn12HrFormat <10?+ '0' +hoursIn12HrFormat :hoursIn12HrFormat)+':'+(minutes<10? '0'+ minutes: minutes)+'' + `<span id="am-pm">${ampm}</span>`

dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherDate () {
    navigator.geolocation.getCurrentPosition((succeed) => {

        let {latitude, longitude} = success.coords; 

        fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&b560802e22d3b5c9a667a84cd007a9bd`).then(res => res.json()).then(data => {

                console.log(data)
                showWeatherData(data);
            })

        })
    }
function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} =data.current;

    timezone.innerHTML=data.timezone;
    countryEl.innerHTML=data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-items">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-items">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-items">
    <div>Wind Speed</div>
    <div>${wind_speed}</div>
    
    <div class="weather-items">
    <div>Sunrise</div>
    <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
</div>
<div class="weather-items">
    <div>Sunset</div>
    <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    
    `;

    let otherDayForecast = ''
data.daily.forEach(day,idx)=>{
    if(idx ==0){
        currentTempEl.innerHTML =`
        <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>  
<img src=" http://openweathermap.org/img/wn//$(day.weather[0].icon)@4x.png" alt="weather icon" class="w-icon">
<div class="other">     
<div class="temp">Night - ${day.temp.night)&#176;F</div>
                <div class="temp">Day - $(day.temp.day)&#176;F</div>
            </div>`
    }else{
        otherDayForecast += '
        <div class ="weather-forecast-item">
        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div> 
        <img src=" http://openweathermap.org/img/wn/$(day.weather[0].icon)@2x.png" alt="weather icon" class="w-icon">  
        <div class="temp">Night - ${day.temp.night)&#176;F</div>
                        <div class="temp">Day - $(day.temp.day)&#176;F</div>
                    </div>`
            
        }
    })

    weatherForecastEl.innerHTML = otherDayForecast;
    
}