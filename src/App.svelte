<script lang="ts">
	import Router from 'svelte-spa-router';
	import Home from './routes/Home.svelte';
	import Profile from './routes/Profile.svelte';
	import SearchPage from './routes/SearchPage.svelte';
	import NotFound from './routes/NotFound.svelte';
	import Login from './routes/Login.svelte';

	let routes = {
		'/': Home,
		'/profile': Profile,
		'/searchPage': SearchPage,
		'*': NotFound,
	};

	let user;
</script>

{#if user}
	<nav>
		<a href="#/">Home</a>
		<a href="#/profile">Profile</a>
		<a href="#/searchPage">Search</a>
	</nav>

	<main>
		<Router {routes} />
	</main>
{:else}
	<Login {user} />
{/if}

<style>
</style>
