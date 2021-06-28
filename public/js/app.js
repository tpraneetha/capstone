

// //calculation of days from now to then

// // const now=moment().format("DD-MM-YYYY")
// // // const then = moment(now, "DD-MM-YYYY").add(5, 'days');
// // const ms = 
// // moment(then,"DD/MM/YYYY").diff(moment(now,"DD/MM/YYYY"));
// // const duration = moment.duration(ms, 'milliseconds');
// // const Diffdays = duration.asDays();






// const moment=require('moment')
const weatherTemp = document.getElementById('temperature');
const weatherDes = document.getElementById('forecast');
const weatherTitle = document.getElementById('desTitle');
const image = document.getElementById('destinationpic');
const daysAway = document.getElementById('daysAway');
const departure= document.getElementById('departure');
document.getElementById("submit").addEventListener("click", getcoordinates);

function getcoordinates(e) {
  
  e.preventDefault();
  
  fetch('http://localhost:5000/get_data')
      .then((res) => res.json())
      .then((keys) => {
          const GEONAMES_USERNAME = keys.GEONAMES_USERNAME;
          const PIXABAY_API_KEY = keys.PIXABAY_API_KEY;
          const WEATHERBIT_API_KEY = keys.WEATHERBIT_API_KEY;
    //       console.log(GEONAMES_USERNAME);
    // console.log(WEATHERBIT_API_KEY);
    // console.log(PIXABAY_API_KEY);
    // const now=moment().format("DD-MM-YYYY")
            const destination = document.getElementById('destination').value;
            let departure = document.getElementById('departure').value;
            
            // console.log(departure);
            if (destination === '' || departure === '') {
                // console.log('user enter no input');
                return 'empty';
            }

            
            // console.log(destination);
            // console.log(departure);

            
            
            fetch(
                `http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${GEONAMES_USERNAME}`
            )
                
                .then((response) => response.json())
                .then((data) => {
                    
                    // console.log(data);

                    const country = data.geonames[0].countryName;
                    const countryCode = data.geonames[0].countryCode;
                    const lat = data.geonames[0].lat;
                    const lng = data.geonames[0].lng;
                    // console.log(country, lat, lng);

                    
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
      //handling response
      .then((response) => response.json())
      .then((data) => {
        //   console.log(data);
          const img = data.hits[0].webformatURL;
        //   console.log(img);
          let diff=current(departure)


          function current(depDate) {


            const now=new Date()
            function formatDate(date,format){
                const map = {
                    yyyy: date.getFullYear(),
                    mm: date.getMonth() + 1,
        dd: date.getDate(),
                }
            
                return format.replace(/yyyy|mm|dd/gi, matched => map[matched])
            }
            let now1=formatDate(now,"yyyy-mm-dd")
            console.log(now1);
            now1 = now1.split("-");
        var newDate = new Date( now1[2], now1[1] - 1, now1[0]);
        // console.log(newDate.getTime());


            let then = depDate
                    // console.log(then);
            
        
        then=then.split('-')
        var newDate2=new Date(then[2],then[1]-1,then[0])
        // console.log(newDate2.getTime());
        const diffTime=newDate2 -newDate
        // console.log(diffTime);
        const diff = (diffTime / (1000 * 60 * 60 * 24)); 
        // // const diffDays=4
        // console.log(diff + " days");
        
        
              return diff
          }
        
          //imagine diff=5
          
        //   const diff=8
          if(diff <= 7){
            //   console.log('get current weather');
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
                // console.log('get predicted weather');
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
//   console.log('fetching');
  
  fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`
  )
      
      .then((response) => response.json())
      .then((data) => {
          console.log('//////');
          console.log(data.data[0].temp);
          
          let city = data.data[0].city_name;
          let temperature = data.data[0].temp;
          let icon = data.data[0].weather.icon;
          let description = data.data[0].weather.description;
          console.log(city, temperature, icon, description);

          const isInTime=diff+'days'
          updateUI(
              icon,
              description,
              temperature,
              city,
              country,
              countryCode,
              isInTime,
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
//   console.log('fetching');

  //fetching weatherbit forecast
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
          console.log(city, temperature, description);



          const isInTime = diff + ' days away';
          
          updateUI(
            icon,
            description,
            temperature,
            city,
            country,
            countryCode,
            isInTime,
            img
          );
      });
}
//-------------------------------------------------------------//


function updateUI(
  icon,
  description,
  temperature,
  city,
  country,
  countryCode,
isInTime,
  img
) {
  image.src = img;
  daysAway.innerHTML=isInTime
weatherDes.innerHTML = "forecast:"+description;
  
  weatherTemp.innerHTML = "temperature:"+temperature;
  
  if (country.length + city.length > 19) {
      weatherTitle.innerHTML = `Your Destination: ${city} ${countryCode}`;
  } else {
      weatherTitle.innerHTML = `Your Destination: ${city} ${country}`;
  }




  
  let save = document.getElementById('saveTrip');
  save.addEventListener('click', function () {
      console.log('sending data to server');
      postData('/add', {
          icon,
          description,
          temperature,
          city,
          country,
          countryCode,
          isInTime,
          img,
      });
  });
}

//-----------------------------
/////////////////////////////////
//calculation of days from now to then
//     function current(dep){
//    const now=moment()   
// console.log(now);
// let then = document.querySelector('#departure').value
// console.log(then);
// const ms = 
// moment(then,"DD/MM/YYYY").diff(moment(now,"DD/MM/YYYY"));
// const duration = duration(ms, 'milliseconds');
// const dif = duration.asDays();
// console.log(dif);
// return dif
// }



async function getServerData() {
    const response = await fetch('/return');
    const newEntry = await response.json();
    // checking if there is a icon attribute
    if (newEntry ) {
        updateUI(
            newEntry.icon,
            newEntry.description,
            newEntry.temperature,
            newEntry.city,
            newEntry.country,
            newEntry.countryCode,
            newEntry.isInTime,
            newEntry.img
        );
    }
}


async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });
}
export {
    
    // current,
    updateUI,
    fetchCurrentWeather,
    fetchFutureWeather,
    getImage,
    getcoordinates,
};
