// students.js

window.onload = () => {
    const etudiants = JSON.parse(localStorage.getItem('etudiants')) || [];
    const table = document.createElement('table');
    table.border = "1";

    const thead = document.createElement('thead');
    thead.innerHTML = `<tr><th>Nom</th><th>Prénom</th><th>Sexe</th><th>Moyenne</th></tr>`;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    etudiants.forEach(e => {
        const notes = Object.values(e.notes || {});
        const moyenne = notes.length ? (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2) : "N/A";
        const row = `<tr>
            <td>${e.nom}</td>
            <td>${e.prenom}</td>
            <td>${e.sexe}</td>
            <td>${moyenne}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    table.appendChild(tbody);
    document.body.appendChild(table);
};
