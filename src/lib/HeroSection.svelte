<!-- HeroSection.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function handleJoinNowClick() {
        dispatch('joinNow'); // Dispatch the event when the button is clicked
    }
</script>

<section class="hero">
	<img src="src/assets/silk.png" alt="Background Overlay" class="background-image" />
	<div class="content">
        <h1>Welcome to...</h1>
		<img src="./src/assets/Logo.png" alt="HOROSCAPE Logo" class="hero-logo" />
		<p class="hero-description">Let Tarot And Chi-Chi Sticks guide you through the big and small things in life</p>
		<button class="join-btn" on:click={handleJoinNowClick}>Join Now</button>
	</div>
</section>

<style>
	.hero {
		position: relative;
		background-color: #000;
		color: white;
		overflow: hidden;
		height: 80vh; /* Full screen height */
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.background-image {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 120%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
		opacity: 0.7;
	}

	.content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.hero-logo {
		width: 85%; /* Adjust width as needed */
		max-width: 1000px;
		height: auto;
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: 2.5rem;
		color: white;
		margin-bottom: 0rem;
	}

	.hero-description {
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}

	.join-btn {
		background: linear-gradient(to right, #b8ffb8, #ffadad);
		border: none;
		padding: 1rem 2rem;
		color: black;
		font-size: 1.2rem;
		border-radius: 30px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.join-btn:hover {
		background: linear-gradient(to right, #a3ffac, #ff9999);
	}
</style>
