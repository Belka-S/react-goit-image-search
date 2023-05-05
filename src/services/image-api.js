import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '34106733-e100dcdc1add944a5aa3c5584';

export const fetchImage = async (
  { searchQuery, page, per_page, image_type, orientation, category },
  signal
) => {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type,
    orientation,
    page,
    per_page,
    category,
    // signal: controller.signal
  };
  const response = await axios.get('/', { params, signal });

  return response.data.hits;
};

export const SAEARCH_OPTIONS = () => {
  return {
    image_type: ['all', 'photo', 'illustration', 'vector'],
    orientation: ['all', 'horizontal', 'vertical'],
    per_page: [12, 162],
    category: [
      'backgrounds',
      'fashion',
      'nature',
      'science',
      'education',
      'feelings',
      'health',
      'people',
      'religion',
      'places',
      'animals',
      'industry',
      'computer',
      'food',
      'sports',
      'transportation',
      'travel',
      'buildings',
      'business',
      'music',
    ],
  };
};
