$(document).ready(function () {
    var userCity;

    $(".mag").on("click", function () {
        event.preventDefault();
        $(".card").show();
    

        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=sydney&APPID=8260f022448e3f07d6465f550bc77374",
        // + city + "," + city + "&units=imperial&appid=" + APIKey;
        userCity = $(".searchField").val();
        console.log (userCity);

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
                    // Log the resulting object
                    console.log("tonnette data" + data);

                    // var obj = data;
                    // var myJSON = JSON.stringfy (obj);
                    // console.log("tonnette data2" + myJSON);

                    // Transfer content to HTML
                    $(".city").html("The city name is: " + data.city.name);
                    console.log("tonnette wants to know " + data.city.name);
                    $(".temp").text("The Temperature (F) is: " + data.list[0].main.temp);
                    $(".city").text("The city name is: " + data.city.name);
                    // $(".icon").text("Wind Speed: " + data.wind.speed);

                    var iconcode = data.list[1].weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

          // Creating an element to hold the image
          var image = $("<img>").attr("src", iconurl);
          console.log(iconurl)

                    $(".icon1").attr("src", iconurl);

                    

                    
                    // $(".humidity").text("Humidity: " + data.main.humidity);
                    // $(".temp").text("Temperature (F) " + data.main.temp);

                })


        } else {
            alert("field cannot be empty");
        }


    })
});
