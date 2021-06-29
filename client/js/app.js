

const moment=require('moment')

//Accessing the dom elements
const weatherTemp = document.getElementById('temperature');
const weatherDes = document.getElementById('forecast');
const weatherTitle = document.getElementById('desTitle');
const image = document.getElementById('destinationpic');
const daysAway = document.getElementById('daysAway');
const departure= document.getElementById('departure').value;
console.log(departure);
document.getElementById("submit").addEventListener("click", getKeys);


//getting access to keys
function getKeys(e) {
  
  e.preventDefault();
  
  fetch('http://localhost:3000/get_data')
      .then((res) => res.json())
      .then((keys) => {
          const GEONAMES_USERNAME = keys.GEONAMES_USERNAME;
          const PIXABAY_API_KEY = keys.PIXABAY_API_KEY;
          const WEATHERBIT_API_KEY = keys.WEATHERBIT_API_KEY;
    
            const destination = document.getElementById('destination').value;
            let departure = document.getElementById('departure').value;
            
           
            if (destination === '' || departure === '') {
                console.log(' input has to be provided');
                return 'empty';
            }

            fetch(
                `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${GEONAMES_USERNAME}`
            )
                
                .then((response) => response.json())
                .then((data) => {
                   
                    const country = data.geonames[0].countryName;
                    const countryCode = data.geonames[0].countryCode;
                    const lat = data.geonames[0].lat;
                    const lng = data.geonames[0].lng;
                    
                    getImage(
                        country,
                        countryCode,
                        lat,
                        lng,
                        departure,
                        PIXABAY_API_KEY,
                        WEATHERBIT_API_KEY
                    );
                });
        });
}
////////////////////////////// 
function getImage(
  country,
  countryCode,
  lat,
  lng,
  departure,
  PIXABAY_API_KEY,
  WEATHERBIT_API_KEY
) {
  

  
  fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${country}&orientation=horizontal&category=buildings&per_page=3`
  )
     
      .then((response) => response.json())
      .then((data) => {
       
          const img = data.hits[0].webformatURL;
          console.log(img);
          let diff=current(departure)
// let diff=5

        if(diff <= 7){
            
            console.log(diff);
              fetchCurrentWeather(
                  lat,
                  lng,
                  country,
                  countryCode,
                  img,
                  diff,
                  WEATHERBIT_API_KEY
              );
              }else{
               
                fetchFutureWeather(
                  
                    lat,
                    lng,
                    country,
                    countryCode,
                    img,
                    diff,
                    WEATHERBIT_API_KEY
                );
              }
      });
}


function fetchCurrentWeather(
  lat,
  lng,
  country,
  countryCode,
  img,
  diff,
  WEATHERBIT_API_KEY
) {
  
  fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`
  )
      
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          
          let city = data.data[0].city_name;
          let temperature = data.data[0].temp;
          let description = data.data[0].weather.description;

          const daysToTravel=diff+'days'
          updateUI(
              
              description,
              temperature,
              city,
              country,
              countryCode,
              daysToTravel,
              img
          );
      });
}

function fetchFutureWeather(
  lat,
  lng,
  country,
  countryCode,
  img,
  diff,
  WEATHERBIT_API_KEY
) {

  fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`
  )
      //handling response
      .then((response) => response.json())
      .then((data) => {
         
console.log(data);
          
          let city = data.city_name;
          let temperature = data.data[diff].temp;
          
          let description = data.data[diff].weather.description;
         
          const daysToTravel = diff + ' days away';
          
          updateUI(
            
            description,
            temperature,
            city,
            country,
            countryCode,
            daysToTravel,
            img
          );
      });
}



function updateUI(
  
  description,
  temperature,
  city,
  country,
  countryCode,
  daysToTravel,
  img
) {
  image.src = img;
  daysAway.innerHTML=daysToTravel
weatherDes.innerHTML = "forecast:"+description;
  
  weatherTemp.innerHTML = "temperature:"+temperature;
  
  if (country.length + city.length > 19) {
      weatherTitle.innerHTML = `Your Destination: ${city} ${countryCode}`;
  } else {
      weatherTitle.innerHTML = `Your Destination: ${city} ${country}`;
  }

}



/////////////////////////////////
//calculation of days from now to then
    function current(dep){
      console.log(dep);
      var now = moment().format('YYYY-MM-DD');
      var departure = moment(dep).format('YYYY-MM-DD');
  
      now = now.split('-');
      departure = departure.split('-');
  
      //month starts at 0 that's why we subtract 1
      var a = moment([Number(now[0]), Number(now[1]) - 1, Number(now[2])]);
      var b = moment([
          Number(departure[0]),
          Number(departure[1]) - 1,
          Number(departure[2]),
      ]);
  
      const dif = b.diff(a, 'days');
      console.log(dif);
      return dif;
  
}




export {
    
    current,
    updateUI,
    fetchCurrentWeather,
    fetchFutureWeather,
    getImage,
    getKeys,
}
