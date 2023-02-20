<script>
	export let user;
	let email = '';
	let password = '';

	// Import the functions you need from the SDKs you need
	import { initializeApp } from 'firebase/app';
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries

	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: 'AIzaSyDvqx6aavkZ95vai95O19wu9tg3wCLFGtc',
		authDomain: 'dime-20745.firebaseapp.com',
		projectId: 'dime-20745',
		storageBucket: 'dime-20745.appspot.com',
		messagingSenderId: '1005405323846',
		appId: '1:1005405323846:web:9eb6070bbe1c1d2e5c8047',
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	const login = () => {
		const auth = getAuth(app);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
			})
			.catch((error) => {});
	};
</script>

<form>
	<span>
		<label>Email: </label>
		<input bind:value={email} />
	</span>
	<span>
		<label>password: </label>
		<input bind:value={password} />
	</span>
	<button on:click={login}>Login</button>
</form>

<style>
</style>
