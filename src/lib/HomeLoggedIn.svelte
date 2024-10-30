<script>
	import NavBarLoggedIn from './NavBarLoggedIn.svelte'// Your navigation bar component
	import HeroSection from './HeroSection.svelte';  // Your hero section component
	import BlogSection from './BlogSection.svelte';  // Your blog section component
	import MembershipSection from './MembershipSection.svelte';  // Your membership section component
</script>

<NavBarLoggedIn />
<HeroSection />
<BlogSection />
<MembershipSection />

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		border: none;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	* {
		box-sizing: inherit;
	}
</style>
