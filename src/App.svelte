<script lang="ts">
	import Router from 'svelte-spa-router';
	import Home from './routes/Home.svelte';
	import Profile from './routes/Profile.svelte';
	import SearchPage from './routes/SearchPage.svelte';
	import NotFound from './routes/NotFound.svelte';
	import Login from './routes/Login.svelte';
	import Signup from './routes/Signup.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import {
		collection,
		doc,
		getDoc,
		onSnapshot,
		query,
		where,
	} from 'firebase/firestore';
	import { user, userData, userPosts } from './stores/userStore';
	import { db, auth, Firebase } from './firebase';
	import Nav from './components/Nav.svelte';
	import './styles/general.sass';
	let isOnLogin = true;

	onAuthStateChanged(
		auth,
		async (u) => {
			if (u) {
				onSnapshot(doc(db, 'users', u.uid), (snapShot) => {
					$userData = snapShot.data();
				});
				onSnapshot(
					query(collection(db, 'posts'), where('uid', '==', u.uid)),
					() => {
						Firebase.getPosts(u).then((res) => {
							$user = u;
							$userPosts = res;
						});
					}
				);
			} else {
				$user = null;
			}
		},
		function (error) {
			console.error(error);
		}
	);
	let routes = {
		'/': Home,
		'/profile': Profile,
		'/searchPage': SearchPage,
		'*': NotFound,
	};
</script>

<body>
	{#if $user}
		<header>
			<h1>DIM<b>e</b></h1>
			<button
				class="log-button"
				on:click={() => {
					console.log('ciao');
					auth.signOut();
				}}>Logout</button
			>
		</header>
		<main>
			<Router {routes} />
			<Nav />
		</main>
	{:else}
		<header>
			<h1>DIM<b>e</b></h1>
		</header>
		<div>
			<h2>Don't ignore m<b>e</b></h2>
			{#if isOnLogin}
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
		</div>
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
	div
		display: flex
		align-items: center
		flex-direction: column
		gap: 3em
		margin-top: 2em
</style>
