const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {

    const cursorX = e.pageX;
    const cursorY = e.pageY;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
});

// For the registration page
const regUsername = document.getElementById('regUsername');
const regPassword = document.getElementById('regPassword');
const regEmail = document.getElementById('regEmail'); // If you want to use email later
const registerBtn = document.getElementById('register');
const messageContReg = document.createElement('p');
document.querySelector('.login').appendChild(messageContReg);

function displayMessageReg(message, type = 'info') {
    messageContReg.textContent = message;
    messageContReg.style.color = type === 'error' ? 'red' : 'green';
}

if (registerBtn) {
    registerBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const username = regUsername.value.trim();
        const password = regPassword.value.trim();

        if (!username || !password) {
            displayMessageReg('Please fill in all fields', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            displayMessageReg('User already exists', 'error');
            return;
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            displayMessageReg('User registered', 'success');
            regUsername.value = '';
            regPassword.value = '';
            regEmail.value = '';
            window.location.href = 'login.html';
        }
    });
}

// For the login page
const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById('password');
const loginBtn = document.getElementById('login');
const messageContLogin = document.createElement('p');
document.querySelector('.login').appendChild(messageContLogin);

function displayMessageLogin(message, type = 'info') {
    messageContLogin.textContent = message;
    messageContLogin.style.color = type === 'error' ? 'red' : 'green';
}

if (loginBtn) {
    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const username = loginUsername.value.trim();
        const password = loginPassword.value.trim();

        if (!username || !password) {
            displayMessageLogin('Please fill in all fields', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            displayMessageLogin('User logged in', 'success');
            loginUsername.value = '';
            loginPassword.value = '';
            window.location.href = '../index.html';
        } else {
            displayMessageLogin('Invalid credentials', 'error');
        }
    });
}


