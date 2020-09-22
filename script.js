var cityName = $("<div>")
var cityTemp = $("<div>")
var cityHumid = $("<div>")
var cityWind = $("<div>")
var cityUV = $("<div>")

// var city = $("#city-input")
var city
queryURL = 
console.log("what up")

$("#find-city").on("click", function (search) {
    search.preventDefault()
    
    var city = $("#city-input").val()
    console.log(city)
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&cnt=5&appid=941384f3ad9319cea1d15e58a1f228c4",
        method: "GET"
    }).then(function (response) {
        
        allDaWeather = [response.name, response.main.humidity, response.main.temp, response.wind.speed, response.weather[0].icon]
        
        console.log(response)
    
    })
})


