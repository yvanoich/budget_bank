import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const Dashboard = () => {

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
            <div>
                <h1>Dashboard</h1>
                {/* Le reste du contenu de votre tableau de bord */}
                <button onClick={handleLogout}>Déconnexion</button>
            </div>
        </div>
    );
};

export default Dashboard;