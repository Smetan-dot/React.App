import { Planet } from '../../types/types';

const loadData = async (
  url: string,
  setItems: React.Dispatch<React.SetStateAction<Planet[]>>,
  setDataIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setItemsCount: React.Dispatch<React.SetStateAction<number>>,
  setPagination: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setItems(json.results);
      setItemsCount(json.count);
      setDataIsLoaded(true);
      setPagination(true);
    });
};

export default loadData;
