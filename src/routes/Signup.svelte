<script>
	import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
	import { doc, getDoc, setDoc } from 'firebase/firestore';

	export let user;
	export let app;
	export let db;

	let email = '';
	let username = '';
	let password = '';
	let bio = '';

	const signup = () => {
		const auth = getAuth(app);
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				return await setDoc(doc(db, 'users', userCredential.user.uid), {
					username: [username],
					bio: [bio],
					followers: 0,
					following: 0,
					email: [userCredential.user.email],
				}).then(async () => {
					const docRef = doc(db, 'users', userCredential.user.uid);
					user = await getDoc(docRef);
					console.log(user);
				});
			})
			.catch((error) => {
				console.log(error.code);
				console.log(error.message);
			});
	};
</script>

<form>
	<span>
		<label for="email">Email: </label>
		<input
			bind:value={email}
			name="email"
		/>
	</span>
	<span>
		<label for="username">Username: </label>
		<input
			bind:value={username}
			name="username"
		/>
	</span>
	<span>
		<label for="bio">Bio: </label>
		<input
			bind:value={bio}
			name="bio"
		/>
	</span>
	<span>
		<label for="password">Password: </label>
		<input
			bind:value={password}
			name="password"
		/>
	</span>
	<span>
		<label for="confirm">Confirm password: </label>
		<input name="confirm" />
	</span>
	<button on:click={signup}>Sign up</button>
</form>
