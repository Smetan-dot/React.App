import { Planet } from '../Results/Results';

const loadData = async (
  url: string,
  setItems: React.Dispatch<React.SetStateAction<Planet[]>>,
  setDataIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setItems(json.results);
      setDataIsLoaded(true);
    });
};

export default loadData;
