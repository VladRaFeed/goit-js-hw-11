import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = 'key=37782639-7084c4028ec278358e91249de';

// const SEARCH_PARAMS = {
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
// };

export default class ImagesApi {
  constructor() {
    this.value = '';
    this.page = 1;
  }

  // fetchArticles() {
  //   // console.log(this);

  //   return fetch(
  //     `${BASE_URL}?${API_KEY}&q=${this.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
  //   )
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.status);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       this.page += 1;
  //       return data.hits;
  //     });
  // }

  async fetchArticles() {
    try {
      const response = await axios.get(
        `${BASE_URL}?${API_KEY}&q=${this.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      );
      this.page += 1;
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get inputValue() {
    return this.value;
  }

  set inputValue(newValue) {
    this.value = newValue;
  }
}
