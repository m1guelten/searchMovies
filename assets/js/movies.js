import {
  createMarkup,
  creatStyle,
  addMovieToList,
  clearMoviesMarkup,
  inputSearch,
  moviesList,
  triggerMode,
} from './dom.js';
let apiUrl = null;
let searchLast = null;
const getData = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((json) => json.Search);
const debounce = (() => {
  let timer = null;
  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(cb, ms);
  };
})();
const inputSearchHandler = (event) => {
  debounce(() => {
    const searchString = event.target.value.trim();
    if (searchString && searchString.length > 3 && searchString !== searchLast)
      if (!triggerMode) clearMoviesMarkup(moviesList);
    getData(`${apiUrl}/?i=tt3896198&apikey=b27c515d=${searchString}`)
      .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
      .catch((err) => console.log(err));
    searchLast = searchString;
  }, 2000);
};
export const appInit = (url) => {
  createMarkup();
  creatStyle();
  apiUrl = url || 'https://www.omdbapi.com';
  inputSearch.addEventListener('keyup', inputSearchHandler);
};
