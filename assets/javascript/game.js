$(document).ready(function () {

    var topics = ["chevrolet", "ford", "ferarri", "tesla", "dodge"];
    var apiKey = "&api_key=vEcKI3Y3c3gSdqpCfDSVdiuCovlUc1iN";
    var limit = "&limit=10";
    var topicButton = "";

    function capitalizeItems() {
        for (var i = 0; i < topics.length; i++) {
            var item = topics[0];
            var newItem = item[0].toUpperCase() + item.slice(1);
            topics.shift();
            topics.push(newItem);
        }
    }

    function createButtons() {
        $("#topic-buttons").empty();
        capitalizeItems();

        for (var i = 0; i < topics.length; i++) {
            topicButton = $("<button>").text(topics[i]).addClass("btn btn-primary choices").attr("id", topics[i]);
            $("#topic-buttons").append(topicButton);
            $(".choices").after(" ")
        }
    }

    $(document).on("click", ".choices", function() {
        $(".clearable").empty();

        var chosenTopic = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosenTopic + apiKey + limit;
        console.log(chosenTopic);
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifSpan = $("<span>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $("<img>").attr("src", results[i].images.fixed_height.url);

                gifSpan.append(p);
                gifSpan.append(image);

                $("#topic-images").prepend(gifSpan);
            }
        })
    })

    $("#clear").on("click", function() {
        console.log("Hi")
        $(".clearable").empty();
    })

    $("#add-user-input").on("click", function(event) {
        event.preventDefault();
        var userTopic = $("#user-topic").val().trim();
        // $("user-topic").text(userTopic.charAt(0).toUpperCase());
        $("#user-topic").val("");

        if (userTopic != "") {
        topics.push(userTopic);
        createButtons();
        }
    })

    createButtons();
});