const loginA = document.querySelector('.login');
const registerA = document.querySelector('.register');
const brendName = document.querySelector('.navbar-brand');
const emailInput = document.querySelector('#exampleInputEmail1');
const passwordInput = document.querySelector('#exampleInputPassword1');
const nameInput = document.querySelector('#exampleInputPassword2');
const registerBtn = document.querySelector('.registerBtn');
const form = document.querySelector('.regForm');

if (window.location.href === 'http://127.0.0.1:5500/public/register.html#' || window.location.href === 'http://127.0.0.1:5500/public/register.html') {
  registerA.classList.add('active');
}

loginA.addEventListener('click', function() {
  window.location.href = 'http://127.0.0.1:5500/public/login.html';
});

brendName.addEventListener('click', function() {
  window.location.href = 'http://127.0.0.1:5500/public/index.html';
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;

  try {
    const response = await axios.post('https://pdp-movies-78.onrender.com/api/users', {
      name,
      email,
      password,
    });
    console.log(response.data);
    alert(`Ro'yxatdan o'tdingiz, Rahmat😉`);
    window.location.href = "http://127.0.0.1:5500/public/index.html"
  } 
  catch (error) {
    console.error(error);
    if (error.response) {
      alert(`Serverda xatolik yuz berdi: ${error.response.data}`);
    } 
    else {
      alert(`Ma'lumotlar serverga jo'natilmadi!❌`);
    }
  }
});