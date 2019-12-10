$(document).ready(function() {
    var userCityArray = [];

    var userStorageArray = JSON.parse(localStorage.getItem("savedSearches")) || [];
    // $(".userButtonsDiv").empty();
    console.log("this is what is in userStorageArray" + userStorageArray);
    for (var j = 0; j < userStorageArray.length; j++) {
        var buttonTag = $("<button>");
        buttonTag.textContent = userStorageArray[j];

        // Adding a class of movie-btn to our button
        buttonTag.addClass("city-btn");
        // Adding a data-attribute
        buttonTag.attr("data-name", userStorageArray[j]);
        // Providing the initial button text
        buttonTag.text(userStorageArray[j]);
        // Adding the button to the buttons-view div
        $(".userButtonsDiv").append(buttonTag);
        $(".userButtonsDiv").append("<br></br>");

    }
    $(document).on("click", ".city-btn", alertCityName);

    // });



    function renderButtons() {
        $(".userButtonsDiv").empty();
        for (var i = 0; i < userCityArray.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var newButton = $("<button>");
            // Adding a class of movie-btn to our button
            newButton.addClass("city-btn");
            // Adding a data-attribute
            newButton.attr("data-name", userCityArray[i]);
            // Providing the initial button text
            newButton.text(userCityArray[i]);
            // Adding the button to the buttons-view div
            $(".userButtonsDiv").append(newButton);
            $(".userButtonsDiv").append("<br></br>");

        }

    };

    function alertCityName() {
        var newCity = $(this).attr("data-name");
        var newURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + newCity + "&units=metric" + "&APPID=8260f022448e3f07d6465f550bc77374";
        $.ajax({
                url: newURL,
                method: "GET",
                dataType: "jsonp"

            })
            //     // We store all of the retrieved data inside of an object called "response"
            .then(function(data) {
                // Log the queryURL
                console.log(newURL);
                console.log("the data is saying" + data);

                // Transfer content to HTML
                $(".city").text(data.city.name);
                $(".date").text('(' + data.list[0].dt_txt.slice(0, -9) + ')');
                var topIconcode = data.list[0].weather[0].icon;
                var topIconurl = "http://openweathermap.org/img/w/" + topIconcode + ".png";
                $("<img>").attr("src", topIconurl);
                $(".iconTop").attr("src", topIconurl);
                console.log("tonnette wants to know " + data.city.name);
                $(".temp").text("Temperature: " + data.list[0].main.temp + "°C");
                $(".humidity").text("Humidity: " + data.list[0].main.humidity + "%");
                $(".wind").text("Wind Speed: " + data.list[0].wind.speed + "MPH");
                $(".uvindex").text("UV Index: " + data.list[0].wind.speed);

                for (var i = 0; i < 6; i++) {
                    var iconcode = data.list[i * 8].weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $("<img>").attr("src", iconurl);
                    $(".icon" + i).attr("src", iconurl);
                    $(".tempCard" + i).text("Temp: " + data.list[i * 8].main.temp + "°C");
                    $(".humidCard" + i).text("Humidity: " + data.list[i * 8].main.humidity + "%");
                    $(".dateCard" + i).text(data.list[i * 8].dt_txt.slice(0, -9));

                }
            });
    };



    $(".mag").on("click", function() {
        event.preventDefault();
        renderButtons();
        var userCity = $("#searchField").val();
        var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userCity + "&units=metric" + "&APPID=8260f022448e3f07d6465f550bc77374";

        userCityArray.push(userCity);
        console.log(userCity);
        console.log(userCityArray);
        console.log(queryURL);
        renderButtons();
        localStorage.setItem("savedSearches", JSON.stringify(userCityArray));


        // Here we are building the URL we need to query the database
        if (userCity !== '') {
            $(".card").show();
            $(".five-day").show();
            // var APIKey = "";
            myAjax();
        } else {
            alert("field cannot be empty");
        }

        function myAjax() {
            // // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                    url: queryURL,
                    method: "GET",
                    dataType: "jsonp"

                })
                //     // We store all of the retrieved data inside of an object called "response"
                .then(function(data) {
                    // Log the queryURL
                    console.log(queryURL);
                    console.log("the data is saying: " + data);

                    // Transfer content to HTML
                    $(".city").text(data.city.name);
                    $(".date").text('(' + data.list[0].dt_txt.slice(0, -9) + ')');
                    var topIconcode = data.list[0].weather[0].icon;
                    var topIconurl = "http://openweathermap.org/img/w/" + topIconcode + ".png";
                    $("<img>").attr("src", topIconurl);
                    $(".iconTop").attr("src", topIconurl);
                    console.log("tonnette wants to know " + data.city.name);
                    $(".temp").text("Temperature: " + data.list[0].main.temp + "°C");
                    $(".humidity").text("Humidity: " + data.list[0].main.humidity + "%");
                    $(".wind").text("Wind Speed: " + data.list[0].wind.speed + "MPH");
                    $(".uvindex").text("UV Index: " + data.list[0].wind.speed);

                    for (var i = 0; i < 6; i++) {
                        var iconcode = data.list[i * 8].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $("<img>").attr("src", iconurl);
                        $(".icon" + i).attr("src", iconurl);
                        $(".tempCard" + i).text("Temp: " + data.list[i * 8].main.temp + "°C");
                        $(".humidCard" + i).text("Humidity: " + data.list[i * 8].main.humidity + "%");
                        $(".dateCard" + i).text(data.list[i * 8].dt_txt.slice(0, -9));

                    }
                });







        }





    });


});