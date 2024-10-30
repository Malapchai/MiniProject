<script>
	import NavBarLoggedIn from './NavBarLoggedIn.svelte';
	import { onMount } from 'svelte';
	import { fetchThreeRandomCards } from '../services/tarotService';
	import { getCardDescription } from '../utils/cardUtils'; // Helper logic for card descriptions
	import { downloadResultAsImage } from '../utils/downloadUtils'; // Import download logic

	let cards = [];
	let loading = true;
	let areCardsVisible = false; // Control the visibility of actual tarot cards

	// Fetch three tarot cards
	async function fetchCards() {
		loading = true;
		const fetchedCards = await fetchThreeRandomCards();
		
		// Update each card with isReversed status and proper description
		cards = fetchedCards.map(card => {
			const isReversed = Math.random() < 0.5; // Randomly decide if the card is reversed
			const { description, image } = getCardDescription(card, isReversed);

			return { ...card, isReversed, description, image };
		});

		loading = false;
	}

	// Function to reveal the cards
	function revealCards() {
		areCardsVisible = true;
	}

	onMount(() => {
		fetchCards();
	});
</script>

<div class="three-card-page">
	<NavBarLoggedIn />

	{#if loading}
		<p class="loading-text">Loading cards...</p>
	{:else if cards && cards.length > 0}
		<div class="cards-container">
			<!-- Display each tarot card, initially showing the back of the cards -->
			{#each cards as card}
				<div class="card">
					<div class="card-image-container">
						<img
							src={areCardsVisible ? card.image : '/src/assets/backcard.png'}
							alt={areCardsVisible ? card.name : 'Tarot Card Back'}
							class={`card-image ${card.isReversed && areCardsVisible ? 'reversed' : ''}`}
						/>
						<!-- Card name at the bottom of the image -->
						<h2 class="card-name">{areCardsVisible ? card.name : ''}</h2>
					</div>
					<!-- Show description only when cards are visible -->
					{#if areCardsVisible}
						<p class="card-description">
							{card.isReversed ? card.reverse_keywords : card.upright_keywords}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	{:else}
		<p>No cards available.</p>
	{/if}

	<!-- Button to reveal cards or show another set and download result -->
	<div class="button-group">
		{#if !areCardsVisible}
			<button class="show-cards-btn" on:click={revealCards}>
				Show the cards
			</button>
		{:else}
			<button class="show-cards-btn" on:click={fetchCards}>
				Show another set of cards
			</button>
			<button class="download-btn" on:click={() => downloadResultAsImage(cards, areCardsVisible)}>
				Download Result
			</button>
		{/if}
	</div>
</div>

<style>
	/* Three Card Page Styles */
	.three-card-page {
		background-color: black;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		overflow: hidden;
	}

	.three-card-page::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('/src/assets/silk2.png');
		background-size: cover;
		background-position: center;
		opacity: 0.4;
		z-index: 0;
	}

	.cards-container {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 3rem;
		z-index: 2;
	}

	.card {
		background: rgba(0, 0, 0, 0.7);
		border-radius: 10px;
		padding: 1.5rem;
		text-align: center;
		color: white;
		width: 250px;
		height: 500px; /* Increased height for better content fit */
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

	.card-image-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Card Image Styles */
	.card-image {
		width: 200px;
		height: 300px;
		object-fit: contain;
		transition: transform 0.5s ease-in-out;
		margin-bottom: 0.5rem;
	}

	/* Rotate the image 180 degrees if reversed */
	.card-image.reversed {
		transform: rotate(180deg);
	}

	/* Card name below the image */
	.card-name {
		color: white;
		font-size: 1.2rem;
		margin-top: 0.5rem;
		line-height: 1.2;
		max-height: 3rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.card-description {
		color: white;
		font-size: 1rem;
		line-height: 1.5;
		text-align: center;
		max-width: 200px;
		margin-bottom: 1rem;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 2rem; /* Add spacing between buttons */
		margin-top: 3rem;
		margin-bottom: 3rem;
		z-index: 2;
	}

	.show-cards-btn,
	.download-btn {
		background-color: transparent;
		color: #dbf77e;
		border: 2px solid #dbf77e;
		padding: 0.8rem 2rem;
		font-size: 1.2rem;
		border-radius: 8px;
		cursor: pointer;
		font-family: 'Montserrat', sans-serif;
		transition: background-color 0.3s ease, color 0.3s ease;
	}

	.show-cards-btn:hover,
	.download-btn:hover {
		background-color: #dbf77e;
		color: black;
	}

	.loading-text {
		color: white;
		font-size: 1.5rem;
		margin-top: 5rem;
	}
</style>
