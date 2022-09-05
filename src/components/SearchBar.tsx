import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context"
import { SearchResult } from '.';

export const SearchBar = () => {
   const { searchPlacesByTerm } = useContext( PlacesContext )
   /* This is to make sure after X amount of time after user stop writing
   I will fire the action*/
   const debounceRef = useRef<NodeJS.Timeout>()

   const onQueryChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
      /* This function is to make sure the value in SearchBar is updated at the end and not for every letter */

      /* Clean debounceRef if i have a value in it. */
      if ( debounceRef.current ) {
         clearTimeout( debounceRef.current )
      }
      debounceRef.current = setTimeout( () => {
         /* search or execute search */
         searchPlacesByTerm( event.target.value )
      }, 1000 );
   }

   return (
      <div className="search-container">
         <input
            type="text"
            className="form-control"
            placeholder="Search Place.."
            onChange={ onQueryChanged }

         />
         <SearchResult />
      </div>
   )
}
