<script>
	import { userData } from '../stores/userStore';
	import Post from './Post.svelte';
	console.log($userData.feed);
</script>

<div>
	{#each $userData.feed as post}
		<Post postData={post} />
	{/each}
</div>

<style lang="sass">
	div
		display: flex
		align-items: center
		justify-content: center
		gap: 2em
		flex-direction: column
		padding: 1em
		margin-top: 1em
</style>
