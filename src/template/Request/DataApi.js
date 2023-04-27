export function fetchData(qwe) {
  const BASE_URL = 'http://pokeapi.co/api/v2/pokemon/';

  return fetch(BASE_URL + qwe).then(response =>
    response.ok
      ? response.json()
      : Promise.reject(new Error(`Failed to find: ${qwe}`))
  );
}
