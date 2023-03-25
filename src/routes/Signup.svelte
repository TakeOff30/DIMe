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
			type="email"
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
		<textarea
			bind:value={formUserInfo.bio}
			name="bio"
		/>
	</span>
	<span>
		<label for="password">Password: </label>
		<input
			bind:value={formUserInfo.password}
			name="password"
			type="password"
		/>
	</span>
	<span>
		<label for="confirm">Confirm password: </label>
		<input
			name="confirm"
			type="password"
		/>
	</span>
	<button
		on:click={(event) => {
			event.preventDefault();
			Firebase.signup(formUserInfo);
		}}>Sign up</button
	>
</form>

<style lang="sass">
	form
		padding: 1em
		margin-bottom: 2em
	textarea
		width: 70%
		resize: none
		padding: .2em
		border: 3px solid black
		border-radius: 10px
		font-size: 1.2em
	span
		display: flex
		align-items: center
		gap: 1em
</style>
