$(document).ready(function(){

    var longitude;
    var latitude;
    var uvIndexValue;
    var searchInputArray = [];
    var newForm = document.createElement("form");
    $(".box2").append(newForm);
    if(localStorage.getItem("searchHistory")){            
        searchInputArray.push(localStorage.getItem("searchHistory").split(","));
    }
    for(i=0;i<searchInputArray.length;i++){
        var newButton = document.createElement("button");
        newButton.textContent = searchInputArray[0][i];
        $(newButton).addClass("btn btn-dark col-12");
        $(newForm).append(newButton);
    }

    $(document).on("submit",function(event){
        event.preventDefault();
        var searchInput = event.target.lastElementChild.value;        
        searchInputArray.push(searchInput);        
        var newButton = document.createElement("button");
        newButton.textContent = searchInput;
        $(newButton).addClass("btn btn-dark col-12");
        $(newForm).append(newButton);        
        localStorage.setItem("searchHistory",searchInputArray);
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
            method: "get"
        }).then(function(response){
            var imgSource = "http://openweathermap.org/img/w/" + response.weather[0].icon +".png"
            $(".currentCity").html(searchInput);
            $(".cityTemperature").html("Temperature: "+response.main.temp+" &degF");
            $(".humidity").html("Humidity: "+response.main.humidity+"%");
            $(".windSpeed").html("Wind Speed: "+response.wind.speed+" MPH");
            //$(".uvIndex").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon +".png");
            longitude = response.coord.lon;
            latitude = response.coord.lat;
        }).then(function(response){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                console.log(response);
                $(".uvIndex").html("UV Index: "+response.value);
            })
        })
    })    

})