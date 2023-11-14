import { HttpResponse, http } from 'msw';
import { details, planets } from '../components/FakeData/Data';

export const handlers = [
  http.get(`https://swapi.dev/api/planets/1`, () => {
    return HttpResponse.json(details);
  }),
  http.get(`https://swapi.dev/api/planets/`, () => {
    return HttpResponse.json(planets);
  }),
];
