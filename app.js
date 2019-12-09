$(document).ready(function() {
    var userCityArray = [];
    var newCity = $(this).attr("data-name");

    $(".mag").on("click", function() {
        event.preventDefault();
        renderButtons();

        var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + "sydney" + "&units=metric" + "&APPID=8260f022448e3f07d6465f550bc77374",
            // + city + "," + city + "&units=imperial&appid=" + APIKey;
            userCity = $("#searchField").val();
        userCityArray.push(userCity);
        console.log(userCity);
        console.log(userCityArray);
        console.log(queryURL);
        var firstNewButton = $("<button>");
        // Adding a class of movie-btn to our button
        firstNewButton.addClass("city-btn");
        // Providing the initial button text
        firstNewButton.text(userCity);
        // Adding the button to the buttons-view div
        $(".userButtonsDiv").append(firstNewButton);
        $(".userButtonsDiv").append("<br></br>");

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

        }

        // Here we are building the URL we need to query the database
        if (userCity !== '') {
            $(".card").show();
            // var APIKey = "";
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
                    console.log(data);

                    // Transfer content to HTML
                    $(".city").text("The city name is: " + data.city.name);
                    $(".date").text("The date is: " + data.list[0].dt_txt);
                    console.log("tonnette wants to know " + data.city.name);
                    $(".temp").text("The Temperature (C) is: " + data.list[0].main.temp);
                    $(".humidity").text("The humidity is: " + data.list[0].main.humidity);
                    $(".wind").text("The wind speed is: " + data.list[0].wind.speed);
                    $(".uvindex").text("The UV Index is: " + data.list[0].wind.speed);

                    for (var i = 0; i < 6; i++) {
                        var iconcode = data.list[i * 8].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $("<img>").attr("src", iconurl);
                        $(".icon" + i).attr("src", iconurl);
                        $(".tempCard" + i).text("Temp: " + data.list[i * 8].main.temp + " C");
                        $(".humidCard" + i).text("Humidity: " + data.list[i * 8].main.humidity);
                        $(".dateCard" + i).text(data.list[i * 8].dt_txt);

                    }
                });

        } else {
            alert("field cannot be empty");
        }


    });

    // $(document).on("click", ".city-btn", displayCityInfo);
    // Calling the renderButtons function to display the initial buttons
    // renderButtons();
});