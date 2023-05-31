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
        <li class="list-group-item" aria-current="true">All Genres</li>
        <li class="list-group-item">Action</li>
        <li class="list-group-item">Comedy</li>
        <li class="list-group-item">Romance</li>
        <li class="list-group-item">Thriller</li>
      </ul>
    </div>

    <div class="tablee">
      <p>Showing <span>12</span> movies in the database.</p>
      <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search">
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

    const itemsPerPage = 4;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    let currentPage = 1;

    function loadMovies(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const currentPageData = data.slice(start, end);

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
        icon.addEventListener('click', function() {
          this.classList.toggle('toggle');
        });
      });
    }

    loadMovies(currentPage);

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
        loadMovies(currentPage);
        updatePagination();
      }
    });
  })
  .catch(error => {
    console.log('Xatolik yuz berdi:', error);
  });
