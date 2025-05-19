document.getElementById('loginForm').addEventListener('submit', 
    function(e){
        e.preventDefault();

        const role = document.getElementById('role').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').value;

        //prendre l'utilsateur venant de signup
        const users =  JSON.parse(localStorage.getItem('users')) || [];

        //Verifier si l'utilisateur existe déjà ou pas
        const user = users.find(u => u.username === username && u.role === role);

        if(user && user.password === password){
            //succès
            if(remember){
                //Stockage des infos
                localStorage.setItem('currentUser', JSON.stringify({
                    username: username,
                    role: role
                }
                ));
            } else{
                //session temporaire
                sessionStorage.setItem('currentUser', JSON.stringify({
                    username: username,
                    role: role
                }));
            }
            //Redirection selon le role
            if(role === "professeur"){
                window.location.href = './dashboard.html';
            }else{
                window.location.href = './releve_de_note.html';
            }
        } else{
            alert('Nom d\'utilisateur ou mot de passe incorrect');
        }
    });

//Enregistrer un nouveau utilisateur
function registerUser(username, password, role) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password, role });
    localStorage.setItem('users', JSON.stringify(users));
}

//Vers login si succès
window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('username').value = currentUser.username;
        document.getElementById('role').value = currentUser.role;
        document.getElementById('remember').checked = true;
    }
};