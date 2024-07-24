import { jwtDecode } from 'jwt-decode'; // O simplemente import jwtDecode from 'jwt-decode';

export class LocalStorage {
    
    static setItem(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    static getItem(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            return JSON.parse(serializedValue);
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return null;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }

    static clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }

    static getUserInfo() {
        const token = localStorage.getItem("token");

        if (!token) {
          return null;
        }
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken;
        } catch (error) {
          console.error('Invalid token:', error);
          return null;
        }
    }
}

export default LocalStorage;
