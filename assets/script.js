var prevSearch = document.getElementById("prevSearch");
var placeName = document.querySelector("#placeName");
var searchInput = document.querySelector("#searchInput");
var requestedForcast = "";
var currentDay = document.getElementById("currentDay");

//Next four sections are on creating an array for previous searches, with the 
// ability to clear search browswers. Let me be clear, I STILL DON'T KNOW how
// localStorage works.

// User can just select the location from the list and it PICKS IT UP
$("#prevSearch").on("click", function(){
  var prevChoice = event.target.textContent
  console.log(prevChoice); 
  var requestedForcast = prevChoice;
  summonWeather(requestedForcast);
})

//section details how to add new searches to the localStorage, and adding the
// new Search to the list in real time.

$("#locationSearch").on("click", function() {
  console.log("have pressed a button");
  var newSearch = $(this).parent().siblings("#searchInput").val();
          console.log(newSearch)
          console.log(potentialLocations)
          potentialLocations = potentialLocations.concat(newSearch);
          console.log(potentialLocations)

          localStorage.setItem("prevSearch", JSON.stringify(potentialLocations));
          searchInput.value = '';
          var showLocations = JSON.parse(localStorage.getItem("prevSearch"));
          console.log(showLocations);
          var newSearchAdd = document.createElement('li');
          newSearchAdd.innerHTML = newSearch;
          console.log(newSearchAdd);
          prevSearch.appendChild(newSearchAdd);
          var requestedForcast = newSearch;
          summonWeather(requestedForcast);
});

// Providing content for HTML page on load.
var showLocations = JSON.parse(localStorage.getItem("prevSearch"));
console.log(showLocations);

// Now - for a good few hours I couldn't figure out why whenever I cleared
// the localStorage file I was getting thrown an error, and I believe it was 
// due to the fact that I was trying to call a key that had no object. This 
// conditional and looping statements remediate the issue.

if (!showLocations){
console.log("Empty localStorage");
 localStorage.setItem("prevSearch", JSON.stringify(""));
 console.log(showLocations);
 var potentialLocations = [];
} else {
  var potentialLocations = showLocations;
}


for (i=0; i < showLocations.length; i++) {
  var oldSearch = document.createElement('li');
  oldSearch.innerHTML = showLocations[i];
  prevSearch.appendChild(oldSearch);
 }

 // It's entirely possible for the page to become cluttered with too many searches,
 // so we added a button to remove the localStorage. Interestingly, this proceeded
 // to throw up continuous errors as the entire key was removed.

 $("#clearSearch").on("click", function(){

     localStorage.removeItem("prevSearch");
     localStorage.setItem("prevSearch","");
     localStorage.setItem("prevSearch", JSON.stringify(""));
     document.getElementById('prevSearch').innerHTML = "";
     potentialLocations = showLocations;
     console.log(showLocations);
     potentialLocations = [];
     console.log(potentialLocations);
 });

