let matieres = [];
let etudiants = [];

// Déconnexion
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

// Ajouter matière
document.getElementById('addMatiereForm').addEventListener('submit', e => {
    e.preventDefault();
    const nomMatiere = document.getElementById('nomMatiere').value;
    const coefficient = document.getElementById('coefficientMatiere').value;
    matieres.push({nom: nomMatiere, coefficient: coefficient});
    localStorage.setItem('matieres', JSON.stringify(matieres));
    updateMatiereList();
    updateNotesTable();
    document.getElementById('nomMatiere').value = '';
});

// Ajouter étudiant
document.getElementById('addEtudiantForm').addEventListener('submit', e => {
    e.preventDefault();
    const etudiant = {
    nom: document.getElementById('nomEtudiant').value,
    prenom: document.getElementById('prenomEtudiant').value,
    naissance: document.getElementById('dateNaissance').value,
    sexe: document.getElementById('sexe').value,
    notes: {}
    };
    etudiants.push(etudiant);
    localStorage.setItem('etudiants', JSON.stringify(etudiants));
    updateEtudiantList();
    updateNotesTable();
    document.getElementById('addEtudiantForm').reset();
});

// Afficher les matières
function updateMatiereList() {
    const list = document.getElementById('matieresList');
    list.innerHTML = '';
    matieres.forEach(matiere => {
        const li = document.createElement('li');
        li.textContent = `${matiere.nom} (coefficient: ${matiere.coefficient})`;
        list.appendChild(li);
    });
}

// Afficher les étudiants
function updateEtudiantList() {
    const list = document.getElementById('etudiantsList');
    list.innerHTML = '';
    etudiants.forEach(etudiant => {
    const li = document.createElement('li');
    li.textContent = `${etudiant.nom} ${etudiant.prenom}`;
    list.appendChild(li);
    });
}

// Afficher les notes
function updateNotesTable() {
    const header = document.getElementById('headerRow');
    const body = document.getElementById('bodyRows');

    header.innerHTML = '<th>Nom</th>';
    matieres.forEach(matiere => {
    header.innerHTML += `<th>${matiere.nom}</th>`;
    });

    body.innerHTML = '';
    etudiants.forEach(etudiant => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${etudiant.prenom} ${etudiant.nom}</td>`;

    matieres.forEach(matiere => {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 0;
        input.max = 20;
        input.value = etudiant.notes[matiere.nom] || '';
        input.onchange = () => {
        etudiant.notes[matiere.nom] = parseFloat(input.value);
        localStorage.setItem('etudiants', JSON.stringify(etudiants));
        };
        const td = document.createElement('td');
        td.appendChild(input);
        row.appendChild(td);
    });

    body.appendChild(row);
    });
}

// Calcul des moyennes
document.getElementById('calculateBtn').addEventListener('click', () => {
    const tbody = document.getElementById('moyennesBody');
    tbody.innerHTML = '';
    etudiants.forEach(etudiant => {
        let totalNote = 0;
        let totalCoefficient = 0;
    
        matieres.forEach(matiere =>{
            const note = etudiant.notes[matiere.nom];
            if(note !== undefined && !isNaN(note)){
                totalNote += note * matiere.coefficient;
                totalCoefficient += matiere.coefficient;
            }
        });

        let moyenne;
        if(totalCoefficient > 0){
            moyenne = (totalNote / totalCoefficient).toFixed(2);
        }else{
            moyenne = "Non valide";
        }

        const row = `<tr>
                        <td>${etudiant.nom} ${etudiant.nom}</td>
                        <td>${moyenne}</td>
                    </tr>`;
        tbody.innerHTML += row;
    });

    localStorage.setItem('etudiants', JSON.stringify(etudiants));
});
// Initialisation
window.onload = () => {
    matieres = JSON.parse(localStorage.getItem('matieres')) || [];
    etudiants = JSON.parse(localStorage.getItem('etudiants')) || [];
    updateMatiereList();
    updateEtudiantList();
    updateNotesTable();
};
