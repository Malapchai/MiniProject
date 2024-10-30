<script>
	import NavBarLoggedIn from './NavBarLoggedIn.svelte';
	import { onMount } from 'svelte';
	import { fetchRandomCard } from '../services/tarotService'; // Import API logic
	import { getCardDescription } from '../utils/cardUtils'; // Import helper logic
	import { downloadResultAsImage } from '../utils/downloadUtils'; // Import download logic

	let card = null;
	let loading = true;
	let isCardFlipped = false;
	let isReversed = false;

	async function fetchAndDisplayCard() {
		loading = true;
		const randomCard = await fetchRandomCard();

		if (randomCard) {
			isReversed = Math.random() < 0.5; // Randomly decide if the card is reversed
			const { description, image } = getCardDescription(randomCard, isReversed);

			card = { ...randomCard, description, image };
			isCardFlipped = true;
		}
		loading = false;
	}

	onMount(() => {
		loading = false;
	});
</script>

<div class="card-page">
	<NavBarLoggedIn />

	{#if loading}
		<p class="loading-text">Loading card...</p>
	{:else}
		<div class="card-content">
			<h1 class="card-name">{isCardFlipped ? card.name : 'Card of the Day'}</h1>
			<img
				src={isCardFlipped ? card.image : '/src/assets/backcard.png'}
				alt={isCardFlipped ? card.name : 'Tarot Card Back'}
				class={`card-image ${isReversed ? 'reversed' : ''}`}
			/>
			{#if isCardFlipped}
				<p class="card-description">{card.description}</p>
			{/if}

			<!-- Button Group -->
			<div class="button-group">
				<button class="show-card-btn" on:click={fetchAndDisplayCard}>
					{isCardFlipped ? 'Show another card' : 'Show the card'}
				</button>

				{#if isCardFlipped}
					<button
						class="download-btn"
						on:click={() => downloadResultAsImage(card, isReversed)}
					>
						Download Result
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	/* Full screen container with black base and silk gradient */
	.card-page {
		background-color: black;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		position: relative;
	}

	.card-page::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('/src/assets/silk.png');
		background-size: cover;
		background-position: center;
		opacity: 0.4;
		z-index: 0;
	}

	/* Ensures navbar stays at the top */
	.navbar {
		position: relative;
		z-index: 2;
	}

	.card-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		z-index: 1;
		margin-top: 2rem; /* Space below navbar */
		max-width: 600px; /* Limit the content width */
		margin-left: auto;
		margin-right: auto;
	}

	.card-name {
		color: white;
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
		text-transform: capitalize;
	}

	/* Ensure both back card and tarot card have the same dimensions */
	.card-image {
		width: 300px; /* Fixed width for all cards */
		height: 450px; /* Fixed height for all cards */
		object-fit: contain; /* Ensure the full image is visible without trimming */
		margin-bottom: 1.5rem;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5); /* Card shadow */
		transition: transform 0.5s ease-in-out;
	}

	/* Rotate the image 180 degrees if reversed */
	.card-image.reversed {
		transform: rotate(180deg);
	}

	.card-description {
		color: white;
		font-size: 1rem;
		margin-bottom: 1.5rem;
		line-height: 1.6;
		max-width: 1200px; /* Increased the maximum width */
		text-align: center; /* Center the description text */
	}

	.button-group {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 1rem;
		margin-bottom: 3rem; /* Increase this value to add more space below */
	}

	.show-card-btn,
	.download-btn {
		background-color: transparent;
		color: #dbf77e;
		border: 2px solid #dbf77e;
		padding: 0.5rem 2rem;
		font-size: 1.2rem;
		border-radius: 8px;
		cursor: pointer;
		margin-bottom: 2rm;
		font-family: 'Montserrat', sans-serif;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.show-card-btn:hover,
	.download-btn:hover {
		background-color: #dbf77e;
		color: black;
	}

	.loading-text {
		color: white;
		font-size: 1.5rem;
		margin-top: 5rem; /* Space below navbar */
	}
</style>
