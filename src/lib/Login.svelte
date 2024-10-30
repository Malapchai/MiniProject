<script>
	// Import necessary assets and modules
	import { Link } from 'svelte-routing';
	import logo from '/src/assets/Logo.png'; // Assuming the logo path is correct
	import googleIcon from '/src/assets/google-icon.png';
	import instagramIcon from '/src/assets/Instagram-icon.png';
	import facebookIcon from '/src/assets/facebook-icon.png';

	import { isAuthenticated, authToken } from '../lib/stores.js'; // Adjust the path to your store
	import { navigate } from 'svelte-routing';

	let email = '';
	let password = '';
	let errorMessage = '';

	// Form validation function
	function validateForm() {
		if (!email || !password) {
			errorMessage = 'Email and Password are required.';
			return false;
		}
		return true;
	}

	// Handle Login Logic
	async function handleLogin() {
		errorMessage = '';
		if (!validateForm()) return;

		try {
			const response = await fetch('http://localhost:3000/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			
			const data = await response.json();

			if (response.ok) {
				// Login successful
				isAuthenticated.set(true); // Update the authentication state
				authToken.set(data.token); // Store the token in Svelte store
				localStorage.setItem('authToken', data.token); // Save token in local storage for persistence
				navigate('/'); // Redirect to home or dashboard
			} else {
				errorMessage = data.message || 'Login failed. Please check your credentials.';
			}
		} catch (error) {
			errorMessage = 'An error occurred during login. Please try again later.';
		}
	}
</script>

<!-- Login Page Container -->
<div class="login-page">
	<!-- Logo Section -->
	<Link to="/">
		<img src={logo} alt="Logo" class="logo" />
	</Link>

	<!-- Login Form Container -->
	<div class="login-container">
		<h2>Login</h2>

		<form class="login-form" on:submit|preventDefault={handleLogin}>
			<!-- Email Input -->
			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email} placeholder="username@gmail.com" required />

			<!-- Password Input -->
			<label for="password">Password</label>
			<input type="password" id="password" bind:value={password} placeholder="Password" required />

			<!-- Forgot Password Link -->
			<a href="#" class="forgot-password">Forgot Password?</a>

			<!-- Submit Button -->
			<button type="submit" class="login-btn">Sign in</button>

			<!-- Display error message if any -->
			{#if errorMessage}
				<p class="error-message">{errorMessage}</p>
			{/if}

			<!-- Separator -->
			<p class="or-continue">or continue with</p>

			<!-- Social Login Buttons -->
			<div class="social-login">
				<button class="social-btn google-btn">
					<img src={googleIcon} alt="Google" />
				</button>
				<button class="social-btn instagram-btn">
					<img src={instagramIcon} alt="Instagram" />
				</button>
				<button class="social-btn facebook-btn">
					<img src={facebookIcon} alt="Facebook" />
				</button>
			</div>

			<!-- Sign-Up Redirect -->
			<p class="sign-up">
				Don't have an account yet? <Link to="/signup">Sign Up</Link>
			</p>
		</form>
	</div>
</div>

<style>
	/* General Styling Reset */
	html, body {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	/* Full-page Background */
	.login-page {
		position: relative;
		background-color: black;
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	/* Silk Overlay */
	.login-page::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('/src/assets/silk.png');
		background-size: cover;
		background-position: center;
		opacity: 0.3;
		z-index: 1;
	}

	/* Logo Styling */
	.logo {
		width: 150px;
		margin-bottom: 1.5rem;
		position: relative;
		z-index: 2;
		cursor: pointer;
	}

	/* Login Container Styling */
	.login-container {
		position: relative;
		background: linear-gradient(135deg, #1b1b1b, #333);
		padding: 3rem;
		border-radius: 20px;
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
		z-index: 2;
		text-align: center;
		color: white;
		width: 90%;
		max-width: 400px;
	}

	/* Input Styling */
	.login-form label {
		display: block;
		margin-bottom: 0.5rem;
		color: white;
		text-align: left;
		font-size: 0.9rem;
	}

	.login-form input {
		width: 100%;
		padding: 0.8rem;
		margin-bottom: 0.8rem;
		border: none;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.2);
		color: white;
	}

	/* Placeholder Color */
	.login-form input::placeholder {
		color: #ddd;
	}

	/* Forgot Password Link */
	.forgot-password {
		display: block;
		text-align: left;
		margin-bottom: 1rem;
		font-size: 0.8rem;
		color: #dbf77e;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.forgot-password:hover {
		color: #c7e96b;
	}

	/* Error Message Styling */
	.error-message {
		color: #ff6363;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}

	/* Button Styling */
	.login-btn {
		width: 100%;
		background-color: #dbf77e;
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

	.login-btn:hover {
		background-color: #c7e96b;
		transform: translateY(-2px);
	}

	/* Social Login Section */
	.or-continue {
		margin: 1.5rem 0;
		font-size: 0.9rem;
	}

	.social-login {
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

	/* Sign-Up Link Styling */
	.sign-up {
		margin-top: 1.5rem;
		font-size: 0.9rem;
	}

	:global(.sign-up a) {
		color: #dbf77e !important;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	:global(.sign-up a:hover) {
		color: #c7e96b !important;
	}
</style>