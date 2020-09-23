


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
        cityWind = response.wind.speed
        cityHumid = response.main.humidity
        cityLat = response.coord.lon
        cityLon = response.coord.lat
        curDate = response.dt
        
        
        allDaWeather = [response.name, response.main.humidity, response.main.temp, response.wind.speed, response.weather[0].icon]
        
        $("#cityName").text("Location: " + cityName)
        $("#cityTemp").text(cityTemp + " F")
        $("#cityWind").text(cityWind)
        $("#cityHumid").text(cityHumid + "%")
        $("currentDate").text(curDate)

        console.log(response)                   
    })
      
    $.ajax({
        url: `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=941384f3ad9319cea1d15e58a1f228c4`,
            method: "GET"
        }).then(function (response) {
            console.log(response)
        
        })
    

})


