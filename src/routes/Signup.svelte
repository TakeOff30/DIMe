<script>
	import { Firebase } from '../firebase';
	import * as yup from 'yup';

	let formUserInfo = {
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		bio: '',
	};

	let errors = {};
	let usernameAlreadyUsed = false;

	const schema = yup.object().shape({
		email: yup
			.string()
			.required('Email is required')
			.email('Email is invalid'),
		username: yup.string().required('Username is required'),
		password: yup.string().required('Password is required'),
		confirmPassword: yup
			.string()
			.required('Please confirm your password')
			.oneOf([yup.ref('password'), null], 'Passwords do not match'),
		bio: yup.string().required('Bio is required'),
	});
</script>

<form>
	<span>
		<label for="email">Email: </label>
		<input
			bind:value={formUserInfo.email}
			name="email"
			type="email"
			required
		/>
	</span>
	{#if errors.email}
		<span class="error">{errors.email}</span>
	{/if}
	<span>
		<label for="username">Username: </label>
		<input
			bind:value={formUserInfo.username}
			name="username"
			required
		/>
	</span>
	{#if errors.username}
		<span class="error">{errors.username}</span>
	{/if}
	<span>
		<label for="bio">Bio: </label>
		<textarea
			bind:value={formUserInfo.bio}
			name="bio"
			required
		/>
		{#if errors.bio}
			<span class="error">{errors.bio}</span>
		{/if}
	</span>

	<span>
		<label for="password">Password: </label>
		<input
			bind:value={formUserInfo.password}
			name="password"
			type="password"
			required
			minlength="8"
		/>
	</span>
	{#if errors.password}
		<span class="error">{errors.password}</span>
	{/if}
	<span>
		<label for="confirm">Confirm password: </label>
		<input
			bind:value={formUserInfo.confirmPassword}
			name="confirm"
			type="password"
			required
			minlength="8"
		/>
	</span>
	{#if errors.confirmPassword}
		<span class="error">{errors.confirmPassword}</span>
	{/if}
	{#if usernameAlreadyUsed}
		<span class="error">Username not available</span>
	{/if}
	<button
		on:click={async (event) => {
			event.preventDefault();
			let research;
			Firebase.searchUser(formUserInfo.username).then((value) => {
				research = value;
				if (!research) {
					schema
						.validate(formUserInfo, { abortEarly: false })
						.then(() => {
							errors = {};
							Firebase.signup(formUserInfo);
						})
						.catch((err) => {
							errors = err.inner.reduce((acc, err) => {
								return { ...acc, [err.path]: err.message };
							}, {});
						});
					usernameAlreadyUsed = false;
				} else {
					usernameAlreadyUsed = true;
				}
			});
		}}>Sign up</button
	>
</form>

<style lang="sass">
	form
		padding: 1em
		margin-bottom: 2em
		gap: 1.5em
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
