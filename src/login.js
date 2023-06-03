// import { links } from "./links";

// const loginA = document.querySelector('.login');
// const registerA = document.querySelector('.register');
// const brendName = document.querySelector('.navbar-brand');

// if(window.location.href === `${links.loginLink}` || window.location.href === `${links.loginLink}#`){
//   loginA.classList.add('active');
// }

// registerA.addEventListener('click', function(){
//   window.location.href = `${links.registerLink}`;
// });

// brendName.addEventListener('click', function(){
//   window.location.href = `${links.brendLink}`;
// });

const loginA = document.querySelector('.login');
const registerA = document.querySelector('.register');
const brendName = document.querySelector('.navbar-brand');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginForm = document.getElementById('loginForm');

if (window.location.href === 'http://127.0.0.1:5500/public/login.html#' || window.location.href === 'http://127.0.0.1:5500/public/login.html') {
  loginA.classList.add('active');
}

registerA.addEventListener('click', function () {
  window.location.href = 'http://127.0.0.1:5500/public/register.html';
});

brendName.addEventListener('click', function () {
  window.location.href = 'http://127.0.0.1:5500/public/index.html';
});

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await axios.post('https://pdp-movies-78.onrender.com/api/auth', {
      email,
      password
    })
    console.log(response.data);
    const userToken = response.data;
    alert('Akkauntga kirdingiz, Rahmat😉');
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