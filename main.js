import { fetchUsers } from './api/users';
import { getUserCard } from './components/Card/index';
import { getShouldFetchIndicator } from './utils/shouldFetch';
import { applyTheme } from './utils/applyTheme';

let currentPage = 0;
let slides = [];
let slidesIndex = 0;

const slidesContainer = document.getElementById('slides-container');
const prevButton = document.getElementById('slide-arrow-prev');
const nextButton = document.getElementById('slide-arrow-next');
const selectElement = document.getElementById('theme-selector');
const loader = document.getElementById('loader-wrapper');

const disableArrowButtons = () => {
  nextButton.setAttribute('disabled', '');
  prevButton.setAttribute('disabled', '');
};

const enableArrowButtons = () => {
  nextButton.removeAttribute('disabled');
  prevButton.removeAttribute('disabled');
};

const fetchApiData = async (amount = 6, page = 1) => {
  const response = await fetchUsers(amount, page);

  const { results, info } = response;
  return {
    results,
    info,
  };
};

const initialFetchSlidesData = async () => {
  loader.style.visibility = 'visible';

  disableArrowButtons();

  const { results, info } = await fetchApiData();

  currentPage = info.page;
  slides = results;

  slidesContainer.innerHTML = renderSlides();
  loader.style.visibility = 'hidden';
  enableArrowButtons();
};

const slideRight = () => {
  const slideWidth = slidesContainer.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
};

const slideLeft = () => {
  const slideWidth = slidesContainer.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
};

const renderSlides = () => {
  return slides.map((userData) => getUserCard(userData)).join('');
};

nextButton.addEventListener('click', async () => {
  const shouldFetchIndicator = getShouldFetchIndicator();

  let page = currentPage + 1;
  slidesIndex++;

  if (slidesIndex === shouldFetchIndicator.indicator) {
    disableArrowButtons();
    loader.style.visibility = 'visible';

    const { results, info } = await fetchApiData(6, page);

    slidesContainer.insertAdjacentHTML(
      'beforeend',
      results?.map((userData) => getUserCard(userData)).join(''),
    );

    currentPage = info?.page;
    slidesIndex = 0;
  }

  slideRight();
  loader.style.visibility = 'hidden';
  enableArrowButtons();
});

prevButton.addEventListener('click', () => {
  slidesIndex--;
  slideLeft();
});

selectElement.addEventListener('change', (e) => {
  const theme = e.target.value.toLowerCase();
  applyTheme(theme);
  localStorage.setItem('theme', theme);
});

const applyThemeOnLoad = () => {
  let theme = localStorage.getItem('theme') || 'white';
  selectElement.value = theme;
  applyTheme(theme);
};

applyThemeOnLoad();
initialFetchSlidesData();