// The 'event' in this instance is actually the location that we we will need to 
// find the Latitude and Longitude for. The user is redirected to this function 
// when entering a new location search or selecting a previous search.
function summonWeather(event){
  console.log("Okay - let's GO");
  console.log(event);
  var geoCode = "https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc&searchtext=" + event;
  console.log(geoCode);
  $("#currentDay img").removeClass();

  //Providing fetch block to get Latitude and Longitude coordinates.
    
  fetch(geoCode)
  .then(function (response) {
    return response.json();
  })
    .then(function (data) {
        console.log(data)
        var searchLat = data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
        var searchLong = data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
        console.log(searchLat);
        console.log(searchLong); 
        var getWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + searchLat + "&lon=" + searchLong + "&units=metric&exclude=minutely,hourly&appid=15ded98cd7617010730249cbf7259a51"

        // Fetch block within fetch block to use searchLat and searchLong functions to gather location.
        console.log(getWeather); 
        fetch(getWeather)
          .then(function (response) {
            var weatherResponse = response;
              console.log(weatherResponse)
              return weatherResponse.json();
              
          })
              .then(function(data){

                  var openSun = data;

          // okay everything below here is ACTUALLY required for currentDay, aka gathering information to display in HTML
                  var iconCode = openSun.current.weather[0].icon;
                  iconCode ="_" + iconCode
                  console.log(iconCode)
                  var unixDt = moment.unix(openSun.current.dt).format("DD-MM-YYYY");
                  console.log(unixDt);
                  $("#locationEvent").text(event)
                  $("#locationEventDate").text(unixDt);
                  $("#icon").removeClass();
                  $("#icon").addClass(iconCode);
                  $("#temp span").text(openSun.current.temp);
                  $("#windSpeed span").text(openSun.current.wind_speed);
                  $("#humid span").text(openSun.current.humidity);
                  $("#uvi span").text(openSun.current.uvi);

                //UVI index indicator.

                  if (openSun.current.uvi <= 2) {
                    $("#currentDay #uvi span").addClass("low");
                    $("#currentDay #uvi span").removeClass("moderate");
                    $("#currentDay #uvi span").removeClass("high");
                    $("#currentDay #uvi span").removeClass("vHigh");
                    $("#currentDay #uvi span").removeClass("eHigh");
                    console.log("UV = low")
                  } else if (openSun.current.uvi > 2 && openSun.current.uvi < 6) {
                    $("#currentDay #uvi span").removeClass("low");
                    $("#currentDay #uvi span").addClass("moderate");
                    $("#currentDay #uvi span").removeClass("high");
                    $("#currentDay #uvi span").removeClass("vHigh");
                    $("#currentDay #uvi span").removeClass("eHigh");
                    console.log("UV = moderate")
                   } else if (openSun.current.uvi > 5 && openSun.current.uvi < 8) {
                    $("#currentDay #uvi span").removeClass("low");
                    $("#currentDay #uvi span").removeClass("moderate");
                    $("#currentDay #uvi span").addClass("high");
                    $("#currentDay #uvi span").removeClass("vHigh");
                    $("#currentDay #uvi span").removeClass("eHigh");
                    console.log("UV = high")
                   } else if (openSun.current.uvi >= 7 && openSun.current.uvi < 11) {
                    $("#currentDay #uvi span").removeClass("low");
                    $("#currentDay #uvi span").removeClass("moderate")
                    $("#currentDay #uvi span").removeClass("high")
                    $("#currentDay #uvi span").addClass("vHigh");
                    $("#currentDay #uvi span").removeClass("eHigh")
                    console.log("UV = very high")
                   } else if (openSun.current.uvi > 10) {
                    $("#currentDay #uvi span").removeClass("low");
                    $("#currentDay #uvi span").removeClass("moderate")
                    $("#currentDay #uvi span").removeClass("high")
                    $("#currentDay #uvi span").removeClass("vHigh");
                    $("#currentDay #uvi span").addClass("eHigh");
                    console.log("UV = Extreme")
                   }

                  var dailyWeather = openSun.daily;
                  console.log(dailyWeather);
                 $("#futureWeather").empty();
                 document.body.children[1].children[2].children[1].style.display = "block"
                 //     $("#futureWeather").append("<h4>5 Day Forecast</h4>");

                  //    Providing 5 day forcast - we're using i=1 and i, 6 so that we don't get the first array, as that appears to 
                  //    just be a repeat of current day info.

                  for (i =1; i < 6; i++){
                  
                    var futureIconCode = dailyWeather[i].weather[0].icon;
                    futureIconCode = "_" + futureIconCode;
                    var futureUnixDt = moment.unix(dailyWeather[i].dt).format("DD-MM-YYYY");
                    console.log(futureUnixDt);
                    $("#futureWeather").append("<div id='#newCard'>" +  "<h5 id='futureEventDate'>" + futureUnixDt + "</h5>" + "<p id='icon' class='" + futureIconCode + "'>" + "</p>" + "<p>Temp: " + dailyWeather[i].temp.day + "</p>" + "<p> Wind: " + dailyWeather[i].wind_speed + "</p>" + "<p> Humidity: " + dailyWeather[i].humidity + "</p>" + "<p id='uvi'> UV: <span>" + dailyWeather[i].uvi + "</span></p>" + "</div>");

                  }
         })
   });
}