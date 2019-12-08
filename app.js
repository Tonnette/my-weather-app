$(document).ready(function () {
    var userCity;


    $(".mag").on("click", function () {
        event.preventDefault();
        $(".card").show();




        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=sydney&APPID=8260f022448e3f07d6465f550bc77374",
            // + city + "," + city + "&units=imperial&appid=" + APIKey;
            userCity = $(".searchField").val();
        console.log(userCity);

        if (userCity !== '') {

            // var APIKey = "";
            // // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET",
                dataType: "jsonp"

            })
                //     // We store all of the retrieved data inside of an object called "response"
                .then(function (data) {
                    // Log the queryURL
                    console.log(queryURL);

                    // Transfer content to HTML
                    $(".city").text("The city name is: " + data.city.name);
                    $(".date").text("The date is: " + data.list[0].dt_txt);
                    console.log("tonnette wants to know " + data.city.name);
                    $(".temp").text("The Temperature (F) is: " + data.list[0].main.temp);
                    $(".humidity").text("The humidity is: " + data.list[0].main.humidity);
                    $(".wind").text("The wind speed is: " + data.list[0].wind.speed);
                    $(".uvindex").text("The UV Index is: " + data.list[0].wind.speed);

                    // * Date

                    // * Icon image (visual representation of weather conditions)
                  
                    // * Temperature
                  
                    // * Humidity


                    for (var i = 0; i < 6; i++) {
                        var iconcode = data.list[i].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $("<img>").attr("src", iconurl);
                        $(".icon"+i).attr("src", iconurl);
                        $(".tempCard"+i).text("Temp: " + data.list[i].main.temp + " F")
                        $(".humidCard"+i).text("Humidity: " + data.list[i].main.humidity)

                    }

                    // for (var j = 0; j < 6; j++) {
                        $(".dateCard").text(data.list[0].dt_txt);
                    // }
                })

        } else {
            alert("field cannot be empty");
        }


    })


});
