<script>
	import Comment from './Comment.svelte';
	import CommentGenerator from './CommentGenerator.svelte';
	export let postData;
	export let commentsData = [];
</script>

<CommentGenerator {postData} />

<div>
	{#each commentsData as comment}
		<Comment {comment} />
	{/each}
</div>
