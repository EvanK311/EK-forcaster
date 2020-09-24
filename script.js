


// empty vars for latitude and longitude
var cityLat
var cityLon

console.log("never give up, yo")
$("#currentDate").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));


// on click button to retrieve info
$("#find-city").on("click", function (search) {
    search.preventDefault()

    var city = $("#city-input").val()
    console.log(city)

    // ajax call to get current weather of city
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&cnt=5&appid=941384f3ad9319cea1d15e58a1f228c4",
        method: "GET"
    }).then(function (response) {
        cityName = response.name
        cityTemp = ((response.main.temp) * 1.8 - 459.67).toFixed(0)
        cityWind = ((response.wind.speed) * .6214).toFixed(1)
        cityHumid = response.main.humidity
        cityLat = response.coord.lat
        cityLon = response.coord.lon
        curDate = response.dt
        

        allDaWeather = [response.name, response.main.humidity, response.main.temp, response.wind.speed, response.weather[0].icon]

        $("#cityName").text("Location: " + cityName)
        $("#cityTemp").text("Temperature: " + cityTemp + " F")
        $("#cityWind").text("Wind speed: " + cityWind + "mph")
        $("#cityHumid").text("Humidity: " + cityHumid + "%")
        
        $("currentDate").text(curDate)

        console.log(response)
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=f5f7477c35e4d4619d2d7dc9decedbd0`,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var cityUV = response.daily[0].uvi
            $("#cityUV").text("UV Index: " + cityUV)
            $("#cityTemp1").text("Temperature: " + cityTemp + " F")

        })
    })




})


