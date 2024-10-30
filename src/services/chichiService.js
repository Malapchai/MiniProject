// chiChiService.js
export async function fetchRandomChiChiA() {
    try {
        const response = await fetch('http://localhost:3000/api/random-chichi-a');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data; // Ensure this returns an object with the 'description' field
    } catch (error) {
        console.error('Error fetching Chi-Chi:', error);
        return [];
    }
}
export async function fetchRandomChiChiB() {
    try {
        const response = await fetch('http://localhost:3000/api/random-chichi-b');
        if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Chi-Chi from B:', error);
        return null;
    }
}

export async function fetchRandomChiChiC() {
    try {
        const response = await fetch('http://localhost:3000/api/random-chichi-c');
        if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Chi-Chi from C:', error);
        return null;
    }
}
