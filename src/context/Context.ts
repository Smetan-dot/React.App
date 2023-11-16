import { createContext } from 'react';
import { DetailsPlanet } from '../types/types';

type AppType = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  pagination: boolean;
  setPagination: React.Dispatch<React.SetStateAction<boolean>>;
};

type DetailsType = {
  state: DetailsPlanet;
  setState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      rotation_period: string;
      orbital_period: string;
      diameter: string;
      climate: string;
      gravity: string;
      terrain: string;
      surface_water: string;
      population: string;
      url: string;
    }>
  >;
};

export const AppContext = createContext({} as AppType);
export const DetailsContext = createContext({} as DetailsType);
