import { createContext } from 'react';
import { DetailsPlanet } from '../Layouts/Details';

type MainType = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;

  dataIsLoaded: boolean;
  setDataIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;

  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  perPage: string;
  setPerPage: React.Dispatch<React.SetStateAction<string>>;
  pagination: boolean;
  setPagination: React.Dispatch<React.SetStateAction<boolean>>;
};

type AppType = {
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
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

export const MainContext = createContext({} as MainType);
export const AppContext = createContext({} as AppType);
export const DetailsContext = createContext({} as DetailsType);
