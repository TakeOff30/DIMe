<script>
	import CommentSection from './CommentSection.svelte';

	export let postData;
	let showCommentSection = false;
	console.log(postData);
</script>

<div>
	<h3>{postData.username}</h3>
	<p>{postData.content}</p>
	<span>
		<button>Like</button>
		<button
			on:click={() => {
				showCommentSection = !showCommentSection;
			}}>Comment</button
		>
	</span>
	{#if showCommentSection}
		<CommentSection {postData} />
	{/if}
</div>
