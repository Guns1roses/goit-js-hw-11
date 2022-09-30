import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30238627-774da39921c55fc36cf8a4fe6';

export const fetchImgOptions = {
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
};

export const fetchImg = async params => {
  try {
    return await axios.get(BASE_URL, { params: { ...params, key: API_KEY } });
  } catch (error) {
    console.error(error);
  }
};