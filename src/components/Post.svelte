<script>
	// @ts-nocheck

	import { Firebase } from '../firebase';
	import CommentSection from './CommentSection.svelte';

	export let postData;
	console.log(postData);
	let commentsData = Firebase.getComments(postData.id);
	console.log(commentsData);
</script>

<div>
	<h3>{postData.data.username}</h3>
	<p>{postData.data.content}</p>
	<span>
		<button>Like</button>
		<button>Comment</button>
	</span>
	<CommentSection
		{postData}
		{commentsData}
	/>
</div>
