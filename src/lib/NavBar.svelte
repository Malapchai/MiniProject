<script>
	// Import Link from svelte-routing
	import { Link } from "svelte-routing";

	// Accept a prop to control whether or not to show the nav links and login button
	export let showNavLinks = true;

	// Navigation links data
	export let navLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'Tarot', path: '/tarot' },
		{ name: 'Chi-Chi Sticks', path: '/chichi' },
		{ name: 'About Us', path: '/about' }
	];
</script>

<nav class="navbar">
	<!-- Left side: Logo -->
	<div class="logo">
		<Link to="/" class="logo-link">
			<img src='./src/assets/Logo.png' alt="Logo" class="logo-image" />
		</Link>
	</div>

	<!-- Conditionally display navigation links and login button if showNavLinks is true -->
	{#if showNavLinks}
		<div class="nav-links">
			{#each navLinks as link}
				<Link to={link.path} class="nav-link">{link.name}</Link>
			{/each}
			<Link to="/login">
				<button class="login">Log In</button>
			</Link>
		</div>
	{/if}
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

	/* Right side navigation links and login button */
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

	/* Fix for purple links and hover effect */
	:global(.nav-link:link),
	:global(.nav-link:visited) {
		color: white; /* Ensure link remains white */
		text-decoration: none;
	}

	/* Hover effect for text color and underline */
	:global(.nav-link:hover) {
		color: #DBF77E;
	}

	/* Login button */
	.login {
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

	/* Cool hover effect for the button */
	.login:hover {
		background-color: #C7E96B;
		transform: translateY(-2px);
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
	}
</style>