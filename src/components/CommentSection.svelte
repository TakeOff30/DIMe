<script>
	import Comment from './Comment.svelte';
	import CommentGenerator from './CommentGenerator.svelte';

	export let commentsData;
</script>

<CommentGenerator />

<div>
	{#each commentsData as comment}
		<Comment {comment} />
	{/each}
</div>
