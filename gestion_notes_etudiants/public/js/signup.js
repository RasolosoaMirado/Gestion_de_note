document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Enregistrement des utilisateurs
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Voir si ça existe déjà
    if (users.some(u => u.username === username && u.role === role)) {
        alert('Ce nom d\'utilisateur existe déjà pour ce rôle.');
        return;
    }

    // Enregistrer un nouveau utilisateur
    users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    window.location.href = './index.html'; // Redirection vers login.html
});