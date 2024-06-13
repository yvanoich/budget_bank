import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const handleLogout = async () => {
        try {
            // Effacer le token d'authentification du localStorage
            localStorage.removeItem('token');

            // Rediriger vers la page de connexion
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header>
            <div className="logo">Budget Bank</div>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/dashboard">Comptes</Link></li>
                    <li><Link to="/logout" onClick={handleLogout}>Déconnexion</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;