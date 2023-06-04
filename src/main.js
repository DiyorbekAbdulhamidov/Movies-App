import { links } from "./links.js";

document.body.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Diyorbek</a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link loginPage" aria-current="page" href="#">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link registerPage" href="#">Register</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="main">
    <div class="list">
      <ul class="list-group">
        <li class="list-group-item allg" aria-current="true">All Genres</li>
        <li class="list-group-item action">Action</li>
        <li class="list-group-item comedy">Comedy</li>
        <li class="list-group-item romance">Romance</li>
        <li class="list-group-item thriller">Thriller</li>
      </ul>
    </div>
    <div class="tablee">
      <p>Showing <span class="countMov">0</span> movies in the database.</p>
      <input class="form-control me-2 search" type="search" placeholder="Search..." aria-label="Search">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="titleTh">Title</th>
            <th scope="col" class="genreTh">Genre</th>
            <th scope="col" class="stockTh">Stock</th>
            <th scope="col" class="rateTh">Rate</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <nav aria-label="...">
        <ul class="pagination">
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item" aria-current="page"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
        </ul>
      </nav>
    </div>
  </div>
`;

const table = document.querySelector('table');
const pagination = document.querySelector('.pagination');
const numMovies = document.querySelector('.countMov');
const tbody = document.querySelector('tbody');
const allg = document.querySelector('.allg');
const action = document.querySelector('.action');
const comedy = document.querySelector('.comedy');
const romance = document.querySelector('.romance');
const thriller = document.querySelector('.thriller');
const searchInput = document.querySelector('.search');
const genres = document.querySelectorAll('.list-group');
const registerPage = document.querySelector('.registerPage');
const loginPage = document.querySelector('.loginPage');
const titleTh = document.querySelector('.titleTh');
const genreTh = document.querySelector('.genreTh');
const stockTh = document.querySelector('.stockTh');
const rateTh = document.querySelector('.rateTh');


const userToken = localStorage.getItem('userToken');

axios.get('https://pdp-movies-78.onrender.com/api/users/me', {
  headers: {
    'x-auth-token': userToken
  }
})
  .then(response => {
    const userData = response.data;
    console.log(userData);

    loginPage.textContent = userData.name;
    registerPage.textContent = 'Logout';

    loginPage.addEventListener('click', function () {
      if (loginPage.textContent === userData.name)
        alert('Not Found❌');
    });

    registerPage.addEventListener('click', function () {
      if (registerPage.textContent === 'Logout') {
        loginPage.textContent = 'Login';
        registerPage.textContent = 'Register';
        localStorage.removeItem('userToken');
      };
    });
  })
  .catch(error => {
    console.log('Xatolik yuz berdi:', error);
  });


registerPage.addEventListener('click', function () {
  window.location.href = links.registerLink;
});

loginPage.addEventListener('click', function () {
  window.location.href = links.loginLink;
});

fetch('https://pdp-movies-78.onrender.com/api/movies')
  .then(res => res.json())
  .then(data => {

    function loadMovies(page, data) {
      const qatorlarSoniPan = 4;
      const start = (page - 1) * qatorlarSoniPan;
      const end = start + qatorlarSoniPan;
      const currentPageData = data.slice(start, end);

      tbody.innerHTML = '';

      for (let i = 0; i < currentPageData.length; i++) {
        const movie = currentPageData[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td id="titles">${movie.title}</td>
          <td>${movie.genre.name}</td>
          <td>${movie.numberInStock}</td>
          <td>${movie.dailyRentalRate}</td>
          <td><span class="material-symbols-outlined" id="heart">favorite</span></td>
        `;
        tbody.appendChild(tr);
      }
    }

    const hearts = document.querySelectorAll('#heart');

    hearts.forEach((heart) => {
      heart.addEventListener('click', function () {
        heart.classList.toggle('toggle');
      });
    });

    function loadPagination(data) {
      pagination.innerHTML = '';

      const totalPages = Math.ceil(data.length / 4);

      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === 1) {
          li.classList.add('active');
        }
        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = i;
        li.appendChild(a);
        pagination.appendChild(li);
      }

      pagination.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          const activePage = document.querySelector('.pagination .active');
          activePage.classList.remove('active');
          e.target.parentNode.classList.add('active');
          const page = parseInt(e.target.textContent);
          loadMovies(page, data);
        }
      });
    }

    function listGroup(genreName) {
      const filteredData = data.filter(movie => movie.genre.name.toLowerCase() === genreName);
      loadMovies(1, filteredData);
      loadPagination(filteredData);
      numMovies.textContent = filteredData.length;
    }

    function searchMovies(soz) {
      const filteredData = data.filter(movie => movie.title.toLowerCase().includes(soz.toLowerCase()));
      loadMovies(1, filteredData);
      loadPagination(filteredData);
      numMovies.textContent = filteredData.length;
    }

    function listeners() {

      function aktivOchirish() {
        genres.forEach(function (janr) {
          if (janr.classList.contains('active')) {
            janr.classList.remove('active');
          }
        });
      }

      allg.addEventListener('click', function () {
        loadMovies(1, data);
        loadPagination(data);
        numMovies.textContent = data.length;
        // activochirish();
        allg.classList.add('active');
        action.classList.remove('active');
        comedy.classList.remove('active');
        romance.classList.remove('active');
        thriller.classList.remove('active');
      });

      action.addEventListener('click', function () {
        listGroup('action');
        // activochirish();
        action.classList.add('active');
        allg.classList.remove('active');
        comedy.classList.remove('active');
        romance.classList.remove('active');
        thriller.classList.remove('active');
      });

      comedy.addEventListener('click', function () {
        listGroup('comedy');
        // activochirish();
        comedy.classList.add('active');
        allg.classList.remove('active');
        action.classList.remove('active');
        romance.classList.remove('active');
        thriller.classList.remove('active');
      });

      romance.addEventListener('click', function () {
        listGroup('romance');
        // activochirish();
        romance.classList.add('active');
        allg.classList.remove('active');
        action.classList.remove('active');
        comedy.classList.remove('active');
        thriller.classList.remove('active');
      });

      thriller.addEventListener('click', function () {
        listGroup('thriller');
        // activochirish();
        thriller.classList.add('active');
        allg.classList.remove('active');
        action.classList.remove('active');
        comedy.classList.remove('active');
        romance.classList.remove('active');
      });

      searchInput.addEventListener('input', function () {
        allg.classList.remove('active');
        action.classList.remove('active');
        comedy.classList.remove('active');
        romance.classList.remove('active');
        thriller.classList.remove('active');
        searchMovies(searchInput.value);
      });

      loadMovies(1, data);
      loadPagination(data);
      numMovies.textContent = data.length;
    }

    function init() {
      listeners();
    }
    init();

  });