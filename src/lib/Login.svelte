<script>
	import { Link } from 'svelte-routing';
	import logo from '/src/assets/Logo.png';
	import googleIcon from '/src/assets/google-icon.png';
	import instagramIcon from '/src/assets/Instagram-icon.png';
	import facebookIcon from '/src/assets/facebook-icon.png';

	import { isAuthenticated, authToken } from '../lib/stores.js';
	import { navigate } from 'svelte-routing';
	import { onMount } from 'svelte';

	let google;
	let email = '';
	let password = '';
	let errorMessage = '';
	const GOOGLE_CLIENT_ID = '157935331614-4ou1p1gpiue91v4oh06rgn1a3dbm2s67.apps.googleusercontent.com';

	// Google Sign-In initialization
	onMount(() => {
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);

		script.onload = () => {
			// Ensure `google` is accessible globally
			// @ts-ignore
			if (window.google && window.google.accounts) {
				// @ts-ignore
				google = window.google;
				google.accounts.id.initialize({
					client_id: GOOGLE_CLIENT_ID,
					callback: handleCredentialResponse
				});
			} else {
				console.error('Google API did not load correctly');
			}
		};
	});

	// Handle Google Sign-In response
	function handleCredentialResponse(response) {
		console.log('Encoded JWT ID token: ' + response.credential);
		authToken.set(response.credential);
		isAuthenticated.set(true);
		localStorage.setItem('authToken', response.credential);
		navigate('/');
	}

	// Trigger Google Sign-In when Google logo button is clicked
	function triggerGoogleSignIn() {
		// Check if `google` and `google.accounts` are available
		if (google && google.accounts && google.accounts.id) {
			google.accounts.id.prompt();
		} else {
			console.error('Google API not loaded yet. Please try again later.');
		}
	}

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
				isAuthenticated.set(true);
				authToken.set(data.token);
				localStorage.setItem('authToken', data.token);
				navigate('/');
			} else {
				errorMessage = data.message || 'Login failed. Please check your credentials.';
			}
		} catch (error) {
			errorMessage = 'An error occurred during login. Please try again later.';
		}
	}
</script>

<div class="login-page">
	<Link to="/">
		<img src={logo} alt="Logo" class="logo" />
	</Link>

	<div class="login-container">
		<h2>Login</h2>

		<form class="login-form" on:submit|preventDefault={handleLogin}>
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				placeholder="username@gmail.com"
				required
			/>

			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				bind:value={password}
				placeholder="Password"
				required
			/>

			<a href="#" class="forgot-password">Forgot Password?</a>
			<button type="submit" class="login-btn">Sign in</button>

			{#if errorMessage}
				<p class="error-message">{errorMessage}</p>
			{/if}

			<p class="or-continue">or continue with</p>

			<div class="social-login">
				<button class="social-btn google-btn" on:click={triggerGoogleSignIn}>
					<img src={googleIcon} alt="Google" />
				</button>
				<button class="social-btn instagram-btn">
					<img src={instagramIcon} alt="Instagram" />
				</button>
				<button class="social-btn facebook-btn">
					<img src={facebookIcon} alt="Facebook" />
				</button>
			</div>

			<p class="sign-up">
				Don't have an account yet? <Link to="/signup">Sign Up</Link>
			</p>
		</form>
	</div>
</div>

<style>
	/* General Styling Reset */
	html,
	body {
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
		transition:
			background-color 0.3s ease,
			transform 0.3s ease;
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
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
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
