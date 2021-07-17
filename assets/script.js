//Need Latitude and Longitude to complete API call. Have added own API already

var getWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly&appid=15ded98cd7617010730249cbf7259a51"
var geoCode = "https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc&searchtext=Rozelle+Sydney" //+ searchInput
var prevSearch = document.getElementById("prevSearch");
var placeName = document.querySelector("#placeName");
var searchInput = document.querySelector("#searchInput");
//var potentialLocations = [];

//var searchInput = "Rozelle"

`${getWeather} ajdflkajslkgsrlkgksld`

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

$("#locationSearch").on("click", function() {
  console.log("have pressed a button");
  var newSearch = $(this).parent().siblings("#searchInput").val();
        console.log(newSearch)
        potentialLocations = potentialLocations.concat(newSearch);
        // var hourTime = $(this).parent().attr("id");

         localStorage.setItem("prevSearch", JSON.stringify(potentialLocations));
        // console.log(hourTime)
        searchInput.value = '';
         var showLocations = JSON.parse(localStorage.getItem("prevSearch"));
        // console.log(showLocations);


        for (i=0; i < showLocations.length; i++) {
          var oldSearch = document.createElement('li');
          oldSearch.innerHTML = showLocations[i];
          prevSearch.appendChild(oldSearch);
        }

});

var showLocations = JSON.parse(localStorage.getItem("prevSearch"));
console.log(showLocations);
var potentialLocations = showLocations;

for (i=0; i < showLocations.length; i++) {
  var oldSearch = document.createElement('li');
  oldSearch.innerHTML = showLocations[i];
  prevSearch.appendChild(oldSearch);
}

// for (i=0; i < potentialLocations.length; i++) {
//         var oldSearch = document.createElement('li')
//         var showLocations = JSON.parse(localStorage.getItem("prevSearch"));
//         oldSearch.innerHTML = showLocations[i]
//         prevSearch.appendChild(oldSearch);
//         console.log(showLocations);
// }
//$("#08 #activityInput").val(localStorage.getItem("prevSearch"));


        // $("#search").ajax({
        //     url: 'https://api.positionstack.com/v1/forward',
        //     data: {
        //       access_key: '49a90276b4b1f782b1cb30297278b6dd',
        //       query: '1600 Pennsylvania Ave NW - Washington',
        //       limit: 1
        //     }
        //   }).done(function(data) {
        //     console.log(JSON.parse(data));
        //   });

        // fetch('https://api.positionstack.com/v1/forward',{
            
        //     access_key: '49a90276b4b1f782b1cb30297278b6dd',
        //       query: '1600 Pennsylvania Ave NW - Washington',
        //       limit: 1
        // }
        // ).done(function(data){
        //     console.log(JSON.parse(data));
        // })

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


// https://geocoder.ls.hereapi.com/6.2/geocode.json
// ?apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc
// &searchtext=425+W+Randolph+Chicago


const autosuggest = (e) => {
    if(event.metaKey) {
      return
    } 
    let searchString = e.value
    if (searchString != "") {
      fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc&at=33.738045,73.084488&limit=5&resultType=city&q=${searchString}&lang=en-US`)
      .then(res => res.json())
      .then((json) => {
        if (json.length != 0) {
          document.getElementById("list").innerHTML = ``;
          let dropData = json.items.map((item) => {
            if ((item.position != undefined) & (item.position != ""))
              document.getElementById("list").innerHTML += `<li onClick="addMarkerToMap(${item.position.lat},${item.position.lng})">${item.title}</li>`;
            });
        }
      });
    }
  };