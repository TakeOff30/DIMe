<script>
	import { Firebase } from '../firebase';

	let formUserInfo = {
		email: '',
		username: '',
		password: '',
		bio: '',
	};
</script>

<form>
	<span>
		<label for="email">Email: </label>
		<input
			bind:value={formUserInfo.email}
			name="email"
		/>
	</span>
	<span>
		<label for="username">Username: </label>
		<input
			bind:value={formUserInfo.username}
			name="username"
		/>
	</span>
	<span>
		<label for="bio">Bio: </label>
		<input
			bind:value={formUserInfo.bio}
			name="bio"
		/>
	</span>
	<span>
		<label for="password">Password: </label>
		<input
			bind:value={formUserInfo.password}
			name="password"
		/>
	</span>
	<span>
		<label for="confirm">Confirm password: </label>
		<input name="confirm" />
	</span>
	<button
		on:click={(event) => {
			event.preventDefault();
			Firebase.signup(formUserInfo);
		}}>Sign up</button
	>
</form>
