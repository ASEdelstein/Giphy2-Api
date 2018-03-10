    // Initial array of drinks
    var drinks = ["Absinthe", "Martini", "Beer", "Wine", "Whiskey", "Whisky", "Champagne", "Tequila", "Rum", "Margarita", "Gin", "Syrah"];
    // Function for dumping the JSON content for each button into the div
    function displayAlcoholInfo() {
      var alcohol = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + alcohol + "&api_key=iwkeZ2N4H4Qcj1Roo542NvvykeNNcoZi&limit=10"
      
      // We then created an AJAX call
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        $("#alcohol-view").empty();
        for(var  i =0; i <response.data.length; i++){
        // Creating a div to hold the alcohol choice
        var alcoholDiv = $("<div class='Order Drink'>");
        // Storing the rating data
        var rating = response.data[i].rating;
        console.log(response.data[i].rating); 
        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Rating: " + rating);
        // Displaying the rating
        alcoholDiv.append(pOne);
        var imgURL = response.data[i].images.fixed_height.url;
        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);
        // Appending the image
        alcoholDiv.append(image);
        // Putting the entire drinks choice above the previous drinks
        $("#alcohol-view").prepend(alcoholDiv);
      }
      });
    }
    // Function for displaying alcohol choice
    function renderButtons() {
      // Deleting the buttons prior to adding new alchohol choices
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();
      // Looping through the array of doggies
      for (var i = 0; i < drinks.length; i++) {
        // Then dynamically generating buttons for each alcohol choice in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of drinks to our button
        a.addClass("alcohol");
        // Adding a data-attribute
        a.attr("data-name", drinks[i]);
        // Providing the initial button text
        a.text(drinks[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    }
    // This function handles events where one button is clicked
    $("#add-alcohol").on("click", function (event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var alcohol = $("#alcohol-input").val().trim();
      // Adding the drinks from the textbox to our array
      drinks.push(alcohol);
      console.log(drinks);
    
      // Calling renderButtons which handles the processing of our drink choice array
      renderButtons();
    });
    // Function for displaying the drink choice info
    // Using $(document).on instead of $(".alcohol").on to add event listeners to dynamically generated elements
    $(document).on("click", ".alcohol", displayAlcoholInfo);
    // Calling the renderButtons function to display the initial buttons
    renderButtons();