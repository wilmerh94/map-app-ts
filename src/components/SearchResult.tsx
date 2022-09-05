import { useContext, useState } from 'react'
import { Feature } from 'src/interfaces/places'
import { MapContext, PlacesContext } from '../context'
import { LoadingPlaces } from './'
export const SearchResult = () => {
   const { places, isLoadingPlaces, userLocation } = useContext( PlacesContext )
   const { map, getRouteBetweenPoints } = useContext( MapContext )
   const [ activeId, setActiveId ] = useState( '' )


   const onPlaceClicked = ( place: Feature ) => {
      setActiveId( place.id )
      const [ lng, lat ] = place.center
      map?.flyTo( { zoom: 14, center: [ lng, lat ] } )
   }

   const getRoute = ( place: Feature ) => {
      if ( !userLocation ) return

      const [ lng, lat ] = place.center
      getRouteBetweenPoints( userLocation, [ lng, lat ] )
   }

   if ( isLoadingPlaces ) {
      return <LoadingPlaces />
   }


   if ( places.length === 0 ) {
      return <></>
   }
   return (
      <ul className='list-group mt-3'>
         { places.map( place => (
            <li key={ place.id } className={ `${ activeId === place.id ? 'active' : 'false' } list-group-item list-group-item-action pointer` }
               onClick={ () => onPlaceClicked( place ) }>
               <h6>{ place.text }</h6>
               <p style={ { fontSize: '12px' } }>
                  { place.place_name }
               </p>
               <button className={ `${ activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary' } btn btn-sm ` }
                  onClick={ () => getRoute( place ) }>Direction</button>
            </li>
         ) ) }
      </ul>
   )
}
