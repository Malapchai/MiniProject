<script>
	import { Router, Route } from 'svelte-routing';
	import { onMount } from 'svelte';
	import Home from './lib/Home.svelte';
	import Tarot from './lib/Tarot.svelte';
	import Chichi from './lib/Chichi.svelte';
	import Login from './lib/Login.svelte';
	import Signup from './lib/SignUp.svelte';
	import Profile from './lib/Profile.svelte';
	import CardOfTheDay from './lib/CardOfTheDay.svelte';
	import ThreeCardSpread from './lib/ThreeCardSpread.svelte';
	import FiveCardSpread from './lib/FiveCardSpread.svelte';
	import WatAPage from './lib/WatAPage.svelte';
	import WatBPage from './lib/WatBPage.svelte';
	import WatCPage from './lib/WatCPage.svelte';
	import AboutUs from './lib/AboutUs.svelte';
	import BlogDetail from './lib/BlogDetail.svelte';
	import BlogList from './lib/BlogList.svelte';
	import { isAuthenticated } from './lib/stores.js';

	onMount(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			isAuthenticated.set(true);
		}
	});

	// Redirect unauthenticated users trying to access protected routes
	function requireAuth(component) {
		return isAuthenticated ? component : Login;
	}
</script>

<Router>
	<Route path="/" component={Home} />
	<Route path="/login" component={Login} />
	<Route path="/signup" component={Signup} />
	<Route path="/profile" component={requireAuth(Profile)} />
	<Route path="/tarot" component={requireAuth(Tarot)} />
	<Route path="/chichi" component={requireAuth(Chichi)} />
	<Route path="/card-of-the-day" component={requireAuth(CardOfTheDay)} />
	<Route path="/three-card-spread" component={requireAuth(ThreeCardSpread)} />
	<Route path="/five-card-spread" component={requireAuth(FiveCardSpread)} />
	<Route path="/wat-page-a" component={requireAuth(WatAPage)} />
	<Route path="/wat-page-b" component={requireAuth(WatBPage)} />
	<Route path="/wat-page-c" component={requireAuth(WatCPage)} />
	<Route path="/about" component={AboutUs} />
	<Route path="/blog/:id" component={BlogDetail} />
	<Route path="/blogs" component={BlogList} />	
</Router>