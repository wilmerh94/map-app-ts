import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';



mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbWVyaCIsImEiOiJjbDdvYnBobHQxczluM3ltcTJic20wdWM3In0.PX7lMhKA3Vovwf0LRQfAEQ';

if ( !navigator.geolocation ) {
  alert( 'Your browser does not support Geolocation' )
  throw new Error( 'Your browser does not support Geolocation' )
}

const root = ReactDOM.createRoot(
  document.getElementById( 'root' ) as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

