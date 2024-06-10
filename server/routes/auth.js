const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Assurez-vous d'exporter la connexion MySQL depuis db.js
const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Vérification que le mot de passe et la confirmation correspondent
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Le mo de passe n'est pas correct." });
    }

    if (!validateEmail(email))
        return res.status(400).json({ error: "L'e-mail n'est pas correct" });

    try {
        await createUser(username, email, password);
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});

// Fonction pour créer un utilisateur dans la base de données
async function createUser(username, email, password) {
    // Création de l'ident
    const ident = generateId(32);

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion de l'utilisateur en base
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (ident, username, email, password) VALUES (?, ?, ?, ?)';
        db.query(query, [ident, username, email, hashedPassword], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

// Fonction pour générer un identifiant de 32 caractères
function generateId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Fonction pour vérifier l'email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Connexion
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(400).json({ error: 'Erreur lors de la connexion' });
        }
        if (results.length === 0) {
            return res.status(400).json({ error: 'L\'utilisateur ou le mot de passe est incorrect.' });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'L\'utilisateur ou le mot de passe est incorrect.' });
        }
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    });
});

router.post('/logout', (req, res) => {
    // Supprimer un cookie de session, si applicable
    res.clearCookie('session');
    res.json({ message: 'Déconnexion réussie' });
});

module.exports = router;