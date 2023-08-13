import SlimSelect from 'slim-select';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_iS1nFKbInfsGkasgN3u2zaVybcqbeC8d0RhPk3vFwtNTb5borVuHeseIoreFsJbm';
import '../css/style.css';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, api_key } from './cat-api';

const errorItem = document.querySelector('.error');
const loaderItem = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

errorItem.textContent = '';
errorItem.style.display = 'none';
select.style.visibility = 'hidden';

function onLoader() {
  loaderItem.style.display = 'block';
  fetchBreeds()
    .then(data => {
      const options = data
        .map(({ id, name }) => `<option value=${id}>${name}</option>`)
        .join('');
      select.innerHTML = options;

      select.style.visibility = 'visible';
      loaderItem.style.display = 'none';

      new SlimSelect({
        select: '.breed-select',
      });
    })
    .catch(error => {
      loaderItem.style.display = 'none';
      errorMessage();
      console.error(error);
    });
}

function fetchCatByBreed() {
  const selectedBreedId = select.value;
  if (!selectedBreedId) {
    errorMessage();
    return;
  }

  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`;

  return axios
    .get(url, {
      headers: {
        'x-api-key': api_key,
      },
    })
    .then(response => {
      if (!response.data[0]) {
        throw new Error('No data returned');
      }

      return response.data;
    })
    .then(data => {
      renderBreeds(data[0]);
    })
    .catch(error => {
      console.log(error);
      errorMessage(error.message);
    });
}

function renderBreeds(data) {
  if (!data) {
    catInfo.innerHTML = '';
    return;
  }

  const createMarkup = `
    <div class = "conteiner">
    <img class= "conteiner-img" src="${data.url}" alt="${data.breeds[0].name}" width="500">
    <div class= "info-conteiner">
    <h2>${data.breeds[0].name}</h2>
    <p>${data.breeds[0].description}</p>
    <p><b>Temperament:</b>${data.breeds[0].temperament}</p>
    </div>
    </div>`;

  catInfo.innerHTML = createMarkup;
}

function errorMessage() {
  loaderItem.style.display = 'none';
  loaderItem.textContent = '';
  errorItem.textContent = 'Oops! Something went wrong! Try reloading the page!';
  errorItem.style.display = 'block';
}

select.addEventListener('change', fetchCatByBreed);

onLoader();
