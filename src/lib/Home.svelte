<script>
    import { isAuthenticated } from '../lib/stores.js';
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import NavBarLoggedIn from './NavBarLoggedIn.svelte';
    import NavBarLoggedOut from './NavBar.svelte';
    import HeroSection from './HeroSection.svelte';
    import BlogSection from './BlogSection.svelte';
    import MembershipSection from './MembershipSection.svelte';

    let isLoggedIn = false;

    // Subscribe to the authentication store to get the logged-in status
    onMount(() => {
        isAuthenticated.subscribe(value => {
            isLoggedIn = value;
            console.log("User is logged in:", isLoggedIn); // Debugging line
        });
    });

    // Function to handle "Join Now" button click in the HeroSection
    function handleJoinNow() {
        console.log("Join Now button clicked, isLoggedIn:", isLoggedIn); // Debugging line
        if (isLoggedIn) {
            navigate('/tarot'); // Redirect to tarot page if logged in
        } else {
            navigate('/login'); // Redirect to login page if not logged in
        }
    }

	function handleJoinMembership() {
        if (isLoggedIn) {
            navigate('/profile?tab=membership'); // Redirect to profile page with membership tab if logged in
        } else {
            navigate('/login'); // Redirect to login page if not logged in
        }
    }
</script>

<main>
	{#if isLoggedIn}
		<NavBarLoggedIn />
	{:else}
		<NavBarLoggedOut />
	{/if}
	<HeroSection on:joinNow={handleJoinNow} />
	<BlogSection />
	<MembershipSection on:joinMembership={handleJoinMembership} />
</main>


<style>
	/* Global resets and box-sizing */
	::before,
	::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	html,
	body {
		width: 100%;
		height: 100%;
		font-family: sans-serif;
	}
</style>
