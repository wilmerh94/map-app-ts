import axios from 'axios';

/* Config for Axios */
const searchAPI = axios.create({
   baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
   params: {
      limit: 5,
      language: 'en',
      autocomplete: true,
      routing: true,
      access_token: 'pk.eyJ1Ijoid2lsbWVyaCIsImEiOiJjbDdvYnBobHQxczluM3ltcTJic20wdWM3In0.PX7lMhKA3Vovwf0LRQfAEQ',
   },
});

export default searchAPI;
