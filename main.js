import { fetchUsers } from './api/users';
import { getUserCard } from './components/Card/index';
import { getShouldFetchIndicator } from './utils/shouldFetch';
import { getSkeletonLoader } from './components/SkeletonLoader';
import { getErrorMessage } from './components/Error';
import { applyTheme } from './utils/applyTheme';

let initialState = {};
let currentPage = 0;
let slides = [];
let slidesIndex = 0;

const slidesContainer = document.getElementById('slides-container');
const prevButton = document.getElementById('slide-arrow-prev');
const nextButton = document.getElementById('slide-arrow-next');
const selectElement = document.getElementById('theme__selector');

const applyThemeOnLoad = () => {
  let theme = localStorage.getItem('theme') || 'white';
  selectElement.value = theme;
  applyTheme(theme);
};

const renderLoader = (n) => {
  return [...Array(n)].map(() => getSkeletonLoader()).join('');
};

const initialFetchSlidesData = async () => {
  slidesContainer.innerHTML = renderLoader(3);
  nextButton.setAttribute('disabled', '');
  prevButton.setAttribute('disabled', '');

  const response = await fetchUsers(6);
  if (!response) {
    slidesContainer.innerHTML = getErrorMessage();
  }
  const { results, info } = response;
  initialState = { ...initialState, results, info };
  currentPage = info.page;
  slides = results;

  slidesContainer.innerHTML = renderSlides();

  nextButton.removeAttribute('disabled');
  prevButton.removeAttribute('disabled');
};

const renderSlides = () => {
  return slides.map((userData) => getUserCard(userData)).join('');
};

nextButton.addEventListener('click', async () => {
  const shouldFetchIndicator = getShouldFetchIndicator();

  let page = currentPage + 1;
  slidesIndex++;

  if (slidesIndex === shouldFetchIndicator.indicator) {
    slidesContainer.innerHTML = renderLoader(shouldFetchIndicator.slides);
    nextButton.setAttribute('disabled', '');
    prevButton.setAttribute('disabled', '');
    const { results, info } = await fetchUsers(6, page);

    slidesContainer.insertAdjacentHTML(
      'beforeend',
      results.map((userData) => getUserCard(userData)).join(''),
    );
    currentPage = info.page;
    slidesIndex = 0;
  }

  const slideWidth = slidesContainer.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
  nextButton.removeAttribute('disabled');
  prevButton.removeAttribute('disabled');
});

prevButton.addEventListener('click', () => {
  slidesIndex--;
  const slideWidth = slidesContainer.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});

selectElement.addEventListener('change', (e) => {
  const theme = e.target.value.toLowerCase();
  applyTheme(theme);
  localStorage.setItem('theme', theme);
});

applyThemeOnLoad();
initialFetchSlidesData();
