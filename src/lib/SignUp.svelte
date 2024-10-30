<script>
	import { Link } from 'svelte-routing'; // For navigation
	import logo from '/src/assets/Logo.png'; // Logo path
	import googleIcon from '/src/assets/google-icon.png'; // Correct path for Google icon
	import instagramIcon from '/src/assets/Instagram-icon.png';
	import facebookIcon from '/src/assets/facebook-icon.png';

	let username = '';
	let birthDay = '';
	let birthMonth = '';
	let birthYear = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';

	function handleSignUp() {
		// Combine the day, month, and year into a single date string or Date object
		const birthDate = `${birthYear}-${birthMonth}-${birthDay}`; // Format as YYYY-MM-DD

		// Basic form validation
		if (!username || !birthDate || !email || !password || !confirmPassword) {
			errorMessage = 'All fields are required.';
			return;
		}

		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match.';
			return;
		}

		// Implement sign-up logic here
		console.log('Sign-up details:', { username, birthDate, email, password });
		// Reset error message if sign-up is successful
		errorMessage = '';
	}

	// Generate options for day, month, and year
	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	const months = [
		{ value: '01', name: 'January' },
		{ value: '02', name: 'February' },
		{ value: '03', name: 'March' },
		{ value: '04', name: 'April' },
		{ value: '05', name: 'May' },
		{ value: '06', name: 'June' },
		{ value: '07', name: 'July' },
		{ value: '08', name: 'August' },
		{ value: '09', name: 'September' },
		{ value: '10', name: 'October' },
		{ value: '11', name: 'November' },
		{ value: '12', name: 'December' },
	];
	const currentYear = new Date().getFullYear();
	const years = [];
	for (let y = currentYear; y >= 1900; y--) {
		years.push(y);
	}
</script>

<div class="sign-up-page">
	<!-- Enlarged Logo -->
	<Link to="/">
		<img src={logo} alt="Logo" class="logo" />
	</Link>

	<!-- Sign-up form container -->
	<div class="sign-up-container">
		<h2>Sign Up</h2>

		<form class="sign-up-form" on:submit|preventDefault={handleSignUp}>
			<label for="username">Username</label>
			<input type="text" id="username" bind:value={username} placeholder="Username" required />

			<!-- BirthDate Selectors -->
			<label>BirthDate</label>
			<div class="birthdate-selectors">
				<select bind:value={birthDay} required>
					<option value="" disabled selected>Day</option>
					{#each days as day}
						<option value={day < 10 ? `0${day}` : day}>{day}</option>
					{/each}
				</select>

				<select bind:value={birthMonth} required>
					<option value="" disabled selected>Month</option>
					{#each months as month}
						<option value={month.value}>{month.name}</option>
					{/each}
				</select>

				<select bind:value={birthYear} required>
					<option value="" disabled selected>Year</option>
					{#each years as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>

			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email} placeholder="username@gmail.com" required />

			<label for="password">Password</label>
			<input type="password" id="password" bind:value={password} placeholder="Password" required />

			<label for="confirmPassword">Confirm Password</label>
			<input type="password" id="confirmPassword" bind:value={confirmPassword} placeholder="Confirm Password" required />

			<!-- Display error message if any -->
			{#if errorMessage}
				<p class="error-message">{errorMessage}</p>
			{/if}

			<button type="submit" class="sign-up-btn">Sign up</button>

			<p class="or-continue">or continue with</p>

			<!-- Social sign-up buttons with icons -->
			<div class="social-sign-up">
				<button type="button" class="social-btn google-btn">
					<img src={googleIcon} alt="Google" />
				</button>
				<button type="button" class="social-btn instagram-btn">
					<img src={instagramIcon} alt="Instagram" />
				</button>
				<button type="button" class="social-btn facebook-btn">
					<img src={facebookIcon} alt="Facebook" />
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	/* Full page background */
	.sign-up-page {
		position: relative;
		background-color: black;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	/* Silk overlay on top of the black background */
	.sign-up-page::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('./src/assets/silk.png');
		background-size: cover;
		background-position: center;
		opacity: 0.3;
		z-index: 1;
	}

	/* Enlarged logo */
	.logo {
		width: 200px; /* Increased size */
		margin-bottom: 1.5rem;
		position: relative;
		z-index: 2;
		cursor: pointer;
	}

	/* Sign-up form container */
	.sign-up-container {
		position: relative;
		background: linear-gradient(135deg, #1b1b1b, #333);
		padding: 2rem;
		border-radius: 20px;
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
		z-index: 2;
		text-align: center;
		color: white;
		width: 90%;
		max-width: 400px;
	}

	/* Form elements */
	.sign-up-form label {
		display: block;
		margin-bottom: 0.5rem;
		color: white;
		text-align: left;
		font-size: 0.9rem;
	}

	.sign-up-form input,
	.sign-up-form select {
		width: 100%;
		padding: 0.8rem;
		margin-bottom: 0.8rem;
		border: none;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	.sign-up-form input::placeholder,
	.sign-up-form select {
		color: #ddd;
	}

	/* Adjust birthdate-selectors styling */
	.birthdate-selectors {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.8rem;
	}

	.birthdate-selectors select {
		flex: 1;
		padding: 0.8rem;
		border: none;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.2);
		color: white;
		appearance: none; /* Remove default arrow in some browsers */
	}

	.birthdate-selectors select option {
		background-color: #1b1b1b;
		color: white;
	}

	.sign-up-btn {
		width: 100%;
		background-color: #DBF77E;
		color: black;
		font-weight: 600;
		padding: 0.8rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		margin-top: 1rem;
		transition: background-color 0.3s ease, transform 0.3s ease;
	}

	.sign-up-btn:hover {
		background-color: #C7E96B;
		transform: translateY(-2px);
	}

	.or-continue {
		margin: 1.5rem 0;
		font-size: 0.9rem;
	}

	/* Social sign-up buttons */
	.social-sign-up {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.social-btn {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.social-btn img {
		width: 32px;
		height: 32px;
	}

	.social-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
	}

	/* Error Message Styling */
	.error-message {
		color: #ff6363;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}
</style>