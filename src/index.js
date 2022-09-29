import pictureItemTemp from './templates/picture-card.hbs';
import imageApiService from './js/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './js/refs';


let imageApi = new imageApiService();
let lightbox = new SimpleLightbox('.gallery a');

function createCardMarkup(images) {
  const imageMarkup = images.hits.reduce((acc, image) => {
    return (acc += pictureItemTemp(image));
  }, '');

  refs.galleryContainer.insertAdjacentHTML('beforeend', imageMarkup);
  lightbox.refresh();
}

async function onSearchFormSubmit(evt) {
  evt.preventDefault();
  refs.scrollDiv.classList.add('hidden');
  imageApi.query = evt.currentTarget.elements.searchQuery.value;
  imageApi.resetPage();
  clearGallery();

  try {
    const result = await imageApi.fetchImages();
    if (result.hits.length === 0 || imageApi.query === '') {
      throw new Error('Sorry, there are no images matching your search query. Please try again.');
    }
    showTotalHits(result.totalHits);
    createCardMarkup(result);
  } catch (Error) {
    Notify.failure(Error.message);
  }
  refs.scrollDiv.classList.remove('hidden');
}

function clearGallery() {
  refs.galleryContainer.innerHTML = '';
}

function showTotalHits(totalHits) {
  return Notify.info(`Hooray! We found ${totalHits} images.`);
}

const options = {
  rootMargin: '200px',
};

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && imageApi.searchString !== '') {
      imageApi.fetchImages().then(createCardMarkup);
    }
  });
}

let observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.scrollDiv);
refs.form.addEventListener('submit', onSearchFormSubmit);