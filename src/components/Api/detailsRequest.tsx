import { DetailsPlanet } from '../../Layouts/Details';

const loadDetails = async (
  id: number,
  setState: React.Dispatch<React.SetStateAction<DetailsPlanet>>,
  setDetailsIsLoaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await fetch(`https://swapi.dev/api/planets/${id}`)
    .then((res) => res.json())
    .then((json) => {
      setState(json);
      setDetailsIsLoaded(true);
    });
};

export default loadDetails;
