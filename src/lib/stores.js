// stores.js
import { writable } from 'svelte/store';

// Create a writable store to manage authentication state
export const isAuthenticated = writable(false);