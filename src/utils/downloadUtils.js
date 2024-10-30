import html2canvas from 'html2canvas';

/**
 * Function to download the result as an image
 * @param {Object|Array} cards - Tarot card object for a single card or an array of card objects for multiple cards.
 * @param {boolean} areCardsVisible - Boolean indicating if the cards are visible.
 */
export async function downloadResultAsImage(cards, areCardsVisible) {
    // Determine if it's a single card or multiple cards
    const isSingleCard = !Array.isArray(cards);
    const resultElement = document.querySelector(isSingleCard ? '.card-content' : '.cards-container');

    if (resultElement instanceof HTMLElement) {
        // Center the content properly before the screenshot
        resultElement.style.display = 'flex';
        resultElement.style.justifyContent = 'center';
        resultElement.style.alignItems = 'center';

        // Temporarily hide the buttons during the screenshot
        const buttons = document.querySelectorAll('.button-group button');
        buttons.forEach(button => {
            if (button instanceof HTMLElement) {
                button.style.display = 'none';
            }
        });

        // Backup the original styles
        const originalBackground = document.body.style.background;
        const originalBodyStyle = document.body.getAttribute('style'); // Backup all inline styles
        const originalOverflow = document.body.style.overflow;

        // Temporarily add a black background with "silk2" pattern
        document.body.style.background = 'black';
        document.body.style.position = 'relative';
        document.body.style.overflow = 'hidden';

        // Create and add the silk overlay
        const silkOverlay = document.createElement('div');
        silkOverlay.style.position = 'absolute';
        silkOverlay.style.top = '0';
        silkOverlay.style.left = '0';
        silkOverlay.style.width = '100%';
        silkOverlay.style.height = '100%';
        silkOverlay.style.backgroundImage = 'url("/src/assets/silk2.png")';
        silkOverlay.style.backgroundSize = 'cover';
        silkOverlay.style.backgroundPosition = 'center';
        silkOverlay.style.zIndex = '-1';
        document.body.appendChild(silkOverlay);

        try {
            // Capture the screenshot with html2canvas
            const canvas = await html2canvas(resultElement, {
                backgroundColor: '#000000' // Ensure it's black with the silk pattern
            });

            // Convert to JPEG format with a full-quality setting
            const image = canvas.toDataURL('image/jpeg', 1.0);

            // Create a link to download the image
            const link = document.createElement('a');
            link.href = image;
            if (isSingleCard) {
                // Use the card's name if it's a single card
                const cardName = cards.name || 'tarot_card';
                link.download = `${cardName}_${cards.isReversed ? 'reversed' : 'upright'}_result.jpg`;
            } else {
                // Use a generic file name for multiple cards
                link.download = `tarot_cards_result.jpg`;
            }
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } finally {
            // Restore the buttons visibility after screenshot
            buttons.forEach(button => {
                if (button instanceof HTMLElement) {
                    button.style.display = '';
                }
            });

            // Clean up and restore the original styles
            document.body.style.background = originalBackground;
            document.body.style.overflow = originalOverflow;
            if (originalBodyStyle) {
                document.body.setAttribute('style', originalBodyStyle); // Restore inline styles
            } else {
                document.body.removeAttribute('style'); // Remove any added inline styles
            }
            document.body.removeChild(silkOverlay);
        }
    }
}

