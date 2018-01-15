
var animals = ["cat","dog","fox","fish","bear","rat","monkey","lion","chicken","rabbit","skunk"];      


function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
          
          a.addClass("btn", "animals");
          
          a.attr("data-name", animals[i]);
         
          a.text(animals[i]);
          
          $("#buttons-view").append(a);
        }
      }

renderButtons();

  $("#add-animal").on("click", function(event) {
     
        event.preventDefault();

        animal = $("#animal-input").val().trim();
       
        animals.push(animal);


        console.log(animals);

        renderButtons();

      });

  // that function scan the script dynamicly

  $(document).on("click", ".btn", function() {

    var animal = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10"; 

   $.ajax({
     url: queryURL,
     method: "GET"
   })

   .done(function(response){
    console.log(response.data)

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var animalDiv = $("<div>");
      var p = $("<p>").text("Rating: " + results[i].rating);
      var image = $("<img>");
      var gifUrl = results[i].images.fixed_height.url;
      var imageUrl = results[i].images.original_still.url;

      image.attr("src", imageUrl);
      image.attr("data-still", imageUrl);
      image.attr("data-animate", gifUrl);
      image.attr("data-state", gifUrl);
      image.addClass("gif");
      image.attr("alt", "animal image");

      animalDiv.append(p);
      animalDiv.append(image);

      $("#gifs-appear-here").prepend(animalDiv);

    }

    //change the url still
    
  
    $(".gif").on("click", function() {
      var state = $(this).attr("data-state");

      if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");  
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
 
   }); 
  });

  

