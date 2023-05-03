import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '34106733-e100dcdc1add944a5aa3c5584';
const SAEARCH_OPTIONS = {
  type: {
    all: 'all',
    photo: 'photo',
    illustration: 'illustration',
    vector: 'vector',
  },
  orientation: { all: 'all', horizontal: 'horizontal', vertical: 'vertical' },
  safeSearch: [true, false],
  perPage: [12, 162],
};

export const fetchImage = async (searchQuery, page) => {
  const params = {
    q: searchQuery,
    key: API_KEY,
    image_type: SAEARCH_OPTIONS.type.all,
    orientation: SAEARCH_OPTIONS.orientation.horizontal,
    safesearch: false,
    page,
    per_page: 12,
  };
  const response = await axios.get('/', { params });

  return response.data.hits;
};

// const response = await axios.get(
//   `/?key=${API_KEY}` +
//     `&q=${normalizedSearchQuery}` +
//     `&image_type=${SAEARCH_OPTIONS.type[0]}` +
//     `&orientation=${SAEARCH_OPTIONS.orientation[1]}` +
//     `&safesearch=${SAEARCH_OPTIONS.safeSearch[0]}` +
//     `&page=${page}` +
//     `&per_page=${SAEARCH_OPTIONS.perPage[0]}`
// );
// const normalizedSearchQuery = searchQuery.trim().split(/\s+/).join('+');
