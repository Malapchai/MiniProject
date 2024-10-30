<script>
	import NavBarLoggedIn from './NavBarLoggedIn.svelte';
	import { onMount } from 'svelte';
	import { fetchRandomChiChiB } from '../services/chichiService'; // Service to fetch random Chi-Chi from A collection
	import { downloadResultAsImage } from '../utils/downloadUtils'; // Function to download as image

	let chiChiData = null;
	let loading = true;
	let showDownloadButton = false;
	let displayImage = '/src/assets/chi.png'; // Default image before fetching result

	// Function to fetch a random Chi-Chi stick from Wat A's database
	async function fetchChiChiData() {
		loading = true;
		chiChiData = await fetchRandomChiChiB();
		if (chiChiData && chiChiData.image) {
			displayImage = chiChiData.image; // Update to the fetched image after "Shake It!"
		}
		loading = false;
		showDownloadButton = !!chiChiData; // Show download button only if data is fetched
	}

	// Function to handle the download of the result
	function handleDownload() {
		if (chiChiData && chiChiData.image) {
			// Provide the image path and set `true` for ChiChi
			downloadResultAsImage(chiChiData.image, true);
		}
	}
</script>

<NavBarLoggedIn />

<div class="wat-page">
	<div class="wat-content">
		<!-- Main content section -->
		<h1 class="title">ศาลเจ้าพ่อหลักเมือง กรุงเทพฯ</h1>

		<!-- Image to display, updates after "Shake It!" -->
		<div class="chi-chi-card">
			<img src={displayImage} alt="Chi-Chi Stick" class="chi-chi-image" />
		</div>

		<!-- Shake It Button to fetch result -->
		<button class="shake-btn" on:click={fetchChiChiData}> Shake It! </button>

		<!-- Show download button after the result is available -->
		{#if showDownloadButton}
			<button class="download-btn" on:click={handleDownload}> Download Result </button>
		{/if}
	</div>
</div>

<style>
	/* Styles for Wat Page */
	.wat-page {
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

	.wat-page::before {
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

	.wat-content {
		text-align: center;
		margin-top: 2rem;
		z-index: 2;
		color: white;
	}

	.title {
		font-size: 2.5rem;
		color: #dbf77e;
		font-family: 'Kanit', sans-serif;
	}

	.chi-chi-card {
		background: rgba(0, 0, 0, 0.7);
		border-radius: 15px;
		padding: 1.5rem;
		text-align: center;
		color: white;
		max-width: 500px;
		margin: 2rem auto;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
	}

	.chi-chi-image {
		width: 400px;
		height: 400px;
		object-fit: contain;
		margin-bottom: 1rem;
	}

	.shake-btn,
	.download-btn {
		background-color: transparent;
		color: #dbf77e;
		padding: 0.8rem 2rem;
		border-radius: 8px;
		cursor: pointer;
		margin: 1rem;
		border: 2px solid #dbf77e; /* Updated to have a border */
		font-family: 'Montserrat', sans-serif;
		font-size: 1.1rem; /* Slightly increased font size */
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}

	.shake-btn:hover,
	.download-btn:hover {
		background-color: #dbf77e;
		color: black;
		border-color: #dbf77e;
	}
</style>
