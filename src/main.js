document.body.innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Diyorbek</a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Register</a>
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
      <p>Showing <span>12</span> movies in the database.</p>
      <input class="form-control me-2 search" type="search" placeholder="Search..." aria-label="Search">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col">Favorite</th>
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

fetch('https://pdp-movies-78.onrender.com/api/movies')
  .then(res => res.json())
  .then(data => {

    console.log(data);

    let tbody = document.querySelector('tbody');

    const qatorlarSoniPan = 4;
    const totalPages = Math.ceil(data.length / qatorlarSoniPan);
    let currentPage = 1;

    function loadMovies(page, data) {
      const start = (page - 1) * qatorlarSoniPan;
      const end = start + qatorlarSoniPan;
      const currentPageData = data.slice(start, end);
      console.log(currentPageData);

      tbody.innerHTML = '';

      for (let i = 0; i < currentPageData.length; i++) {
        let tr = document.createElement('tr');
        let th = document.createElement('th');

        th.scope = 'row';
        th.innerHTML = `<a href="">${currentPageData[i].title}</a>`;

        let genreNameTd = document.createElement('td');
        genreNameTd.textContent = currentPageData[i].genre.name;

        let stockTd = document.createElement('td');
        stockTd.textContent = currentPageData[i].numberInStock;

        let rateTd = document.createElement('td');
        rateTd.textContent = currentPageData[i].dailyRentalRate;

        let heartIcon = document.createElement('td');
        heartIcon.className = 'material-symbols-outlined favorite-icon';
        heartIcon.textContent = 'favorite';

        tr.appendChild(th);
        tr.appendChild(genreNameTd);
        tr.appendChild(stockTd);
        tr.appendChild(rateTd);
        tr.appendChild(heartIcon);
        tbody.appendChild(tr);
      }

      const heartIcons = document.querySelectorAll('.favorite-icon');
      heartIcons.forEach(icon => {
        icon.addEventListener('click', function () {
          this.classList.toggle('toggle');
        });
      });
    }

    loadMovies(currentPage, data);

    function updatePagination() {
      pagination.innerHTML = '';

      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item';
        if (i === currentPage) {
          li.classList.add('active');
        }

        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = i;

        li.appendChild(a);
        pagination.appendChild(li);
      }
    }

    updatePagination();

    pagination.addEventListener('click', event => {
      if (event.target.tagName === 'A') {
        currentPage = parseInt(event.target.textContent);
        loadMovies(currentPage, data);
        updatePagination();
      }
    });

    const search = document.querySelector('.search');
    search.addEventListener('input', function (e) {
      const value = e.target.value.toLowerCase();

      pagination.style.display = 'none';

      if (value === '') pagination.style.display = 'flex';


      const filteredData = data.filter(movie => {
        return movie.title.toLowerCase().includes(value);
      });

      currentPage = 1;
      loadMovies(currentPage, filteredData);
      totalPages = Math.ceil(filteredData.length / qatorlarSoniPan);
      updatePagination();

    });

    const allGenres = document.querySelector('.allg');
    const action = document.querySelector('.action');
    const comedy = document.querySelector('.comedy');
    const romance = document.querySelector('.romance');
    const thriller = document.querySelector('.thriller');

    function listGroup(genreName) {
      const filteredData = data.filter(movie => {
        return movie.genre.name.toLowerCase() === genreName.toLowerCase();
      });

      currentPage = 1;
      loadMovies(currentPage, filteredData);
      totalPages = Math.ceil(filteredData.length / qatorlarSoniPan);
      updatePagination();
    }

    allGenres.addEventListener('click', function () {
      action.classList.remove('active');
      comedy.classList.remove('active');
      romance.classList.remove('active');
      thriller.classList.remove('active');
      allGenres.classList.add('active');
      pagination.style.display = 'flex';
      listGroup(data.genre.name);
    });

    action.addEventListener('click', function () {
      allGenres.classList.remove('active');
      comedy.classList.remove('active');
      romance.classList.remove('active');
      thriller.classList.remove('active');
      action.classList.add('active');

      pagination.style.display = 'none';
      listGroup('Action');
    });

    comedy.addEventListener('click', function () {
      allGenres.classList.remove('active');
      action.classList.remove('active');
      romance.classList.remove('active');
      thriller.classList.remove('active');
      comedy.classList.add('active');

      pagination.style.display = 'none';
      listGroup('comedy');
    });

    romance.addEventListener('click', function () {
      allGenres.classList.remove('active');
      comedy.classList.remove('active');
      action.classList.remove('active');
      thriller.classList.remove('active');
      romance.classList.add('active');

      pagination.style.display = 'none';
      listGroup('romance');
    });

    thriller.addEventListener('click', function () {
      allGenres.classList.remove('active');
      comedy.classList.remove('active');
      romance.classList.remove('active');
      action.classList.remove('active');
      thriller.classList.add('active');

      pagination.style.display = 'none';
      listGroup('thriller');
    });

  })

  .catch(error => {
    console.log('Xatolik yuz berdi:', error);
  });
