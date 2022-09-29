import axios from 'axios';

export default class imageApiService {
  constructor() {
    this.KEY = '30238627-774da39921c55fc36cf8a4fe6';
    this.URL = 'https://pixabay.com/api/';
    this.page = 1;
    this.searchString = '';
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      key: this.KEY,
      q: this.searchString,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: this.page,
    });
    const response = await axios.get(`${this.URL}?${searchParams}`);
    this.incrementPage();
    return response.data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchString;
  }

  set query(newQuery) {
    this.searchString = newQuery;
  }
}