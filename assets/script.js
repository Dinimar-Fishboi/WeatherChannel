//Need Latitude and Longitude to complete API call. Have added own API already

var getAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly&appid=15ded98cd7617010730249cbf7259a51"

var placeName = document.querySelector("#placeName");

//var searchInput = "Rozelle"

`${getAPI} ajdflkajslkgsrlkgksld`

fetch(geoCode)
    .then(function (response) {
        console.log(response)
        response.json().then(function(data){
            console.log(data)
            debugger
            
        })
        })
    

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

var positionstack ="https://api.positionstack.com/v1/forward?access_key=49a90276b4b1f782b1cb30297278b6dd&query=1600 Pennsylvania Ave NW - Washington"


var geoCode = "https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc&searchtext=Rozelle" //+ searchInput

// fetch(positionstack)
//           .then(function(response){
//             console.log(response)
//             response.json().then(function(data){
//                 console.log(data)
//                 debugger
//             })

//           })

//var secondAttempt = "https://geocode.search.hereapi.com/v1/geocode?q=BattySt+6+Rozelle&apiKey=StKE5ntujYcwTdcZgQpPEPH6CdHp-5aGMlrv-cHiTtc"


fetch(geoCode)
.then(function (response) {
  return response.json();
})
.then(function (data) {
    console.log(data)
})



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

