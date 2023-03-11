<script>
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '../firebase';
	let email = '';
	let password = '';

	const login = () => {
		signInWithEmailAndPassword(auth, email, password).catch((error) => {
			console.log(error);
		});
	};
</script>

<div>
	<span>
		<label for="email">Email: </label>
		<input bind:value={email} />
	</span>
	<span>
		<label for="password">password: </label>
		<input bind:value={password} />
	</span>
	<button on:click={login}>Login</button>
</div>

<style>
</style>
