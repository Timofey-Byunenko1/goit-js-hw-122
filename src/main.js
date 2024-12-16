import { back } from './js/pixabay-api.js';
import { gallery, clear, loadMore } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let query = '';
let page = 1;
let parPage = 15;

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements.query.value.trim();
  if (!query) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clear();
  loadMore(false);
  loader.style.display = 'block';
  try {
    const data = await back(query, page, parPage);

    if (data.hits.length === 0) {
      iziToast.info({ message: 'No images found' });
      return;
    }
    gallery(data.hits);
    if (data.totalHits > page * parPage) {
      loadMore(true);
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images. Please try again.' });
  } finally {
    loader.style.display = 'none';
  }
});

loadMoreButton.addEventListener('click', async () => {
  page++;
  loadMore(false);
  loader.style.display = 'block';
  try {
    const data = await back(query, page, parPage);
    gallery(data.hits);
    if (parPage * page >= data.totalHits) {
      loadMore(false);
      iziToast.info({
        message: "we're sorry, but you've reached the end of search results.",
      });
    } else {
      loadMore(true);
      loader.style.display = 'none';
    }

    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({ message: 'Error fetching images. Please try again.' });
  }
});
