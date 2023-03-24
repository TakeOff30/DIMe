<script>
	import Post from '../components/Post.svelte';

	export let user;
	export let posts;
</script>

<div class="info-section">
	<h1><b>@</b>{user.username}</h1>
	<p>{user.bio}</p>
	<span>
		<h3>Followers: {user.followers}</h3>
		<h3>Following: {user.following}</h3>
	</span>
</div>
<div class="post-section">
	{#each posts as post}
		<Post postData={post.data} />
	{/each}
</div>

<style lang="sass">

	@use '../styles/variables'
	.info-section
		height: 50vh
		width: 100%
		display: flex
		justify-content: center
		flex-direction: column
		gap: 5em
		padding: 1em
	.post-section
		display: flex
		align-items: center
		justify-content: center
		gap: 1em
		flex-direction: column
		margin: 3em 0 3em 0
	span 
		display: flex
		justify-content: space-around
	p
		margin: 0 2em
</style>
