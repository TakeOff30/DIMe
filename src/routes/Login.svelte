<script>
	import { push } from 'svelte-spa-router';
	import { Firebase } from '../firebase';
	let email = '';
	let password = '';
</script>

<form>
	<span>
		<label for="email">Email: </label>
		<input bind:value={email} />
	</span>
	<span>
		<label for="password">password: </label>
		<input bind:value={password} />
	</span>
	<button
		on:click={(event) => {
			event.preventDefault();
			Firebase.login(email, password);
		}}>Login</button
	>
</form>

<style>
</style>
