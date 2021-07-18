//Need Latitude and Longitude to complete API call. Have added own API already

//var getWeather = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=41.88425" + "&" + "lon=-87.63245" + "&exclude=minutely,hourly&appid=15ded98cd7617010730249cbf7259a51"
//var getWeather = "https://api.openweathermap.org/data/2.5/onecall?" + "lat=33.44" + "&" + "lon=-94.04" + "&exclude=minutely,hourly&appid=15ded98cd7617010730249cbf7259a51"

// var geoCode = "https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc&searchtext=Rozelle+Sydney" //+ searchInput
var prevSearch = document.getElementById("prevSearch");
var placeName = document.querySelector("#placeName");
var searchInput = document.querySelector("#searchInput");
var requestedForcast = "";
var currentDay = document.getElementById("currentDay");
//var potentialLocations = [];

//var searchInput = "Rozelle"

// `${getWeather} ajdflkajslkgsrlkgksld`

//Baseline API's before we start SPLICING them.

// fetch(getWeather)
//     .then(function (response) {
//         console.log(response)
//         response.json().then(function(data){
//             var openSun = data;
//             console.log(openSun)
//           //  debugger    
//         })
//         })
    
// fetch(geoCode)
//   .then(function (response) {
//     return response.json();
//   })
//     .then(function (data) {
//         console.log(data)
//         var searchLong = data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
//         var searchLat = data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
//         console.log(searchLat);
//         console.log(searchLong);
//     //  debugger
// })

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

        console.log(getWeather); 
        fetch(getWeather)
          .then(function (response) {
            var weatherResponse = response;
              console.log(weatherResponse)
              return weatherResponse.json();
          })
              .then(function(data){
                  var openSun = data;

          // okay everything below here is ACTUALLY required for currentDay
                  var iconCode = openSun.current.weather[0].icon;
                  iconCode ="_" + iconCode
                  console.log(iconCode)
            //  addedIcon.appendTo("#currentDay")
                  var unixDt = moment.unix(openSun.current.dt).format("DD-MM-YYYY");
                  console.log(unixDt);
                  $("#locationEvent").text(event)
                  $("#locationEventDate").text(unixDt);
                  $("#icon").addClass(iconCode);
                  $("#temp span").text(openSun.current.temp);
                  $("#windSpeed span").text(openSun.current.wind_speed);
                  $("#humid span").text(openSun.current.humidity);
                  $("#uvi span").text(openSun.current.uvi);

                  if (openSun.current.uvi <= 2) {
                    $("#uvi span").addClass("low");
                    $("#uvi span").removeClass("moderate");
                    $("#uvi span").removeClass("high");
                    $("#uvi span").removeClass("vHigh");
                    $("#uvi span").removeClass("eHigh");
                    console.log("UV = low")
                  } else if (openSun.current.uvi > 2 && openSun.current.uvi < 6) {
                    $("#uvi span").removeClass("low");
                    $("#uvi span").addClass("moderate");
                    $("#uvi span").removeClass("high");
                    $("#uvi span").removeClass("vHigh");
                    $("#uvi span").removeClass("eHigh");
                    console.log("UV = moderate")
                   } else if (openSun.current.uvi > 5 && openSun.current.uvi < 8) {
                    $("#uvi span").removeClass("low");
                    $("#uvi span").removeClass("moderate");
                    $("#uvi span").addClass("high");
                    $("#uvi span").removeClass("vHigh");
                    $("#uvi span").removeClass("eHigh");
                    console.log("UV = high")
                   } else if (openSun.current.uvi > 7 && openSun.current.uvi < 11) {
                    $("#uvi span").removeClass("low");
                    $("#uvi span").removeClass("moderate")
                    $("#uvi span").removeClass("high")
                    $("#uvi span").addClass("vHigh");
                    $("#uvi span").removeClass("eHigh")
                    console.log("UV = very high")
                   } else if (openSun.current.uvi > 10) {
                    $("#uvi span").removeClass("low");
                    $("#uvi span").removeClass("moderate")
                    $("#uvi span").removeClass("high")
                    $("#uvi span").removeClass("vHigh");
                    $("#uvi span").addClass("eHigh");
                    console.log("UV = Extreme")
                   }

                  var dailyWeather = openSun.daily;
                  console.log(dailyWeather);
                 $("#futureWeather").empty();
        //    debugger

                  for (i =1; i < 6; i++){
                  
                    var futureIconCode = dailyWeather[i].weather[0].icon;
                    futureIconCode = "_" + futureIconCode;
                   // console.log(futureIconCode);
                    var futureUnixDt = moment.unix(dailyWeather[i].dt).format("DD-MM-YYYY");
                    console.log(futureUnixDt);
                    $("#futureWeather").append("<div id='#newCard'>" + "<h4 id='location'>" + event + "</h4>" + "<p id='icon' class='" + futureIconCode + "'>" + "</p>" + "<h5 id='futureEventDate'>" + futureUnixDt + "</h5>" + "<p>Temp: " + dailyWeather[i].temp.day + "</p>" + "<p> Wind Speed: " + dailyWeather[i].wind_speed + "</p>" + "<p> Humidity: " + dailyWeather[i].humidity + "</p>" + "<p id='uvi'> UV: <span>" + dailyWeather[i].uvi + "</span></p>" + "</div>");
                    if (dailyWeather[i].uvi <= 2) {
                      $("#uvi span").addClass("low");
                      $("#uvi span").removeClass("moderate");
                      $("#uvi span").removeClass("high");
                      $("#uvi span").removeClass("vHigh");
                      $("#uvi span").removeClass("eHigh");
                      console.log("UV = low")
                    } else if (dailyWeather[i].uvi > 2 && dailyWeather[i].uvi < 6) {
                      $("#uvi span").removeClass("low");
                      $("#uvi span").addClass("moderate");
                      $("#uvi span").removeClass("high");
                      $("#uvi span").removeClass("vHigh");
                      $("#uvi span").removeClass("eHigh");
                      console.log("UV = moderate")
                     } else if (dailyWeather[i].uvi > 5 && dailyWeather[i].uvi < 8) {
                      $("#uvi span").removeClass("low");
                      $("#uvi span").removeClass("moderate");
                      $("#uvi span").addClass("high");
                      $("#uvi span").removeClass("vHigh");
                      $("#uvi span").removeClass("eHigh");
                     } else if (dailyWeather[i].uvi > 7 && dailyWeather[i].uvi < 11) {
                      $("#uvi span").removeClass("low");
                      $("#uvi span").removeClass("moderate")
                      $("#uvi span").removeClass("high")
                      $("#uvi span").addClass("vHigh");
                      $("#uvi span").removeClass("eHigh")
                      console.log("UV = very high")
                     } else if (dailyWeather[i].uvi > 10) {
                      $("#uvi span").removeClass("low");
                      $("#uvi span").removeClass("moderate")
                      $("#uvi span").removeClass("high")
                      $("#uvi span").removeClass("vHigh");
                      $("#uvi span").addClass("eHigh");
                      console.log("UV = Extreme")
                     }
                  }

                 // $("#icon").addClass(iconCode);
                 // $("#icon span").addClass(openSun.current.weather[0].icon);
             //  debugger  
              //  var currentLocation = data.response.current.humidity.value;
              //  console.log(currentLocation)
         })
      //  })
   });
}
  
// We need to call a Latitude and Longitude when entering the names of locations.

// We are going to need to add prev. searches to the local storage, that the 
// user can reuse in the app (aka the info is Cached)

// From the OpenWeatherMap API, we need to pull
// 1. Name of place
// 2. Date of Current day
// 3. Icon reflective of weather (Font Awesome)
// 4. Temperature
// 5. Humidity
// 6. Wind speed
// 7. UV index (also add colour to reflect UV warnings)

// We also need this for the next 5 days.


// and if you have time to be extra, add a Morning, afternoon and evening
// in the top <span> where 'transactions' currently exist
