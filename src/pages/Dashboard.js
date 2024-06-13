import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const Dashboard = () => {

    return (
        <main>
            <div className="accounts-container" style={{ marginTop: '100px' }}>
                <div className="add-box">
                    <span style={{ lineHeight: '1em' }}>Ajouter un compte</span>
                    <br />
                    <span style={{ fontSize: '1.5em', lineHeight: '0.5em' }}>+</span>
                </div>
                {/* Ajoutez d'autres boutons ici si nécessaire */}
            </div>
        </main>
    );
};

export default Dashboard;