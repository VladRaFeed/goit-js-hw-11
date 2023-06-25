import Notiflix from 'notiflix';
import createCard from './templates/card.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import ImagesApiServise from './js/api-service';

const formEl = document.querySelector('#search-form');
const formInput = document.querySelector('.main-input');
const galleryContainer = document.querySelector('.gallery');
const moreImagesBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', onSearch);
moreImagesBtn.addEventListener('click', onLoadMore);

const ImagesApi = new ImagesApiServise();

const lightbox = new SimpleLightbox('.gallery a');

disableBtn();

function onSearch(e) {
  e.preventDefault();

  disableBtn();

  ImagesApi.inputValue = formInput.value;
  if (ImagesApi.inputValue === '') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
  // ImagesApi.resetPage();
  // clearMarkup();
  // ImagesApi.fetchArticles().then(createMarkup);
  // unDisableBtn();
  createGallery();
}

async function createGallery() {
  try {
    ImagesApi.resetPage();
    clearMarkup();

    const data = await ImagesApi.fetchArticles();

    if (data.totalHits === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
    }

    createMarkup(data.hits);
    console.log(data.hits.length);

    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

    // ImagesApi.fetchArticles().then(createMarkup);

    unDisableBtn();
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(data) {
  if (data.totalHits === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  galleryContainer.insertAdjacentHTML('beforeend', createCard(data));
  lightbox.refresh();
}

async function onLoadMore() {
  // ImagesApi.fetchArticles().then(createMarkup);

  try {
    const data = await ImagesApi.fetchArticles();

    createMarkup(data.hits);

    if (data.hits.length < 40) {
      disableBtn();
      return Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function clearMarkup() {
  galleryContainer.innerHTML = '';
}

function disableBtn() {
  moreImagesBtn.style.display = 'none';
}

function unDisableBtn() {
  moreImagesBtn.style.display = 'block';
}
