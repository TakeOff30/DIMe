<script>
	import { Firebase } from '../firebase';
	import {
		user,
		userData,
		userPosts,
		userFollowers,
	} from '../stores/userStore';

	let toSearch = '';
	let result = null;

	if ($userData.uid !== $user.uid) {
		Firebase.getUserData($user).then((res) => {
			$userData = res.data;
			$userPosts = res.posts;
		});
	}
</script>

<span>
	<input bind:value={toSearch} />
	<button
		on:click={() => {
			Firebase.searchUser(toSearch).then((value) => {
				result = value;
			});
		}}
		><img
			src="../assets/search.png"
			alt="search button icon"
		/></button
	>
</span>

{#if result}
	<div>
		<h2><b>@</b>{result.username}</h2>
		<button
			on:click={() => {
				if ($userFollowers.includes(result.uid)) {
					Firebase.removeFollower($userData, result);
					$userFollowers = $userFollowers.filter(
						(user) => user !== result.uid
					);
				} else {
					Firebase.addFollower($userData, result);
					$userFollowers = [...$userFollowers, result.uid];
				}
			}}
			><img
				src={$userFollowers.includes(result.uid)
					? '../assets/check.png'
					: '../assets/user-add.png'}
				alt="search button icon"
			/></button
		>
	</div>
{/if}

<style lang="sass">
	span
		width: 100%
		display: flex
		align-items: center
		justify-content: space-around

	input
		border: 3px solid black
		padding: .3em
		font-size: 1.5em
		border-radius: 10px
		width: 60%

	img 
		width: 2em

	div 
		display: flex
		align-items: center
		justify-content: space-around
		margin: 3em 0

</style>
