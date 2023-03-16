<script>
	// @ts-nocheck

	import { Firebase } from '../firebase';
	import CommentSection from './CommentSection.svelte';

	export let postData;
	let showCommentSection = false;
	console.log(postData);
</script>

<div>
	<h3>{postData.data.username}</h3>
	<p>{postData.data.content}</p>
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
