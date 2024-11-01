<script>
	import NavBarLoggedIn from './NavBarLoggedIn.svelte'; // Import the logged-in NavBar
	import { isAuthenticated } from 'C:\\Users\\User\\Pictures\\Document\\svelte-course\\src\\lib\\stores.js'; // Import store
	import { navigate } from 'svelte-routing'; // Navigation
	import { onMount } from 'svelte'; // Lifecycle function

	let userLoggedIn = false;

	onMount(() => {
        let loggedIn;
        isAuthenticated.subscribe(value => loggedIn = value);

        // If not authenticated, navigate to login page
        if (!loggedIn) {
            navigate('/login');
        }
    });

	// Subscribe to the store directly
	$: {
		isAuthenticated.subscribe((value) => {
			userLoggedIn = value;
		});
	}

	function goToCardOfTheDay() {
		navigate('/card-of-the-day'); // Route to your card of the day page
	}

	// Function to navigate to Profile (later when Profile button is clicked)
	function goToProfile() {
		navigate('/profile');
	}
</script>

<NavBarLoggedIn />
<div class="tarot-page">
	<!-- Tarot Page Content -->
	<div class="tarot-content">
		<!-- Main Title -->
		<h1 class="title">Tarot</h1>
		<!-- Sub-title -->
		<p class="sub-title">Discover What's Your Mind Saying...</p>

		<!-- Tarot Cards Section -->
		<div class="tarot-cards">
			<!-- Tarot Card 1: 3 Cards - Mind, Body, Spirit -->
			<button class="tarot-card" on:click={() => navigate('/three-card-spread')}>
                <img src="/src/assets/node.png" alt="Card Icon" class="card-image" />
                <h3>3 Cards</h3>
                <p>Mind, Body, Spirit Spread</p>
            </button>

			<!-- Tarot Card 2: 5 Cards Spread -->
			<button class="tarot-card" on:click={() => navigate('/five-card-spread')}>
                <img src="/src/assets/node.png" alt="Card Icon" class="card-image" />
                <h3>5 Cards</h3>
                <p>Five-card Spread</p>
            </button>
		</div>

		<!-- Card of the Day Button -->
		<button class="card-of-day-btn" on:click={goToCardOfTheDay}>
			Card of the day (1 card)
		</button>
	</div>
</div>

<style>
	/* Tarot page background with black and silk2.png gradient at the top */
	.tarot-page {
		position: relative;
		background-color: black; /* Black base */
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden; /* Ensure overflow is hidden for background gradient */
		padding-top: 2rem; /* Add padding at the top to move content upwards */
	}

	.tarot-page::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('/src/assets/silk2.png');
		background-size: contain;
		background-position: center;
		opacity: 0.6; /* Adjust opacity for a subtle overlay */
		z-index: 1; /* Ensure it appears behind content */
	}

	/* Tarot Page Content */
	.tarot-content {
		text-align: center;
		margin-top: 1rem;
		z-index: 2; /* Ensure content is above background gradient */
		color: white;
	}

	.title {
		font-size: 3rem;
		color: #dbf77e;
		font-family: 'Montserrat', sans-serif;
		margin-bottom: 0.5rem; /* Reduce margin to move the content upwards */
	}

	.sub-title {
		font-size: 1.5rem;
		margin-top: 0.5rem;
		margin-bottom: 2rem; /* Adjust margin for better spacing */
	}

	/* Tarot Cards Section */
	.tarot-cards {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		margin-top: 1.5rem;
		z-index: 2;
	}

	.tarot-card {
		background: rgba(0, 0, 0, 0.7);
		border-radius: 10px;
		padding: 1.5rem 1rem; /* Adjust padding to move content upwards */
		text-align: center;
		color: white;
		width: 200px;
		height: 280px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start; /* Align content towards the top */
	}

	.tarot-card h3 {
		margin-top: 1rem;
		font-size: 1.4rem;
		margin-bottom: 0.5rem; /* Reduce bottom margin for compact look */
	}

	.tarot-card p {
		margin-top: 0.2rem; /* Adjust top margin for tighter alignment */
	}

	.card-image {
		max-width: 40px;
		max-height: 40px;
		margin-bottom: 1rem; /* Adjust margin for better spacing */
	}

	/* Card of the Day Button */
	.card-of-day-btn {
		margin-top: 2rem;
		padding: 1rem 2rem;
		background-color: #dbf77e;
		color: black;
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		border-radius: 8px;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.card-of-day-btn:hover {
		background-color: #c7e96b;
	}
</style>
