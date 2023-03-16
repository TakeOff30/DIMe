<script>
	import { Firebase } from '../firebase';
	import Comment from './Comment.svelte';
	import CommentGenerator from './CommentGenerator.svelte';
	export let postData;
	let commentsData = [];
	Firebase.getComments(postData.id).then((value) => {
		commentsData = value;
	});
</script>

<CommentGenerator {postData} />

<div>
	{#each commentsData as comment}
		<Comment {comment} />
	{/each}
</div>
