const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Remplace par ton nom d'utilisateur MySQL
    password: '', // Remplace par ton mot de passe MySQL
    database: 'budget_bank',
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
    } else {
        console.log('Connecté à MySQL');
    }
});

module.exports = db;