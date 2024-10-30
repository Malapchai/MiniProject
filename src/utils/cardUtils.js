// Function to determine if the card is upright or reversed
export function getCardDescription(card, isReversed) {
	if (isReversed) {
		return {
			description: `${card.reverse_description}`,
			image: card.image, // If the image is the same for both upright and reversed
		};
	} else {
		return {
			description: `${card.upright_description}`,
			image: card.image,
		};
	}
}