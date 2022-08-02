import { fetchUsers } from './api/users';
import { getUserCard } from './components/Card/index';

let initialState = {};
let slidesContainerLength =
  document.getElementsByClassName('slides-container').childElementCount;
const shouldFetchIndicator = 2;
let slidesIndex = 0;
let shouldFetch = false;
const slidesContainer = document.getElementById('slides-container');
const prevButton = document.getElementById('slide-arrow-prev');
const nextButton = document.getElementById('slide-arrow-next');

// TODO: can I use await alone?
const { results, info } = await fetchUsers(6);
initialState = { ...initialState, results, info };
let currentPage = info.page;

let slidesData = [...results];

const addSlides = (data) => {
  slidesData = [...slidesData, ...data];
};

const renderSlides = () => {
  return slidesData.map((slide) => getUserCard(slide)).join('');
};

nextButton.addEventListener('click', async () => {
  let page = currentPage + 1;
  slidesIndex++;

  if (slidesIndex === shouldFetchIndicator) {
    const { results, info } = await fetchUsers(6, page);
    addSlides(results);
    const newSlides = renderSlides();
    slidesContainer.insertAdjacentHTML('beforeend', newSlides);
    currentPage = info.page;
    slidesIndex = 0;
  }

  // const slideWidth = slide.clientWidth * 3;
  const slideWidth = slidesContainer.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener('click', () => {
  // const slide = document.querySelector('.slide');
  // const slideWidth = slide.clientWidth * 3;
  const slideWidth = slidesContainer.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});

slidesContainer.innerHTML = renderSlides();
