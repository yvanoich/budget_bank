import React, { useEffect } from 'react';
import axios from '../axiosConfig'; // Assurez-vous d'importer correctement axios

const ProtectedRouteChecker = ({ onFinishRedirect }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('http://localhost:5000/api/protected');
                onFinishRedirect(); // Marquer la fin de la redirection
            } catch (error) {
                if (error.response.status === 401) {
                    // Supprime le token
                    localStorage.removeItem('token');
                    // Rediriger vers la page de connexion si non autorisé
                    window.location.href = '/login';
                } else {
                    console.error('Failed to fetch data', error);
                }
            }
        };

        fetchData();
    }, [onFinishRedirect]); // Assurez-vous que onFinishRedirect est dans les dépendances du useEffect

    return null; // Ce composant ne rend rien visuellement
};

export default ProtectedRouteChecker;