<script>
	import { isAuthenticated } from '../lib/stores.js';
	import { onMount } from 'svelte';
	import NavBarLoggedIn from './NavBarLoggedIn.svelte';
	import NavBarLoggedOut from './NavBar.svelte';
	import HeroSection from './HeroSection.svelte';
	import BlogSection from './BlogSection.svelte';
	import MembershipSection from './MembershipSection.svelte';

	let isLoggedIn;

	onMount(() => {
		isAuthenticated.subscribe(value => {
			isLoggedIn = value;
		});
	});
</script>

<main>
	{#if isLoggedIn}
		<NavBarLoggedIn />
	{:else}
		<NavBarLoggedOut />
	{/if}
	<HeroSection />
	<BlogSection />
	<MembershipSection />
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
