import axios from 'axios';

export const fetchImage = async (searchQuery, page) => {
  axios.defaults.baseURL = 'https://pixabay.com/api';
  const normalizedSearchQuery = searchQuery.trim().split(/\s+/).join('+');
  const API_KEY = '34106733-e100dcdc1add944a5aa3c5584';
  const SAEARCH_OPTIONS = {
    type: ['all', 'photo', 'illustration', 'vector'],
    orientation: ['all', 'horizontal', 'vertical'],
    safeSearch: [true, false],
    perPage: [12, 162],
  };

  const response = await axios.get(
    `/?key=${API_KEY}` +
      `&q=${normalizedSearchQuery}` +
      `&image_type=${SAEARCH_OPTIONS.type[0]}` +
      `&orientation=${SAEARCH_OPTIONS.orientation[1]}` +
      `&safesearch=${SAEARCH_OPTIONS.safeSearch[0]}` +
      `&page=${page}` +
      `&per_page=${SAEARCH_OPTIONS.perPage[0]}`
  );
  return response.data.hits;
};
