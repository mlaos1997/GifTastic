//Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.

$(document).ready(function() {
//Declaring variables for our AJAX
//=====================================
var authKey = "n2dJFfKBIX6KmZK7xGCthZphdJbROJo2";
var queryTerm 	= "";
var numResults 	= 10;
//URL Base
//=====================================
var queryURLBase = "https://api.giphy.com/v1/gifs/search?&api_key=" + authKey;

//Everything below is related to populating buttons and adding them to our HTML
//=====================================
var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog" ];

// This function will create our animal buttons using our array
//=====================================
function animalButtons(animals) {
	for (var i = 0; i < animals.length; i++) {
		console.log(animals[i]);
		var button = $("<button>");
			button.attr({
				"data-type": animals[i],
			})
			button.text(animals[i]);
			$("#animalBtns").append(button);
	}

}
animalButtons(animals);
// Loading our GIFS onto our webpage
//=================================================
$('button').on('click', function() {
// Resetting our values
//=================================================
	$('#animals').empty();
	$('.header').empty();
//Creating our selectors
//=================================================
	var x = $(this).data("type");
	$('.header').append("<h1>" + x + "</h1>")

	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+x+"&api_key=" + authKey + "&limit=10";

//AJAX FUNCTION
//==================================================
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
// This for loop will print out 10 gifs to our page
//==================================================
	for (var i = 0; i < 10; i++) {
// Creating variables for our still and animated images
//=====================================================
		var animated = response.data[i].images.fixed_height.url;
		var still = response.data[i].images.fixed_height_still.url;
		var animalImage = $('<img>')
// Adding attributes to our images
//=====================================================
		animalImage.attr("src", still);
		animalImage.attr("data-still", still);
		animalImage.attr("data-animate", animated);
		animalImage.attr("data-state", "still");
		animalImage.addClass("animal-image")
// Appending our Rating and images
//====================================================
	    $('#animals').append("<p>Rating: " + response.data[i].rating + "</p>");
		$('#animals').append(animalImage);
	};
// This function will pause and start our images
//====================================================
		$(document).on("click", ".animal-image" ,function () {
  			var state = $(this).attr("data-state");
  			if (state === "still") {
  				$(this).attr("src", $(this).attr("data-animate"));
  				$(this).attr("data-state", "animate");
  			} else {
  				$(this).attr("src", $(this).attr("data-still"));
  				$(this).attr("data-state", "still");
  			}
		})

		});

  });



 // This function will add new animalBtns to our Array
 //================================================
$('#animal-search').on('click', function(event) {
	event.preventDefault();
 // Get value from user input and store it in a variable
 //=================================================
 var newAnimal = $('input').val().trim();
 animals.push(newAnimal);
animalButtons(newAnimal).val().trim();
animalButtons(animals);
});

});

