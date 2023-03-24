<script>
	import { Firebase } from '../firebase';
	import CommentSection from './CommentSection.svelte';
	import { userData } from '../stores/userStore';

	export let postData;
	let showCommentSection = false;
	console.log(postData);
</script>

<div>
	<h3>@{postData.username}</h3>
	<p>{postData.content}</p>
	<span>
		<button>Like</button>
		<button
			on:click={() => {
				showCommentSection = !showCommentSection;
			}}>Comment</button
		>
		<button
			on:click={() => {
				Firebase.deletePost(userData, postData.postid);
			}}>Delete</button
		>
	</span>
	{#if showCommentSection}
		<CommentSection {postData} />
	{/if}
</div>

<style lang="sass">
	@use '../styles/variables'
	div
		background-color: variables.$primary-color
		color: variables.$white
		box-shadow: variables.$shadow1, variables.$shadow2
		width: 90%
		padding: 1em
		border-radius: 20px

	h3
		padding: .2em

	p
		padding: 0 1em 0 1em

	button
		box-shadow: none

</style>
