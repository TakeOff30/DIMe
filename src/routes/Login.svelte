<script>
	export let user;
	export let app;
	let email = '';
	let password = '';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

	const login = () => {
		const auth = getAuth(app);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				user = userCredentials.user;
				console.log(user);
			})
			.catch((error) => {
				console.log('error');
			});
	};
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
	<button on:click={login}>Login</button>
</form>

<style>
</style>
