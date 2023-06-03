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

if(window.location.href === `http://127.0.0.1:5500/public/login.html#` || window.location.href === `http://127.0.0.1:5500/public/login.html`){
  loginA.classList.add('active');
}

registerA.addEventListener('click', function(){
  window.location.href = `http://127.0.0.1:5500/public/register.html`;
});

brendName.addEventListener('click', function(){
  window.location.href = `http://127.0.0.1:5500/public/index.html`;
});