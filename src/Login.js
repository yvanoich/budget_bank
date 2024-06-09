import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            console.log(response.data); // Le token JWT est ici
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Mot de passe'
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
                <div className="footer-connexion">
                    <a href="#">Mot de passe oublié</a><br />
                    Pas encore de compte ? <a href="/register">Inscrivez-vous</a>
                </div>
            </form>
        </div>
    );
}

export default Login;