import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';
import ProtectedRouteChecker from './utils/ProtectedRouteChecker';

const Dashboard = () => {
    const [redirecting, setRedirecting] = useState(true);

    // Définir une fonction pour marquer la fin de la redirection
    const finishRedirect = () => {
        setRedirecting(false);
    };

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
        <div>
            <ProtectedRouteChecker onFinishRedirect={finishRedirect} />
            {!redirecting && (
                <div>
                    <h1>Dashboard</h1>
                    {/* Le reste du contenu de votre tableau de bord */}
                    <button onClick={handleLogout}>Déconnexion</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;