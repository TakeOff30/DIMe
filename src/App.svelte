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
	import { user, userData, userPosts } from './stores/userStore';
	import { db, auth } from './firebase';
	import Nav from './components/Nav.svelte';
	import './styles/general.sass';

	let routes;
	let isOnLogin = true;

	onAuthStateChanged(
		auth,
		async (u) => {
			if (u) {
				getUserData(u);
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
						posts: $userPosts,
					},
				}),
				'/searchPage': SearchPage,

				'*': NotFound,
			};
		});
	};
</script>

<body>
	{#if $user}
		<header>
			<h1>DIM<b>e</b></h1>
			<button
				class="log-button"
				on:click={() => {
					auth.signOut();
				}}>Logout</button
			>
		</header>
		<main>
			<Router {routes} />
			<Nav />
		</main>
	{:else if isOnLogin}
		<button
			class="log-sign-toggle"
			on:click={() => {
				isOnLogin = !isOnLogin;
			}}>Go to signup</button
		>
		<Login />
	{:else}
		<button
			class="log-sign-toggle"
			on:click={() => {
				isOnLogin = !isOnLogin;
			}}>Go to login</button
		>
		<Signup />
	{/if}
</body>

<style lang="sass">

	@use './styles/variables'

	
	header 
		padding: 1em
		display: flex
		justify-content: space-between
		align-items: center
	
	main
		margin-bottom: 30%
	
	.log-sign-toggle 
		position: fixed
		top: 1em
		right: 1em

</style>
