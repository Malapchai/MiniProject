export async function fetchRandomCard() {
	try {
		const response = await fetch('http://localhost:3000/api/random-tarot-card');
		const data = await response.json();

		if (data && data.name) {
			return data;
		} else {
			console.error('Invalid card data:', data);
			return null;
		}
	} catch (error) {
		console.error('Error fetching card:', error);
		return null;
	}
}

export async function fetchThreeRandomCards() {
	try {
		const response = await fetch('http://localhost:3000/api/random-three-tarot-cards');
		if (!response.ok) throw new Error('Network response was not ok');
		const data = await response.json();
		return data; // Should return an array of three cards
	} catch (error) {
		console.error('Error fetching three random cards:', error);
		return []; // Return an empty array in case of an error
	}
}

// tarotService.js
export async function fetchFiveRandomCards() {
    try {
        const response = await fetch('http://localhost:3000/api/random-five-tarot-cards');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data; // Should return an array of five cards
    } catch (error) {
        console.error('Error fetching five random cards:', error);
        return []; // Return an empty array in case of an error
    }
}