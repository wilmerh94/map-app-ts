import { Map, Marker, Popup } from 'mapbox-gl'
import { useContext, useEffect, useReducer } from 'react'
import { MapContext } from './MapContext'
import { mapReducer } from './mapReducer'
import { PlacesContext } from '../places/PlacesContext';

export interface MapState {
   isMapReady: boolean
   map?: Map
   markers: Marker[]
}

const INITIAL_STATE: MapState = {
   isMapReady: false,
   map: undefined,
   markers: [],
}

interface Props {
   children: JSX.Element | JSX.Element[]
}
export const MapProvider = ( { children }: Props ) => {
   const [ state, dispatch ] = useReducer( mapReducer, INITIAL_STATE )
   const { places } = useContext( PlacesContext )

   useEffect( () => {
      state.markers.forEach( marker => marker.remove() )
      const newMarkers: Marker[] = []

      for ( const place of places ) {
         const [ lng, lat ] = place.center
         const popup = new Popup()
            .setHTML( `
         <h6>${ place.text }</h6>
         <p>${ place.place_name }</p>`
            )
         const newMarker = new Marker().setPopup( popup ).setLngLat( [ lng, lat ] ).addTo( state.map! )
         newMarkers.push( newMarker )
      }

      // Todo clean polyline
      dispatch( { type: 'setMarkers', payload: newMarkers } )



      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [ places ] )




   const setMap = ( map: Map ) => {

      const myLocationPopup = new Popup()
         .setHTML( `<h4>Here I am</h4>` ) //Initial position

      new Marker( { color: '#61DAFB' } )
         .setLngLat( map.getCenter() )
         .setPopup( myLocationPopup )
         .addTo( map )
      dispatch( { type: 'setMap', payload: map } )
   }

   return (
      <MapContext.Provider value={ { ...state, setMap } }>
         { children }
      </MapContext.Provider>
   )
}
