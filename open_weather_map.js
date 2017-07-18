const WEATHER_API_KEY = "bbeb34ebf60ad50f7893e7440a1e2b0b";
const API_STEM = "http://api.openweathermap.org/data/2.5/weather?";

function zipUrl(zip) {
  return `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function latLonUrl(lat, lon) {
  return `${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function fetchForecast(url) {
  // stubbing out the fetch since it will fail
  
  console.log("going to fetch forecast " + url);
  return {
    main: 'Stubbed!',
    description: 'I was stubbed out!',
    temp: 75
  };

  // return fetch(url)
  //   .then(response => response.json())
  //   .then(responseJSON => {
  //     return {
  //       main: responseJSON.weather[0].main,
  //       description: responseJSON.weather[0].description,
  //       temp: responseJSON.main.temp
  //     };
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
}

export const fetchZipForecast = (zip) => {
  return fetchForecast(zipUrl(zip));
}

export const fetchLatLonForecast = (lat, lon) => {
  return fetchForecast(latLonUrl(lat, lon));
}

// export default {
//   fetchZipForecast: fetchZipForecast,
//   fetchLatLonForecast: fetchLatLonForecast
// };
