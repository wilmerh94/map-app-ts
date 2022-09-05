import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"

export const BtnMyLocation = () => {
   const { map, isMapReady } = useContext( MapContext )
   const { userLocation } = useContext( PlacesContext )
   const onClick = () => {
      if ( !isMapReady ) {
         throw Error( 'Map is not ready' )
      }
      if ( !userLocation ) { throw Error( 'You do not a location' ) }
      map?.flyTo( {
         zoom: 14,
         center: userLocation
      } )
   }
   return (
      <button
         onClick={ onClick }
         className='btn btn-primary'
         style={ {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999
         } }
      >
         My Location
      </button>
   )
}
