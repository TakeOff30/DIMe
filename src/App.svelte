<script lang="ts">
	import Router from 'svelte-spa-router';
	import { wrap } from 'svelte-spa-router/wrap';
	import Home from './routes/Home.svelte';
	import Profile from './routes/Profile.svelte';
	import SearchPage from './routes/SearchPage.svelte';
	import NotFound from './routes/NotFound.svelte';
	import Login from './routes/Login.svelte';
	import Signup from './routes/Signup.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { doc, getDoc } from 'firebase/firestore';
	import { user, userData } from './stores/userStore';
	import { db, auth } from './firebase';

	let routes;
	let isOnLogin = true;
	console.log(routes);

	onAuthStateChanged(
		auth,
		async (u) => {
			if (u) {
				getUserData(u);
				console.log(routes);
			} else {
				$user = null;
			}
		},
		function (error) {
			console.error(error);
		}
	);

	const getUserData = async (u) => {
		const docRef = doc(db, 'users', u.uid);
		await getDoc(docRef).then((docSnap) => {
			$user = u;
			$userData = docSnap.data();
			routes = {
				'/': Home,
				'/profile': wrap({
					component: Profile,
					// Static props
					props: {
						user: $userData,
					},
				}),
				'/searchPage': SearchPage,

				'*': NotFound,
			};
		});
	};
</script>

{#if $user}
	<main>
		<Router {routes} />
	</main>
	<nav>
		<a href="#/">Home</a>
		<a href="#/profile">Profile</a>
		<a href="#/searchPage">Search</a>
	</nav>
	<button
		on:click={() => {
			auth.signOut();
		}}>Logout</button
	>
{:else if isOnLogin}
	<button
		on:click={() => {
			isOnLogin = !isOnLogin;
		}}>Go to signup</button
	>
	<Login />
{:else}
	<button
		on:click={() => {
			isOnLogin = !isOnLogin;
		}}>Go to login</button
	>
	<Signup />
{/if}

<style>
</style>
