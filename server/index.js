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

// Middleware pour vérifier le token
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Vérification du token
app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: "Route protégée atteinte avec succès" });
});