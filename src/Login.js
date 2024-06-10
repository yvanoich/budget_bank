import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

function Login() {

    useEffect(() => {
        // On récupère le token dans le localSorage
        const token = localStorage.getItem('token');

        if (token) {
            // Rediriger vers la page de tableau de bord si un token est présent
            window.location.href = '/dashboard';
        }
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password });

            // Stocker le token dans le localStorage
            localStorage.setItem('token', response.data.token);

            // Redirection vers la page de login après succès
            window.location.href = '/dashboard';
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