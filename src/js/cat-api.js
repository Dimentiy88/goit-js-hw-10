import axios from 'axios';

const errorItem = document.querySelector('.error');
const loaderItem = document.querySelector('.loader');
const select = document.querySelector('.breed-select');

export const api_key =
  'live_iS1nFKbInfsGkasgN3u2zaVybcqbeC8d0RhPk3vFwtNTb5borVuHeseIoreFsJbm';
const breeds = `https://api.thecatapi.com/v1/breeds`;

errorItem.textContent = '';
errorItem.style.display = 'none';
select.style.visibility = 'hidden';

let storedBreeds = [];

export function fetchBreeds() {
  return axios
    .get(breeds, { headers: { 'x-api-key': api_key } })
    .then(response => {
      if (!response.data) {
        throw new Error('No data returned');
      }
      storedBreeds = response.data;
      return storedBreeds;
    })
    .catch(error => {
      loaderItem.style.display = 'none';
      errorMessage();
      console.error(error);
    });
}
