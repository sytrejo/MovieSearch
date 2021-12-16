// //Here is the work for the current search button
// var requestUrl = 'https://api.github.com/orgs/nodejs/repos?per_page=5';

// var responseText = document.getElementById('response-text');

// function getApi(requestUrl) {
//   fetch(requestUrl)
//     .then(function (response) {
//       console.log(response);
//       if (response.status === 200) {
//         responseText.textContent = response.status;
//       }
//       return response.json();
//   });
// }
// getApi(requestUrl);

// I used this article for the realease list. I did NOT include tv series. We can add them later if we want. https://www.gamesradar.com/how-to-watch-marvel-movies-in-order-mcu/
// function isRelease(){
//     var MCUChronological = ['Captain America: The First Avenger', 'Captain Marvel', 'Iron Man', 'Iron Man 2','The Incredible Hulk','Thor','The Avengers','Iron Man 3','Thor:The Dark World','Captain America: The Winter Soldier','Guardians of the Galaxy','Guardians of the Galaxy 2','Avengers: Age of Ultron','Ant-Man','Captain America: Civil War','Spider-Man:Homecoming','Doctor Strange','Black Widow', 'Black Panther','Thor: Ragnarok','Ant-Man and the Wasp','Avengers:Infinity War','Avengers:Endgame','Shang-Chi and The Legend of the Ten Rings','Spider-Man: Far from Home','Eternals'];
//     var MCUrelease =['Iron Man', 'Avengers: Age of Ultron', 'Ant-Man', 'Captain America:Civil War','Doctor Strange','Guardians of the Galaxy','Spider-Man: Homecoming','Thor:Ragnarok','Black Panthar','Avengers: Infinity War', 'Ant-Man and the Wasp','Captain Marvel', 'Avengers:Endgame','Spider-Man: Far From Home', 'Black Widow','Shang-Chi and the Legend of the Ten Rings','Eternals','Spider-Man: No Way Home'];
//     return isRelease ? MCUrelease : MCUChronological;
//     console.log(isRelease);
    // document.getElementById("Chronological").checked = true;
    // console.log(MCUChronological);
    // document.getElementById("Release").checked = true;
    // console.log(MCUrelease);
// };


// $("#form").submit(function (e) {
//     e.preventDefault()
//     var query = $("#search-form").val()
//     var API_Key = "14b587754129323445d3c36cc6619d43"
//     var url = "https://api.themoviedb.org/3/movie/550?api_key=14b587754129323445d3c36cc6619d43"
//     $.get(url, function (data){
//         console.log(data)
//     })
// })

function filteredSearch(){
  // //determine the timeline filter
  // var timelineOptions = document.getElementById("timelineOptionsDiv").children
  // var timeline = null
  // for (let i = 0; i < timelineOptions.length; i++) {
  //   if (timelineOptions[i].nodeName == "INPUT" && timelineOptions[i].checked) {
  //     timeline = timelineOptions[i].getAttribute("value")
  //   } 
  // }
  // console.log("Timeline Selection: " + timeline)
  
  
  //determine the movie filter
  var movieOptions = document.getElementById("movieOptionsDiv").children
  var movie = null
  for (let i = 0; i < movieOptions.length; i++) {
    if (movieOptions[i].nodeName == "INPUT" && movieOptions[i].checked) {
      movie = movieOptions[i].getAttribute("value")
    } 
  }
  console.log("Movie Selection: " + movie)

  //hide search page and show movie detail page
  $(function () {
    if (movie != null) {
      $('#movieDetailPage').removeClass('hidden');
      $('#searchPage').addClass('hidden');
    }
});

  // //determine the duration filter
  // var durationOptions = document.getElementById("durationOptionsDiv").children
  // var duration = null
  // for (let i = 0; i < durationOptions.length; i++) {
  //   if (durationOptions[i].nodeName == "INPUT" && durationOptions[i].checked) {
  //     duration = durationOptions[i].getAttribute("value")
  //   } 
  // }
  // console.log("Duration Selection: " + duration)

  // if they did not select a character, alert them
  if (movie == null) {
    alert("You must select a movie")
  } else {
    // query TMDB for movies about the selected character
    var titleSearchUrl = "https://api.themoviedb.org/3/search/movie/?api_key=14b587754129323445d3c36cc6619d43&query=" + movie
    $.get(titleSearchUrl, function(data) {
      var movieResults = data.results
      var movieId = null
      for (let i = 0; i < movieResults.length; i++) {
        if (movieResults[i].original_title == movie){
          movieId = movieResults[i].id
        }
      }
      if (movieId == null && movie != null) {
        alert("Sorry, we couldn't find any details for that movie. Please try another.")
      } else if (movieId != null) {
        console.log("MOVIE ID: " + movieId)
        getMovieDetails(movieId)
      }
    })
  }
}

function getMovieDetails(movieId){
  var movieDetailUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + "14b587754129323445d3c36cc6619d43"
  $.get(movieDetailUrl, function(data) {
    console.log("MOVIE DETAILS FROM API REQUEST")
    console.log(data)

    // set movie name in movie detail page
    var movieNameCell = document.getElementById('movieName');
    movieNameCell.appendChild(document.createTextNode(data.original_title));

    // set release date in movie detail page
    var releaseDateCell = document.getElementById('releaseDate');
    releaseDateCell.appendChild(document.createTextNode(data.release_date));
  })
}

// function getURL(){
//     var API_Key = '14b587754129323445d3c36cc6619d43';
//     var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_Key + '&query=Jack+Reacher';
//     $.get(url);
// }

// the selector will match all input controls of type :checkbox
// and attach a click event handler 
$("input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
      // the name of the box is retrieved using the .attr() method
      // as it is assumed and expected to be immutable
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      // the checked state of the group/box on the other hand will change
      // and the current value is retrieved using .prop() method
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
  });






