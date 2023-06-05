import { links } from "/utils/links.js";

const loginA = document.querySelector('.login');
const registerA = document.querySelector('.register');
const brendName = document.querySelector('.navbar-brand');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const loginForm = document.getElementById('loginForm');


if(window.location.href === `${links.loginLink}` || window.location.href === `${links.loginLink}#`){
  loginA.classList.add('active');
}

registerA.addEventListener('click', function(){
  window.location.href = `${links.registerLink}`;
});

brendName.addEventListener('click', function(){
  window.location.href = `${links.brendLink}`;
});

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await axios.post('https://pdp-movies-78.onrender.com/api/auth', {
      email,
      password
    });
    console.log(response.data);
    const userToken = response.data.data;
    localStorage.setItem('userToken', userToken);
    
    alert('Akkauntga kirdingiz, Rahmat😉');
    location.href = `${links.brendLink}`
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