const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Assurez-vous d'exporter la connexion MySQL depuis db.js
const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], (err, results) => {
            if (err) {
                return res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur' });
            }
            res.status(201).json({ message: 'Utilisateur créé avec succès' });
        });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});

// Connexion
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            return res.status(400).json({ error: 'Erreur lors de la connexion' });
        }
        if (results.length === 0) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;