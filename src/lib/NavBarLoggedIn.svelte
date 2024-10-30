<script>
	import { Link, navigate } from "svelte-routing"; // For navigation
	export let navLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'Tarot', path: '/tarot' },
		{ name: 'Chi-Chi Sticks', path: '/chichi' },
		{ name: 'About Us', path: '/about' }
	];

	// Function to navigate to the Profile page when Profile button is clicked
	function goToProfile() {
		navigate('/profile');
	}
</script>

<nav class="navbar">
	<!-- Left side: Logo -->
	<div class="logo">
		<Link to="/" class="logo-link">
			<img src='/src/assets/Logo.png' alt="Logo" class="logo-image" />
		</Link>
	</div>

	<!-- Navigation Links -->
	<div class="nav-links">
		{#each navLinks as link}
			<Link to={link.path} class="nav-link">{link.name}</Link>
		{/each}

		<!-- Replace Log In button with Profile button -->
		<button class="profile-btn" on:click={goToProfile}>Profile</button>
	</div>
</nav>

<style>
	/* Navbar container */
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: black;
		color: white;
		position: sticky;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	/* Left side logo */
	.logo {
		display: flex;
		align-items: center;
	}

	.logo-link {
		text-decoration: none;
	}

	.logo-image {
		height: 50px;
		cursor: pointer;
	}

	/* Right side navigation links and profile button */
	.nav-links {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	/* Individual navigation links */
	.nav-link {
		text-decoration: none;
		color: white;
		font-family: 'Montserrat', sans-serif;
		font-weight: 500;
		position: relative;
		padding: 0.5rem;
		transition: color 0.3s ease; /* Smooth transition for text color */
	}

	/* Ensure link remains white and adds hover effect */
	:global(.nav-link:link),
	:global(.nav-link:visited) {
		color: white;
		text-decoration: none;
	}

	:global(.nav-link:hover) {
		color: #DBF77E;
	}

	/* Profile button */
	.profile-btn {
		background-color: #DBF77E;
		color: black;
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		padding: 0.7rem 1.5rem;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s ease, transform 0.3s ease;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
		font-size: 1rem;
	}

	.profile-btn:hover {
		background-color: #C7E96B;
		transform: translateY(-2px);
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
	}
</style>
