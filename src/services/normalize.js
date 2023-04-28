export const normalize = fetchedData =>
  fetchedData.map(el => ({
    webformatURL: el.webformatURL,
    largeImageURL: el.largeImageURL,
    id: el.id,
    tags: el.tags,
  }));
