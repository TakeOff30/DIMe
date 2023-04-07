<script>
	import { Firebase } from '../firebase';
	import CommentSection from './CommentSection.svelte';
	import { user, userData, userPosts } from '../stores/userStore';
	import { push } from 'svelte-spa-router';

	export let postData;
	let showCommentSection = false;
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
	<p class="content">{postData.content}</p>
	<span>
		<h3>{postData.likes.length} likes</h3>
		<p>{new Date(postData.timestamp).toLocaleDateString()}</p>
	</span>
	<span>
		<button
			on:click={() => {
				console.log(postData);
				console.log($user.uid);
				if (postData.likes.includes($user.uid)) {
					Firebase.removeLike(postData, $user).then((res) => {
						postData.likes = res;
					});
				} else {
					Firebase.addLike(postData, $user).then((res) => {
						postData.likes = res;
					});
				}
			}}
			><img
				src={postData.likes.includes($user.uid)
					? '../src/assets/heartF.png'
					: '../src/assets/heart.png'}
				class="icon"
				alt="like icon"
			/></button
		>
		<button
			on:click={() => {
				showCommentSection = !showCommentSection;
			}}
			><img
				src={showCommentSection
					? '../src/assets/comment-altF.png'
					: '../src/assets/comment-alt.png'}
				class="icon"
				alt="comment icon"
			/></button
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
	span
		display: flex
		align-items: center
		justify-content: space-around
	.content
		margin: 2em 0 2em 0

</style>
