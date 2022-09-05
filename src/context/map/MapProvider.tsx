import { DirectionResponse } from '../../interfaces/directions'
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl'
import { MapContext } from './MapContext'
import { mapReducer } from './mapReducer'
import { useContext, useEffect, useReducer } from 'react'
import directionsAPI from '../../apis/directionsAPI'
import { PlacesContext } from '../places/PlacesContext'

export interface MapState {
   isMapReady: boolean
   map?: Map
   markers: Marker[]
}

const INITIAL_STATE: MapState = {
   isMapReady: false,
   map: undefined,
   markers: []
}

interface Props {
   children: JSX.Element | JSX.Element[]
}
export const MapProvider = ( { children }: Props ) => {
   const [ state, dispatch ] = useReducer( mapReducer, INITIAL_STATE )
   const { places } = useContext( PlacesContext )

   /*  Adding the markers to be able to use them
    First is cleaning the markers to add the new ones
    Second is giving me the markers im searching
    then its setting the markers with the dispatch  */
   useEffect( () => {
      state.markers.forEach( marker => marker.remove() )
      const newMarkers: Marker[] = []

      for ( const place of places ) {
         const [ lng, lat ] = place.center
         const popup = new Popup().setHTML( `
         <h6>${ place.text }</h6>
         <p>${ place.place_name }</p>` )
         const newMarker = new Marker()
            .setPopup( popup )
            .setLngLat( [ lng, lat ] )
            .addTo( state.map! )
         newMarkers.push( newMarker )
      }

      dispatch( { type: 'setMarkers', payload: newMarkers } )

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ places ] )

   /* Setting the map for first time */
   const setMap = ( map: Map ) => {
      const myLocationPopup = new Popup().setHTML( `<h4>Here I am</h4>` ) //Initial position

      new Marker( { color: '#61DAFB' } )
         .setLngLat( map.getCenter() )
         .setPopup( myLocationPopup )
         .addTo( map )
      dispatch( { type: 'setMap', payload: map } )
   }

   /*Function to create a route between points  */
   const getRouteBetweenPoints = async (
      start: [ number, number ],
      end: [ number, number ]
   ) => {
      const resp = await directionsAPI.get<DirectionResponse>(
         `/${ start.join( ',' ) };${ end.join( ',' ) }`
      )
      const { distance, duration, geometry } = resp.data.routes[ 0 ]
      const { coordinates: coords } = geometry

      let kms = distance / 1000
      kms = Math.round( kms * 100 )
      kms /= 100
      const minutes = Math.floor( duration / 60 )
      console.log( kms, minutes )

      const bounds = new LngLatBounds( start, start )

      for ( const coord of coords ) {
         const newCoord: [ number, number ] = [ coord[ 0 ], coord[ 1 ] ]
         bounds.extend( newCoord )
      }
      state.map?.fitBounds( bounds, { padding: 200 } )

      /*Polyline */
      const sourceData: AnySourceData = {
         type: 'geojson',
         data: {
            type: 'FeatureCollection',
            features: [
               {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                     type: 'LineString',
                     coordinates: coords
                  }
               }
            ]
         }
      }

      if ( state.map?.getLayer( 'RouteString' ) ) {
         state.map.removeLayer( 'RouteString' )
         state.map.removeSource( 'RouteString' )
      }

      /* Remove polyline if exist */
      state.map?.addSource( 'RouteString', sourceData )
      state.map?.addLayer( {
         id: 'RouteString',
         type: 'line',
         source: 'RouteString',
         layout: {
            'line-cap': 'round',
            "line-join": 'round',
         },
         paint: {
            "line-color": 'black',
            "line-width": 3,
         }
      } )
   }
   return (
      <MapContext.Provider value={ { ...state, setMap, getRouteBetweenPoints } }>
         { children }
      </MapContext.Provider>
   )
}
