const loginA = document.querySelector('.login');
const registerA = document.querySelector('.register');
const brendName = document.querySelector('.navbar-brand');

if(window.location.href === `http://127.0.0.1:5500/public/register.html#` || window.location.href === `http://127.0.0.1:5500/public/register.html`){
  registerA.classList.add('active');
}

loginA.addEventListener('click', function(){
  window.location.href = `http://127.0.0.1:5500/public/login.html`;
});

brendName.addEventListener('click', function(){
  window.location.href = `http://127.0.0.1:5500/public/index.html`;
});