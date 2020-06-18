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
        for(i=0;i<searchInputArray[0].length;i++){
            var newButton = document.createElement("button");
            newButton.textContent = searchInputArray[0][i];
            $(newButton).addClass("btn btn-dark col-12 searchButton");
            $(newForm).prepend(newButton);
        }
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
            method: "get"
        }).then(function(response){
        $(".currentCity").html(searchInput);
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
                if(response.value>0&&response.value<2){
                    $(".uvIndexIcon").css("background-color","#209700");
                }
                if(response.value>=2&&response.value<6){
                    $(".uvIndexIcon").css("background-color","#f8e600");
                }
                if(response.value>=6&&response.value<8){
                    $(".uvIndexIcon").css("background-color","#fb5800");
                }
                if(response.value>=8&&response.value<11){
                    $(".uvIndexIcon").css("background-color","#db0000");
                }
                if(response.value>=11){
                    $(".uvIndexIcon").css("background-color","6b43cb");
                }
                }).then(function(){
                $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                method: "get"
                }).then(function(response){
                    $(".currentCity").html(searchInput+" ("+currentDay+")");
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
                if(response.value>0&&response.value<2){
                    $(".uvIndexIcon").css("background-color","#209700");
                }
                if(response.value>=2&&response.value<6){
                    $(".uvIndexIcon").css("background-color","#f8e600");
                }
                if(response.value>=6&&response.value<8){
                    $(".uvIndexIcon").css("background-color","#fb5800");
                }
                if(response.value>=8&&response.value<11){
                    $(".uvIndexIcon").css("background-color","#db0000");
                }
                if(response.value>=11){
                    $(".uvIndexIcon").css("background-color","6b43cb");
                }
                }).then(function(){
                    $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                    method: "get"
                    }).then(function(response){
                    $(".currentCity").html("Atlanta"+" ("+currentDay+")");
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
                $(".uvIndex").html("UV Index: ");
                $(".uvIndexIcon").html(response.value);                
                if(response.value>0&&response.value<2){
                    $(".uvIndexIcon").css("background-color","#209700");
                }
                if(response.value>=2&&response.value<6){
                    $(".uvIndexIcon").css("background-color","#f8e600");
                }
                if(response.value>=6&&response.value<8){
                    $(".uvIndexIcon").css("background-color","#fb5800");
                }
                if(response.value>=8&&response.value<11){
                    $(".uvIndexIcon").css("background-color","#db0000");
                }
                if(response.value>=11){
                    $(".uvIndexIcon").css("background-color","6b43cb");
                }
            }).then(function(response){
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                    method: "get"
                }).then(function(response){
                    $(".currentCity").html(searchInput+" ("+currentDay+")");
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
                $(".uvIndex").html("UV Index: ");
                $(".uvIndexIcon").html(response.value);                
                if(response.value>0&&response.value<2){
                    $(".uvIndexIcon").css("background-color","#209700");
                }
                if(response.value>=2&&response.value<6){
                    $(".uvIndexIcon").css("background-color","#f8e600");
                }
                if(response.value>=6&&response.value<8){
                    $(".uvIndexIcon").css("background-color","#fb5800");
                }
                if(response.value>=8&&response.value<11){
                    $(".uvIndexIcon").css("background-color","#db0000");
                }
                if(response.value>=11){
                    $(".uvIndexIcon").css("background-color","6b43cb");
                }
                }).then(function(){
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                    method: "get"
                }).then(function(response){
                    $(".currentCity").html(searchInput+" ("+currentDay+")");
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
                $(".uvIndex").html("UV Index: ");
                $(".uvIndexIcon").html(response.value);                
                if(response.value>0&&response.value<2){
                    $(".uvIndexIcon").css("background-color","#209700");
                }
                if(response.value>=2&&response.value<6){
                    $(".uvIndexIcon").css("background-color","#f8e600");
                }
                if(response.value>=6&&response.value<8){
                    $(".uvIndexIcon").css("background-color","#fb5800");
                }
                if(response.value>=8&&response.value<11){
                    $(".uvIndexIcon").css("background-color","#db0000");
                }
                if(response.value>=11){
                    $(".uvIndexIcon").css("background-color","6b43cb");
                }
            }).then(function(){
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&units=imperial&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                    method: "get"
                }).then(function(response){
                    $(".currentCity").html(searchInput+" ("+currentDay+")");
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