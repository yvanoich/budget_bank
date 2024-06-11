const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Clé secret
const secretKey = 'secretkey';

app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Route pour valider le token
app.post('/api/validate-token', (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ isValid: false });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ isValid: false });
        }
        return res.status(200).json({ isValid: true });
    });
});
