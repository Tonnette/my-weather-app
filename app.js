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
                    console.log("tonnette wants to know " + data.city.name);
                    $(".temp").text("The Temperature (F) is: " + data.list[0].main.temp);


                    for (var i = 0; i < 6; i++) {
                        var iconcode = data.list[i].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $("<img>").attr("src", iconurl);
                        console.log("tonnette" + iconurl)
                        $(".icon"+i).attr("src", iconurl);
                    }

                    // var iconcode = data.list[0].weather[0].icon;
                    // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    // $("<img>").attr("src", iconurl);
                    // console.log(iconurl)
                    // $(".icon1").attr("src", iconurl);


                    // var iconcode2 = data.list[1].weather[0].icon;
                    // var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
                    // $("<img>").attr("src", iconurl2);
                    // console.log(iconurl2)
                    // $(".icon2").attr("src", iconurl2);

                    // var iconcode3 = data.list[2].weather[0].icon;
                    // var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
                    // $("<img>").attr("src", iconurl3);
                    // console.log(iconurl2)
                    // $(".icon3").attr("src", iconurl3);









                })


        } else {
            alert("field cannot be empty");
        }


    })


});
