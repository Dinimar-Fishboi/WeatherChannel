//Need Latitude and Longitude to complete API call. Have added own API already

var getWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly&appid=15ded98cd7617010730249cbf7259a51"
var geoCode = "https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc&searchtext=Rozelle+Sydney" //+ searchInput
var prevSearch = document.getElementById("prevSearch");
var placeName = document.querySelector("#placeName");
var searchInput = document.querySelector("#searchInput");
//var potentialLocations = [];

//var searchInput = "Rozelle"

// `${getWeather} ajdflkajslkgsrlkgksld`

//Baseline API's before we start SPLICING them.

fetch(getWeather)
    .then(function (response) {
        console.log(response)
        response.json().then(function(data){
            var openSun = data;
            console.log(openSun)
          //  debugger
            
        })
        })
    
        fetch(geoCode)
.then(function (response) {
  return response.json();
})
.then(function (data) {
    console.log(data)
    var searchLong = data.Response.View[0].Result[0].Location.DisplayPosition.Latitude
    var searchLat = data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
    console.log(searchLat);
    console.log(searchLong);
    
  //  debugger

})

//Next four sections are on creating an array for previous searches, with the 
// ability to clear search browswers. Let me be clear, I STILL DON'T KNOW how
// localStorage works.

// User can just select the location from the list and it PICKS IT UP
$("#prevSearch").on("click", function(){
  var prevChoice = event.target.textContent
  console.log(prevChoice); 
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
  //var oldSearchSelected= event.currentTarget.textcontent
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

var positionstack ="https://api.positionstack.com/v1/forward?access_key=49a90276b4b1f782b1cb30297278b6dd&query=1600 Pennsylvania Ave NW - Washington"


var geoCode = "https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc&searchtext=Rozelle+Sydney" //+ searchInput


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
