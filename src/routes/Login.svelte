<script>
	import { auth } from '../firebase';
	import * as yup from 'yup';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let formUserInfo = {
		email: '',
		password: '',
	};
	let loginError = '';
	let errors = {};
	const schema = yup.object().shape({
		email: yup
			.string()
			.required('Email is required')
			.email('Email is invalid'),
		password: yup.string().required('Password is required'),
	});
</script>

<form>
	<span>
		<label for="email">Email: </label>
		<input
			bind:value={formUserInfo.email}
			type="email"
			required
		/>
	</span>
	{#if errors.email}
		<span class="error">{errors.email}</span>
	{/if}
	<span>
		<label for="password">Password: </label>
		<input
			bind:value={formUserInfo.password}
			type="password"
			required
		/>
	</span>
	{#if errors.password}
		<span class="error">{errors.password}</span>
	{/if}
	<span class="error">{loginError}</span>
	<button
		on:click={(event) => {
			event.preventDefault();
			schema
				.validate(formUserInfo, { abortEarly: false })
				.then(() => {
					errors = {};
					signInWithEmailAndPassword(
						auth,
						formUserInfo.email,
						formUserInfo.password
					).catch(() => {
						loginError = 'Email/Password may be incorrect';
					});
				})
				.catch((err) => {
					errors = err.inner.reduce((acc, err) => {
						return { ...acc, [err.path]: err.message };
					}, {});
				});
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
