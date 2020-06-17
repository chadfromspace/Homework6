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
    if(localStorage.getItem("searchHistory")!==null){
        searchInputArray.push(localStorage.getItem("searchHistory").split(","));
        searchInput = searchInputArray[0][searchInputArray.length-1];
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
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: "+response.value);
                }).then(function(response){
                    $.ajax({
                        url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
                        method: "get"
                    }).then(function(response){;
                        $(".currentCity").html(searchInput+" ("+currentDay+")");
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
        }).then(function(response){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: "+response.value);
                localStorage.setItem("latestCity",latestCity);
                })
        })
    }
    


    $(".searchButton").on("click",function(event){
        event.preventDefault();
        searchInput = event.target.innerHTML;
        searchInputArray.push(searchInput);
        var latestCity = [];     
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
        }).then(function(response){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: "+response.value);
                latestCity.push(event.target.innerHTML);
                localStorage.setItem("latestCity",latestCity);
                }).then(function(response){
                    $.ajax({
                        url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
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
                    })
            })
        })
    })
    //On submit function.
    $(document).on("submit",function(event){
        event.preventDefault();
        var searchInput = event.target.lastElementChild.value;
        searchInputArray.push(searchInput);
        var latestCity = [];
        var newButton = document.createElement("button");
        newButton.textContent = searchInput;
        $(newButton).addClass("btn btn-dark col-12");
        $(newForm).prepend(newButton);        
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
        }).then(function(response){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: "+response.value);
                localStorage.setItem("latestCity",latestCity);
                }).then(function(response){
                    $.ajax({
                        url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
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
                    })
            })
        })
    })

    $(".searchIcon").on("click",function(event){
        event.preventDefault();
        var searchInput = event.currentTarget.parentElement.children[0][0].value;
        searchInputArray.push(searchInput);
        var latestCity = [];
        var newButton = document.createElement("button");
        newButton.textContent = searchInput;
        $(newButton).addClass("btn btn-dark col-12");
        $(newForm).prepend(newButton);        
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
        }).then(function(response){
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/uvi?appid=da0d8ead8e11a7c6ac8547cdc2d96e73&lat="+latitude+"&lon="+longitude,
                method: "get"
            }).then(function(response){
                $(".uvIndex").html("UV Index: "+response.value);
                localStorage.setItem("latestCity",latestCity);
                }).then(function(response){
                    $.ajax({
                        url: "https://api.openweathermap.org/data/2.5/forecast?q="+searchInput+"&appid=da0d8ead8e11a7c6ac8547cdc2d96e73",
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
                        console.log(nextDayValue);
                    })
            })
        })
    })
})