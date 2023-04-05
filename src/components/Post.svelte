<script>
	import { Firebase } from '../firebase';
	import CommentSection from './CommentSection.svelte';
	import { userData, userPosts } from '../stores/userStore';
	import { push } from 'svelte-spa-router';

	export let postData;
	let showCommentSection = false;

	//onSnapShot post
</script>

<div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<h3
		on:click={async () => {
			if ($userData.uid !== postData.uid) {
				Firebase.getUserData(postData).then((res) => {
					$userData = res.data;
					$userPosts = res.posts;
					push('/profile');
				});
			}
		}}
	>
		@{postData.username}
	</h3>
	<p>{postData.content}</p>
	<span>
		<button>Like</button>
		<button
			on:click={() => {
				showCommentSection = !showCommentSection;
			}}>Comment</button
		>
		{#if $userData.uid == postData.uid}
			<button
				on:click={() => {
					Firebase.deletePost($userData, postData.postid);
				}}>Delete</button
			>
		{/if}
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
