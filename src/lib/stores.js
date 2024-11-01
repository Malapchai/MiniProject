import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const authToken = writable(null);

// Helper function to set authentication state and token
export function setAuth(token) {
    localStorage.setItem('authToken', token);
    authToken.set(token);
    isAuthenticated.set(true);
}

// Helper function to clear authentication state and token
export function clearAuth() {
    localStorage.removeItem('authToken');
    authToken.set(null);
    isAuthenticated.set(false);
}

// Initialize authentication state based on localStorage
const token = localStorage.getItem('authToken');
if (token) {
    isAuthenticated.set(true);
    authToken.set(token);
}
