<script>
	import { push } from 'svelte-spa-router';
	import { Firebase } from '../firebase';
	let email = '';
	let password = '';
</script>

<form>
	<span>
		<label for="email">Email: </label>
		<input
			bind:value={email}
			type="email"
		/>
	</span>
	<span>
		<label for="password">Password: </label>
		<input
			bind:value={password}
			type="password"
		/>
	</span>
	<button
		on:click={(event) => {
			event.preventDefault();
			Firebase.login(email, password);
		}}>Login</button
	>
</form>

<style lang="sass">
	form
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		gap: 5em
	span
		display: flex
		align-items: center
		gap: 1em
</style>
