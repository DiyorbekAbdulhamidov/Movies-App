import { links } from "../utils/links.js";

const brendName = document.getElementById('brendName');
const loginPage = document.getElementById('loginPage');
const registerPage = document.getElementById('registerPage');

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
        window.location.href = `${links.brendLink}`
      };
    });

    brendName.addEventListener('click', function () {
      window.location.href = `${links.brendLink}`;
    });
  })
  .catch(error => {
    console.log('Xatolik yuz berdi:', error);
  });

const movieForm = document.getElementById('movieForm');
movieForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const title = document.getElementById('titleInput').value;
  const genreName = document.getElementById('genrs').value;
  const numberInStock = document.getElementById('stock').value;
  const dailyRentalRate = document.getElementById('rate').value;

  try {
    const genreResponse = await axios.get('https://pdp-movies-78.onrender.com/api/genres', {});
    const genres = genreResponse.data;
    const genreFond = genres.find(genre => genre.name === genreName);

    if (!genreFond) {
      alert('Genre not found❌');
    }

    const genreId = genreFond._id;

    const movieResponse = await axios.post('https://pdp-movies-78.onrender.com/api/movies', {
      title,
      genreId,
      numberInStock,
      dailyRentalRate
    }, {
      headers: {
        'x-auth-token': userToken
      }
    });

    console.log(movieResponse.data);
    alert('Film muvaffaqiyatli yaratildi!');
    location.reload();
  }
  catch (error) {
    console.error(error);
    if (error.response) {
      alert(`Serverda xatolik yuz berdi: ${error.response.data}`);
    }
    else {
      alert('Malumotlar serverga jonatilmadi!❌');
    }
  }
});