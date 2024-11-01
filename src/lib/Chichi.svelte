<script>
	import NavBarLoggedIn from './NavBarLoggedIn.svelte'; // Import the logged-in NavBar
	import { navigate } from 'svelte-routing'; // Navigation
	import { onMount } from 'svelte'; // Lifecycle hook
	import { isAuthenticated } from '../lib/stores.js';

	// Function to navigate to specific Chi-Chi Stick pages
	function goToChiChiStick(page) {
		navigate(page);
	}

	onMount(() => {
        let loggedIn;
        isAuthenticated.subscribe(value => loggedIn = value);

        // If not authenticated, navigate to login page
        if (!loggedIn) {
            navigate('/login');
        }
    });
</script>

<NavBarLoggedIn />
<div class="chichi-page">
	<!-- Chi-Chi Page Content -->
	<div class="chichi-content">
		<!-- Main Title -->
		<h1 class="title">Chi-Chi Sticks</h1>
		<!-- Sub-title -->
		<p class="sub-title">Discover What's Your Mind Saying...</p>

		<!-- Chi-Chi Cards Section -->
		<div class="chichi-cards">
			<!-- Chi-Chi Card 1 -->
			<button class="chichi-card" on:click={() => goToChiChiStick('/wat-page-a')}>
				<div class="card-image-container">
					<img src="/src/assets/wadA.png" alt="Wat Ra Kung" class="card-image" />
					<h3 class="card-text">วัดระฆังโฆสิตาราม วรมหาวิหาร</h3>
				</div>
			</button>

			<!-- Chi-Chi Card 2 -->
			<button class="chichi-card" on:click={() => goToChiChiStick('/wat-page-b')}>
				<div class="card-image-container">
					<img src="/src/assets/wadB.png" alt="SarnJaoPor" class="card-image" />
					<h3 class="card-text">ศาลเจ้าพ่อหลักเมือง กรุงเทพฯ</h3>
				</div>
			</button>

			<!-- Chi-Chi Card 3 -->
			<button class="chichi-card" on:click={() => goToChiChiStick('/wat-page-c')}>
				<div class="card-image-container">
					<img src="/src/assets/wadC.png" alt="Wat Kal" class="card-image" />
					<h3 class="card-text">วัดกัลยาณมิตรวรมหาวิหาร</h3>
				</div>
			</button>
		</div>
	</div>
</div>

<style>
	/* Chi-Chi page background with black and silk2.png gradient at the top */
	.chichi-page {
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

	.chichi-page::before {
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

	/* Chi-Chi Page Content */
	.chichi-content {
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

	/* Chi-Chi Cards Section */
	.chichi-cards {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-top: 1.5rem;
		z-index: 2;
	}

	.chichi-card {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		position: relative;
		width: 220px;
		height: 320px;
	}

	.card-image-container {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.5);
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 12px;
		transition: transform 0.3s ease-in-out;
	}

	/* Text overlay at the bottom of the image */
	.card-text {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
		color: white;
		font-size: 1.2rem;
		font-family: 'Cormorant', serif;
		font-weight: bold;
		text-align: center;
		width: 100%;
		padding: 0.5rem 0;
		border-radius: 0 0 12px 12px; /* Rounded corners for bottom */
	}
</style>
