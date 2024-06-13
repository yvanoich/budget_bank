import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';
import axios from 'axios';

function Register() {

    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const isValid = await isTokenValid(token);
                if (isValid) {
                    navigate('/dashboard'); // Rediriger vers le tableau de bord si le token est valide
                }
            }
        };

        checkTokenValidity();
    }, [navigate]);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!username) {
                setError('Le nom d\'utilisateur est obligatoire.');
                return;
            }

            if (!validateEmail(email)) {
                setError('L\'adresse email n\'est pas valide.');
                return;
            }

            if (!password || !confirmPassword) {
                setError('Le mot de passe est obligatoire.');
                return;
            }

            if (password !== confirmPassword) {
                setError('Les mots de passe ne correspondent pas.');
                return;
            }

            await axios.post('/api/auth/register', { username, email, password, confirmPassword });

            // Redirection vers la page de login après succès
            window.location.href = '/login';

        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <div>
            <form className="form-centered" onSubmit={handleSubmit}>
                <div>
                    <label>Nom d'utilisateur :</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nom d'utilisateur"
                        required
                    />
                </div>
                <div>
                    <label>E-mail :</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='E-mail'
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Mot de passe'
                        required
                    />
                </div>
                <div>
                    <label>Confirmer le mot de passe :</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        placeholder='Mot de passe'
                        required
                    />
                </div>
                <button type="submit">S'inscrire</button>
                <div className="error">
                    {error}
                </div>
                <div className='footer-inscription'>
                    Déjà un compte ? <a href="/login">Connectez-vous</a>
                </div>
            </form>
        </div>
    );
}

export default Register;