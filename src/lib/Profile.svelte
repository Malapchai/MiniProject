<script>
	import NavBarLoggedIn from './NavBarLoggedIn.svelte';
	import { isAuthenticated } from '../lib/stores.js';
	import { navigate } from 'svelte-routing';
	import { onMount } from 'svelte';

	let userProfile = {};
	let errorMessage = '';
	let currentPage = 'profile';
	let userLoggedIn = false;

	// Subscribe to the authentication store to get the logged-in status
	isAuthenticated.subscribe((value) => {
		userLoggedIn = value;
	});

	onMount(async () => {
		if (!userLoggedIn) {
			navigate('/login');
		} else {
			await fetchProfileData(); // Fetch profile data if user is logged in
		}
	});

	async function fetchProfileData() {
		try {
			const token = localStorage.getItem('authToken');
			console.log('Auth token in request:', token);
			if (!token) {
				errorMessage = 'Please log in to access this page.';
				navigate('/login');
				return;
			}

			console.log('Auth token:', token); // Debugging line to check the token

			const response = await fetch('http://localhost:3000/api/profile', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`, // Confirm this format
					'Content-Type': 'application/json'
				}
			});

			if (response.status === 403) {
				console.error('Forbidden - You may not have access to this resource.');
				errorMessage = 'You are not authorized to access this profile.';
				return; // Stop further execution
			} else if (!response.ok) {
				console.error(`Error: ${response.statusText}`);
				errorMessage = 'Error fetching profile data';
				return;
			}

			const data = await response.json();
			if (data) {
				userProfile.username = data.username;
				userProfile.birthdate = data.birthdate;
				userProfile.email = data.email;
				userProfile.package = data.package || 'HOROSCAPE FREE';
				userProfile.isGoogleAccount = data.isGoogleAccount;
			}
		} catch (error) {
			console.error('Error fetching profile data:', error);
			errorMessage = 'Error fetching profile data';
		}
	}

	// Handle tab change
	function changeTab(tab) {
		currentPage = tab;
	}

	// Logout function
	function handleLogout() {
		localStorage.removeItem('authToken');
		isAuthenticated.set(false);
		navigate('/');
	}
</script>

<NavBarLoggedIn />

<div class="profile-page">
	<div class="sidebar">
		<ul class="profile-links">
			<li>
				<a
					href="#"
					class={currentPage === 'profile' ? 'active' : ''}
					on:click={() => changeTab('profile')}>Profile</a
				>
			</li>
			<li>
				<a
					href="#"
					class={currentPage === 'membership' ? 'active' : ''}
					on:click={() => changeTab('membership')}>Membership</a
				>
			</li>
			<li>
				<a
					href="#"
					class={currentPage === 'history' ? 'active' : ''}
					on:click={() => changeTab('history')}>History</a
				>
			</li>
		</ul>
		<button on:click={handleLogout} class="logout-btn">Log Out</button>
	</div>

	<div class="profile-container">
		{#if currentPage === 'profile'}
			<h2 class="profile-title">Profile</h2>
			<div class="profile-info">
				<div class="profile-field">
					<label>Username :</label>
					<input type="text" value={userProfile.username || ''} readonly />
				</div>

				<div class="profile-field">
					<label>BirthDate :</label>
					<input type="text" value={userProfile.birthdate || ''} readonly />
				</div>

				<div class="profile-field">
					<label>Email :</label>
					<input type="text" value={userProfile.email || ''} readonly />
					{#if userProfile.isGoogleAccount}
						<p>(from Google Account)</p>
					{/if}
				</div>

				<div class="profile-field">
					<label>Package :</label>
					<input type="text" value={userProfile.package || 'HOROSCAPE FREE'} readonly />
				</div>
			</div>
		{/if}

		{#if currentPage === 'membership'}
			<h2 class="membership-title">Membership</h2>
			<div class="membership-card-container">
				<div class="membership-card">
					<span class="new-member-badge">New Member</span>
					<h3 class="membership-plan-title">HOROSCAPE Explorer</h3>
					<p class="membership-plan-subtitle">Premium Membership</p>
					<p class="membership-price">$7.99/month</p>
					<button class="subscribe-btn">Subscribe Now</button>
				</div>
			</div>
		{/if}

		{#if currentPage === 'history'}
			<h2 class="history-title">History</h2>
			<p>History content is under development...</p>
		{/if}

		{#if errorMessage}
			<p class="error-message">{errorMessage}</p>
		{/if}
	</div>
</div>

<style>
	/* Profile Page Layout */
	.profile-page {
		display: flex;
		height: 100vh;
		background-color: black;
		background-image: url('/src/assets/silk2.png');
		background-size: cover;
		background-position: center;
	}

	/* Sidebar Styling */
	.sidebar {
		width: 25%;
		padding: 2rem;
		background-color: rgba(0, 0, 0, 0.7);
		border-right: 1px solid #dbf77e;
	}

	.profile-links {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.profile-links li {
		margin-bottom: 2rem;
	}

	.profile-links a {
		color: #dbf77e;
		text-decoration: none;
		font-family: 'Montserrat', sans-serif;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
		display: block;
	}

	/* Active Sidebar Tab */
	.profile-links a.active {
		background-color: #dbf77e;
		color: black;
	}

	.profile-links a:hover {
		color: black;
		background-color: #c7e96b;
	}

	.profile-container {
		width: 75%;
		padding: 2rem;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		text-align: left;
		position: relative;
	}

	.profile-title,
	.membership-title,
	.history-title {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		color: #dbf77e;
		text-align: center;
	}

	.profile-info {
		margin: 0 auto;
		max-width: 600px;
		display: grid;
		gap: 1.5rem;
		background-color: rgba(255, 255, 255, 0.1);
		padding: 2rem;
		border-radius: 15px;
	}

	.profile-field {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.profile-field label {
		font-size: 1.2rem;
		flex: 1;
		color: #dbf77e;
		text-align: left;
	}

	.input-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 70%;
	}

	.profile-field input {
		flex: 1;
		padding: 0.5rem;
		border-radius: 10px;
		border: none;
		background-color: rgba(255, 255, 255, 0.2);
		color: white;
		text-align: left;
		font-size: 1.2rem;
	}

	.edit-icon {
		width: 20px;
		cursor: pointer;
	}

	/* Membership Card */
	.membership-card-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.membership-card {
		background: linear-gradient(145deg, #2e2e2e, #1a1a1a);
		border-radius: 15px;
		padding: 2rem;
		text-align: center;
		max-width: 300px;
		width: 100%;
		color: white;
		box-shadow:
			0 10px 20px rgba(0, 0, 0, 0.5),
			inset 0 1px 8px rgba(255, 255, 255, 0.1);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.membership-card:hover {
		transform: scale(1.05);
		box-shadow:
			0 15px 30px rgba(0, 0, 0, 0.6),
			inset 0 1px 12px rgba(255, 255, 255, 0.15);
	}

	.new-member-badge {
		position: absolute;
		top: -15px;
		right: 10px;
		background: linear-gradient(45deg, #dbf77e, #a8e063);
		color: black;
		padding: 0.4rem 1rem;
		border-radius: 5px;
		font-size: 0.9rem;
		font-weight: bold;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		text-transform: uppercase;
		opacity: 0;
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	.membership-card:hover .new-member-badge {
		opacity: 1;
		transform: scale(1.05);
	}
	.membership-plan-title {
		font-size: 1.8rem;
		margin: 1rem 0 0.5rem;
	}

	.membership-plan-subtitle {
		font-size: 1.2rem;
		color: #bfbfbf;
		margin-bottom: 1.5rem;
	}

	.membership-price {
		font-size: 2rem;
		color: #dbf77e;
		margin-bottom: 2rem;
	}

	.subscribe-btn {
		background: none;
		border: 2px solid #dbf77e;
		padding: 0.7rem 2rem;
		color: #dbf77e;
		border-radius: 10px;
		font-size: 1.1rem;
		cursor: pointer;
		transition:
			background-color 0.3s,
			color 0.3s,
			box-shadow 0.3s;
		box-shadow:
			0 0 10px rgba(219, 247, 126, 0.6),
			0 0 20px rgba(219, 247, 126, 0.4);
	}

	.subscribe-btn:hover {
		background-color: #dbf77e;
		color: black;
		box-shadow:
			0 0 15px rgba(219, 247, 126, 0.8),
			0 0 25px rgba(219, 247, 126, 0.6);
	}

	.logout-btn {
		margin-top: 1rem;
		padding: 0.7rem 1.5rem;
		background-color: #dbf77e;
		color: black;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.3s;
	}

	.logout-btn:hover {
		background-color: #c7e96b;
	}
</style>
