// DirectionResponse;
import axios from 'axios';

/* Config for Axios */
const directionsAPI = axios.create({
   baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
   params: {
      alternatives: false,
      geometries: 'geojson',
      overview: 'simplified',
      steps: false,
      access_token: 'pk.eyJ1Ijoid2lsbWVyaCIsImEiOiJjbDdvYnBobHQxczluM3ltcTJic20wdWM3In0.PX7lMhKA3Vovwf0LRQfAEQ',
   },
});

export default directionsAPI;
