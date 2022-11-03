// Constants
const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
const cardsContainer = document.querySelector('.cards-container');
const cardsCheckboxes = document.querySelectorAll('.card__checkbox');
const searchButton = document.querySelector('.search-form__button');
const searchField = document.querySelector('.search-form__input');
const initialDataUrl = `${baseUrl}/?_start=0&_limit=7`;

// Functions
function toggleTheme(element) {
  element.closest('.card').classList.toggle('card_theme_dark');
}

function createCard(data) {
  const { userId, id, title, body } = data;
  const cardElement = document
    .querySelector('#card-template')
    .content.querySelector('.card')
    .cloneNode(true);

  cardElement.id = id;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__text').textContent = body;

  cardElement.querySelector('.card__checkbox').addEventListener('click', (e) => {
    toggleTheme(e.target);
  });

  return cardElement;
}

function renderCard(item, block) {
  block.append(item);
}

function loadInitialCards(data, createFunction, renderFunction, node) {
  data.forEach((item) => {
    const element = createFunction(item);
    renderFunction(element, node);
  });
}

function getDataFromServer(url) {
  fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    .then((res) => {
      if (res.ok) return res.json();

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((cardsData) => {
      cardsContainer.innerHTML = '';
      loadInitialCards(cardsData, createCard, renderCard, cardsContainer);
    })
    .catch((err) => console.log(err));
}

getDataFromServer(initialDataUrl);

// Event listeners
searchButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const searchByTitleUrl = `${baseUrl}/?${searchField.name}=${searchField.value.replaceAll(' ', '+')}`;
  getDataFromServer(searchByTitleUrl);
});
