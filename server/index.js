const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);