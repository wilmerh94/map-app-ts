import { useEffect, useReducer } from "react";
import { searchAPI } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

/* Interfaces is a reference of what value and type im going to get whenever Im using the function that has this interface */
export interface PlacesState {
   isLoading: boolean;
   userLocation?: [ number, number ]
   isLoadingPlaces: boolean;
   places: Feature[]
}

/* Initial state has the value of the interfaces  */

const INITIAL_STATE: PlacesState = {
   isLoading: true,
   userLocation: undefined,
   isLoadingPlaces: false,
   places: []

}

/* Same as the first interfaces is telling me what im going to get in my props */

interface Props {
   children: JSX.Element | JSX.Element[]
}


/* Calling the provider im getting after im creating my context  */
export const PlacesProvider = ( { children }: Props ) => {

   /* Calling my reducer here so I can dispatch my function from here */
   const [ state, dispatch ] = useReducer( placesReducer, INITIAL_STATE )

   /* Using useEffect one time because it does not have a dependency on
   To get my user Location and place the value in my initial value*/
   useEffect( () => {
      getUserLocation()
         .then( lngLat => dispatch( { type: 'setUserLocation', payload: lngLat } ) )
      /* using dispatch at the end to submit the value to my reducer */
   }, [] )

   /* Function with promise for a search result*/
   const searchPlacesByTerm = async ( query: string ) => {
      /* Cleaning my query */
      if ( query.length === 0 ) {
         dispatch( { type: "setPlaces", payload: [] } )
         return []

      }
      /* Making sure I have user location */
      if ( !state.userLocation ) throw new Error( 'Not location provided' )

      dispatch( { type: 'setLoadingPlaces' } )
      const resp = await searchAPI.get<PlacesResponse>( `/${ query }.json`, { params: { proximity: state.userLocation.join( ',' ) } } )
      dispatch( { type: 'setPlaces', payload: resp.data.features } )
      return resp.data.features

   }

   return (
      <PlacesContext.Provider value={ {
         ...state,
         //Method
         searchPlacesByTerm
      } }>
         { children }
      </PlacesContext.Provider>
   )
}

