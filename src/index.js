import './scss/main.scss';
import cardTemplates from './templates/cards.hbs';
import * as _ from 'lodash';

const gallery = document.querySelector('.gallery');
const input = document.querySelector('.search-form input');
const loadMore = document.querySelector('.load-more');
let currentPage = 1;
let inputPerPage = 12;
let currentInput;

input.addEventListener(
  'input',
  _.debounce(e => {
    if (!e.target.value) return false;
    gallery.innerHTML = '';
    currentPage = 1;
    currentInput = e.target.value;
    fetchImages(currentInput, currentPage, inputPerPage);
  }, 500),
);

const fetchImages = async (currentInput, currentPage, inputPerPage) => {
  // console.log("fetchImages")
 await fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${currentInput}&page=${currentPage}&per_page=${inputPerPage}&key=19128148-e20e1c798475ebdebc23df32e`,
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.total === 0) {
        loadMore.classList.add("is-hidden")
        

        return false;
      }
      gallery.insertAdjacentHTML('beforeend', cardTemplates(data.hits));
      // console.log(gallery.lastChild)
      if (gallery.children.length !== 0) {
          loadMore.classList.remove("is-hidden")
        } else {loadMore.classList.add("is-hidden")};
      gallery.lastElementChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    })
    .catch(error => {
      console.log(error);
    });
};

loadMore.addEventListener('click', () => {
  currentPage += 1;
  fetchImages(currentInput, currentPage, inputPerPage)
  console.log(currentPage)
})