<script lang="ts">
	import Router from 'svelte-spa-router';
	import Home from './routes/Home.svelte';
	import Profile from './routes/Profile.svelte';
	import SearchPage from './routes/SearchPage.svelte';
	import NotFound from './routes/NotFound.svelte';
	import Login from './routes/Login.svelte';
	import Signup from './routes/Signup.svelte';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { getFirestore } from 'firebase/firestore';
	import { initializeApp } from 'firebase/app';

	const firebaseConfig = {
		apiKey: 'AIzaSyDvqx6aavkZ95vai95O19wu9tg3wCLFGtc',
		authDomain: 'dime-20745.firebaseapp.com',
		projectId: 'dime-20745',
		storageBucket: 'dime-20745.appspot.com',
		messagingSenderId: '1005405323846',
		appId: '1:1005405323846:web:9eb6070bbe1c1d2e5c8047',
	};

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const db = getFirestore(app);

	let routes = {
		'/': Home,
		'/profile/:user': Profile,
		'/searchPage': SearchPage,
		'*': NotFound,
	};

	let isOnLogin = true;

	let user = null;

	onAuthStateChanged(auth, (u) => {
		if (u) {
			console.log('logged');
			console.log(u);
			user = u;
		} else {
			user = null;
		}
	});
</script>

{#if user}
	<main>
		<Router {routes} />
	</main>
	<nav>
		<a href="#/">Home</a>
		<a href={'#/profile/' + user}>Profile</a>
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
	<Login
		{user}
		{app}
	/>
{:else}
	<button
		on:click={() => {
			isOnLogin = !isOnLogin;
		}}>Go to login</button
	>
	<Signup
		{user}
		{app}
		{db}
	/>
{/if}

<style>
</style>
