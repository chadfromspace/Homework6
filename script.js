$(document).ready(function(){
    var longitude;
    var latitude;
    var searchInputArray = [];
    var newForm = document.createElement("form");
    $(".box2").append(newForm);
    var searchInput;
    var currentDayValue = new Date();
    var currentDay = currentDayValue.getMonth()+"/"+currentDayValue.getDate()+"/"+currentDayValue.getFullYear();
    var nextDayValue = parseInt(currentDayValue.getDate())+1;
    var nextDay2Value = parseInt(currentDayValue.getDate())+2;
    var nextDay3Value = parseInt(currentDayValue.getDate())+3;
    var nextDay4Value = parseInt(currentDayValue.getDate())+4;
    var nextDay5Value = parseInt(currentDayValue.getDate())+5;
    var nextDay = currentDayValue.getMonth()+"/"+nextDayValue+"/"+currentDayValue.getFullYear();
    var nextDay2 = currentDayValue.getMonth()+"/"+nextDay2Value+"/"+currentDayValue.getFullYear();
    var nextDay3 = currentDayValue.getMonth()+"/"+nextDay3Value+"/"+currentDayValue.getFullYear();
    var nextDay4 = currentDayValue.getMonth()+"/"+nextDay4Value+"/"+currentDayValue.getFullYear();
    var nextDay5 = currentDayValue.getMonth()+"/"+nextDay5Value+"/"+currentDayValue.getFullYear();
    //Initial page setup; defaults to Atlanta.
    if(localStorage.getItem("searchHistory")){
        searchInputArray.push(localStorage.getItem("searchHistory").split(","));
        searchInput = searchInputArray[0][searchInputArray[0].length-1];
        for(i=searchInputArray[0].length-1;i>-1;i--){
            var newButton = document.createElement("button");
            newButton.textContent = searchInputArray[0][i];
            $(newButton).addClass("btn btn-dark col-12 searchButton");
            $(newForm).append(newButton);
        }
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+searchInputArray[0][searchInputArray.length-1]+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
            method: "get"
        }).then(function(response){
        var currentCity1 = searchInputArray[0][searchInputArray.length-1];
        var currentCityArray = [];
        for(i=0;i<currentCityArray.length;i++){
            if(i===0){
                currentCityArray.push(currentCity1[i].toUpperCase());
            } else{
                currentCityArray.push(currentCity1[i].toLowerCase());
            }
        }
        var currentCity2 = currentCityArray.join(",").replace(/,/g,"");
        $(".currentCity").html(currentCity2);
        $(".cityTemperature").html("Temperature: "+response.main.temp+" &degF");
        $(".humidity").html("Humidity: "+response.main.humidity+"%");
        $(".windSpeed").html("Wind Speed: "+response.wind.speed+" MPH");
        longitude = response.coord.lon;
        latitude = response.coord.lat;
        }).then(function(){
            $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&units=imperial&lat="+latitude+"&lon="+longitude,
            method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: "+response.value);
                }).then(function(){
                $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                method: "get"
                }).then(function(response){
                    $(".currentCity").html(searchInput+" ("+currentDay+")");
                    var currentCity1 = searchInput;
                    var currentCityArray = [];
                    for(i=0;i<currentCity1.length;i++){
                    if(i===0){
                            currentCityArray.push(currentCity1[i].toUpperCase());
                        } else{
                            currentCityArray.push(currentCity1[i].toLowerCase());
                        }
                    }
                    var currentCity2 = currentCityArray.join(",").replace(/,/g,"");
                    $(".currentCity").html(currentCity2+" ("+currentDay+")");
                    //Five day forecast 1.
                    $(".fiveDayDate1").html(nextDay);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[0].weather[0].icon +".png");
                    $(".weatherIcon1").append(newImage);
                    $(".fiveDayTemp1").html("Temp: "+response.list[0].main.temp+" &degF");
                    $(".fiveDayHumidity1").html("Humidity: "+response.list[0].main.humidity+"%");
                    //Five day forecast 2.
                    $(".fiveDayDate2").html(nextDay2);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[8].weather[0].icon +".png");
                    $(".weatherIcon2").append(newImage);
                    $(".fiveDayTemp2").html("Temp: "+response.list[8].main.temp+" &degF");
                    $(".fiveDayHumidity2").html("Humidity: "+response.list[8].main.humidity+"%");
                    //Five day forecast 3.
                    $(".fiveDayDate3").html(nextDay3);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[16].weather[0].icon +".png");
                    $(".weatherIcon3").append(newImage);
                    $(".fiveDayTemp3").html("Temp: "+response.list[16].main.temp+" &degF");
                    $(".fiveDayHumidity3").html("Humidity: "+response.list[16].main.humidity+"%");
                    //Five day forecast 4.
                    $(".fiveDayDate4").html(nextDay4);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[24].weather[0].icon +".png");
                    $(".weatherIcon4").append(newImage);
                    $(".fiveDayTemp4").html("Temp: "+response.list[24].main.temp+" &degF");
                    $(".fiveDayHumidity4").html("Humidity: "+response.list[24].main.humidity+"%");
                    //Five day forecast 5.
                    $(".fiveDayDate5").html(nextDay5);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[32].weather[0].icon +".png");
                    $(".weatherIcon5").append(newImage);
                    $(".fiveDayTemp5").html("Temp: "+response.list[32].main.temp+" &degF");
                    $(".fiveDayHumidity5").html("Humidity: "+response.list[32].main.humidity+"%");
                })
            })
        })
    } else{
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
            method: "get"
        }).then(function(response){
            $(".currentCity").html("Atlanta"+" ("+currentDay+")");
            $(".cityTemperature").html("Temperature: "+response.main.temp+" &degF");
            $(".humidity").html("Humidity: "+response.main.humidity+"%");
            $(".windSpeed").html("Wind Speed: "+response.wind.speed+" MPH");
            longitude = response.coord.lon;
            latitude = response.coord.lat;
        }).then(function(){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&units=imperial&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: ");
                $(".uvIndexIcon").html(response.value);
                }).then(function(){
                    $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                    method: "get"
                    }).then(function(response){
                    var currentCity2 = "Atlanta";
                    $(".currentCity").html(currentCity2+" ("+currentDay+")");
                    $(".weatherIcon1").html("");
                    $(".weatherIcon2").html("");
                    $(".weatherIcon3").html("");
                    $(".weatherIcon4").html("");
                    $(".weatherIcon5").html("");
                    //Five day forecast 1.
                    $(".fiveDayDate1").html(nextDay);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[0].weather[0].icon +".png");
                    $(".weatherIcon1").append(newImage);
                    $(".fiveDayTemp1").html("Temp: "+response.list[0].main.temp+" &degF");
                    $(".fiveDayHumidity1").html("Humidity: "+response.list[0].main.humidity+"%");
                    //Five day forecast 2.
                    $(".fiveDayDate2").html(nextDay2);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[8].weather[0].icon +".png");
                    $(".weatherIcon2").append(newImage);
                    $(".fiveDayTemp2").html("Temp: "+response.list[8].main.temp+" &degF");
                    $(".fiveDayHumidity2").html("Humidity: "+response.list[8].main.humidity+"%");
                    //Five day forecast 3.
                    $(".fiveDayDate3").html(nextDay3);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[16].weather[0].icon +".png");
                    $(".weatherIcon3").append(newImage);
                    $(".fiveDayTemp3").html("Temp: "+response.list[16].main.temp+" &degF");
                    $(".fiveDayHumidity3").html("Humidity: "+response.list[16].main.humidity+"%");
                    //Five day forecast 4.
                    $(".fiveDayDate4").html(nextDay4);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[24].weather[0].icon +".png");
                    $(".weatherIcon4").append(newImage);
                    $(".fiveDayTemp4").html("Temp: "+response.list[24].main.temp+" &degF");
                    $(".fiveDayHumidity4").html("Humidity: "+response.list[24].main.humidity+"%");
                    //Five day forecast 5.
                    $(".fiveDayDate5").html(nextDay5);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[32].weather[0].icon +".png");
                    $(".weatherIcon5").append(newImage);
                    $(".fiveDayTemp5").html("Temp: "+response.list[32].main.temp+" &degF");
                    $(".fiveDayHumidity5").html("Humidity: "+response.list[32].main.humidity+"%");
                })
            })
        })
    }
    //On click function for the search history buttons.
    $(".searchButton").on("click",function(event){
        event.preventDefault();
        searchInput = event.target.innerHTML;
        searchInputArray.push(searchInput);
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
            method: "get"
        }).then(function(response){            
            $(".cityTemperature").html("Temperature: "+response.main.temp+" &degF");
            $(".humidity").html("Humidity: "+response.main.humidity+"%");
            $(".windSpeed").html("Wind Speed: "+response.wind.speed+" MPH");
            //$(".uvIndex").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon +".png");
            longitude = response.coord.lon;
            latitude = response.coord.lat;
        }).then(function(){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&units=imperial&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: "+response.value);
            }).then(function(response){
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                    method: "get"
                }).then(function(response){
                    var currentCity1 = searchInput;
                    var currentCityArray = [];
                    for(i=0;i<currentCity1.length;i++){
                        if(i===0){
                            currentCityArray.push(currentCity1[i].toUpperCase());
                        } else{
                            currentCityArray.push(currentCity1[i].toLowerCase());
                        }
                    }
                    var currentCity2 = currentCityArray.join(",").replace(/,/g,"");
                    $(".currentCity").html(currentCity2+" ("+currentDay+")");
                    $(".weatherIcon1").html("");
                    $(".weatherIcon2").html("");
                    $(".weatherIcon3").html("");
                    $(".weatherIcon4").html("");
                    $(".weatherIcon5").html("");
                    //Five day forecast 1.
                    $(".fiveDayDate1").html(nextDay);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[0].weather[0].icon +".png");
                    $(".weatherIcon1").append(newImage);
                    $(".fiveDayTemp1").html("Temp: "+response.list[0].main.temp+" &degF");
                    $(".fiveDayHumidity1").html("Humidity: "+response.list[0].main.humidity+"%");
                    //Five day forecast 2.
                    $(".fiveDayDate2").html(nextDay2);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[8].weather[0].icon +".png");
                    $(".weatherIcon2").append(newImage);
                    $(".fiveDayTemp2").html("Temp: "+response.list[8].main.temp+" &degF");
                    $(".fiveDayHumidity2").html("Humidity: "+response.list[8].main.humidity+"%");
                    //Five day forecast 3.
                    $(".fiveDayDate3").html(nextDay3);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[16].weather[0].icon +".png");
                    $(".weatherIcon3").append(newImage);
                    $(".fiveDayTemp3").html("Temp: "+response.list[16].main.temp+" &degF");
                    $(".fiveDayHumidity3").html("Humidity: "+response.list[16].main.humidity+"%");
                    //Five day forecast 4.
                    $(".fiveDayDate4").html(nextDay4);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[24].weather[0].icon +".png");
                    $(".weatherIcon4").append(newImage);
                    $(".fiveDayTemp4").html("Temp: "+response.list[24].main.temp+" &degF");
                    $(".fiveDayHumidity4").html("Humidity: "+response.list[24].main.humidity+"%");
                    //Five day forecast 5.
                    $(".fiveDayDate5").html(nextDay5);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[32].weather[0].icon +".png");
                    $(".weatherIcon5").append(newImage);
                    $(".fiveDayTemp5").html("Temp: "+response.list[32].main.temp+" &degF");
                    $(".fiveDayHumidity5").html("Humidity: "+response.list[32].main.humidity+"%");
                })
            })
        })
    })
    //On submit function.
    $(document).on("submit",function(event){
        event.preventDefault();
        var searchInput = event.target.lastElementChild.value;
        searchInputArray.push(searchInput);
        var newButton = document.createElement("button");
        newButton.textContent = searchInput;
        $(newButton).addClass("btn btn-dark col-12 searchButton");
        $(newForm).prepend(newButton);
        /*
            var newButton = document.createElement("button");
            newButton.textContent = searchInputArray[0][i];
            $(newButton).addClass("btn btn-dark col-12 searchButton");
            $(newForm).append(newButton);
        */
        localStorage.setItem("searchHistory",searchInputArray);
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
            method: "get"
        }).then(function(response){            
            $(".cityTemperature").html("Temperature: "+response.main.temp+" &degF");
            $(".humidity").html("Humidity: "+response.main.humidity+"%");
            $(".windSpeed").html("Wind Speed: "+response.wind.speed+" MPH");
            //$(".uvIndex").attr("src","http://openweathermap.org/img/w/" + response.weather[0].icon +".png");
            longitude = response.coord.lon;
            latitude = response.coord.lat;
        }).then(function(){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&units=imperial&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: "+response.value);
                }).then(function(){
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                    method: "get"
                }).then(function(response){
                    var currentCity1 = searchInput;
                    var currentCityArray = [];
                    for(i=0;i<currentCity1.length;i++){
                        if(i===0){
                            currentCityArray.push(currentCity1[i].toUpperCase());
                        } else{
                            currentCityArray.push(currentCity1[i].toLowerCase());
                        }
                    }
                    var currentCity2 = currentCityArray.join(",").replace(/,/g,"");
                    $(".currentCity").html(currentCity2+" ("+currentDay+")");
                    $(".weatherIcon1").html("");
                    $(".weatherIcon2").html("");
                    $(".weatherIcon3").html("");
                    $(".weatherIcon4").html("");
                    $(".weatherIcon5").html("");
                    //Five day forecast 1.
                    $(".fiveDayDate1").html(nextDay);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[0].weather[0].icon +".png");
                    $(".weatherIcon1").append(newImage);
                    $(".fiveDayTemp1").html("Temp: "+response.list[0].main.temp+" &degF");
                    $(".fiveDayHumidity1").html("Humidity: "+response.list[0].main.humidity+"%");
                    //Five day forecast 2.
                    $(".fiveDayDate2").html(nextDay2);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[8].weather[0].icon +".png");
                    $(".weatherIcon2").append(newImage);
                    $(".fiveDayTemp2").html("Temp: "+response.list[8].main.temp+" &degF");
                    $(".fiveDayHumidity2").html("Humidity: "+response.list[8].main.humidity+"%");
                    //Five day forecast 3.
                    $(".fiveDayDate3").html(nextDay3);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[16].weather[0].icon +".png");
                    $(".weatherIcon3").append(newImage);
                    $(".fiveDayTemp3").html("Temp: "+response.list[16].main.temp+" &degF");
                    $(".fiveDayHumidity3").html("Humidity: "+response.list[16].main.humidity+"%");
                    //Five day forecast 4.
                    $(".fiveDayDate4").html(nextDay4);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[24].weather[0].icon +".png");
                    $(".weatherIcon4").append(newImage);
                    $(".fiveDayTemp4").html("Temp: "+response.list[24].main.temp+" &degF");
                    $(".fiveDayHumidity4").html("Humidity: "+response.list[24].main.humidity+"%");
                    //Five day forecast 5.
                    $(".fiveDayDate5").html(nextDay5);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[32].weather[0].icon +".png");
                    $(".weatherIcon5").append(newImage);
                    $(".fiveDayTemp5").html("Temp: "+response.list[32].main.temp+" &degF");
                    $(".fiveDayHumidity5").html("Humidity: "+response.list[32].main.humidity+"%");
                })
            })
        })
        location.reload();
    })
    //On click function for the search button.
    $(".searchIcon").on("click",function(event){
        event.preventDefault();
        var searchInput = event.currentTarget.parentElement.children[0][0].value;
        searchInputArray.push(searchInput);
        var newButton = document.createElement("button");
        newButton.textContent = searchInput;
        $(newButton).addClass("btn btn-dark col-12 searchButton");
        $(newForm).prepend(newButton);        
        localStorage.setItem("searchHistory",searchInputArray);
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
            method: "get"
        }).then(function(response){            
            $(".cityTemperature").html("Temperature: "+response.main.temp+" &degF");
            $(".humidity").html("Humidity: "+response.main.humidity+"%");
            $(".windSpeed").html("Wind Speed: "+response.wind.speed+" MPH");
            longitude = response.coord.lon;
            latitude = response.coord.lat;
        }).then(function(){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&units=imperial&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
            $(".uvIndex").html("UV Index: "+response.value);
            }).then(function(){
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                    method: "get"
                }).then(function(response){
                    var currentCity1 = searchInput;
                    var currentCityArray = [];
                    for(i=0;i<currentCity1.length;i++){
                        if(i===0){
                            currentCityArray.push(currentCity1[i].toUpperCase());
                        } else{
                            currentCityArray.push(currentCity1[i].toLowerCase());
                        }
                    }
                    var currentCity2 = currentCityArray.join(",").replace(/,/g,"")
                    $(".currentCity").html(currentCity2+" ("+currentDay+")");
                    $(".weatherIcon1").html("");
                    $(".weatherIcon2").html("");
                    $(".weatherIcon3").html("");
                    $(".weatherIcon4").html("");
                    $(".weatherIcon5").html("");
                    //Five day forecast 1.
                    $(".fiveDayDate1").html(nextDay);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[0].weather[0].icon +".png");
                    $(".weatherIcon1").append(newImage);
                    $(".fiveDayTemp1").html("Temp: "+response.list[0].main.temp+" &degF");
                    $(".fiveDayHumidity1").html("Humidity: "+response.list[0].main.humidity+"%");
                    //Five day forecast 2.
                    $(".fiveDayDate2").html(nextDay2);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[8].weather[0].icon +".png");
                    $(".weatherIcon2").append(newImage);
                    $(".fiveDayTemp2").html("Temp: "+response.list[8].main.temp+" &degF");
                    $(".fiveDayHumidity2").html("Humidity: "+response.list[8].main.humidity+"%");
                    //Five day forecast 3.
                    $(".fiveDayDate3").html(nextDay3);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[16].weather[0].icon +".png");
                    $(".weatherIcon3").append(newImage);
                    $(".fiveDayTemp3").html("Temp: "+response.list[16].main.temp+" &degF");
                    $(".fiveDayHumidity3").html("Humidity: "+response.list[16].main.humidity+"%");
                    //Five day forecast 4.
                    $(".fiveDayDate4").html(nextDay4);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[24].weather[0].icon +".png");
                    $(".weatherIcon4").append(newImage);
                    $(".fiveDayTemp4").html("Temp: "+response.list[24].main.temp+" &degF");
                    $(".fiveDayHumidity4").html("Humidity: "+response.list[24].main.humidity+"%");
                    //Five day forecast 5.
                    $(".fiveDayDate5").html(nextDay5);
                    var newImage = document.createElement("img");
                    $(newImage).attr("src","http://openweathermap.org/img/w/" + response.list[32].weather[0].icon +".png");
                    $(".weatherIcon5").append(newImage);
                    $(".fiveDayTemp5").html("Temp: "+response.list[32].main.temp+" &degF");
                    $(".fiveDayHumidity5").html("Humidity: "+response.list[32].main.humidity+"%");
                })
            })
        })
        location.reload();
    })
})