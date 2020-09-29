


// empty vars for latitude and longitude
var cityLat
var cityLon
var forcastPic
var citySelect = []
var localStore = window.localStorage
var newButton = $("<button>")
var cityRescue = JSON.parse(localStore.getItem('citySave'))
console.log("never give up, yo")
$("#currentDate").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));


// on click button to retrieve info
$("#find-city").on("click", function (search) {
    search.preventDefault()
    var city = $("#city-input").val()
    citySelect.push(city)
    localStore.setItem('citySave', JSON.stringify(citySelect))
    var cityRescue = JSON.parse(localStore.getItem('citySave'))
    $("#cityList").empty()



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
        forcastPic = response.weather[0].icon
        curStatus = response.weather[0].description
        console.log(forcastPic)

        allDaWeather = [response.name, response.main.humidity, response.main.temp, response.wind.speed, response.weather[0].icon]

        $("#cityName").text("Location: " + cityName)
        $("#cityTemp").text("Temperature: " + cityTemp + " F")
        $("#cityWind").text("Wind speed: " + cityWind + "mph")
        $("#cityHumid").text("Humidity: " + cityHumid + "%")
        $("#forcastPic").attr('src', "http://openweathermap.org/img/wn/" + forcastPic + "@2x.png")
        $("#curStatus").text(curStatus)

        $("currentDate").text(curDate)

        console.log(response)
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=f5f7477c35e4d4619d2d7dc9decedbd0`,
            method: "GET"

        }).then(function (response) {
            console.log(response)
            var cityUV = response.daily[0].uvi
            $("#cityUV").text("UV Index: " + cityUV)
            for (i = 1; i < 6; i++) {
                $("#date" + i).empty()
                $("#temperature" + i).empty()
                $("#humidity" + i).empty()
                // var day5col = $("<div class = 'col-md-2'>")
                var temp1 = response.daily[i].temp.max.toFixed(0)
                var date1 = response.daily[i].dt
                var humid1 = response.daily[i].humidity
                var forPic5 = response.daily[i].weather[0].icon
                var curStatus5 = response.daily[i].weather[0].description
                date1 = (moment().add(i, "d"))
                $("#date" + i).text(date1)
                $("#temperature" + i).append("Temp: " + temp1 + " F")
                $("#humidity" + i).append("Humidity: " + humid1)
                $("#curStatus" + i).text(curStatus5)
                $("#forcastPic" + i).attr('src', "http://openweathermap.org/img/wn/" + forPic5 + "@2x.png")
                
                console.log(date1)
                console.log(temp1)
                console.log(humid1)
            }

        })
    })
    // Loop to dynamically create recall city buttons
    for (var index = 0; index < cityRescue.length; index++) {
        var newButton = $("<button>")
        $(newButton).addClass("button")             
        newButton.text(cityRescue[index])
        newButton.attr(city)
        $("#cityList").append(newButton)

    }

    
})



// function for recall city buttons to run API again
function prevApi(city) {
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
            for (i = 1; i < 6; i++) {
                $("#date" + i).empty()
                $("#temperature" + i).empty()
                $("#humidity" + i).empty()
                // var day5col = $("<div class = 'col-md-2'>")
                var temp1 = response.daily[i].temp.max.toFixed(0)
                var date1 = response.daily[i].dt
                var humid1 = response.daily[i].humidity
                date1 = (moment().add(i, "d"))
                $("#date" + i).text(date1)
                $("#temperature" + i).append("Temp: " + temp1 + " F")
                $("#humidity" + i).append("Humidity: " + humid1)
                console.log(date1)
                console.log(temp1)
                console.log(humid1)
            }

        })
    })
   
}

// click function to trigger secondary API from recall
$("#cityList").on("click", previousCity);

function previousCity(event) {    
    event.preventDefault()
    var city = event.target.textContent
    console.log(event.target)
    prevApi(city)
    console.log(city)
    console.log($(this))
}