import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);
export const authToken = writable(null);

// Helper to check if token exists in localStorage on load
if (localStorage.getItem('authToken')) {
    isAuthenticated.set(true);
    authToken.set(localStorage.getItem('authToken'));
}