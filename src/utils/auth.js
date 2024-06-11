import axios from 'axios';

export const isTokenValid = async (token) => {
    try {
        const response = await axios.post('http://localhost:5000/api/validate-token', { token });
        return response.data.isValid;
    } catch (error) {
        console.error('Token validation error', error);
        return false;
    }
};