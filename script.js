var city = "Seattle"

queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&cnt=5&appid=941384f3ad9319cea1d15e58a1f228c4"

$.ajax({
url: queryURL,
method: "GET"
}).then(function (response) {
    allDaWeather = [response.name, response.main.humidity, response.main.temp, response.wind.speed, response.weather[0].icon]
    
    console.log(response)
})

