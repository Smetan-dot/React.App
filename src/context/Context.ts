import { createContext } from 'react';
import { Planet } from '../components/Results/Results';

type MainType = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  items: Planet[];
  setItems: React.Dispatch<React.SetStateAction<Planet[]>>;
  dataIsLoaded: boolean;
  setDataIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
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

export const MainContext = createContext({} as MainType);
export const AppContext = createContext({} as AppType);
