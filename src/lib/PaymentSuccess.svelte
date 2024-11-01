<script>
	import { navigate } from 'svelte-routing';
	import NavBarLoggedIn from './NavBarLoggedIn.svelte';

	function goToExplorer() {
		navigate('/explorer'); // Adjust this path as needed for the feature access page
	}
</script>

<NavBarLoggedIn />

<div class="success-page">
	<div class="success-card">
		<h1>Thank you for your purchase!</h1>
		<p>Try to use our HOROSCAPE EXPLORER now!</p>
		<button class="try-now-btn" on:click={goToExplorer}>Try now</button>
	</div>
</div>

<style>
	.success-page {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80vh;
		background-color: black;
	}

	.success-card {
		background: rgba(79, 79, 79, 0.8);
		padding: 2rem;
		border-radius: 15px;
		text-align: center;
		color: #dbf77e;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
		max-width: 400px;
		width: 100%;
	}

	.success-card h1 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}

	.success-card p {
		font-size: 1rem;
		margin-bottom: 1.5rem;
		color: #bfbfbf;
	}

	.try-now-btn {
		background: none;
		border: 2px solid #dbf77e;
		padding: 0.7rem 2rem;
		color: #dbf77e;
		border-radius: 10px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
		box-shadow: 0 0 10px rgba(219, 247, 126, 0.6), 0 0 20px rgba(219, 247, 126, 0.4);
	}

	.try-now-btn:hover {
		background-color: #dbf77e;
		color: black;
		box-shadow: 0 0 15px rgba(219, 247, 126, 0.8), 0 0 25px rgba(219, 247, 126, 0.6);
	}
</style>
