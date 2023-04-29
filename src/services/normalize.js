export const normalize = fetchedData =>
  fetchedData.map(({ webformatURL, largeImageURL, id, tags }) => ({
    webformatURL,
    largeImageURL,
    id,
    tags,
  }));
