$(document).ready(function () { 

    var countries = ["America", "Spain", "Germany", "China"];
    console.log(countries);

    function createButtons() {
        $(".countries").empty();

        for (var i = 0; i < countries.length; i++) {
            var create = $("<button>");
            create.addClass("addCountry");
            create.attr("data-name", countries[i]);
            create.text(countries[i]);
            $(".countries").append(create);

        }
    }
    createButtons();

    $(".countries").on("click", "button", function (event) {

        var country = $(this).text().trim();

        console.log(country);

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BQ3eTbHfMtR6tr7ZiJeYIPiXu545rexO&q=" + country + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(JSONresponse) {
            console.log(JSONresponse);

            var results = JSONresponse.data

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r") {
                    var gifDiv = $("<div class = 'item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var countryImage = $("<img>");

                    

                    countryImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.append(p);
                    gifDiv.append(countryImage);
                    $("body").append(gifDiv);

                    countryImage.attr("src", JSONresponse.data[i].images.fixed_width_still.url);
                    countryImage.attr("data-still", JSONresponse.data[i].images.fixed_width_still.url);
                    countryImage.attr("data-animate", JSONresponse.data[i].images.fixed_width.url);
                    countryImage.addClass("gif")
                    countryImage.attr("data-state", "still");

                    
                }

                $(".gif").on("click", function() {
                    event.preventDefault();
                    var state = $(this).attr("data-state");
                     
                     if (state === "still") {
                       $(this).attr("src", $(this).attr("data-animate"));
                       $(this).attr("data-state", "animate");
                     } else {
                       $(this).attr("src", $(this).attr("data-still"));
                       $(this).attr("data-state", "still");
                     }
                    }); 

            }
        });

    });

    $("#addCountry").on("click", function(event){
        var country = $("#country-input").val().trim();
        countries.push(country);
        console.log(countries);
        createButtons();
    });

    $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
  

});
