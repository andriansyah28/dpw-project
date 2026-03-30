const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-password');
const iconClosed = toggleBtn.querySelector('.lock-icon-closed');
const iconOpen = toggleBtn.querySelector('.lock-icon-open');

// Toggle Password Visibility
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        iconClosed.style.display = 'none';
        iconOpen.style.display = 'block';
        toggleBtn.classList.add('is-active');
    } else {
        passwordInput.type = 'password';
        iconClosed.style.display = 'block';
        iconOpen.style.display = 'none';
        toggleBtn.classList.remove('is-active');
    }
});

// Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'dashboard.html';
    } else if (username === 'user' && password === 'user123') {
        localStorage.setItem('guestName', username); // Simpan nama tamu
        window.location.href = '../undangan/welcome.html';
    } else {
        alert('Login Gagal! Username atau Password salah.');
    }

});

   