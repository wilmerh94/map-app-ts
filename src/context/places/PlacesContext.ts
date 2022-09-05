import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

export interface PlacesContextProps {
   isLoading: boolean;
   userLocation?: [number, number];
   isLoadingPlaces: boolean;
   places: Feature[];
   //Method
   searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}
export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);
/* -------------------------createContext({state: {}, dispatch: () => { }, actions: {}}); */
/* export const usePlacesContext = () => useContext(PlacesContext); */
