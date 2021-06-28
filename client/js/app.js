

const moment=require('moment')

//Accessing the dom elements
const weatherTemp = document.getElementById('temperature');
const weatherDes = document.getElementById('forecast');
const weatherTitle = document.getElementById('desTitle');
const image = document.getElementById('destinationpic');
const daysAway = document.getElementById('daysAway');
const departure= document.getElementById('departure');
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
            
            // console.log(departure);
            if (destination === '' || departure === '') {
                // console.log('user enter no input');
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
        //   console.log(img);
          let diff=current(departure)


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
          
          
          let city = data.data[0].city_name;
          let temperature = data.data[0].temp;
          let icon = data.data[0].weather.icon;
          let description = data.data[0].weather.description;
          console.log(city, temperature, icon, description);

          const daysToTravel=diff+'days'
          updateUI(
              icon,
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
          let icon = data.data[diff].weather.icon;
          let description = data.data[diff].weather.description;
         
          const daysToTravel = diff + ' days away';
          
          updateUI(
            icon,
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
  icon,
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
   const now=moment()   
console.log(now);
let then = document.querySelector('#departure').value
console.log(then);
const ms = 
moment(then,"DD/MM/YYYY").diff(moment(now,"DD/MM/YYYY"));
const duration = duration(ms, 'milliseconds');
const dif = duration.asDays();
console.log(dif);
return dif
}




export {
    
    current,
    updateUI,
    fetchCurrentWeather,
    fetchFutureWeather,
    getImage,
    getKeys,
}
